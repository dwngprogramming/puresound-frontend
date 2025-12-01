import {AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import {PlanResponse} from "@/models/listener/subscription/PlanResponse";
import publicApiClient from "@/libs/axios/publicApiClient";

const listenerPublicApi = {
  getAllPlans: (options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<PlanResponse[]>>('/v1/listener/plans', options)
}

export default listenerPublicApi;
