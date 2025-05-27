import axiosInstance from "../api/axiosInstance";

export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post("/api/events", eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Event created:", response.data);
    return response.data; // Return the created event
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};