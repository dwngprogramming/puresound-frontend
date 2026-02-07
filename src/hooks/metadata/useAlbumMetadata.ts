import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {albumApi} from "@/apis/main/metadata/album.api";

export const usePopularAlbums = (page: number = 1) => {
  return useQuery({
    queryKey: ['popular-albums', page],   // Caching based on page number
    queryFn: async () => {
      const response = await albumApi.getPopularAlbums(page);
      return response.data.content;
    },
    enabled: !!page && page >= 1,
    placeholderData: keepPreviousData,
  })
}