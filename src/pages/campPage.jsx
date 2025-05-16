import React, { useState } from "react";
import SidebarMenu from "../components/sidebar";
import CampCard from "../components/campCard";
import { PlusCircle } from "lucide-react";

const PSECampsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
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
    setEditingIndex(null);
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
        const updatedCamps = [...camps];
        updatedCamps[editingIndex] = formCamp;
        setCamps(updatedCamps);
      } else {
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

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">PSE Camps</h1>
          <button
            onClick={handleCreateNewCamp}
            className="inline-flex items-center gap-2 bg-[#4F7CFF] text-white font-medium rounded-lg px-4 py-2 hover:bg-[#3B65E6] transition-shadow hover:shadow-md"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Camp
          </button>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">PSE Camps</h1>
          <button
            onClick={handleCreateNewCamp}
            className="inline-flex items-center gap-2 text-[#4F7CFF] font-medium border border-[#4F7CFF] rounded-lg px-3 py-1 hover:bg-blue-50 transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-sm">Create</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          {/* Camps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {camps.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No camps available.</p>
                <button
                  onClick={handleCreateNewCamp}
                  className="mt-4 inline-flex items-center gap-2 text-[#4F7CFF] font-medium underline hover:text-[#3B65E6]"
                >
                  <PlusCircle className="w-5 h-5" />
                  Create your first camp
                </button>
              </div>
            ) : (
              camps.map((camp, index) => (
                <CampCard
                  key={index}
                  title={camp.title}
                  location={camp.location}
                  onClick={() => handleCampClick(index)}
                />
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-900">
                {editingIndex !== null ? "Edit Camp" : "Create New Camp"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Camp Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formCamp.title}
                    onChange={handleInputChange}
                    placeholder="Enter camp name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formCamp.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block font-medium text-sm text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formCamp.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#4F7CFF] text-white py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md font-medium"
                  >
                    {editingIndex !== null ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-shadow hover:shadow-md font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PSECampsPage;