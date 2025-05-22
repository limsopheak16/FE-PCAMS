import axiosInstance from "./axiosInstance";

export const fetchAttendanceData = async ({ selectedCamp, startDate, endDate, setPending }) => {
    if (!selectedCamp || !startDate || !endDate) return null;
  
    setPending(true);
  
    try {
      const res = await axiosInstance.get('/dashboard', {
        params: { 
          campId: selectedCamp,       // camp UUID
          startDate: startDate,       // match backend expected query param
          endDate: endDate,           // match backend expected query param
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      console.log({ selectedCamp, startDate, endDate }, "API request params");
      return res.data;
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      return null;
    } finally {
      setPending(false);
    }
  };
