import publicApi from "@/libs/axios/publicApi";
import {AxiosRequestConfig} from "axios";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {ApiResponse} from "@/models/ApiResponse";
import {SignupRequest} from "@/models/auth/SignupRequest";

const authApi = {
  login: (request: LoginRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/auth/local/login', request, options),

  logout: (options?: AxiosRequestConfig<never>) =>
    publicApi.delete<ApiResponse<void>>('/v1/auth/logout', options),

  // 204 no content
  signup: (request: SignupRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<void>('/v1/auth/signup', request, options),

  verifyRegister: (request: { code: string }, options?: AxiosRequestConfig<never>) =>
    publicApi.put<ApiResponse<void>>('/v1/auth/signup/verify', request, options),

  sendOtp: (options?: AxiosRequestConfig<never>) =>
    publicApi.get('/v1/auth/signup/otp', options),
};

export default authApi;
