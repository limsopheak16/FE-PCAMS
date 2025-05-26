import React, { useState, useEffect } from "react";
import SidebarMenu from "../components/sidebar";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import getEvents from "../api/getEvents";

const EventCampPage = () => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      if (fetchedEvents) {
        setEvents(fetchedEvents);
        setError(null);
      } else {
        setError("Failed to fetch events");
      }
    } catch (err) {
      setError("Error fetching events: " + err.message);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event creation and re-fetch events
  const handleCreate = async (newEvent) => {
    try {
      // Optimistically update the UI by adding the new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      // Re-fetch events from the API to ensure the list is in sync with the server
      await fetchEvents();
    } catch (err) {
      setError("Failed to sync events after creation: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[272px]">
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-5">
          <h1 className="text-2xl font-bold text-gray-900">Event Camp</h1>
        </header>

        <main className="p-6 space-y-6">
          {error && <div className="text-red-500">{error}</div>}
          <EventForm
            eventName={eventName}
            setEventName={setEventName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onCreate={handleCreate}
          />
          <EventList events={events} />
        </main>
      </div>
    </div>
  );
};

export default EventCampPage;