import {ImageResponse} from "@/models/metadata/image/ImageResponse";

export interface SimplifiedArtistResponse {
  id: string
  stageName: string
  images: ImageResponse[]
}