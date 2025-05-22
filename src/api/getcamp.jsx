import axiosInstance from "../api/axiosInstance";

export const getCamps = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/camps", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching camp:", error);
    return null;
  }
};
