import {AxiosRequestConfig} from "axios";
import publicApiClient from "@/libs/axios/publicApiClient";
import {ApiResponse} from "@/models/ApiResponse";
import {PlanResponse} from "@/models/listener/subscription/PlanResponse";

const planApi = {
  getPlans: (options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<PlanResponse[]>>('/v1/plans', options)
}

export default planApi;