
import axiosInstance from "../api/axiosInstance";
export const createChildAttendanceChecklist = async (data) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axiosInstance.post('/api/childattendances/checklist', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Attendance checklist created:', { data: response.data, requestData: data });
    return response.data.data;
  } catch (error) {
    console.error('Error creating attendance checklist:', {
      response: error.response?.data,
      requestData: data,
      message: error.message,
    });
    throw error;
  }
};
