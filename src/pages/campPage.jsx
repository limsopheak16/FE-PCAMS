import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/sidebar";
import CampCard from "../components/campCard";
import { PlusCircle } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";



const PSECampsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const [camps, setCamps] = useState(
    Array(9).fill({
      title: "Central Camp",
      location: "PSE - Pour un Sourire d'Enfant",
      description: "This is a sample description.",
      completionDate: "",
    })
  );


  const handleCreateNewCamp = () => {
    navigate("/addcamp");
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
      setFormCamp({ title: "", location: "", description: "", completionDate: "" });
      setEditingIndex(null);
      setIsDialogOpen(false);
    } else {
      alert("Please fill in the camp name and location.");
    }
  };

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token before request:", token); // Debug token presence
        const response = await axiosInstance.get("/camps");
        setCamps(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
          // Add redirect to login here if needed, e.g.
          // window.location.href = "/login";
        } else {
          console.error("Error fetching camps:", error);
        }
      }
    };

    fetchCamps();
  }, []);

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
                  title={camp.camp_name}
                  location={camp.location}
                  onClick={() => handleCampClick(index)}
                  // optionally, pass description or completionDate if CampCard supports
                />
              ))
            )}
          </div>
        </div>       
      </div>
    </div>
  );
};

export default PSECampsPage;
