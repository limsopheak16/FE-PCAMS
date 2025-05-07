// components/sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Pse-logo.webp"; // Your logo image path
import {
    Calendar,
    Users,
    LogOut,
    Bell,
    User,
    LayoutDashboard,
} from "lucide-react"; // Using lucide-react icons

const SidebarMenu = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Dashboard"); // Default active item

    const handleLogout = () => {
        console.log("Logging out...");
        navigate("/login"); // Redirect to login page
    };

    const menuItems = [
        { icon: Calendar, label: "Camp", route: "/camp" },
        { icon: Users, label: "Attendance", route: "/attendance" },
        { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard" },
        { icon: User, label: "Add Character", route: "/add-character" },
        { icon: Bell, label: "Notification", route: "/notifications" },
    ];

    return (
        <div style={{ border: "1px solid #EDEDED" }} className="w-[272px] h-screen border-r bg-[#EDEDED] flex flex-col shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 px-5 py-8">
                <div className="w-15 h-15 rounded-full flex items-center justify-center">
                    <img
                        src={logo}
                        alt="PCAMS Logo"
                        className="rounded-full w-15 h-15"
                    />
                </div>
                <span style={{ color: "#2F53AE" }} className="font-bold mr-6 text-3xl">PCAMS</span>
            </div>
            <hr className="border-[#3D73FA] w-[229px] mx-auto" />

            {/* Navigation Menu */}
            <nav className="p-5 space-y-10 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            onClick={() => {
                                setActiveItem(item.label);
                                navigate(item.route); // Navigate to the selected route
                            }}
                            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition text-xl ${activeItem === item.label
                                ? "bg-white text-blue-600"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    );
                })}
            </nav>
            <hr className="border-[#3D73FA] w-[229px] mx-auto mt-5" />

            {/* User Profile */}
            <div className="flex items-center gap-3 px-5 py-8">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
                    <img
                        src={logo}
                        alt="PCAMS Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-lg text-black">Seng Kimer</span>
                    <span className="text-sm text-gray-500">Super Admin</span>
                </div>
            </div>

            {/* Logout Button */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 py-2 rounded-md"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SidebarMenu;
