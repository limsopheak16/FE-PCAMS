"use client"

import React from "react"
// import Sidebar from "../components/sidebar"
import SidebarMenu from "../components/sidebar"
import CampCard from "../components/camp-card"

const PSECampsPage = () => {
  // Sample camp data - you can replace this with your actual data
  const camps = Array(9).fill({
    title: "Central Camp",
    location: "PSE - Pour un Sourire d'Enfant",
  })

  const handleCampClick = (index) => {
    console.log(`Clicked on camp ${index}`)
    // Add your navigation or action logic here
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarMenu/>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">PSE Camps</h1>

        {/* Grid of Camp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp, index) => (
            <CampCard key={index} title={camp.title} location={camp.location} onClick={() => handleCampClick(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PSECampsPage
