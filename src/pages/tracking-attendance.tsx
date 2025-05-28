"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import Sidebar from "../components/sidebar";
import { fetchAttendanceData } from "../api/attendancedate";
import { getUsers } from "../api/getUser";
import { toast } from "react-toastify";
import { updateAttendanceStatus } from "../api/updateAttendanceStatus";
import { createChildAttendanceChecklist } from "../api/createCheckList";
import { getChild } from "../api/getchild";

interface Attendance {
  id: string;
  fullname: string;
  gender: string;
  age: number;
  status: "Present" | "Absent" | null;
  family_id?: string;
  username: string;
  attendance_date: string;
}

interface User {
  id: string;
  fullname: string;
  gender: string;
  age: number;
  status: "Present" | "Absent" | null;
  family_id?: string;
  username: string;
  attendance_date: string;
}

interface StatusCellProps {
  status: Attendance["status"];
  onChange: (status: Attendance["status"]) => void;
}

const formatDateToCambodia = (isoString: string): string => {
  const date = new Date(isoString);
  const options = { timeZone: "Asia/Phnom_Penh", year: "numeric", month: "2-digit", day: "2-digit" } as const;
  const formatter = new Intl.DateTimeFormat("en-CA", options);
  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")!.value;
  const month = parts.find((p) => p.type === "month")!.value;
  const day = parts.find((p) => p.type === "day")!.value;
  return `${year}-${month}-${day}`;
};

