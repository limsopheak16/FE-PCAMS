import axiosInstance from "./axiosInstance";

export const fetchAttendanceData = async ({ startDate, endDate, setPending }) => {
    if (!startDate || !endDate) return null;
  
    setPending(true);
  
    try {
      const res = await axiosInstance.get('/coordinator', {
        params: { startDate, endDate },
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
  