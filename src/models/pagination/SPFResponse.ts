import {PagingResponse} from "@/models/pagination/PagingResponse";

export interface SPFResponse<T> {
  content: T[]
  paging: PagingResponse
}