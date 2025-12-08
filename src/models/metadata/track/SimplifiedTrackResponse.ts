import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {SimplifiedAlbumResponse} from "@/models/metadata/album/SimplifiedAlbumResponse";

export interface SimplifiedTrackResponse {
  id: string
  title: string
  explicit: boolean
  artists: SimplifiedArtistResponse[]
  album: SimplifiedAlbumResponse
}