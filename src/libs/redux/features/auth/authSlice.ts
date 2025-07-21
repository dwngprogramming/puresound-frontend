import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "@/models/auth/AuthState";

const initState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setCredentials(state: AuthState, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    deleteCredentials(state: AuthState) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const {setCredentials, deleteCredentials} = auth.actions;
export default auth.reducer;
