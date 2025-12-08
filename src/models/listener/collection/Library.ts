import {SavedTrack} from "@/models/listener/collection/SavedTrack";
import {SavedAlbum} from "@/models/listener/collection/SavedAlbum";
import {FollowedArtist} from "@/models/listener/collection/FollowedArtist";

export interface Library {
  savedTracks: SavedTrack[]
  savedAlbums: SavedAlbum[]
  followedArtists: FollowedArtist[]
}
