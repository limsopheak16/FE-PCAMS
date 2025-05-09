import React, { useState } from "react";
import SidebarMenu from "../components/sidebar";
import CampCard from "../components/campCard";
import { PlusCircle } from "lucide-react";

const PSECampsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // <- new
  const [camps, setCamps] = useState(
    Array(9).fill({
      title: "Central Camp",
      location: "PSE - Pour un Sourire d'Enfant",
      description: "This is a sample description.",
    })
  );

  const [formCamp, setFormCamp] = useState({
    title: "",
    location: "",
    description: "",
  });

  const handleCreateNewCamp = () => {
    setEditingIndex(null); // Clear edit mode
    setFormCamp({ title: "", location: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleCampClick = (index) => {
    setEditingIndex(index);
    setFormCamp(camps[index]);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormCamp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formCamp.title && formCamp.location) {
      if (editingIndex !== null) {
        // Edit existing camp
        const updatedCamps = [...camps];
        updatedCamps[editingIndex] = formCamp;
        setCamps(updatedCamps);
      } else {
        // Create new camp
        setCamps([...camps, formCamp]);
      }

      setFormCamp({ title: "", location: "", description: "" });
      setEditingIndex(null);
      setIsDialogOpen(false);
    } else {
      alert("Please fill in the camp name and location.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 p-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">PSE Camps</h1>
          <button
            onClick={handleCreateNewCamp}
            className="inline-flex items-center gap-2 text-[#4F7CFF] font-semibold border border-[#4F7CFF] rounded px-4 py-2 hover:bg-blue-50 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Camp
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {camps.map((camp, index) => (
            <CampCard
              key={index}
              title={camp.title}
              location={camp.location}
              onClick={() => handleCampClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {editingIndex !== null ? "Edit Camp" : "Create New Camp"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium mb-1">Camp Name</label>
                <input
                  type="text"
                  name="title"
                  value={formCamp.title}
                  onChange={handleInputChange}
                  placeholder="Camp name"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formCamp.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formCamp.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md text-sm resize-none outline-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  {editingIndex !== null ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PSECampsPage;
