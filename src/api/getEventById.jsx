// src/api/getEventById.js
import axiosInstance from "../api/axiosInstance";

const getEventById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Event details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

export default getEventById;