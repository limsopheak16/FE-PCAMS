import axiosInstance from "../api/axiosInstance";

export const getcamp = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/camps", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("camp",response.data)
    return response.data;
   
  } catch (error) {
    console.error("Error fetching camp:", error);
    return null;
  }
};
