import {LoopMode} from "@/const/LoopMode";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PlayerControl {
  trackId: string | null
  duration: number
  current: number
  bitrate: number
  loopMode: LoopMode
  shuffle: boolean
  playing: boolean
  volume: number
}

const initState: PlayerControl = {
  trackId: null,
  duration: 0,
  current: 0,
  bitrate: 192,
  loopMode: LoopMode.NONE,
  shuffle: false,
  playing: false,
  volume: 15
}

const playerControls = createSlice({
  name: 'playerControls',
  initialState: initState,
  reducers: {
    updateVolume(state: PlayerControl, action: PayloadAction<number>) {
      state.volume = Math.min(Math.max(action.payload, 0), 100);
    },
    updatePlaying(state: PlayerControl, action: PayloadAction<boolean>) {
      state.playing = action.payload;
    },
    snapshotCurrent(state: PlayerControl, action: PayloadAction<number>) {
      // Just update current time when 401 error/crash HLS. Not update one by one with audio timeupdate event
      state.current = action.payload;
    },
    updateLoopMode(state: PlayerControl, action: PayloadAction<LoopMode>) {
      state.loopMode = action.payload;
    },
    updateShuffle(state: PlayerControl, action: PayloadAction<boolean>) {
      state.shuffle = action.payload;
    },
    updateTrack(state: PlayerControl, action: PayloadAction<{ trackId: string, duration: number, bitrate: number }>) {
      state.trackId = action.payload.trackId;
      state.bitrate = action.payload.bitrate;
      state.duration = action.payload.duration;
      state.current = 0;
    }
  }
});

export const {updateVolume, updatePlaying, snapshotCurrent, updateLoopMode, updateShuffle, updateTrack} = playerControls.actions;
export default playerControls.reducer;
