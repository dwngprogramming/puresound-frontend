import {NotificationMessage} from "@/models/notification/NotificationMessage";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NotificationState {
  notifications: NotificationMessage[];
}

const initState: NotificationState = {
  notifications: []
};

const notification = createSlice({
  name: 'notification',
  initialState: initState,
  reducers: {
    showNotificationMessage: (state, action: PayloadAction<Omit<NotificationMessage, 'id'>>) => {
      const notificationMessage = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),   // Make random id base on 0-9 and a-z
      }
      state.notifications.push(notificationMessage)
    },
    removeNotificationMessage: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
    },
  }
});

export const { showNotificationMessage, removeNotificationMessage } = notification.actions;
export default notification.reducer;
