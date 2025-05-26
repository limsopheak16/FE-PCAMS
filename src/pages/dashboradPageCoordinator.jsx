import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/sidebar";
import { fetchAttendanceData } from "../api/getforcoordinator";

const DashboardCoordinator = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [pending, setPending] = useState(false);

  // Initialize default date (today)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // Fetch attendance data when selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      try {
        const data = await fetchAttendanceData({
          Date: selectedDate,
          setPending,
        });

        if (data) {
          setAttendance(data);
          console.log("Fetched attendance:", data);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SidebarMenu />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 lg:ml-72">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">Camp Overview</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Camp Overview</h1>
        </header>

        {/* Main Content */}
        <main className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Single Date Input */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="w-full sm:w-auto">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-64 bg-white text-gray-700 font-medium rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  aria-label="Select date for attendance"
                  max={today}
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[160px] flex flex-col justify-center">
                <p className="text-4xl font-bold text-indigo-600">
                  {attendance.totalChildren || 0}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mt-3">
                  Total Children
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[160px] flex flex-col justify-center">
                <p className="text-3xl font-bold text-green-600">
                  {attendance.presentChildren || 0}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  Present Children
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[160px] flex flex-col justify-center">
                <p className="text-3xl font-bold text-red-600">
                  {attendance.absentChildren || 0}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  Absent Children
                </h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardCoordinator;