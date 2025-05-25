"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import Sidebar from "../components/sidebar";
import { fetchAttendanceData } from "../api/attendancedate";
import { getUsers } from "../api/getUser";
import { toast } from "react-toastify";
import { updateAttendanceStatus } from "../api/updateAttendanceStatus";

interface Attendance {
  id: string;
  fullname: string;
  gender: string;
  age: number;
  status: "Present" | "Absent";
  family_id?: string;
  username: string;
}

interface User {
  id: string;
  username: string;
}

interface StatusCellProps {
  status: Attendance["status"];
  onChange: (status: Attendance["status"]) => void;
}

const StatusCell: React.FC<StatusCellProps> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions: Attendance["status"][] = ["Present", "Absent"];

  const getStatusColor = (status: Attendance["status"]) => {
    switch (status) {
      case "Present":
        return "text-green-600 bg-green-100";
      case "Absent":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={`font-medium px-3 py-2 rounded-md ${getStatusColor(status)} focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] text-sm`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
          {statusOptions.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${getStatusColor(option).split(" ")[0]}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TrackingAttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [staffList, setStaffList] = useState<User[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getUsers();
        if (Array.isArray(data)) {
          setStaffList(data);
        } else {
          toast.error("Invalid staff data format received.");
        }
      } catch (error: any) {
        toast.error("Error fetching staff data: " + error.message);
      }
    };

    fetchStaff();
  }, []);

  const getAttendanceData = useCallback(async () => {
    if (!selectedDate || !selectedOrganizer) return;

    setLoading(true);
    try {
      const data = await fetchAttendanceData({
        selectedDate,
        userId: selectedOrganizer,
      });

      if (Array.isArray(data)) {
        setAttendanceRecords(data);
      } else {
        toast.error("Invalid attendance data format received.");
      }
    } catch (error) {
      toast.error("Error fetching attendance data.");
    } finally {
      setLoading(false);
    }
  }, [selectedDate, selectedOrganizer]);

  useEffect(() => {
    getAttendanceData();
  }, [getAttendanceData]);

  const handleStatusChange = async (id: string, newStatus: Attendance["status"]) => {
    try {
      const updatedRecord = await updateAttendanceStatus({ attendanceId: id, status: newStatus });
      // updatedRecord should contain the latest status from backend
      setAttendanceRecords((prev) =>
        prev.map((record) =>
          record.id === id ? { ...record, status: updatedRecord.status } : record
        )
      );
      console.log(updatedRecord.status,"----------------------------------")
      toast.success("Attendance status updated successfully.");
    } catch (error: any) {
      toast.error("Failed to update attendance status.");
    }
  };
  

  const handleDateChange = (date: string) => {
    const currentDate = new Date();
    const selected = new Date(date);
    if (selected > currentDate) {
      setDateError("Selected date cannot be in the future");
    } else {
      setSelectedDate(date);
      setDateError("");
    }
  };

  const filteredAttendanceRecords = attendanceRecords.filter(
    (record) =>
      record.id.includes(searchQuery) ||
      record.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.family_id && record.family_id.includes(searchQuery))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[272px]">
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <button
            onClick={() => navigate("/addchild")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-sm md:text-base"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Child</span>
          </button>
        </header>

        <main className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="md:hidden mb-4">
              <button
                onClick={() => navigate("/addchild")}
                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] text-white px-4 py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-base"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add New Child</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-40">
                <label htmlFor="selected-date" className="block text-sm font-semibold text-gray-700 mb-1">
                  Date
                </label>
                <input
                  id="selected-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  max={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                />
                {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
              </div>

              <div className="w-full md:w-64">
                <label htmlFor="organizer-select" className="block text-sm font-semibold text-gray-700 mb-1">
                  Organizer
                </label>
                <select
                  id="organizer-select"
                  value={selectedOrganizer}
                  onChange={(e) => setSelectedOrganizer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                >
                  <option value="">Select Organizer</option>
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full md:w-64">
                <label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-1">
                  Search
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="ID, Family ID, or Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                />
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Family ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8 text-sm">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredAttendanceRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8 text-sm">
                        No attendance records found.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendanceRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{record.fullname}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.username}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.family_id || "-"}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.gender}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.age}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <StatusCell
                            status={record.status}
                            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackingAttendancePage;
