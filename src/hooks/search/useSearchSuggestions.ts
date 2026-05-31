import {keepPreviousData, useQuery} from "@tanstack/react-query";
import searchApi from "@/apis/main/search/search.api";

export const useSearchSuggestions = (keyword: string, limit: number = 5) => {
  const normalizedKeyword = keyword.trim();

  return useQuery({
    queryKey: ['search-suggestions', normalizedKeyword, limit],
    queryFn: async () => {
      const response = await searchApi.getSuggestions(normalizedKeyword, limit);
      return response.data;
    },
    enabled: normalizedKeyword.length > 0,
    placeholderData: keepPreviousData,
  });
}
