import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/", // change to your base API URL
});

// Add a request interceptor to attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
