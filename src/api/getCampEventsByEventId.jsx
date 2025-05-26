import axiosInstance from "./axiosInstance";

const getCampEventsByEventId = async (eventId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/campevents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("All Camp Events Response:", response.data); // Debug log
    // Filter camp events by event_id client-side
    const filteredEvents = response.data.filter(event => event.event_id === eventId);
    console.log("Filtered Camp Events for event ID", eventId, ":", filteredEvents);
    return filteredEvents;
  } catch (error) {
    console.error("Error fetching camp events:", error);
    return [];
  }
};

export default getCampEventsByEventId;