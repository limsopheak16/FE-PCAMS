import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarMenu from "../components/sidebar";
import { getUsers } from "../api/getUser";

const StaffTable = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      const data = await getUsers();
      if (data) {
        setStaffList(data);
      } else {
        toast.error("Failed to fetch staff data.");
      }
      setLoading(false);
    };

    fetchStaff();
  }, []);

  const handleRowClick = (originalId) => {
    navigate(`/staff/${originalId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[250px]">
        {/* Unified Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-5 md:py-3">
          <h1 className="text-lg font-bold text-gray-900 md:text-xl">Staff List</h1>
          <button
            onClick={() => navigate("/adduser")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-sm md:text-base md:px-5 md:py-2.5"
            aria-label="Create a new user"
          >
            <FaPlus size={20} />
            <span>Create User</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Create User Button (Mobile) */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => navigate("/adduser")}
                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] text-white px-4 py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-base"
                aria-label="Create a new user"
              >
                <FaPlus size={22} />
                <span>Create User</span>
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nationality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        Loading...
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((staff) => (
                      <tr
                        key={staff.originalId}
                        onClick={() => handleRowClick(staff.originalId)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.username}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.nationality}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {loading ? (
                <div className="text-center text-gray-500 py-8 text-sm">Loading...</div>
              ) : staffList.length === 0 ? (
                <div className="text-center text-gray-500 py-8 text-sm">No staff found.</div>
              ) : (
                staffList.map((staff) => (
                  <div
                    key={staff.originalId}
                    onClick={() => handleRowClick(staff.originalId)}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 truncate">{staff.username}</h3>
                        <p className="text-xs text-gray-500 mt-1">Email: {staff.email}</p>
                        <p className="text-xs text-gray-500 mt-1">Role: {staff.role}</p>
                        <p className="text-xs text-gray-500 mt-1">Nationality: {staff.nationality}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffTable;