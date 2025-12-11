export interface PagingResponse {
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  sortDirection: 'ASC' | 'DESC';
  sortBy: string;
}