import {AxiosRequestConfig} from "axios";
import verifyApi from "@/libs/axios/verifyApi";

const meApi = {
  getMe: (options?: AxiosRequestConfig<never>) => verifyApi.get('/v1/me', options),
}

export default meApi;
