import axiosInstance from "../api/axiosInstance";

export const createUser = async (userData, navigate) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post("/users", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("User created:", response.data);
    navigate("/user"); // Navigate to user list after successful creation
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    throw error; // Throw error to be handled in the component
  }
};