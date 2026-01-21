import {createSlice} from "@reduxjs/toolkit";

interface LayoutState {
  openLibrary: boolean;
  rightSidebar: {
    openQueue: boolean;
    openNowPlaying: boolean;
  }
}

const initState: LayoutState = {
  openLibrary: true,
  rightSidebar: {
    openQueue: true,
    openNowPlaying: false,
  }
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initState,
  reducers: {
    toggleLibrary(state) {
      state.openLibrary = !state.openLibrary;
    },
    
    toggleQueue(state) {
      state.rightSidebar.openQueue = !state.rightSidebar.openQueue;
    }
  }
});

export const {toggleLibrary, toggleQueue} = layoutSlice.actions;
export default layoutSlice.reducer;