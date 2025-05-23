import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarMenu from "../components/sidebar";
import { getUsers } from "../api/getUser";
import { deleteUser } from "../api/daleteUser";

const StaffTable = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getUsers();
        if (data) {
          setStaffList(data);
        } else {
          toast.error("Failed to fetch staff data.");
        }
      } catch (error) {
        toast.error("Error fetching staff data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const deleted = await deleteUser(id);
      if (deleted) {
        toast.success("User deleted successfully.");
        const data = await getUsers();
        if (data) {
          setStaffList(data);
        } else {
          toast.error("Failed to refresh staff list.");
        }
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error deleting user: " + error.message);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/staff/edit/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[272px]">
        {/* Unified Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md md:px-5 md:py-3">
          <h1 className="text-2xl font-bold text-gray-900">Staff List</h1>
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        Loading...
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((staff) => (
                      <tr
                        key={staff.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.username}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.role}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.nationality}</td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => handleUpdate(staff.id)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label={`Edit ${staff.username}`}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(staff.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Delete ${staff.username}`}
                          >
                            <FaTrash />
                          </button>
                        </td>
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
                    key={staff.id}
                    className="bg-white rounded-xl shadow-sm p-4"
                  >
                    <div
                      onClick={() => handleRowClick(staff.id)}
                      className="cursor-pointer"
                    >
                      <h3 className="text-base font-semibold text-gray-900 truncate">{staff.username}</h3>
                      <p className="text-xs text-gray-500 mt-1">Email: {staff.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Role: {staff.role}</p>
                      <p className="text-xs text-gray-500 mt-1">Nationality: {staff.nationality}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-end gap-3">
                      <button
                        onClick={() => handleUpdate(staff.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        aria-label={`Edit ${staff.username}`}
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                        aria-label={`Delete ${staff.username}`}
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
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