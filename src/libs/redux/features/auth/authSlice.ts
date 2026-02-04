import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "@/models/auth/AuthState";

const initState: AuthState = {
  principal: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false
};

const auth = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    initializeAuth(state: AuthState) {
      state.isInitialized = true;
    },
    
    setCredentials(state: AuthState, action: PayloadAction<{principal: AuthState["principal"], token: string}>) {
      state.principal = action.payload.principal;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    
    deleteCredentials(state: AuthState) {
      state.principal = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
});

export const {initializeAuth, setCredentials, deleteCredentials} = auth.actions;
export default auth.reducer;
