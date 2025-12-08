import {PlaybackHistory} from "@/models/listener/collection/PlaybackHistory";
import {Library} from "@/models/listener/collection/Library";

export interface ListenerCollection {
  listenerId: string
  library: Library
  playbackHistory: PlaybackHistory
}
