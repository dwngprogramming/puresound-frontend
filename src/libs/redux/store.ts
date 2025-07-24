import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/libs/redux/features/auth/authSlice";
import notificationReducer from "@/libs/redux/features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
