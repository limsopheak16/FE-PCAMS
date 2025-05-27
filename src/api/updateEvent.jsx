// src/api/updateEvent.js
import axiosInstance from "../api/axiosInstance";

export const updateEvent = async (id, eventData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(`/api/events/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Event updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.response?.data || error.message);
    throw error;
  }
};