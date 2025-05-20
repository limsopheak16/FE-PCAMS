import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SidebarMenu from "../components/sidebar";

const API_URL = "http://localhost:3000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNmE0YzJkLTMwMDEtNDZlYi1iNmQxLTJmMDcxYmJhNmI2NSIsInJvbGVfaWQiOiJhMWIyYzNkNC1lNWY2LTc4OTAtYWJjZC0xMjM0NTY3ODkwYWIiLCJpYXQiOjE3NDc3MjY5NDQsImV4cCI6MTc0NzczNzc0NH0.cqBrV76EShN0ErOaJnjSF-CnIpizYiExX6oJgxHQc_k";

const StaffTable = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        // Map API response with a custom sequential ID
        const users = response.data.map((user, index) => ({
          originalId: user.id, // Keep the original ID for navigation
          displayId: index + 1, // Sequential ID starting from 1
          khmerName: user.khmer_name,
          englishName: user.english_name,
          position: user.position,
          nationality: user.nationality,
          email: user.email,
          password: user.password,
        }));
        console.log('::::::::::::', users);
        setStaffList(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data?.message || error.message);
        toast.error("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = (originalId) => {
    navigate(`/staff/${originalId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[272px]">
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
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
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
                      Position
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Nationality
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">
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
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.displayId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.khmerName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.englishName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.position}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.nationality}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{staff.email}</td>
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