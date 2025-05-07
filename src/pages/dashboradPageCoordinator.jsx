import React, { useState } from 'react';

const DashboardCoordinator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const stats = {
    present_children: 38,
    present_monitors: 5,
    absent_children: 2,
    absent_monitors: 1,
  };

  const groups = [
    { groupName: 'Group A', children: 20, present: 18, absent: 2 },
    { groupName: 'Group B', children: 22, present: 20, absent: 2 },
    // Add more group entries as needed
  ];

  const cardStyle =
    'border border-[#165FFD] rounded-lg shadow-md text-center px-4 py-6 sm:px-6';

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Camp Overview
      </h1>

      {/* Date Inputs */}
      <div className="flex gap-4 mb-10">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <div className={cardStyle}>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.present_children}
          </p>
          <h2 className="text-base sm:text-lg font-semibold">Present Children</h2>
        </div>
        <div className={cardStyle}>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.present_monitors}
          </p>
          <h2 className="text-base sm:text-lg font-semibold">Present Monitors</h2>
        </div>
        <div className={cardStyle}>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {stats.absent_children}
          </p>
          <h2 className="text-base sm:text-lg font-semibold">Absent Children</h2>
        </div>
        <div className={cardStyle}>
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {stats.absent_monitors}
          </p>
          <h2 className="text-base sm:text-lg font-semibold">Absent Monitors</h2>
        </div>
      </div>

      {/* Group Table Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Groups</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md text-sm sm:text-base">
            <thead className="bg-[#B9B9B9] text-black">
              <tr>
                <th className="px-4 py-2 border">Group</th>
                <th className="px-4 py-2 border">Children</th>
                <th className="px-4 py-2 border">Present</th>
                <th className="px-4 py-2 border">Absent</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{group.groupName}</td>
                  <td className="px-4 py-2 border">{group.children}</td>
                  <td className="px-4 py-2 border text-green-600 font-semibold">
                    {group.present}
                  </td>
                  <td className="px-4 py-2 border text-red-600 font-semibold">
                    {group.absent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoordinator;
