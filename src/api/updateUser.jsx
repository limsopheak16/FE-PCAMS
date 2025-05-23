import axiosInstance from "../api/axiosInstance";

export const updateUser = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.put(`/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Updated user:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};
