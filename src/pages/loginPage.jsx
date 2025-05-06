import React, { useState } from "react";
import loginImg from "../assets/login.jpg"; // Replace with your image

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Form */}
            <div style={{ backgroundColor: "#8CBEE7" }} className="w-full md:w-1/2 flex items-center justify-center">
    <div className="w-full max-w-[604.5px] ">
        <h2 className="text-4xl font-bold text-center text-white mb-8">LOGIN</h2>
        <form onSubmit={handleSubmit} className="space-y-7">
            <div>
                <label className="block text-white text-xl mb-2">Email Address</label>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: "1px solid #1922CE",width: "604.5px" }}
                    className="w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-white text-xl mb-2">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: "1px solid #1922CE" ,width: "604.5px"}}
                    className="w-full px-4 py-3 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="text-left">
                <a href="#" className="text-sm text-blue-700 font-semibold hover:underline">
                    Forget Password?
                </a>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white text-xl py-3 rounded-md hover:bg-blue-700 transition"
                style={{ width: "604.5px" }}
            >
                Login
            </button>
        </form>
    </div>
</div>


            {/* Right Section - Image */}
            <div className="hidden md:block md:w-1/2 bg-white">
                <img
                    src={loginImg}
                    alt="Login visual"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};

export default LoginPage;
