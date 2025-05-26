// import axiosInstance from "../api/axiosInstance";

// export const createChildAttendanceChecklist = async (data) => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await axiosInstance.post("/childattendances/checklist", data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("Attendance checklist created:", response.data);
//     navigate("/attendance"); // Update with your actual path
//     return response.data.data;
//   } catch (error) {
//     console.error("Error creating attendance checklist:", error.response?.data || error.message);
//     throw error;
//   }
// };

// In api/createCheckList.js
import axiosInstance from "../api/axiosInstance";

export const createChildAttendanceChecklist = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post("/childattendances/checklist", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Attendance checklist created:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating attendance checklist:", error.response?.data || error.message);
    throw error;
  }
};
