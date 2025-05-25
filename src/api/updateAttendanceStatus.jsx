import axiosInstance from "./axiosInstance";

export const updateAttendanceStatus = async ({ attendanceId, status}) => {
  try {
    const response = await axiosInstance.patch(
      `/childattendances/${attendanceId}`,
      { status }
    );
    console.log("=========================",response.data.data)

    return response.data.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to update attendance status."
    );
  }
};
