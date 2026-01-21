import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/libs/redux/features/auth/authSlice";
import notificationReducer from "@/libs/redux/features/notification/notificationSlice";
import subscriptionReducer from "@/libs/redux/features/subscription/subscriptionSlice";
import rightSidebarControlReducer from "@/libs/redux/features/right-sidebar-control/rightSidebarControlSlice";
import playerReducer from "@/libs/redux/features/player/playerSlice";
import layoutReducer from "@/libs/redux/features/layout/layoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    subscription: subscriptionReducer,
    rightSidebarControl: rightSidebarControlReducer,
    player: playerReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
