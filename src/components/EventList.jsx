import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    navigate(`/eventcamp/${event.id}`); // Updated path to match EventDetailPage route
  };

  // Format date to a readable string (e.g., "May 26, 2025")
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto">
      <h2 className="text-lg font-bold mb-4">List Event</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex justify-between items-center border p-4 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleEventClick(event)} // Navigate on click
          >
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium">
                {event.event_name}
              </span>
              <span className="text-gray-600 text-sm">
                {formatDate(event.from_date)} - {formatDate(event.end_date)}
              </span>
            </div>
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the parent div's onClick from firing
                handleEventClick(event);
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;