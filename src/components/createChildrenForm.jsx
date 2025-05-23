import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateChildForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    familyId: "",
    khmerName: "",
    englishName: "",
    age: "",
    gender: "",
    camp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/attendance");
  };

  const handleCancel = () => {
    setFormData({
      familyId: "",
      khmerName: "",
      englishName: "",
      age: "",
      gender: "",
      camp: "",
    });
  };

  const handleBack = () => {
    navigate("/attendance");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Headers */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Create New Child</h1>
        <button
          onClick={handleBack}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 shadow-sm transition"
        >
          Back
        </button>
      </header>

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Create New Child</h1>
        <button
          onClick={handleBack}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 shadow-sm transition"
        >
          Back
        </button>
      </header>

      {/* Form */}
      <main className="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-15">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full p-8 bg-white border border-gray-200 rounded-2xl shadow-lg"
          >
            {[
              { label: "Family ID", name: "familyId", type: "text", placeholder: "Enter Family ID" },
              { label: "Khmer Name", name: "khmerName", type: "text", placeholder: "Enter Khmer Name" },
              { label: "English Name", name: "englishName", type: "text", placeholder: "Enter English Name" },
              { label: "Age", name: "age", type: "number", placeholder: "Enter Age" },
            ].map((field) => (
              <div className="mb-3" key={field.name}>
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-base font-semibold text-gray-700 mb-3">Camp</label>
              <select
                name="camp"
                value={formData.camp}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              >
                <option value="">Select Camp</option>
                <option value="Camp A">Camp A</option>
                <option value="Camp B">Camp B</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-[#4F7CFF] text-white py-4 text-base rounded-xl hover:bg-[#3B65E6] font-semibold"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-4 text-base rounded-xl hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
