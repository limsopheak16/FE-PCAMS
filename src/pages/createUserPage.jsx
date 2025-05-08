import React from "react";
import { FaPlus } from "react-icons/fa";
import Fromadduser from "../components/from_create";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Staff List</h1>
        <button 
        onClick={() => navigate("/Fromadduser")}
         className=" text-[#165FFD] px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2 border border-[#165FFD]">
          <FaPlus />
          Create user
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Khmer Name</th>
              <th className="py-3 px-4 text-left">English Name</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">National</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staffList.map((staff) => (
              <tr key={staff.id} className="border-t">
                <td className="py-3 px-4">{staff.id}</td>
                <td className="py-3 px-4">{staff.khmerName}</td>
                <td className="py-3 px-4">{staff.englishName}</td>
                <td className="py-3 px-4">{staff.age}</td>
                <td className="py-3 px-4">{staff.position}</td>
                <td className="py-3 px-4">{staff.national}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
