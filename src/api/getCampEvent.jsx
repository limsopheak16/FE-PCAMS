import axiosInstance from "../api/axiosInstance";

export const getCampEvent = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/api/campevents", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching campevents:", error);
    return null;
  }
};
