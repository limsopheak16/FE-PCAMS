import axiosInstance from "../api/axiosInstance";

export const getGroup = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/attendance/summary", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("group",response.data)
    return response.data; 
  } catch (error) {
    console.error("Error fetching group:", error);
    return null;
  }
};
