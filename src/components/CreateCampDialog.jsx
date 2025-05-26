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
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"        >
          Back
        </button>
      </header>

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Create New Camp</h1>
        <button
          onClick={() => navigate("/camp")}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 shadow-sm transition"        >
          Back
        </button>
      </header>

      <main className="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20">
        <div className="max-w-3xl mx-auto"> {/* was max-w-md */}
          <form
            onSubmit={handleCreate}
            className="w-full p-8 bg-white border border-gray-200 rounded-2xl shadow-lg"
          >
            <div className="mb-6">
              <label
                htmlFor="camp_name"
                className="block text-base font-semibold text-gray-700 mb-3"
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
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.camp_name && (
                <p className="text-red-500 text-sm mt-2">{errors.camp_name}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="camp_location"
                className="block text-base font-semibold text-gray-700 mb-3"
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
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.camp_location && (
                <p className="text-red-500 text-sm mt-2">{errors.camp_location}</p>
              )}
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

export default CreateCampForm;
