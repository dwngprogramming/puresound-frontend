import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const publicAxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
  withCredentials: true
})

export const verifyAxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
  withCredentials: true
});

export const refreshTokenInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 15000,
  withCredentials: true
});

// Instance for relogin
export const reloginInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: true
});
