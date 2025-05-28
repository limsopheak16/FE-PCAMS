import axiosInstance from "../api/axiosInstance";

export const getChild = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const response = await axiosInstance.get(`/api/childattendances/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching child attendance:", error);
    return null;
  }
};
