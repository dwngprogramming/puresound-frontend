import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";
import {applyStagingInterceptor} from "@/libs/axios/stagingInterceptor";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultOptions = {
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
};

// --- Factory Pattern ---
const createAxiosClient = (options: CreateAxiosDefaults = {}): AxiosInstance => {
  const instance = axios.create({ ...defaultOptions, ...options });
  
  // "Inject" logic Staging into instance when initializing
  applyStagingInterceptor(instance);
  
  return instance;
};

export const publicAxiosInstance = createAxiosClient();

export const verifyAxiosInstance = createAxiosClient();

export const refreshTokenInstance = createAxiosClient();

export const reloginInstance = createAxiosClient();

export const streamInstance = createAxiosClient();
