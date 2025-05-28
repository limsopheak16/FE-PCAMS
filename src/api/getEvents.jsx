// src/api/getEvents.js
import axiosInstance from "../api/axiosInstance";

const getEvents = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("events", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Events:", error);
    return null;
  }
};

export default getEvents;