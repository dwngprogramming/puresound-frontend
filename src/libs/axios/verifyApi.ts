import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const verifyAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

verifyAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('at');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

  (error: AxiosError<ApiResponse<any>>) => {
    console.error("Response error:", error);
    return Promise.reject(error);
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
