import axiosInstance from "./axiosInstance";

export const fetchAttendanceData = async ({ Date, setPending }) => {
    if (!Date) return null;
  
    setPending(true);
  
    try {
      const res = await axiosInstance.get('/dashboard/coordinator', {
        params: { Date },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      console.log(res.data, "API request params");
      return res.data;
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      return null;
    } finally {
      setPending(false);
    }
  };
  