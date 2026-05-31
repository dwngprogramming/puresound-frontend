import {AxiosRequestConfig} from "axios";
import publicApiClient from "@/libs/axios/publicApiClient";
import {ApiResponse} from "@/models/ApiResponse";
import {SearchSuggestionResponse} from "@/models/search/SearchSuggestionResponse";

const searchApi = {
  getSuggestions: (keyword: string, limit: number = 5, options?: AxiosRequestConfig<never>) =>
    publicApiClient.get<ApiResponse<SearchSuggestionResponse>>('/v1/search/suggestions', {
      params: {keyword, limit},
      ...options
    })
}

export default searchApi;
