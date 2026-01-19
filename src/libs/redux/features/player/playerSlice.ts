import {SimplifiedTrackResponse} from "@/models/metadata/track/SimplifiedTrackResponse";
import {LoopMode} from "@/const/LoopMode";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlayerState {
  queue: SimplifiedTrackResponse[];
  shuffledQueue: SimplifiedTrackResponse[];
  currentTrack: SimplifiedTrackResponse | null;
  isPlaying: boolean;
  isShuffling: boolean;
  loopMode: LoopMode;
  currentVolume: number;
  prevVolume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  queue: [],
  shuffledQueue: [],
  currentTrack: null,
  isPlaying: false,
  isShuffling: false,
  loopMode: LoopMode.NONE,
  currentVolume: 20,
  prevVolume: 20,
  isMuted: false,
}

// Fisher-Yates shuffle algorithm
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
    setQueue(state, action) {
      state.queue = action.payload.tracks;
      state.shuffledQueue = state.isShuffling ? shuffleArray(action.payload.tracks) : [];
      state.currentTrack = action.payload.tracks[0] || null;
      state.isPlaying = true;
    },
    
    playNext: (state, action: PayloadAction<{ isListenerClick: boolean } | undefined>) => {
      const isListenerClick = action?.payload?.isListenerClick ?? false;
      if (isListenerClick && state.loopMode === LoopMode.ONE) {
        state.loopMode = LoopMode.ALL;
      }
      
      const activeQueue = state.isShuffling ? state.shuffledQueue : state.queue;
      const currentIndex = activeQueue.findIndex(t => t.id === state.currentTrack?.id);
      
      if (currentIndex < activeQueue.length - 1) {
        state.currentTrack = activeQueue[currentIndex + 1];
      } else if (state.loopMode === LoopMode.ALL) {
        state.currentTrack = activeQueue[0];
      } else {
        state.isPlaying = false;
      }
    },
    
    playPrev: (state) => {
      const activeQueue = state.isShuffling ? state.shuffledQueue : state.queue;
      const currentIndex = activeQueue.findIndex(t => t.id === state.currentTrack?.id);
      
      if (currentIndex > 0) {
        state.currentTrack = activeQueue[currentIndex - 1];
      } else if (state.loopMode === LoopMode.ALL) {
        state.currentTrack = activeQueue[activeQueue.length - 1];
      }
    },
    
    toggleShuffle: (state) => {
      state.isShuffling = !state.isShuffling;
      if (state.isShuffling) {
        state.shuffledQueue = shuffleArray(state.queue);
      } else {
        state.shuffledQueue = [];
      }
    },
    
    toggleLoop: (state) => {
      if (state.loopMode === LoopMode.NONE) {
        state.loopMode = LoopMode.ALL;
      } else if (state.loopMode === LoopMode.ALL) {
        state.loopMode = LoopMode.ONE;
      } else {
        state.loopMode = LoopMode.NONE;
      }
    },
    
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    
    setVolume: (state, action: PayloadAction<number>) => {
      state.currentVolume = action.payload;
      if (state.isMuted && state.currentVolume > 0) {
        state.isMuted = false;
      } else if (state.currentVolume === 0) {
        state.isMuted = true;
      }
    },
    
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
      if (state.isMuted) {
        state.prevVolume = state.currentVolume;
        state.currentVolume = 0;
      } else {
        state.currentVolume = state.prevVolume;
      }
    },
  }
});

export const {
  setQueue,
  playNext,
  playPrev,
  toggleShuffle,
  toggleLoop,
  setIsPlaying,
  setVolume,
  toggleMute
} = playerSlice.actions;
export default playerSlice.reducer;