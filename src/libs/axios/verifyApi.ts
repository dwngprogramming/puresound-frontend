import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import {CustomJwtPayload} from "@/models/auth/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {UserPrincipal} from "@/models/auth/UserPrincipal";
import {store} from "@/libs/redux/store";
import {deleteCredentials, setCredentials} from "@/libs/redux/features/auth/authSlice";
import {getRouter} from "@/libs/singleton/navigation";
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {tProvider, getLocale} from "@/libs/singleton/translation";
import {refreshTokenInstance, verifyAxiosInstance} from "@/libs/axios/axiosInstances";

// Failed queue request when refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// Handle queue after refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({resolve, reject}) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const handleAuthState = (accessToken: string) => {
  const payload: CustomJwtPayload = jwtDecode(accessToken);
  const principal: UserPrincipal = {
    id: payload.sub,
    fullname: payload.fullname,
    userType: payload.userType,
    authorities: payload.authorities,
  };
  store.dispatch(setCredentials({
    principal: principal,
    token: accessToken
  }));
}

const handleLogout = () => {
  store.dispatch(deleteCredentials());
  // Lấy locale từ localStorage hoặc fallback sang 'en'
  const locale = localStorage.getItem('locale') || 'en';
  const navigationRouter = getRouter();
  if (navigationRouter) {
    navigationRouter.push(`/${locale}/login`);
  } else {
    // fallback nếu router chưa sẵn sàng
    console.error('Router is not ready');
  }
};

refreshTokenInstance.interceptors.request.use(
  (config) => {
    const locale = getLocale();
    if (locale) {
      config.headers['Accept-Language'] = locale;
    }
    return config;
  },
);

verifyAxiosInstance.interceptors.request.use(
  (config) => {
    const authState = store.getState().auth;
    const token = authState.token;
    const locale = getLocale();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (locale) {
      config.headers['Accept-Language'] = locale;
    }
    return config;
  },

  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

verifyAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  // Khi xử lý error với async, nên throw thay vì new Promise.reject,
  // vì mọi throw trong đó sẽ tự động được biến thành một Promise.reject.
  async (error: AxiosError<ApiResponse<any>>) => {
    // Bắt lỗi mạng/server
    if (error === null) {
      store.dispatch(showErrorNotification(tProvider('General.Error.system')));
      throw new Error(tProvider('General.Error.unknown'));
    } else if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        store.dispatch(showErrorNotification(tProvider('General.Error.network')));
        throw error;
      } else if (!error.response) {
        store.dispatch(showErrorNotification(tProvider('General.Error.server')));
        throw error;
      }
    }

    const originalRequest = error.config as any;

    // Chỉ xử lý lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Nếu đang thực hiện refresh token, đưa request này vào queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // Retry request gốc
          return verifyAxiosInstance(originalRequest);
        });
      }

      // SET isRefreshing = true
      isRefreshing = true;

      try {
        const response = await refreshTokenInstance.post('/v1/auth/refresh-token');

        const accessToken: string = response.data.data.accessToken;
        handleAuthState(accessToken);

        // Xử lý queue với success
        processQueue(null, accessToken);

        // Retry request gốc
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return verifyAxiosInstance(originalRequest);

      } catch (refreshError) {
        // Refresh thất bại
        processQueue(refreshError, null);
        handleLogout();
        throw refreshError;

      } finally {
        // Reset flag
        isRefreshing = false;
      }
    }

    // Return rejected promise cho các lỗi khác
    throw error;
  }
);

export default {
  async get<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await verifyAxiosInstance.get(endpoint, option);
  },
  async post<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await verifyAxiosInstance.post(endpoint, data, option);
  },
  async put<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await verifyAxiosInstance.put(endpoint, data, option);
  },
  async delete<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return verifyAxiosInstance.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    verifyAxiosInstance.defaults.headers.common[key] = data;
    console.log(data);
  }
}
