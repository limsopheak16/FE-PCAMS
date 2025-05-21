import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addUserAccount from "../api/addUserAccount";

const FormAddUser = () => {
  const navigate = useNavigate();

  // Form data to hold user info
  const [formData, setFormData] = useState({
    khmer_name: "",
    english_name: "",
    date_of_birth: "",
    position: "coordinator", // Default position
    nationality: "",
    email: "",
    password: "",
    camp_user: "",
  });

  // Errors for form validation
  const [errors, setErrors] = useState({
    khmer_name: "",
    english_name: "",
    date_of_birth: "",
    position: "",
    nationality: "",
    email: "",
    password: "",
    camp_user: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const today = new Date("2025-05-20"); // Today's date: May 20, 2025
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Check if the form is filled correctly
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      khmer_name: "",
      english_name: "",
      date_of_birth: "",
      position: "",
      nationality: "",
      email: "",
      password: "",
      camp_user: "",
    };

    // Check if fields are empty
    if (!formData.khmer_name.trim()) {
      newErrors.khmer_name = "Please enter Khmer Name";
      isValid = false;
    }
    if (!formData.english_name.trim()) {
      newErrors.english_name = "Please enter English Name";
      isValid = false;
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Please select Date of Birth";
      isValid = false;
    } else {
      const age = calculateAge(formData.date_of_birth);
      if (age < 18) {
        newErrors.date_of_birth = "User must be 18 or older";
        isValid = false;
      } else if (age > 120) {
        newErrors.date_of_birth = "Invalid date of birth";
        isValid = false;
      }
    }
    if (!formData.position) {
      newErrors.position = "Please select a Position";
      isValid = false;
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = "Please enter Nationality";
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

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Send the form data to the API
      await addUserAccount(formData, navigate);
    }
  };

  // Clear the form when clicking Cancel
  const handleCancel = () => {
    setFormData({
      role_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
      khmer_name: "",
      english_name: "",
      date_of_birth: "",
      position: "coordinator",
      nationality: "",
      email: "",
      password: "",
      camp_user: "",
    });
    setErrors({
      khmer_name: "",
      english_name: "",
      date_of_birth: "",
      position: "",
      nationality: "",
      email: "",
      password: "",
      camp_user: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={() => navigate("/user")}
          className="text-[#4F7CFF] hover:underline font-medium"
          aria-label="Go back to staff list"
        >
          Back
        </button>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-900">Add New User</h1>
        <button
          onClick={() => navigate("/user")}
          className="text-[#4F7CFF] hover:underline text-sm"
          aria-label="Go back to staff list"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleCreate}
            className="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-md"
          >
            {/* Khmer Name */}
            <div className="mb-5">
              <label
                htmlFor="khmer_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Khmer Name <span className="text-red-500">*</span>
              </label>
              <input
                id="khmer_name"
                type="text"
                name="khmer_name"
                placeholder="Enter Khmer Name"
                value={formData.khmer_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.khmer_name && (
                <p className="text-red-500 text-xs mt-1">{errors.khmer_name}</p>
              )}
            </div>

            {/* English Name */}
            <div className="mb-5">
              <label
                htmlFor="english_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                English Name <span className="text-red-500">*</span>
              </label>
              <input
                id="english_name"
                type="text"
                name="english_name"
                placeholder="Enter English Name"
                value={formData.english_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.english_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.english_name}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="mb-5">
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="date_of_birth"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                max="2025-05-20" // Today's date: May 20, 2025
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.date_of_birth}
                </p>
              )}
              {formData.date_of_birth && (
                <p className="text-gray-500 text-xs mt-1">
                  Age: {calculateAge(formData.date_of_birth)}
                </p>
              )}
            </div>

            {/* Position */}
            <div className="mb-5">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Position <span className="text-red-500">*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              >
                <option value="coordinator">Coordinator</option>
                <option value="monitor">Monitor</option>
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            {/* Nationality */}
            <div className="mb-6">
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                id="nationality"
                type="text"
                name="nationality"
                placeholder="Enter Nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nationality}
                </p>
              )}
            </div>

            {/* Email */}
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

            {/* Password */}
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
            {/* Camp User */}
            <div className="mb-5">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Camp User <span className="text-red-500">*</span>
              </label>
              <select
                id="camp_user"
                name="camp_user"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              >
                <option value="Select Camp">Select Camp</option>
                <option value="Specail Camp">Specail Camp</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            {/* Buttons */}
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
