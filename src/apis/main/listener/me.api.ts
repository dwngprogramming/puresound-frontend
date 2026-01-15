import {AxiosRequestConfig} from "axios";
import verifyApiClient from "@/libs/axios/verifyApiClient";
import {ApiResponse} from "@/models/ApiResponse";
import {BaseSubscription} from "@/models/listener/subscription/BaseSubscription";

const meApi = {
  getMe: (options?: AxiosRequestConfig<never>) =>
    verifyApiClient.get<string>('/v1/me', options),

  getBasicSubscription: (options?: AxiosRequestConfig<never>) =>
    verifyApiClient.get<ApiResponse<BaseSubscription>>('/v1/me/subscription/base', options)
}

export default meApi;
