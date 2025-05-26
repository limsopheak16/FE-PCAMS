// src/components/EventForm.js
import React, { useState } from "react";
import { createEvent } from "../api/createEvent";

const EventForm = ({
  eventName,
  setEventName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onCreate,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      event_name: eventName,
      from_date: startDate,
      end_date: endDate,
    };

    try {
      const newEvent = await createEvent(eventData);
      setSuccessMessage("Event created successfully!");
      setErrorMessage("");
      setEventName("");
      setStartDate("");
      setEndDate("");
      onCreate(newEvent); // Notify parent of the new event

      // Hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage("Failed to create event.");
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="eventName">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="event name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fromDate">
            Start Date
          </label>
          <input
            type="date"
            id="fromDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {successMessage && (
        <p className="mt-4 text-green-600 text-sm font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-600 text-sm font-medium">{errorMessage}</p>
      )}
    </form>
  );
};

export default EventForm;