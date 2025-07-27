import {AxiosRequestConfig} from "axios";
import verifyApi from "@/libs/axios/verifyApi";

const meApi = {
  getMe: (options?: AxiosRequestConfig<never>) => verifyApi.get<string>('/v1/listener/me', options),
}

export default meApi;
