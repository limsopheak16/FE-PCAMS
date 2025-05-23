import axiosInstance from "../api/axiosInstance";
 
export const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axiosInstance.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Deleted user:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return null;
    }
  };