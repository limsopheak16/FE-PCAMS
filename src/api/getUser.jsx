import axiosInstance from "../api/axiosInstance";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("user",response.data)
    return response.data;
   
  } catch (error) {
    console.error("Error fetching Users:", error);
    return null;
  }
};
