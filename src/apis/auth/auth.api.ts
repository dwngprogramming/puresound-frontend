import publicApi from "@/libs/axios/publicApi";
import {AxiosRequestConfig} from "axios";
import {TokenResponse} from "@/models/auth/TokenResponse";
import {LoginRequest} from "@/models/auth/LoginRequest";
import {ApiResponse} from "@/models/ApiResponse";

const authApi = {
  login: (request: LoginRequest, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/auth/local/login', request, options),
};

export default authApi;
