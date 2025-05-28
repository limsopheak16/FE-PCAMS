import axiosInstance from "../api/axiosInstance";

export const createChild = async (childData, navigate) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post("/api/childattendances", childData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Child created:", response.data);
    navigate("/children"); // Navigate after success
    return response.data;
  } catch (error) {
    console.error("Error creating child:", error.response?.data || error.message);
    throw error;
  }
};
