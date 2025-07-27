import {removeNotificationMessage, showNotificationMessage} from "@/libs/redux/features/notification/notificationSlice";

export const showSuccessNotification = (message: string, duration = 5000) => {
  return showNotificationMessage({ type: "success", message, duration });
};

export const showErrorNotification = (message: string, duration = 5000) => {
  return showNotificationMessage({ type: "error", message, duration });
};

export const showWarningNotification = (message: string, duration = 5000) => {
  return showNotificationMessage({ type: "warning", message, duration });
};

export const showInfoNotification = (message: string, duration = 5000) => {
  return showNotificationMessage({ type: "info", message, duration });
};

export const removeNotification = (id: string) => {
  return removeNotificationMessage(id);
}
