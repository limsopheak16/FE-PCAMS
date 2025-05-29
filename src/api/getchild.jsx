import axiosInstance from "../api/axiosInstance";

export const getChild = async () => {
  try {
    const token = localStorage.getItem("token");


    const response = await axiosInstance.get(`/api/childattendances`, {
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
