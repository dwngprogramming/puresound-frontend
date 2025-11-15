import publicApi from "@/libs/axios/publicApiClient";
import {AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import {TokenResponse} from "@/models/auth/TokenResponse";

const tokenApi = {
  exchangeToken: (code: string, options?: AxiosRequestConfig<never>) =>
    publicApi.post<ApiResponse<TokenResponse>>('/v1/token/exchange', {code}, options)
};

export default tokenApi;
