import React, { useState } from "react";
import { Bell } from "lucide-react";
import SidebarMenu from "../components/sidebar";

const initialNotifications = [
  {
    id: 1,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T13:50:00+07:00", // 5 minutes ago from 01:55 PM
    read: false,
  },
  {
    id: 2,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T13:50:00+07:00",
    read: false,
  },
  {
    id: 3,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T13:45:00+07:00", // 10 minutes ago
    read: false,
  },
  {
    id: 4,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T13:40:00+07:00", // 15 minutes ago
    read: false,
  },
  {
    id: 5,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T13:30:00+07:00", // 25 minutes ago
    read: false,
  },
  {
    id: 6,
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    timestamp: "2025-05-16T12:55:00+07:00", // 1 hour ago
    read: false,
  },
];

const Notification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date("2025-05-16T13:55:00+07:00"); // Current time: 01:55 PM +07
    const notiDate = new Date(timestamp);
    const diffInMs = now - notiDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((noti) => (noti.id === id ? { ...noti, read: true } : noti))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[#4F7CFF] hover:underline font-medium"
              aria-label="Clear all notifications"
            >
              Clear All
            </button>
          )}
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[#4F7CFF] hover:underline text-sm"
              aria-label="Clear all notifications"
            >
              Clear All
            </button>
          )}
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto ">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
              {/* Header Row */}
              <div className="hidden sm:grid grid-cols-12 bg-gray-100 px-4 sm:px-6 py-3 text-gray-600 text-sm font-semibold">
                <div className="col-span-9 sm:col-span-10">Notification</div>
                <div className="col-span-3 sm:col-span-2 text-right">Time</div>
              </div>

              {/* Notification Items */}
              {notifications.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No notifications available.
                </div>
              ) : (
                notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className={`grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 items-start border-b border-gray-200 transition-all ${
                      noti.read ? "bg-gray-50" : "bg-white hover:bg-blue-50"
                    }`}
                    role="article"
                    aria-label={`Notification: ${noti.title}`}
                  >
                    <div className="col-span-9 sm:col-span-10 flex items-start gap-3">
                      <Bell
                        size={22}
                        className={`mt-1 shrink-0 ${
                          noti.read ? "text-gray-400" : "text-blue-500"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3
                            className={`font-semibold ${
                              noti.read ? "text-gray-600" : "text-blue-800"
                            }`}
                          >
                            {noti.title}
                          </h3>
                          {!noti.read && (
                            <button
                              onClick={() => handleMarkAsRead(noti.id)}
                              className="text-[#4F7CFF] hover:underline text-sm"
                              aria-label={`Mark ${noti.title} as read`}
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                        <p
                          className={`text-sm ${
                            noti.read ? "text-gray-500" : "text-gray-600"
                          }`}
                        >
                          {noti.message}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`col-span-3 sm:col-span-2 text-sm text-right pt-1 ${
                        noti.read ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {calculateTimeAgo(noti.timestamp)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notification;