import {AxiosRequestConfig} from "axios";
import publicApiClient from "@/libs/axios/publicApiClient";
import {ApiResponse} from "@/models/ApiResponse";
import {SPFResponse} from "@/models/pagination/SPFResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";

export const albumApi = {
  getPopularAlbums: (page: number, options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<SPFResponse<SimplifiedAlbumResponse>>>('/v1/albums/popular-albums', {
      params: {page},
      ...options
    })
};