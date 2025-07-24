"use client";
// Component hiển thị từng thông báo
import React from "react";
import {NotificationMessage} from "@/models/notification/NotificationMessage";

interface NotificationItemProps {
  notification: NotificationMessage;
  onClose: () => void;
}

const NotificationMessageItem = ({notification, onClose}: NotificationItemProps) => {
  const {type, message}: NotificationMessage = notification;

  // Xác định màu sắc và icon dựa trên loại thông báo
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-100 border-green-500',
          textColor: 'text-green-700',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"/>
            </svg>
          )
        };
      case 'error':
        return {
          bgColor: 'bg-red-100 border-red-500',
          textColor: 'text-red',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"/>
            </svg>
          )
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-100 border-yellow-500',
          textColor: 'text-yellow-700',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"/>
            </svg>
          )
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-100 border-blue-500',
          textColor: 'text-blue-700',
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                    clipRule="evenodd"/>
            </svg>
          )
        };
    }
  };

  const {bgColor, textColor, icon} = getTypeStyles();

  return (
    <div
      className={`${bgColor} border-l-4 p-4 rounded shadow-md flex items-start justify-between animate-slide-in ${textColor}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-2">
          {icon}
        </div>
        <div className="ml-2">
          <p className="font-medium">{message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  );
};

export default NotificationMessageItem;
