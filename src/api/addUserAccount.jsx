import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api";

const addUserAccount = async (userData, navigate) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNmE0YzJkLTMwMDEtNDZlYi1iNmQxLTJmMDcxYmJhNmI2NSIsInJvbGVfaWQiOiJhMWIyYzNkNC1lNWY2LTc4OTAtYWJjZC0xMjM0NTY3ODkwYWIiLCJpYXQiOjE3NDc3MjgzMjgsImV4cCI6MTc0NzczOTEyOH0.8IXIcqAHP09A-8oKE_JaAiRbFBxXaF-P6NFBS2Zidac";

  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      toast.success("User account created successfully");
      navigate("/users");
    } else {
      toast.error(`Failed to create user account: ${response.data?.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error creating user account:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Error creating user account");
  }
};

export default addUserAccount;