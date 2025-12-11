import {keepPreviousData, useQuery} from "@tanstack/react-query";
import trackApi from "@/apis/main/metadata/track.api";

export const usePopularTracks = (page: number = 1) => {
  return useQuery({
    queryKey: ['popular-tracks', page],   // Caching based on page number
    queryFn: async () => {
      const response = await trackApi.getPopularTracks(page);
      return response.data.content;
    },
    enabled: !!page && page >= 1,
    placeholderData: keepPreviousData,
  })
}