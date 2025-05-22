"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import Sidebar from "../components/sidebar";

// Types
interface Student {
  id: string;
  englishName: string;
  age: number;
  status: "Present" | "Late" | "Absent";
  familyId?: string;
}

interface Organizer {
  id: string;
  name: string;
}

// Status Dropdown Component
interface StatusCellProps {
  status: Student["status"];
  onChange: (status: Student["status"]) => void;
}

const StatusCell: React.FC<StatusCellProps> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions: Student["status"][] = ["Present",  "Absent"];

  const getStatusColor = (status: Student["status"]) => {
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
        className={`font-medium px-3 py-1.5 rounded-full ${getStatusColor(status)} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm`}
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

// Main Component
const TrackingAttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [students, setStudents] = useState<Student[]>([
    { id: "21775-1", englishName: "Sopheak Lim", age: 19, status: "Present", familyId: "F001" },
    { id: "21775-2", englishName: "Somala Eng", age: 18, status: "Absent", familyId: "F002" },
    { id: "21775-3", englishName: "Nita San", age: 17, status: "Absent", familyId: "F003" },
    { id: "21775-4", englishName: "Sovanna Chan", age: 20, status: "Present", familyId: "F004" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedOrganizer, setSelectedOrganizer] = useState("");
  const [dateError, setDateError] = useState("");

  const organizers: Organizer[] = [
    { id: "org1", name: "John Doe" },
    { id: "org2", name: "Jane Smith" },
    { id: "org3", name: "Sokha Vong" },
  ];

  const handleStatusChange = (id: string, newStatus: Student["status"]) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
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

  const filteredStudents = students.filter(
    (student) =>
      student.id.includes(searchQuery) ||
      student.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.familyId && student.familyId.includes(searchQuery))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[250px]">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Attendance Tracking</h1>
          <button
            onClick={() => navigate("/addchild")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-sm md:text-base"
            aria-label="Create new child"
          >
            <Plus size={20} />
            <span>Add New Child</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Create Button (Mobile) */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => navigate("/addchild")}
                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] text-white px-4 py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-base"
                aria-label="Create new child"
              >
                <Plus size={22} />
                <span>Add New Child</span>
              </button>
            </div>
 {/* Controls (Moved to Bottom/End) */}
 <div className="flex flex-col md:flex-row gap-4 md:justify-end">
              {/* Date Selection */}
              <div className="w-full md:w-40">
                <label
                  htmlFor="selected-date"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  id="selected-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  max={today}
                  className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                />
                {dateError && (
                  <p className="text-red-500 text-xs mt-1">{dateError}</p>
                )}
              </div>

              {/* Organizer Dropdown */}
              <div className="w-full md:w-64 mb-5">
                <label
                  htmlFor="organizer-select"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Organizer
                </label>
                <select
                  id="organizer-select"
                  value={selectedOrganizer}
                  onChange={(e) => setSelectedOrganizer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] text-sm"
                >
                  <option value="">Select Organizer</option>
                  {organizers.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-64 mb-5">
                <label
                  htmlFor="search-input"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Search
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="ID, Family ID, or Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] text-sm"
                />
<Search className="absolute left-3 top-1/2 transform  text-gray-400" size={18} />
</div>
            </div>
            {/* Student Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{student.englishName}</h3>
                      <p className="text-xs md:text-sm text-gray-500">ID: {student.id}</p>
                      {student.familyId && (
                        <p className="text-xs md:text-sm text-gray-500">Family ID: {student.familyId}</p>
                      )}
                      <p className="text-xs md:text-sm text-gray-500">Age: {student.age}</p>
                    </div>
                    <StatusCell
                      status={student.status}
                      onChange={(newStatus) => handleStatusChange(student.id, newStatus)}
                    />
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-8 text-sm md:text-base">
                  No students found.
                </div>
              )}
            </div>

           
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackingAttendancePage;