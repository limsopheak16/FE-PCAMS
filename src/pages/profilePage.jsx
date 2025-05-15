import React, { useState } from "react";
import SidebarMenu from "../components/sidebar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    khmerName: "សេង គីមើ",
    englishName: "Seng kimer",
    dob: "2005-06-21",
    nationality: "Khmer",
    position: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", formData);
  };

  return (
    <div className="flex">
      <SidebarMenu />
      <div className="flex justify-center items-center min-h-screen bg-white w-full">
        <div className="border border-blue-300 rounded-lg px-25 py-10 bg-gray-50 w-[939px] shadow-sm">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow"
            />
          </div>

          {/* Input fields */}
          <div className="space-y-4">
            <InputField
              label="Khmer name"
              name="khmerName"
              value={formData.khmerName}
              editable={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="English name"
              name="englishName"
              value={formData.englishName}
              editable={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Date of birth"
              name="dob"
              type="date"
              value={formData.dob}
              editable={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="National"
              name="nationality"
              value={formData.nationality}
              editable={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Position"
              name="position"
              value={formData.position}
              editable={isEditing}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  disabled
                  className="px-5 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, editable, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={!editable}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
          editable
            ? "border-blue-400 focus:ring-2 focus:ring-blue-200"
            : "border-blue-300 bg-gray-100 text-gray-600"
        }`}
      />
    </div>
  );
}
