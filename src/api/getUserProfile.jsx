import axiosInstance from "../api/axiosInstance";

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    if (!token || !userId) throw new Error("Token or User ID not found");
    

    const response = await axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};