import axiosInstance from "./axiosInstance";

export const fetchDataAdmin = async ({ startDate, endDate, setPending }) => {
  if (!startDate || !endDate) return null;

  setPending(true);

  try {
    const res = await axiosInstance.get('/dashboard/admin', {
      params: { startDate, endDate }, // Updated to include startDate and endDate
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