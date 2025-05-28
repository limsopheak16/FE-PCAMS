import axiosInstance from "./axiosInstance";

export const fetchCoordinator = async ({ Date }) => {
  if (!Date) return null;

  try {
    const res = await axiosInstance.get('/api/dashboard/coordinator', {
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
  }
};