import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/libs/redux/features/auth/authSlice";
import notificationReducer from "@/libs/redux/features/notification/notificationSlice";
import subscriptionReducer from "@/libs/redux/features/subscription/subscriptionSlice";
import rightSidebarControlReducer from "@/libs/redux/features/right_sidebar_control/rightSidebarControlSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    subscription: subscriptionReducer,
    rightSidebarControl: rightSidebarControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
