import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/sidebar";

const DashboardCoordinator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!startDate) setStartDate(today);
    if (!endDate || endDate < startDate) setEndDate(today);
  }, [startDate, endDate]);

  const stats = {
    present_children: 38,
    present_monitors: 5,
    absent_children: 2,
    absent_monitors: 1,
  };

  const groups = [
    { groupName: "Group A", children: 20, present: 18, absent: 2 },
    { groupName: "Group B", children: 22, present: 20, absent: 2 },
  ];

  const cardStyle =
    "border border-gray-200 rounded-lg shadow-md p-4 sm:p-6 text-center bg-white hover:shadow-lg transition-shadow duration-300";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Date Inputs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full sm:w-48 bg-white text-gray-700 font-medium rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                  aria-label="Start date"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full sm:w-48 bg-white text-gray-700 font-medium rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                  aria-label="End date"
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {stats.present_children}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Present Children</h2>
              </div>
              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {stats.present_monitors}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Present Monitors</h2>
              </div>
              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {stats.absent_children}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Absent Children</h2>
              </div>
              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {stats.absent_monitors}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Absent Monitors</h2>
              </div>
            </div>

            {/* Group Table */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Groups</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Group</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Children</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Present</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 border-b border-gray-200">{group.groupName}</td>
                        <td className="px-6 py-4 border-b border-gray-200">{group.children}</td>
                        <td className="px-6 py-4 border-b border-gray-200 text-green-600 font-semibold">
                          {group.present}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 text-red-600 font-semibold">
                          {group.absent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardCoordinator;