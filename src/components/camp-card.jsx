"use client";

import React from "react";

const CampCard = ({ title, location, onClick }) => {
  return (
    <div
      className="border rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-blue-600 font-medium mb-2">{title}</h3>
      <div className="text-sm">
        <span className="text-gray-600 font-medium">Location: </span>
        <span className="text-gray-700">{location}</span>
      </div>
    </div>
  );
};

export default CampCard;
