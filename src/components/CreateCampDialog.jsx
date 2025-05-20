"use client";
import React from "react";
import axiosInstance from "../api/axiosInstance";

function CreateCampDialog() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCamp = {
      camp_name: e.target.campName.value,
      location: e.target.location.value,
      // description: e.target.description.value,
      camp_event_id: "b6a1303e-9ab4-42fb-8c99-ea0f52921977", 
    };

    try {
      const response = await axiosInstance.post("/camps", newCamp);
      onCreateCamp(response.data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating camp:", error.message);
      alert("Failed to create camp.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Create New Camp</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Camp Name</label>
            <input
              name="campName"
              type="text"
              placeholder="Camp name"
              required
              className="w-full border border-blue-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              name="location"
              type="text"
              placeholder="Location"
              required
              className="w-full border border-blue-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              rows={4}
              className="w-full border border-blue-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div> */}
          <div className="pt-4 space-y-2">
            <button type="submit" className="w-full py-3 bg-[#4F7CFF] text-white rounded-md hover:bg-[#3A66E5] transition">
              Create
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-800 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCampDialog;
