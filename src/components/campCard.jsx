"use client";

import React from "react";

const CampCard = ({ title, location, onClick }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col gap-3"
      onClick={onClick}
    >
      <h3 className="text-[#2F53AE] text-xl font-semibold truncate">{title}</h3>
      <div className="flex items-start gap-2 text-base">
        <span className="text-gray-500 font-medium shrink-0">Location:</span>
        <span className="text-gray-700 line-clamp-2">{location}</span>
      </div>
    </div>
  );
};

export default CampCard;