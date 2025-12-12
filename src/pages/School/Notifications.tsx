import React, { useState } from "react";
import { FiBell, FiCheck, FiTrash2 } from "react-icons/fi";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Student Registration",
      message: "5 new students have been registered today",
      time: "2 hours ago",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "Critical Case Alert",
      message: "2 students require immediate attention",
      time: "3 hours ago",
      read: false,
      type: "warning",
    },
    {
      id: 3,
      title: "Attendance Update",
      message: "Daily attendance marked for all classes",
      time: "4 hours ago",
      read: true,
      type: "success",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border-l-4 ${
                !notification.read ? "bg-gray-50 border-[#1ecab8]" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FiBell className="text-[#1ecab8]" />
                    <h3 className={`font-medium ${!notification.read ? "font-bold" : ""} text-gray-900`}>
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                <div className="flex gap-2">
                  {!notification.read && (
                    <button className="p-2 text-[#1ecab8] hover:bg-[#1ecab8] hover:bg-opacity-10 rounded-lg">
                      <FiCheck size={16} />
                    </button>
                  )}
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;



