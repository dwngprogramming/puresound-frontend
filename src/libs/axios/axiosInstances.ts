import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const publicAxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
})

export const verifyAxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
});

export const refreshTokenInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
});

// Instance for relogin
export const reloginInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
});

// Instance for streaming service
export const streamInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  withCredentials: true
});
