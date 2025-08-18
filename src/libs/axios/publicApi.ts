import axios, {AxiosRequestConfig} from "axios";
import {store} from "@/libs/redux/store";
import {showErrorNotification} from "@/libs/redux/features/notification/notificationAction";
import {getLocale, tProvider} from "@/libs/singleton/translation";
import { publicAxiosInstance } from "@/libs/axios/axiosInstances";

publicAxiosInstance.interceptors.request.use(
  (config) => {
    const locale = getLocale();
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

publicAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    // Bắt lỗi mạng/server
    if (error === null) {
      store.dispatch(showErrorNotification(tProvider('General.Error.system')));
      return Promise.reject(new Error(tProvider('General.Error.unknown')));
    } else if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        store.dispatch(showErrorNotification(tProvider('General.Error.network')));
        return Promise.reject(error);
      } else if (!error.response) {
        store.dispatch(showErrorNotification(tProvider('General.Error.server')));
        return Promise.reject(error);
      } else {
        store.dispatch(showErrorNotification(error.response.data.message));
        return Promise.reject(error);
      }
    }
  }
);

export default {
  async get<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.get(endpoint, option);
  },
  async post<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.post(endpoint, data, option);
  },
  async put<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.put(endpoint, data, option);
  },
  async patch<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.patch(endpoint, data, option);
  },
  async delete<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    publicAxiosInstance.defaults.headers.common[key] = data;
    console.log(data);
  },
}
