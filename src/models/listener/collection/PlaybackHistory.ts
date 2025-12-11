import {LoopMode} from "@/const/LoopMode";

export interface PlaybackHistory {
  lastTrackId: string
  lastPlayedPositionMs: number
  lastPlayedAt: number
  loopMode: LoopMode
  isShuffled: boolean
  recentlyPlayedTrackIds: string[]
}
