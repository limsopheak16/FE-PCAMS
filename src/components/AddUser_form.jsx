import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/createUser";

const FormAddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = "Please enter Username";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter Email";
      isValid = false;
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Email must be valid (e.g., user@example.com)";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter Password";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select a Role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createUser(formData, navigate);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          email: error.response?.data?.message || "Failed to create user",
        }));
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
    setErrors({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleBack = () => {
    navigate("/user");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Headers */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </header>
{/*Mobile  */}

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </header>

      {/* Form */}
      <main className="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-15">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleCreate}
            className="w-full p-8 bg-white border border-gray-200 rounded-2xl shadow-lg"
          >
            {/* Username */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div className="mb-8">
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              >
                <option value="">Select Role</option>
                <option value="coordinator">Coordinator</option>
                <option value="monitor">Monitor</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Buttons */}
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
};

export default FormAddUser;
