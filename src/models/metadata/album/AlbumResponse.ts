import {AlbumType} from "@/const/metadata/AlbumType";
import {ImageResponse} from "@/models/metadata/image/ImageResponse";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {TrackResponse} from "@/models/metadata/track/TrackResponse";

export interface AlbumResponse {
  id: string;
  name: string;
  albumType: AlbumType
  images: ImageResponse[];
  totalTracks: number;
  totalDurationMs: number;
  releaseDate: string;
  releaseTz?: string;
  releaseDatePrecision?: 'YEAR' | 'MONTH' | 'DAY';
  popularity: number;
  artists: SimplifiedArtistResponse[];
  tracks: TrackResponse[];
}