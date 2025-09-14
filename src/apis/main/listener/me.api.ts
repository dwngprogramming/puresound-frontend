import {AxiosRequestConfig} from "axios";
import verifyApi from "@/libs/axios/verifyApi";
import {ApiResponse} from "@/models/ApiResponse";
import {BaseSubscription} from "@/models/listener/BaseSubscription";

const meApi = {
  getMe: (options?: AxiosRequestConfig<never>) =>
    verifyApi.get<string>('/v1/listener/me', options),

  getBasicSubscription: (options?: AxiosRequestConfig<never>) =>
    verifyApi.get<ApiResponse<BaseSubscription>>('/v1/listener/subscription/base', options)
}

export default meApi;
