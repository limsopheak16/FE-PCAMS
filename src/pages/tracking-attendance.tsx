"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, Calendar } from "lucide-react"
import Sidebar from "../components/sidebar"

// Types
interface Student {
  id: string
  khmerName: string
  englishName: string
  age: number
  status: "Present" | "Late" | "Absent"
}

const statusOptions: Student["status"][] = ["Present", "Late", "Absent"]

// Status Dropdown Component
interface StatusCellProps {
  status: Student["status"]
  onChange: (status: Student["status"]) => void
}

const StatusCell: React.FC<StatusCellProps> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "Present":
        return "text-green-500"
      case "Late":
        return "text-blue-500"
      case "Absent":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="relative inline-block">
      <button
        className={`font-medium ${getStatusColor(status)} focus:outline-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-32 bg-white border rounded-md shadow-lg">
          {statusOptions.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${getStatusColor(option)}`}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Date Range Picker
interface DateRangePickerProps {
  initialDateRange?: string
  onDateRangeChange?: (range: string) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  initialDateRange = "05 May, 2025 — 06 May, 2025",
  onDateRangeChange,
}) => {
  const [dateRange, setDateRange] = useState(initialDateRange)
  const [isOpen, setIsOpen] = useState(false)

  const ranges = [
    "05 May, 2025 — 06 May, 2025",
    "07 May, 2025 — 08 May, 2025",
    "09 May, 2025 — 10 May, 2025",
  ]

  const handleSelect = (range: string) => {
    setDateRange(range)
    onDateRangeChange?.(range)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border bg-white px-4 py-2 rounded-md text-gray-700 shadow-sm"
      >
        <Calendar size={20} />
        <span>{dateRange}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white border rounded-md shadow z-20">
          {ranges.map((range) => (
            <div
              key={range}
              onClick={() => handleSelect(range)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {range}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Main Component
const TrackingAttendancePage: React.FC = () => {
  const navigate = useNavigate()

  const [students, setStudents] = useState<Student[]>([
    { id: "21775-1", khmerName: "លីម សុភ័ក្ត្រ", englishName: "Sopheak Lim", age: 19, status: "Present" },
    { id: "21775-2", khmerName: "អេង សុម៉ាលា", englishName: "Somala Eng", age: 18, status: "Late" },
    { id: "21775-3", khmerName: "សាន នីតា", englishName: "Nita San", age: 17, status: "Absent" },
    { id: "21775-4", khmerName: "ចាន់ សុវណ្ណា", englishName: "Sovanna Chan", age: 20, status: "Present" },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("05 May, 2025 — 06 May, 2025")

  const handleStatusChange = (index: number, newStatus: Student["status"]) => {
    const updated = [...students]
    updated[index].status = newStatus
    setStudents(updated)
  }

  const handleCreateNewChild = () => {
    navigate("/addchild")
  }

  const filteredStudents = students.filter((student) =>
    student.khmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.includes(searchQuery)
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tracking Attendance</h1>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleCreateNewChild}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                <span>Create New Child</span>
              </button>

              <DateRangePicker initialDateRange={dateRange} onDateRangeChange={setDateRange} />
            </div>

            {/* Search */}
            <div className="w-full md:w-auto">
              <label htmlFor="search" className="mb-1 font-medium block text-gray-700">
                Find Children
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Khmer Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">English Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50">
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
                    <td colSpan={5} className="text-center text-gray-500 py-6">
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
  )
}

export default TrackingAttendancePage
