export interface ImageResponse {
  id: string
  name: string
  imageOwnerType: OwnerType
  url: string
  width: number
  height: number
}

type OwnerType = 'ARTIST' | 'ALBUM'