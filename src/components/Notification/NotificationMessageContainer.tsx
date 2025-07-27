"use client";

import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {AuthState} from "@/models/auth/AuthState";
import {useEffect} from "react";
import {NotificationMessage} from "@/models/notification/NotificationMessage";
import {removeNotification} from "@/libs/redux/features/notification/notificationAction";
import NotificationMessageItem from "@/components/Notification/NotificationMessageItem";

const NotificationMessageContainer = () => {
  // dispatch dùng để gửi actions đến store
  const dispatch = useAppDispatch();
  // useAppSelector dùng để lấy ra state tương ứng trong store
  const notifications: NotificationMessage[] = useAppSelector(state => state.notification.notifications);
  const authState: AuthState = useAppSelector(state => state.auth);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (notifications.length > 0) {
      notifications.forEach(notification => {
        if (notification.duration) {
          const timer = setTimeout(() => {
            dispatch(removeNotification(notification.id));
          }, notification.duration);
          timers.push(timer);
        }
      });
    }

    // Hàm cleanup: được gọi khi component unmount hoặc khi dependencies thay đổi
    return () => {
      timers.forEach(timer => clearTimeout(timer)); // Xóa tất cả các timers với forEach để tránh rò rỉ bộ nhớ
    };
  }, [notifications, dispatch]);

  return (
    <div
      className={`fixed ${authState.token && authState.principal ? "top-30" : "top-4"} right-4 z-9999 flex flex-col gap-2 w-80`}>
      {notifications.map(notification => (
        <NotificationMessageItem
          key={notification.id}
          notification={notification}
          onClose={() => dispatch(removeNotification(notification.id))}
        />
      ))}
    </div>
  );
};

export default NotificationMessageContainer;
