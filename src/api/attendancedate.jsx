// fetchAttendanceData.js
import axiosInstance from "./axiosInstance";

export const fetchAttendanceData = async ({ selectedDate, userId }) => {
  if (!selectedDate || !userId) {
    console.warn("Missing selectedDate or userId for fetching attendance.");
    return [];
  }

  try {
    // Call backend with date and user_id query params
    const res = await axiosInstance.get('/childattendances/attendance', {
      params: {
        date: selectedDate,
        user_id: userId,
      },
    });
 
    console.log("Attendance chcecklist:", res.data.data);
    // Return the attendance records array (filtered for status IS NULL on backend)
    return res.data.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};

