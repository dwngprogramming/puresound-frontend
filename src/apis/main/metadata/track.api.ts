import publicApiClient from "@/libs/axios/publicApiClient";
import {AxiosRequestConfig} from "axios";
import {ApiResponse} from "@/models/ApiResponse";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {SPFResponse} from "@/models/pagination/SPFResponse";

const trackApi = {
  getPopularTracks: (page: number, options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<SPFResponse<SimplifiedTrackResponse>>>('/v1/tracks/popular-tracks', {
      params: {page},
      ...options
    })
};

export default trackApi;