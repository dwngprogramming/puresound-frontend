import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(BASE_URL);

const publicAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

publicAxiosInstance.interceptors.request.use(
  (config) => {
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
    console.error("Response error:", error);
    return Promise.reject(error);
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
  async delete<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return publicAxiosInstance.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    publicAxiosInstance.defaults.headers.common[key] = data;
    console.log(data);
  }
}
