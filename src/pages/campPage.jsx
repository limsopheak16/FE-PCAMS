import React, { useState } from "react";
import SidebarMenu from "../components/sidebar";
import CampCard from "../components/campCard";
import { PlusCircle } from "lucide-react";
import { CreateCampDialog } from "../components/CreateCampDialog";

const PSECampsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [camps, setCamps] = useState(
    Array(9).fill({
      title: "Central Camp",
      location: "PSE - Pour un Sourire d'Enfant",
    })
  );

  const handleCampClick = (index) => {
    console.log(`Clicked on camp ${index}`);
  };

  const handleCreateNewCamp = () => {
    setIsDialogOpen(true);
  };

  const handleCreateCamp = (newCamp) => {
    setCamps([...camps, newCamp]);
    console.log("New Camp Created:", newCamp);
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

      <CreateCampDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onCreateCamp={handleCreateCamp} />
    </div>
  );
};

export default PSECampsPage;
