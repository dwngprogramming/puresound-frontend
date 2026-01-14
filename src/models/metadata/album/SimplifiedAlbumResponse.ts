import {AlbumType} from "@/const/metadata/AlbumType";
import {SimplifiedArtistResponse} from "@/models/metadata/artist/SimplifiedArtistResponse";
import {ImageResponse} from "@/models/metadata/image/ImageResponse";

export interface SimplifiedAlbumResponse {
  id: string
  name: string
  albumType: AlbumType
  releaseDate: string
  images: ImageResponse[]
  artists: SimplifiedArtistResponse[]
}