import {keepPreviousData, useQuery} from "@tanstack/react-query";
import artistApi from "@/apis/main/metadata/artist.api";

export const useFeaturedArtists = (page: number = 1) => {
  return useQuery({
    queryKey: ['featured-artists', page],   // Caching based on page number
    queryFn: async () => {
      const response = await artistApi.getFeaturedArtists(page);
      return response.data.content;
    },
    enabled: !!page && page >= 1,
    placeholderData: keepPreviousData,
  })
}