import axiosInstance from "../api/axiosInstance";

export const createCamp = async (campData, navigate) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post("/api/camps", campData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("Camp created:", response.data);
    navigate("/camp"); // Navigate to Camp list after successful creation
    return response.data;
  } catch (error) {
    console.error("Error creating camp:", error.response?.data || error.message);
    throw error; // Throw error to be handled in the component
  }
};