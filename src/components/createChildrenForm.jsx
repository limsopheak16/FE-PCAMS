import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createChild } from "../api/createChild";
import { getCampEvent } from "../api/getCampEvent";

export default function CreateChildForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    age: "",
    familyId: "",
    attendanceDate: new Date().toISOString().split("T")[0],
    status: "Present",
    campEventId: "",
  });

  const [campevents, setCampEvent] = useState([]);
  const [loadingCamps, setLoadingCamps] = useState(true);
  const [campError, setCampError] = useState("");

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const data = await getCampEvent();
        if (Array.isArray(data)) {
          setCampEvent(data);
        } else {
          throw new Error("Invalid camp data");
        }
      } catch (error) {
        console.error("Failed to fetch camps:", error);
        setCampError("Failed to load camps.");
      } finally {
        setLoadingCamps(false);
      }
    };

    fetchCamps();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert number fields safely
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? value.replace(/\D/, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const childData = {
      fullname: formData.fullname,
      gender: formData.gender,
      age: Number(formData.age),
      family_id: formData.familyId,
      attendance_date: formData.attendanceDate,
      status: formData.status,
      camp_event_id: formData.campEventId,
    };

    try {
      const created = await createChild(childData, navigate("/"));
      console.log("Created:", created);
    } catch (error) {
      alert("Failed to create child. Check console for details.");
      console.error("Error submitting child form:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullname: "",
      gender: "",
      age: "",
      familyId: "",
      attendanceDate: new Date().toISOString().split("T")[0],
      status: "Present",
      campEventId: "",
    });
  };

  const handleBack = () => {
    navigate("/attendance");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Create New Child</h1>
        <button
          onClick={handleBack}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 shadow-sm transition"
        >
          Back
        </button>
      </header>

      <main className="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-15">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full p-8 bg-white border border-gray-200 rounded-2xl shadow-lg"
          >
            {[
              {
                label: "Full Name",
                name: "fullname",
                type: "text",
                placeholder: "Enter Full Name (e.g. Sok Dara)",
              },
              {
                label: "Family ID",
                name: "familyId",
                type: "text",
                placeholder: "Enter Family ID",
              },
              {
                label: "Age",
                name: "age",
                type: "number",
                placeholder: "Enter Age",
              },
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
                  required
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                />
              </div>
            ))}

            {/* Gender */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
              >
                <option value="">Select Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            {/* Camp Event */}
            <div className="mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-3">Camp</label>
              {loadingCamps ? (
                <p className="text-sm text-gray-500">Loading camps...</p>
              ) : campError ? (
                <p className="text-sm text-red-500">{campError}</p>
              ) : (
                <select
                  name="campEventId"
                  value={formData.campEventId}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]"
                >
                  <option value="">Select Camp</option>
                  {campevents.map((camp) => (
                    <option key={camp.id} value={camp.id}>
                      {camp.camp_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Submit & Cancel */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
