import React from "react";
import SidebarMenu from "../components/sidebar";
import { Bell } from "lucide-react";

const notifications = [
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
  {
    title: "Tracking attendance",
    message: "You have to track attendance of children every morning before 8 o’clock.",
    time: "5 minutes ago",
  },
];

const Notification = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Notification</h1>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-12 bg-gray-100 px-4 sm:px-6 py-3 text-gray-600 text-sm font-semibold">
            <div className="col-span-10">Notification</div>
            <div className="col-span-2 text-right">Time</div>
          </div>

          {/* Notification Items */}
          {notifications.map((noti, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-4 sm:px-6 py-4 items-start border-b hover:bg-blue-50 transition-all"
            >
              <div className="sm:col-span-10 flex items-start gap-3">
                <Bell size={22} className="text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800">{noti.title}</h3>
                  <p className="text-gray-600 text-sm">{noti.message}</p>
                </div>
              </div>

              <div className="sm:col-span-2 text-sm sm:text-right text-gray-500 pt-1">
                {noti.time}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notification;
