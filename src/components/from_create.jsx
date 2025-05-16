import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    khmerName: "",
    englishName: "",
    dateOfBirth: "",
    position: "coordinator", // default position
    national: "",
  });

  const [errors, setErrors] = useState({
    khmerName: "",
    englishName: "",
    dateOfBirth: "",
    position: "",
    national: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const calculateAge = (dob) => {
    const today = new Date("2025-05-16"); // Current date: May 16, 2025
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      khmerName: "",
      englishName: "",
      dateOfBirth: "",
      position: "",
      national: "",
    };

    if (!formData.khmerName.trim()) {
      newErrors.khmerName = "Khmer Name is required";
      isValid = false;
    }
    if (!formData.englishName.trim()) {
      newErrors.englishName = "English Name is required";
      isValid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
      isValid = false;
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        newErrors.dateOfBirth = "User must be at least 18 years old";
        isValid = false;
      } else if (age > 120) {
        newErrors.dateOfBirth = "Invalid date of birth";
        isValid = false;
      }
    }
    if (!formData.position) {
      newErrors.position = "Position is required";
      isValid = false;
    }
    if (!formData.national.trim()) {
      newErrors.national = "Nationality is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        id: users.length + 1,
        ...formData,
        age: calculateAge(formData.dateOfBirth), // Add calculated age to user data
      };
      setUsers([...users, newUser]);
      setFormData({
        khmerName: "",
        englishName: "",
        dateOfBirth: "",
        position: "coordinator",
        national: "",
      });
      setErrors({
        khmerName: "",
        englishName: "",
        dateOfBirth: "",
        position: "",
        national: "",
      });
      navigate("/user");
    }
  };

  const handleCancel = () => {
    setFormData({
      khmerName: "",
      englishName: "",
      dateOfBirth: "",
      position: "coordinator",
      national: "",
    });
    setErrors({
      khmerName: "",
      englishName: "",
      dateOfBirth: "",
      position: "",
      national: "",
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
              <label htmlFor="khmerName" className="block text-sm font-medium text-gray-700 mb-2">
                Khmer Name <span className="text-red-500">*</span>
              </label>
              <input
                id="khmerName"
                type="text"
                name="khmerName"
                placeholder="Enter Khmer Name"
                value={formData.khmerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.khmerName && (
                <p className="text-red-500 text-xs mt-1">{errors.khmerName}</p>
              )}
            </div>

            {/* English Name */}
            <div className="mb-5">
              <label htmlFor="englishName" className="block text-sm font-medium text-gray-700 mb-2">
                English Name <span className="text-red-500">*</span>
              </label>
              <input
                id="englishName"
                type="text"
                name="englishName"
                placeholder="Enter English Name"
                value={formData.englishName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.englishName && (
                <p className="text-red-500 text-xs mt-1">{errors.englishName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="mb-5">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max="2025-05-16" // Current date: May 16, 2025
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
              )}
              {formData.dateOfBirth && (
                <p className="text-gray-500 text-xs mt-1">
                  Age: {calculateAge(formData.dateOfBirth)}
                </p>
              )}
            </div>

            {/* Position */}
            <div className="mb-5">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* National */}
            <div className="mb-6">
              <label htmlFor="national" className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                id="national"
                type="text"
                name="national"
                placeholder="Enter Nationality"
                value={formData.national}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                aria-required="true"
              />
              {errors.national && (
                <p className="text-red-500 text-xs mt-1">{errors.national}</p>
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