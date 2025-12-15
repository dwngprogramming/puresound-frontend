import {AxiosRequestConfig} from "axios";
import publicApiClient from "@/libs/axios/publicApiClient";
import {ApiResponse} from "@/models/ApiResponse";
import {SPFResponse} from "@/models/pagination/SPFResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";

const artistApi = {
  getFeaturedArtists: (page: number, options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<SPFResponse<SimplifiedArtistResponse>>>('/v1/artists/featured-artists', {
      params: {page},
      ...options
    })
};

export default artistApi;