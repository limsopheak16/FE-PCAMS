import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/sidebar";

const StaffTable = () => {
  const navigate = useNavigate();
  const staffList = [
    {
      id: 1,
      khmerName: "សុខ សាន",
      englishName: "Sok San",
      age: 25,
      position: "Developer",
      national: "Cambodian",
    },
    // Add more staff here...
  ];

  const handleRowClick = (id) => {
    // Simulate navigation to a staff details page
    navigate(`/staff/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Staff List</h1>
          <button
            onClick={() => navigate("/adduser")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md"
            aria-label="Create new user"
          >
            <FaPlus size={16} />
            <span>Create User</span>
          </button>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Staff List</h1>
          <button
            onClick={() => navigate("/adduser")}
            className="flex items-center gap-2 text-[#4F7CFF] border border-[#4F7CFF] px-3 py-1 rounded-lg hover:bg-blue-50 transition"
            aria-label="Create new user"
          >
            <FaPlus size={14} />
            <span className="text-sm">Create</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Khmer Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      English Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      date of birth
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      National
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staffList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((staff) => (
                      <tr
                        key={staff.id}
                        onClick={() => handleRowClick(staff.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.khmerName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.englishName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.age}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.position}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.national}</td>
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

export default StaffTable;