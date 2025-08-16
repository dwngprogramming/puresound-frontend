import publicApi from "@/libs/axios/publicApi";
import {AxiosRequestConfig} from "axios";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {ApiResponse} from "@/models/ApiResponse";
import {SignupRequest} from "@/models/auth/SignupRequest";
import {CheckEmailResponse} from "@/models/auth/CheckEmailResponse";
import {OtpEmailRequest} from "@/models/otp/OtpEmailRequest";
import {ResetPasswordRequest} from "@/models/auth/ResetPasswordRequest";

const authApi = {
  login: (request: LoginRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/auth/local/login', request, options),

  logout: (options?: AxiosRequestConfig<never>) =>
    publicApi.delete<ApiResponse<void>>('/v1/auth/logout', options),

  signup: (request: SignupRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<Record<string, string>>>('/v1/auth/signup', request, options),

  checkEmail: (email: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<CheckEmailResponse>>('/v1/auth/check-email', {email}, options),

  verifyRegister: (request: OtpEmailRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/otp/verify', request, options),

  sendOtp: (email: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/otp/send', {email}, options),

  resetPassword: (request: ResetPasswordRequest, options?: AxiosRequestConfig<never>)=>
    publicApi.put<ApiResponse<void>>('/v1/auth/reset-password', request, options),
};

export default authApi;
