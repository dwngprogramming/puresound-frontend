import {AlbumType} from "@/const/metadata/AlbumType";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";

export interface SimplifiedAlbumResponse {
  id: string
  name: string
  albumType: AlbumType
  releaseDate: string
  artists: SimplifiedArtistResponse[]
}