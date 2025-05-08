import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Pse-logo.webp";

import {
    Calendar,
    Users,
    LogOut,
    Bell,
    User,
    LayoutDashboard,
    Menu as MenuIcon,
    X as CloseIcon,
} from "lucide-react";

const SidebarMenu = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Dashboard");
    const [isOpen, setIsOpen] = useState(true); // For mobile

    const handleLogout = () => {
        console.log("Logging out...");
        navigate("/login");
    };

    const menuItems = [
        { icon: Calendar, label: "Camp", path: "/camp" },
        { icon: Users, label: "Attendance", path: "/attendance" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: User, label: "Add character", path: "/add-character" },
        { icon: Bell, label: "Notification", path: "/notification" },

    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center p-4 bg-[#EDEDED] border-b z-50">
                <span className="font-bold text-[#2F53AE] text-2xl">PCAMS</span>
                <button onClick={toggleSidebar}>
                    {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                style={{ border: "1px solid #EDEDED" }}
                className={`w-[272px] bg-[#EDEDED] h-screen overflow-y-auto flex flex-col shadow-sm border-r transition-transform duration-300 fixed md:static z-50 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-5 py-8">
                    <div className="w-15 h-15 rounded-full flex items-center justify-center">
                        <img
                            src={logo}
                            alt="PCAMS Logo"
                            className="rounded-full w-15 h-15"
                        />
                    </div>
                    <span className="font-bold text-3xl text-[#2F53AE] mr-6">
                        PCAMS
                    </span>
                </div>

                <hr className="border-[#3D73FA] w-[229px] mx-auto" />

                {/* Navigation */}
                <nav className="p-5 space-y-6 flex-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                onClick={() => {
                                    setActiveItem(item.label);
                                    navigate(item.path);
                                    if (window.innerWidth < 768) setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition text-xl ${
                                    activeItem === item.label
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

                {/* User Info */}
                <div className="hidden md:flex items-center gap-3 px-5 py-8">
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

                {/* Logout */}
                <div className="hidden md:block p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 py-2 rounded-md"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;
