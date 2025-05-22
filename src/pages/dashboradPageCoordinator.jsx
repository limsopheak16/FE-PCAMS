import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/sidebar";
import { fetchAttendanceData } from "../api/getforcoordinator";
// import { getChildrenPresent } from "../api/getChildPresent";
// import { getChildrenAbsent } from "../api/getChildAbsent";
// import { getGroup } from "../api/getgroup";

const DashboardCoordinator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [pending, setPending] = useState(false);


  const validateDates = (start, end) => {
    return new Date(start) <= new Date(end);
  };

  // Initialize default dates
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  }, []);

  // Fetch attendance data when dates change
  useEffect(() => {
    const valid = validateDates(startDate, endDate);

    if (startDate && endDate && valid) {
      const fetchData = async () => {
        try {
          const data = await fetchAttendanceData({
            startDate,
            endDate,
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
    }
  }, [startDate, endDate]);
  


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
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {attendance.totalChildren}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Total Children</h2>
              </div>
              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {attendance.presentChildren}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Present Children</h2>
              </div>

              <div className={cardStyle}>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                {attendance.absentChildren}
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Absent Children</h2>
              </div>

            </div>

            {/* Group Table */}
            {/* <div>
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
                    {group.length > 0 ? (
                      group.map((group) => (
                        <tr
                          key={group.camp_id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 border-b border-gray-200">{group.camp_name}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{group.total_children}</td>
                          <td className="px-6 py-4 border-b border-gray-200 text-green-600 font-semibold">
                            {group.present_count}
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200 text-red-600 font-semibold">
                            {group.absent_count}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> */}
            {/* </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardCoordinator;