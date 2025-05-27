import axiosInstance from "../api/axiosInstance";

export const getChild = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/childattendances", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("children",response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching camp:", error);
    return null;
  }
};
