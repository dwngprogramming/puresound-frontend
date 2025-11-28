import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/libs/redux/features/auth/authSlice";
import notificationReducer from "@/libs/redux/features/notification/notificationSlice";
import subscriptionReducer from "@/libs/redux/features/subscription/subscriptionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
