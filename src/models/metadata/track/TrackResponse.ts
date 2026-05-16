import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";
import {GenreResponse} from "@/models/metadata/genre/GenreResponse";

export interface TrackResponse {
  id: string;
  title: string;
  durationMs: number;
  trackNumber: number;
  explicit: boolean;
  popularity: number;
  isLocal: boolean;
  availableBitrates: number[];
  artists: SimplifiedArtistResponse[];
  album: SimplifiedAlbumResponse;
  genres: GenreResponse[];
}