import { NotificationType } from "@/models/notification/NotificationType";

export interface NotificationMessage {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}
