import { SimplifiedTrackResponse } from "@/models/metadata/track/SimplifiedTrackResponse";
import { LoopMode } from "@/const/LoopMode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  originalQueue: SimplifiedTrackResponse[];
  currentQueue: SimplifiedTrackResponse[];
  currentIndex: number;
  isPlaying: boolean;
  isShuffling: boolean;
  loopMode: LoopMode;
  currentVolume: number;
  prevVolume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  originalQueue: [],
  currentQueue: [],
  currentIndex: -1,
  isPlaying: false,
  isShuffling: false,
  loopMode: LoopMode.NONE,
  currentVolume: 20,
  prevVolume: 20,
  isMuted: false,
};

const shuffleArray = (array: SimplifiedTrackResponse[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setQueue(state, action: PayloadAction<{ tracks: SimplifiedTrackResponse[]; startIndex?: number }>) {
      const { tracks, startIndex = 0 } = action.payload;
      state.originalQueue = tracks;
      
      if (state.isShuffling) {
        const selectedTrack = tracks[startIndex];
        const remainingTracks = tracks.filter((_, i) => i !== startIndex);
        state.currentQueue = [selectedTrack, ...shuffleArray(remainingTracks)];
        state.currentIndex = 0;
      } else {
        state.currentQueue = tracks;
        state.currentIndex = startIndex;
      }
      
      state.isPlaying = true;
    },
    
    playNext: (state, action: PayloadAction<{ isListenerClick: boolean } | undefined>) => {
      const isListenerClick = action?.payload?.isListenerClick ?? false;
      
      if (state.loopMode === LoopMode.ONE && isListenerClick) {
        state.loopMode = LoopMode.ALL;
      }
      
      if (state.currentIndex < state.currentQueue.length - 1) {
        state.currentIndex += 1;
      } else if (state.loopMode === LoopMode.ALL) {
        state.currentIndex = 0;
      } else {
        state.isPlaying = false;
      }
    },
    
    playPrev: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      } else if (state.loopMode === LoopMode.ALL) {
        state.currentIndex = state.currentQueue.length - 1;
      }
    },
    
    playSelectedTrackInQueue: (state, action: PayloadAction<string>) => {
      const trackId = action.payload;
      const trackIndex = state.currentQueue.findIndex(t => t.id === trackId);
      if (trackIndex !== -1) {
        state.currentIndex = trackIndex;
        state.isPlaying = true;
      }
    },
    
    toggleShuffle: (state) => {
      const currentTrack = state.currentQueue[state.currentIndex];
      state.isShuffling = !state.isShuffling;
      
      if (state.isShuffling) {
        const remaining = state.originalQueue.filter(t => t.id !== currentTrack?.id);
        state.currentQueue = [currentTrack, ...shuffleArray(remaining)];
        state.currentIndex = 0;
      } else {
        state.currentQueue = state.originalQueue;
        state.currentIndex = state.originalQueue.findIndex(t => t.id === currentTrack?.id);
      }
    },
    
    toggleLoop: (state) => {
      const modes = [LoopMode.NONE, LoopMode.ALL, LoopMode.ONE];
      const nextModeIndex = (modes.indexOf(state.loopMode) + 1) % modes.length;
      state.loopMode = modes[nextModeIndex];
    },
    
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    
    setVolume: (state, action: PayloadAction<number>) => {
      state.currentVolume = action.payload;
      state.isMuted = state.currentVolume === 0;
    },
    
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
      if (state.isMuted) {
        state.prevVolume = state.currentVolume;
        state.currentVolume = 0;
      } else {
        state.currentVolume = state.prevVolume || 20;
      }
    },
  }
});

export const {
  setQueue, playNext, playPrev, playSelectedTrackInQueue, toggleShuffle, toggleLoop, setIsPlaying, setVolume, toggleMute
} = playerSlice.actions;

export default playerSlice.reducer;