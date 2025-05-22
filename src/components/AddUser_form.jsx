import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/createUser"; // Updated import name

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
    const newErrors = {
      username: "",
      email: "",
      password: "",
      role: "",
    };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={() => navigate("/user")}
          className="text-[#4F7CFF] hover:underline font-medium"
          aria-label="Go back to user list"
        >
          Back
        </button>
      </header>

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={() => navigate("/user")}
          className="text-[#4F7CFF] hover:underline text-sm"
          aria-label="Go back to user list"
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              >
                <option value="">Select Role</option>
                <option value="coordinator">Coordinator</option>
                <option value="monitor">Monitor</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#4F7CFF] text-white py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md font-medium"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-shadow hover:shadow-md font-medium"
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