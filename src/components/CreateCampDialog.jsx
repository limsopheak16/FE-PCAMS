"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCamp } from "../api/createCamp";

function CreateCampForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    camp_name: "",
    camp_location: "",
  });

  const [errors, setErrors] = useState({
    camp_name: "",
    camp_location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      camp_name: "",
      camp_location: "",
    };

    if (!formData.camp_name.trim()) {
      newErrors.camp_name = "Please enter Camp Name";
      isValid = false;
    }

    if (!formData.camp_location.trim()) {
      newErrors.camp_location = "Please enter Location";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const campData = {
        camp_name: formData.camp_name,
        camp_location: formData.camp_location, // changed
      };

      try {
        const createdCamp = await createCamp(campData, navigate); // fixed
        navigate("/camp", { state: { newCamp: createdCamp } });
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          camp_name: error.response?.data?.message || "Failed to create camp",
        }));
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      camp_name: "",
      camp_location: "",
    });
    setErrors({
      camp_name: "",
      camp_location: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* headers */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Create New Camp</h1>
        <button
          onClick={() => navigate("/camp")}
          className="text-[#4F7CFF] hover:underline font-medium"
        >
          Back
        </button>
      </header>

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Create New Camp</h1>
        <button
          onClick={() => navigate("/camp")}
          className="text-[#4F7CFF] hover:underline text-sm"
        >
          Back
        </button>
      </header>

      <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleCreate}
            className="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-md"
          >
            <div className="mb-5">
              <label
                htmlFor="camp_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Camp Name <span className="text-red-500">*</span>
              </label>
              <input
                id="camp_name"
                type="text"
                name="camp_name"
                placeholder="Enter camp name"
                value={formData.camp_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.camp_name && (
                <p className="text-red-500 text-xs mt-1">{errors.camp_name}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="camp_location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="camp_location"
                type="text"
                name="camp_location"
                placeholder="Enter location"
                value={formData.camp_location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.camp_location && (
                <p className="text-red-500 text-xs mt-1">{errors.camp_location}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#4F7CFF] text-white py-3 rounded-lg hover:bg-[#3B65E6] font-medium"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
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

export default CreateCampForm;
