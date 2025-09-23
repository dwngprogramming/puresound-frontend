import {AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import {PlanResponse} from "@/models/listener/PlanResponse";
import publicApi from "@/libs/axios/publicApi";

const listenerPublicApi = {
  getAllPlans: (options?: AxiosRequestConfig<never>) =>
    publicApi.get<ApiResponse<PlanResponse[]>>('/v1/listener/plans', options)
}

export default listenerPublicApi;
