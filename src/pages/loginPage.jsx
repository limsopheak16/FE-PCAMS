import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import loginImg from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axiosInstance.post("/api/auth/login", { email, password });
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const { user, token, campEvents } = response.data.data;
        setSuccessMsg("Login successful!");

        if (token) {
          // Save token, user details, and camp events to localStorage
          localStorage.setItem("token", token);
          console.log("Token saved in localStorage:", localStorage.getItem("token"));
          localStorage.setItem("userId", user.id);
          console.log("User ID saved in localStorage:", localStorage.getItem("userId"));
          localStorage.setItem("role", user.role);
          console.log("Role saved in localStorage:", localStorage.getItem("role"));
          localStorage.setItem("campEvents", JSON.stringify(campEvents));
          console.log("Camp Events saved in localStorage:", localStorage.getItem("campEvents"));

          // Redirect based on role and camp events
          const userRole = user.role.toLowerCase();
          if (userRole === "admin") {
            navigate("/camp"); // Admins can access all camps
          } else if (userRole === "coordinator" || userRole === "monitor") {
            if (campEvents && campEvents.length > 0) {
              // Redirect to the first camp event's detail page or a dashboard
              navigate(`/attendance`);
            } else {
              setErrorMsg("No camp events assigned to this user.");
              setLoading(false);
              return;
            }
          } else {
            navigate("/camp"); // Fallback for unknown roles
          }
        } else {
          console.warn("No token found in response data!");
          setErrorMsg("Login failed: No token received.");
        }

        console.log("Login success:", response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#8CBEE7]">
        <div className="w-full max-w-[604.5px] px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-8">LOGIN</h2>
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-white text-xl mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-[#1922CE] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-white text-xl mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-[#1922CE] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
                required
              />
            </div>

            <div className="text-left">
              <a href="#" className="text-sm text-blue-700 font-semibold hover:underline">
                Forget Password?
              </a>
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-xl py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block md:w-1/2 bg-white">
        <img src={loginImg} alt="Login visual" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default LoginPage;