const StatusCell: React.FC<StatusCellProps> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions: Attendance["status"][] = ["Present", "Absent"];

  const getStatusColor = (status: Attendance["status"]) => {
    switch (status) {
      case "Present":
        return "text-green-700 bg-green-100 hover:bg-green-200";
      case "Absent":
        return "text-red-700 bg-red-100 hover:bg-red-200";
      default:
        return "text-gray-700 bg-gray-100 hover:bg-gray-200";
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`font-medium px-4 py-2 rounded-lg ${getStatusColor(status)} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status || "Pending"}
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl">
          {statusOptions.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer ${getStatusColor(option)} transition-colors`}
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

  const [activeTab, setActiveTab] = useState<"check" | "create">("check");
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [staffList, setStaffList] = useState<User[]>([]);
  const [childs, setChild] = useState<User[]>([]);

  // Fetch staff list on component mount
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
        toast.error(`Error fetching staff data: ${error.message}`);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const data = await getChild();
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        if (Array.isArray(data)) {
          const filteredData = data
            .filter((child) => {
              const attendanceDate = child.attendance_date ? new Date(child.attendance_date).toISOString().split('T')[0] : today;
              return attendanceDate === today;
            })
            .map((child) => ({
              ...child,
              attendance_date: formatDateToCambodia(child.attendance_date || today),
            }));
          setChild(filteredData);
        } else {
          toast.error("Invalid child data format received.");
        }
      } catch (error) {
        toast.error(`Error fetching child data: ${error.message}`);
      }
    };
  
    fetchChild();
  }, []);

  // Fetch attendance data
  const getAttendanceData = useCallback(async (date: string, userId: string) => {
    if (!date || !userId) {
      toast.error("Please select both a date and an organizer.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchAttendanceData({ selectedDate: date, userId });
      if (Array.isArray(data)) {
        const formattedData = data.map((record) => ({
          ...record,
          attendance_date: formatDateToCambodia(record.attendance_date),
        }));
        setAttendanceRecords(formattedData);
      } else {
        toast.error("Invalid attendance data format received.");
      }
    } catch (error: any) {
      toast.error(`Error fetching attendance data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: Attendance["status"]) => {
    try {
      const updatedRecord = await updateAttendanceStatus({ attendanceId: id, status: newStatus });
      setAttendanceRecords((prev) =>
        prev.map((record) =>
          record.id === id ? { ...record, status: updatedRecord.status } : record
        )
      );
      setChild((prev) =>
        prev.map((child) =>
          child.id === id ? { ...child, status: updatedRecord.status } : child
        )
      );
      toast.success("Attendance status updated successfully.");
    } catch (error: any) {
      toast.error(`Failed to update attendance status: ${error.message}`);
    }
  };

  // Handle date change with validation
  const handleDateChange = (date: string) => {
    const currentDate = new Date();
    const selected = new Date(date);
    if (selected > currentDate) {
      setDateError("Selected date cannot be in the future");
      setSelectedDate(today);
    } else {
      setSelectedDate(date);
      setDateError("");
    }
  };

  // Handle view list
  const handleViewList = async () => {
    await getAttendanceData(selectedDate, selectedOrganizer);
  };

  // Handle create checklist and refresh child data
  const handleGenerateChecklist = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedOrganizer) {
      toast.error("Please select both a date and an organizer.");
      return;
    }

    try {
      const result = await createChildAttendanceChecklist({
        attendance_date: selectedDate,
        organizer_id: selectedOrganizer,
      });
      if (result.length === 0) {
        toast.warn("No new attendance records were created. Check if data exists for the selected date and organizer.");
      } else {
        toast.success("Checklist created successfully with null status for new children.");
      }

      const childData = await getChild();

      if (Array.isArray(childData)) {
        // Filter children with attendance status null
        const filteredChildren = childData.filter(child => child.status === null);
      
        // Map to format the attendance_date
        const formattedChildren = filteredChildren.map(child => ({
          ...child,
          attendance_date: formatDateToCambodia(child.attendance_date || selectedDate),
        }));
      
        setChild(formattedChildren);
      } else {
        toast.error("Invalid child data format received.");
      }
      
      // Switch to check tab and fetch new attendance data
      setActiveTab("check");
      await getAttendanceData(selectedDate, selectedOrganizer);
    } catch (error: any) {
      toast.error(`Error creating checklist: ${error.response?.data?.error || error.message}`);
    }
  };

  // Filter attendance records based on search query
  const filteredAttendanceRecords = attendanceRecords.filter(
    (record) =>
      record.id.includes(searchQuery) ||
      record.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.family_id && record.family_id.includes(searchQuery))
  );

  // Filter child records based on search query
  const filteredChildRecords = childs.filter(
    (child) =>
      child.id.includes(searchQuery) ||
      child.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (child.family_id && child.family_id.includes(searchQuery))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[272px]">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-lg sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
          <button
            onClick={() => navigate("/addchild")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-sm"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Child</span>
          </button>
        </header>

        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-6 py-3 text-sm font-semibold ${
                  activeTab === "check"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("check")}
              >
                Check Attendance
              </button>
              <button
                className={`px-6 py-3 text-sm font-semibold ${
                  activeTab === "create"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("create")}
              >
                Create Checklist
              </button>
            </div>

            {activeTab === "check" ? (
              <div className="space-y-6">
                {/* Search Input */}
                <div className="relative w-full md:w-64">
                  <label
                    htmlFor="search-input"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search by ID, Family ID, or Name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm hover:border-gray-400 transition"
                    />
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-500 py-8 text-sm">Loading...</div>
                  ) : filteredAttendanceRecords.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 text-sm">No attendance records found.</div>
                  ) : (
                    filteredAttendanceRecords.map((record) => (
                      <div
                        key={record.id}
                        className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{record.fullname}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Created By:</span> {record.username}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Family ID:</span> {record.family_id || "-"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Gender:</span> {record.gender}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Age:</span> {record.age}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Attendance Date:</span>{" "}
                          {record.attendance_date}
                        </p>
                        <div className="mt-4">
                          <StatusCell
                            status={record.status}
                            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Family ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gender</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Attendance Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="text-center text-gray-500 py-8 text-sm">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredAttendanceRecords.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center text-gray-500 py-8 text-sm">
                            No attendance records found.
                          </td>
                        </tr>
                      ) :
                      (
                        filteredChildRecords.map((child) => (
                          <tr key={child.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">{child.fullname}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{child.username}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{child.family_id || "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{child.gender}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{child.age}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{child.attendance_date}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <StatusCell
                                status={child.status}
                                onChange={(newStatus) => handleStatusChange(child.id, newStatus)}
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Attendance Checklist</h2>
                <form onSubmit={handleGenerateChecklist} className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
                  <div className="w-full md:w-40">
                    <label htmlFor="create-date" className="block text-sm font-semibold text-gray-800 mb-2">
                      Date
                    </label>
                    <input
                      id="create-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      max={today}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm hover:border-gray-400 transition"
                    />
                    {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
                  </div>

                  <div className="w-full md:w-64">
                    <label htmlFor="create-organizer" className="block text-sm font-semibold text-gray-800 mb-2">
                      Organizer
                    </label>
                    <select
                      id="create-organizer"
                      value={selectedOrganizer}
                      onChange={(e) => setSelectedOrganizer(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm hover:border-gray-400 transition"
                    >
                      <option value="">Select Organizer</option>
                      {staffList.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.username}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={handleViewList}
                      className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-2xl text-sm font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition-all"
                    >
                      View List
                    </button>
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
                    >
                      Generate Checklist
                    </button>
                  </div>
                </form>

                {/* Mobile Card Layout for Create Checklist */}
                <div className="md:hidden space-y-4">
                  {loading ? (
                    <div className="text-center text-gray-500 py-8 text-sm">Loading...</div>
                  ) : filteredChildRecords.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 text-sm">No child records found.</div>
                  ) : (
                    filteredChildRecords.map((child) => (
                      <div
                        key={child.id}
                        className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">{child.fullname}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Created By:</span> {child.username}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Family ID:</span> {child.family_id || "-"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Gender:</span> {child.gender}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Age:</span> {child.age}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Attendance Date:</span>{" "}
                          {child.attendance_date}
                        </p>
                        <div className="mt-4">
                          <StatusCell
                            status={child.status}
                            onChange={(newStatus) => handleStatusChange(child.id, newStatus)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Desktop Table Layout for Create Checklist */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created By</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Family ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Gender</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Attendance Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="text-center text-gray-500 py-8 text-sm">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredChildRecords.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center text-gray-500 py-8 text-sm">
                            No child records found.
                          </td>
                        </tr>
                      ) :  (
                        filteredAttendanceRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">{record.fullname}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.username}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.family_id || "-"}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.gender}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.age}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{record.attendance_date}</td>
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
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackingAttendancePage;