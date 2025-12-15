import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultOptions = {
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
};

const createDefaultAxiosClient = (options: CreateAxiosDefaults = {}): AxiosInstance => {
  return axios.create({...defaultOptions, ...options});
};

export const publicAxiosInstance = createDefaultAxiosClient();

export const verifyAxiosInstance = createDefaultAxiosClient();

export const refreshTokenInstance = createDefaultAxiosClient();

export const reloginInstance = createDefaultAxiosClient();

export const streamInstance = createDefaultAxiosClient();
