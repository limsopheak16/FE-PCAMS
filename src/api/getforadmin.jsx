import axiosInstance from "./axiosInstance";

export const fetchDataAdmin = async ({ startDate, endDate, setPending }) => {
  if (!startDate || !endDate) return null;

  setPending(true);

  try {
    const res = await axiosInstance.get('/dashboard/admin', {
      params: { 
        startDate, 
        endDate,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("API request params:", { startDate, endDate });
    console.log("API response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching admin dashboard data:", err);
    return null;
  } finally {
    setPending(false);
  }
};