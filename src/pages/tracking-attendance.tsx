"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Calendar } from "lucide-react";
import Sidebar from "../components/sidebar";

// Types
interface Student {
  id: string;
  khmerName: string;
  englishName: string;
  age: number;
  status: "Present" | "Late" | "Absent";
}

const statusOptions: Student["status"][] = ["Present", "Late", "Absent"];

// Status Dropdown Component
interface StatusCellProps {
  status: Student["status"];
  onChange: (status: Student["status"]) => void;
}

const StatusCell: React.FC<StatusCellProps> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "Present":
        return "text-green-600 bg-green-50";
      case "Late":
        return "text-blue-600 bg-blue-50";
      case "Absent":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className={`font-medium px-3 py-1 rounded-full ${getStatusColor(status)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {status}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
          {statusOptions.map((option) => (
            <div
              key={option}
              role="option"
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${getStatusColor(option).split(" ")[0]}`}
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

// Date Range Picker with Start and End Dates
interface DateRangePickerProps {
  initialStartDate?: string;
  initialEndDate?: string;
  onDateRangeChange?: (start: string, end: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialStartDate = "05 May, 2025",
  initialEndDate = "06 May, 2025",
  onDateRangeChange,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    onDateRangeChange?.(newStart, endDate);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    onDateRangeChange?.(startDate, newEnd);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-gray-700 shadow-sm hover:shadow-md transition-shadow"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Calendar size={20} className="text-gray-500" />
        <span className="text-sm">
          {startDate} — {endDate}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="text"
              value={startDate}
              onChange={handleStartChange}
              placeholder="e.g., 05 May, 2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition mb-4"
              aria-label="Start date"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="text"
              value={endDate}
              onChange={handleEndChange}
              placeholder="e.g., 06 May, 2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
              aria-label="End date"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
const TrackingAttendancePage: React.FC = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([
    { id: "21775-1", khmerName: "លីម សុភ័ក្ត្រ", englishName: "Sopheak Lim", age: 19, status: "Present" },
    { id: "21775-2", khmerName: "អេង សុម៉ាលា", englishName: "Somala Eng", age: 18, status: "Late" },
    { id: "21775-3", khmerName: "សាន នីតា", englishName: "Nita San", age: 17, status: "Absent" },
    { id: "21775-4", khmerName: "ចាន់ សុវណ្ណា", englishName: "Sovanna Chan", age: 20, status: "Present" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("05 May, 2025");
  const [endDate, setEndDate] = useState("06 May, 2025");

  const handleStatusChange = (index: number, newStatus: Student["status"]) => {
    const updated = [...students];
    updated[index].status = newStatus;
    setStudents(updated);
  };

  const handleCreateNewChild = () => {
    navigate("/addchild");
  };

  const filteredStudents = students.filter(
    (student) =>
      student.khmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Tracking Attendance</h1>
          <div className="flex items-center gap-4">
            <DateRangePicker
              initialStartDate={startDate}
              initialEndDate={endDate}
              onDateRangeChange={(newStart, newEnd) => {
                setStartDate(newStart);
                setEndDate(newEnd);
              }}
            />
            <button
              onClick={handleCreateNewChild}
              className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md"
              aria-label="Create new child"
            >
              <Plus size={20} />
              <span>Create New Child</span>
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Tracking Attendance</h1>
          <button
            onClick={handleCreateNewChild}
            className="flex items-center gap-2 text-[#4F7CFF] border border-[#4F7CFF] px-3 py-1 rounded-lg hover:bg-blue-50 transition"
            aria-label="Create new child"
          >
            <Plus size={18} />
            <span className="text-sm">Create</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Controls */}
            <div className="md:hidden flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-4">
                <DateRangePicker
                  initialStartDate={startDate}
                  initialEndDate={endDate}
                  onDateRangeChange={(newStart, newEnd) => {
                    setStartDate(newStart);
                    setEndDate(newEnd);
                  }}
                />
              </div>
              <div className="relative">
                <input
                  id="search-mobile"
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center justify-between mb-6 gap-4">
              <div className="relative w-full max-w-xs">
                <input
                  id="search-desktop"
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Khmer Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">English Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.khmerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.englishName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.age}</td>
                      <td className="px-6 py-4">
                        <StatusCell
                          status={student.status}
                          onChange={(newStatus) => handleStatusChange(index, newStatus)}
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8">
                        No students found.
                      </td>
                    </tr>
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