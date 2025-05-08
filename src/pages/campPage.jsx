"use client"

import React from "react"
import SidebarMenu from "../components/sidebar"
import CampCard from "../components/camp-card"
import { PlusCircle } from "lucide-react"

const PSECampsPage = () => {
  const camps = Array(9).fill({
    title: "Central Camp",
    location: "PSE - Pour un Sourire d'Enfant",
  })

  const handleCampClick = (index) => {
    console.log(`Clicked on camp ${index}`)
  }

  const handleCreateNewCamp = () => {
    console.log("Create New Camp clicked")
    // You can add routing logic here, like: router.push("/create-camp")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <div className="flex-1 p-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">PSE Camps</h1>
          <button
            onClick={handleCreateNewCamp}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold border border-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition "
          >
            <PlusCircle className="w-5 h-5" />
            Create New Camp
          </button>
        </div>

        {/* Grid of Camp Cards */}
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
    </div>
  )
}

export default PSECampsPage
