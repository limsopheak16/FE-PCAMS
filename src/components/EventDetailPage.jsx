import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getEventById from "../api/getEventById";
import { updateEvent } from "../api/updateEvent";
import Sidebar from "../components/sidebar";
import { getCamps } from "../api/getcamp";
import getCampEventsByEventId from "../api/getCampEventsByEventId";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react"; // Importing icons

const EventDetailPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [camps, setCamps] = useState([]);
  const [campEvents, setCampEvents] = useState([]); // List of camps associated with the event
  const [addCampSuccess, setAddCampSuccess] = useState(""); // New state for add camp success message

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        setEventName(eventData.event_name);
        setStartDate(
          new Date(eventData.from_date || eventData.start_date).toISOString().split("T")[0]
        );
        setEndDate(new Date(eventData.end_date).toISOString().split("T")[0]);
      } catch (err) {
        setError("Failed to load event details: " + err.message);
      }
    };
    fetchEvent();
  }, [id]);

  // Fetch camps
  useEffect(() => {
    const fetchCamps = async () => {
      const data = await getCamps();
      if (data) {
        setCamps(data);
      }
    };
    fetchCamps();
  }, []);

  // Fetch camp events by event_id
  const fetchCampEvents = async () => {
    console.log("Fetching camp events for event ID:", id);
    const data = await getCampEventsByEventId(id);
    if (data && Array.isArray(data)) {
      console.log("Fetched camp events:", data);
      setCampEvents(data);
    } else {
      setCampEvents([]);
      console.warn("Unexpected camp events data format:", data);
    }
  };

  useEffect(() => {
    fetchCampEvents();
  }, [id]);

  // Function to update event
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = await updateEvent(id, {
        event_name: eventName,
        from_date: startDate,
        end_date: endDate,
      });
      setEvent(updatedEvent);
      setSuccessMessage("Event updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update event: " + err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Function to add camp to event (POST request)
  const handleAddCamp = async (campId) => {
    if (campEvents.some((campEvent) => campEvent.camp_id === campId)) {
      setAddCampSuccess("This camp is already added to the event.");
      setTimeout(() => setAddCampSuccess(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/campevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          camp_id: campId,
          event_id: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        await fetchCampEvents();
        setAddCampSuccess("Camp added to event successfully!");
        setTimeout(() => setAddCampSuccess(""), 3000);
      } else {
        console.error("Failed to add camp:", data.message);
      }
    } catch (error) {
      console.error("Error adding camp to event:", error);
      setAddCampSuccess("Failed to add camp to event.");
      setTimeout(() => setAddCampSuccess(""), 3000);
    }
  };

  // Filter camps to exclude those already associated with the event
  const availableCamps = camps.filter(
    (camp) => !campEvents.some((campEvent) => campEvent.camp_id === camp.id)
  );

  // Function to get camp name by camp_id
  const getCampNameById = (campId) => {
    const camp = camps.find((camp) => camp.id === campId);
    return camp ? camp.camp_name : "";
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen bg-gray-50 p-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[272px]">
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-5">
          <h1 className="text-2xl font-bold text-gray-900">Event Details</h1>
          <button
            onClick={() => navigate("/eventcamp")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </header>

        <main className="p-6">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto"
          >
            <h2 className="text-lg font-bold mb-4">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="eventName">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
            {successMessage && (
              <p className="mt-4 text-green-600 text-sm font-medium flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> {successMessage}
              </p>
            )}
            {error && <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>}
          </form>

          <div className="mt-6 bg-white p-6 rounded-md shadow max-w-7xl mx-auto">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-500" /> Available Camps
            </h2>
            {availableCamps.map((camp) => (
              <div
                key={camp.id}
                className="flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-800">{camp.camp_name}</span>
                <button
                  onClick={() => handleAddCamp(camp.id)}
                  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
            ))}
            {addCampSuccess && (
              <p className="mt-4 text-green-600 text-sm font-medium flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> {addCampSuccess}
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-6 rounded-md shadow max-w-7xl mx-auto">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Associated Camp Events
            </h2>
            {campEvents.map((campEvent) => (
              <div
                key={campEvent.id}
                className="flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors"
                onClick={() => navigate(`/campeventdetail/${campEvent.id}`)} // Navigate to Camp Event Detail
                style={{ cursor: "pointer" }}
              >
                <span className="text-gray-800">{getCampNameById(campEvent.camp_id)}</span>
                <button
                  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <Calendar className="w-4 h-4 mr-1" /> View Details
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetailPage;