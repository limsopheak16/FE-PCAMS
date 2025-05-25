import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarMenu from "../components/sidebar";
import { getUsers } from "../api/getUser";
import { deleteUser } from "../api/daleteUser";
import { updateUser } from "../api/updateUser";

const StaffTable = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    nationality: "",
  });

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
    const user = staffList.find((staff) => staff.id === id);
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        nationality: user.nationality,
      });
      setCurrentUserId(id);
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateUser(currentUserId, formData);
      if (success) {
        toast.success("User updated successfully");
        setIsEditing(false);
        setCurrentUserId(null);
        setFormData({
          username: "",
          email: "",
          role: "",
          nationality: "",
        });
        const data = await getUsers();
        if (data) {
          setStaffList(data);
        } else {
          toast.error("Failed to refresh staff list.");
        }
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      toast.error("Error updating user: " + error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentUserId(null);
    setFormData({
      username: "",
      email: "",
      role: "",
      nationality: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[272px]">
        {/* Unified Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Staff List</h1>
          <button
            onClick={() => navigate("/adduser")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-sm md:text-base"
            aria-label="Create a new user"
          >
           <PlusCircle className="w-5 h-5" />
            <span>Create User</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Create User Button (Mobile) */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => navigate("/adduser")}
                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] text-white px-4 py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-base"
                aria-label="Create a new user"
              >
            <PlusCircle className="w-5 h-5" />
                <span>Create User</span>
              </button>
            </div>

            {isEditing && (
              <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white w-full max-w-lg p-10 border border-gray-200 rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Edit User</h2>
                  <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-6">
                      <label className="block text-lg font-semibold text-gray-700 mb-3">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                      <label className="block text-lg font-semibold text-gray-700 mb-3">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                        required
                      />
                    </div>

                    {/* Role */}
                    <div className="mb-6">
                      <label className="block text-lg font-semibold text-gray-700 mb-3">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="coordinator">Coordinator</option>
                        <option value="monitor">Monitor</option>
                      </select>
                    </div>

                    {/* Nationality */}
                    <div className="mb-8">
                      <label className="block text-lg font-semibold text-gray-700 mb-3">Nationality</label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                        required
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        className="flex-1 bg-[#4F7CFF] text-white py-4 text-lg rounded-xl hover:bg-[#3B65E6] font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-200 text-gray-800 py-4 text-lg rounded-xl hover:bg-gray-300 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-8 py-5 text-left text-base font-semibold text-gray-700">Username</th>
                    <th className="px-8 py-5 text-left text-base font-semibold text-gray-700">Email</th>
                    <th className="px-8 py-5 text-left text-base font-semibold text-gray-700">Role</th>
                    <th className="px-8 py-5 text-left text-base font-semibold text-gray-700">Nationality</th>
                    <th className="px-8 py-5 text-center text-base font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-10 text-lg">
                        Loading...
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-10 text-lg">
                        No staff found.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                        <td
                          className="px-8 py-5 text-base text-gray-900 cursor-pointer"
                          onClick={() => handleRowClick(staff.id)}
                        >
                          {staff.username}
                        </td>
                        <td className="px-8 py-5 text-base text-gray-900">{staff.email}</td>
                        <td className="px-8 py-5 text-base text-gray-900">{staff.role}</td>
                        <td className="px-8 py-5 text-base text-gray-900">{staff.nationality}</td>
                        <td className="px-8 py-5 text-center space-x-4">
                          <button
                            onClick={() => handleUpdate(staff.id)}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label={`Edit ${staff.username}`}
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(staff.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label={`Delete ${staff.username}`}
                          >
                            <FaTrash size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {loading ? (
                <div className="text-center text-gray-500 py-10 text-lg">Loading...</div>
              ) : staffList.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-lg">No staff found.</div>
              ) : (
                staffList.map((staff) => (
                  <div key={staff.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div onClick={() => handleRowClick(staff.id)} className="cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{staff.username}</h3>
                      <p className="text-base text-gray-500 mt-2">Email: {staff.email}</p>
                      <p className="text-base text-gray-500 mt-2">Role: {staff.role}</p>
                      <p className="text-base text-gray-500 mt-2">Nationality: {staff.nationality}</p>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <button
                        onClick={() => handleUpdate(staff.id)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-base"
                        aria-label={`Edit ${staff.username}`}
                      >
                        <FaEdit size={24} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 text-base"
                        aria-label={`Delete ${staff.username}`}
                      >
                        <FaTrash size={24} />
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