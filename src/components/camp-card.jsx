"use client";

import React from "react";

const CampCard = ({ title, location, onClick }) => {
  return (
    <div
      className="border border-[#2F53AE] rounded-md p-4 py-9 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-[#2F53AE] font-bold mb-2 text-2xl ">{title}</h3>
      <div className="text-xl">
        <span className="text-gray-600 font-medium">Location: </span>
        <span className="text-gray-700">{location}</span>
      </div>
    </div>
  );
};

export default CampCard;
