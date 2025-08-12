import publicApi from "@/libs/axios/publicApi";
import {AxiosRequestConfig} from "axios";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {ApiResponse} from "@/models/ApiResponse";
import {SignupRequest} from "@/models/auth/SignupRequest";
import {CheckEmailResponse} from "@/models/listener/CheckEmailResponse";
import {OtpEmailRequest} from "@/models/otp/OtpEmailRequest";

const authApi = {
  login: (request: LoginRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/auth/local/login', request, options),

  logout: (options?: AxiosRequestConfig<never>) =>
    publicApi.delete<ApiResponse<void>>('/v1/auth/logout', options),

  signup: (request: SignupRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<Record<string, string>>>('/v1/auth/signup', request, options),

  checkEmail: (email: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<CheckEmailResponse>>('/v1/auth/listener/check-email', {email}, options),

  verifyRegister: (request: OtpEmailRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/signup/otp/verify', request, options),

  resendOtp: (email: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<void>>('/v1/auth/signup/otp/resend', {email}, options),
};

export default authApi;
