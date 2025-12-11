import publicApi from "@/libs/axios/publicApiClient";
import {AxiosRequestConfig} from "axios";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {ApiResponse} from "@/models/ApiResponse";
import {SignupRequest} from "@/models/auth/SignupRequest";
import {OtpEmailRequest} from "@/models/otp/OtpEmailRequest";
import {ResetPasswordRequest} from "@/models/auth/ResetPasswordRequest";
import {CheckExistsResponse} from "@/models/auth/CheckExistsResponse";
import {CheckExistsRequest} from "@/models/auth/CheckExistsRequest";

const authApi = {
  login: (request: LoginRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/auth/local/login', request, options),

  logout: (options?: AxiosRequestConfig<never>) =>
    publicApi.delete<ApiResponse<void>>('/v1/auth/logout', options),

  signup: (request: SignupRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<Record<string, string>>>('/v1/auth/signup', request, options),

  checkEmail: (request: CheckExistsRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<CheckExistsResponse>>('/v1/auth/check-email', request, options),

  checkUsername: (request: CheckExistsRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<CheckExistsResponse>>('/v1/auth/check-username', request, options),

  verifyRegister: (request: OtpEmailRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/otp/verify', request, options),

  sendOtp: (email: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/otp/send', {email}, options),

  resetPassword: (request: ResetPasswordRequest, options?: AxiosRequestConfig<never>)=>
    publicApi.patch<ApiResponse<void>>('/v1/auth/reset-password', request, options),
};

export default authApi;
