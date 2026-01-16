import {createSlice} from "@reduxjs/toolkit";

export interface RightSidebarControl {
  nowPlaying: boolean;
  queue: {
    isOpen: boolean;
    openFromDirection: 'bottom' | 'right';
    currentTab: 'queue' | 'recentlyPlayed';
  }
}

const initState: RightSidebarControl = {
  nowPlaying: false,
  queue: {
    isOpen: true,
    openFromDirection: 'right',
    currentTab: 'queue'
  }
};

const rightSidebarControlSlice = createSlice({
  name: 'rightSidebarControl',
  initialState: initState,
  reducers: {
    setNowPlaying(state, action) {
      state.nowPlaying = action.payload;
    },
    
    setQueueIsOpen(state, action) {
      state.queue.isOpen = action.payload;
      if (state.nowPlaying && action.payload) {
        state.queue.openFromDirection = 'bottom';
      } else if (!state.nowPlaying && action.payload) {
        state.queue.openFromDirection = 'right';
      }
    },
    
    setQueueCurrentTab(state, action) {
      state.queue.currentTab = action.payload;
    }
  }
});

export const {setNowPlaying, setQueueIsOpen, setQueueCurrentTab} = rightSidebarControlSlice.actions;
export default rightSidebarControlSlice.reducer;