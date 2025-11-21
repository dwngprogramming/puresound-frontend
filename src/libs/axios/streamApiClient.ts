import {store} from "@/libs/redux/store";
import {getLocale, tProvider} from "@/libs/singleton/translation";
import {streamInstance} from "@/libs/axios/axiosInstances";
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import axios from "axios";
import streamApi from "@/apis/main/stream/stream.api";

let isRefreshing = false;

streamInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
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

streamInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  // Khi xử lý error với async, nên throw thay vì new Promise.reject,
  // vì mọi throw trong đó sẽ tự động được biến thành một Promise.reject.
  async (error) => {
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

    // Chỉ xử lý lỗi 401 (Khi stream session hết hạn và chưa retry)
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;

      // Thực hiện gọi API làm mới token
      try {
        await streamApi.verifyOrCreateSession();
        return streamInstance(originalRequest);
      } catch (err) {

      } finally {
        isRefreshing = false;
      }
    }
  }
)

export default {
  async get<T>(
    endpoint: string,
    option?: Record<string, any>
  ): Promise<T> {
    return await streamInstance.get(endpoint, option);
  },
  async post<T>(
    endpoint: string,
    data?: any,
    option?: Record<string, any>
  ): Promise<T> {
    return await streamInstance.post(endpoint, data, option);
  }
};
