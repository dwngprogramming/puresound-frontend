import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";

export interface SearchSuggestionResponse {
  keyword: string;
  tracks: SimplifiedTrackResponse[];
  albums: SimplifiedAlbumResponse[];
  artists: SimplifiedArtistResponse[];
}

export const createEmptySearchSuggestionResponse = (keyword: string = ''): SearchSuggestionResponse => ({
  keyword,
  tracks: [],
  albums: [],
  artists: [],
});
