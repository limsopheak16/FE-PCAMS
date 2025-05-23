import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/sidebar";
import { getUserProfile } from "../api/getUserProfile"; // adjust path as needed
import { updateUser } from "../api/updateUser";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Extract fetch profile function so we can call it on mount and after save
  const fetchProfile = async () => {
    const profile = await getUserProfile();
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        role: profile.role || "",
      });
      setUpdatedAt(profile.updatedAt || null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    fetchProfile(); // reload profile data and discard changes
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setError(null);
      const profile = await getUserProfile();
      if (!profile || !profile.id) {
        setError("User profile ID not found");
        return;
      }

      const updated = await updateUser(profile.id, formData);
      if (updated) {
        // After successful update, re-fetch profile to get latest data
        await fetchProfile();
        setIsEditing(false);
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError("Error updating profile. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarMenu />
      <div className="flex flex-1 justify-center items-center bg-white px-4 py-8">
        <div className="w-full max-w-2xl border border-blue-300 rounded-lg p-6 md:p-10 bg-gray-50 shadow-sm">
          <div className="flex justify-center mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow"
            />
          </div>

          {/* Last updated date */}
          <div className="mt-2 mb-6 text-center text-sm text-gray-600">
            {updatedAt ? (
              <p>Last updated: {new Date(updatedAt).toLocaleString()}</p>
            ) : (
              <p>No update date available</p>
            )}
          </div>

          <div className="space-y-4">
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              editable={isEditing}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              editable={isEditing}
              onChange={handleChange}
              type="email"
            />
            <InputField
              label="Role"
              name="role"
              value={formData.role}
              editable={isEditing}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-600 mt-4">{error}</p>}

          <div className="flex flex-col sm:flex-row justify-start gap-3 mt-6">
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
