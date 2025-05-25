// fetchAttendanceData.js
import axiosInstance from "./axiosInstance";

export const fetchAttendanceData = async ({ selectedDate, userId }) => {
  if (!selectedDate || !userId) {
    console.warn("Missing selectedDate or userId for fetching attendance.");
    return [];
  }

  try {
    const res = await axiosInstance.get('/childattendances/attendance', {
      params: {
        date: selectedDate,
        user_id: userId,
      },
    });
 
    console.log("==============",res)
    return res.data.data; // assuming API returns an array of attendance records
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
};

