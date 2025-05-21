import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    { icon: Calendar, label: "Camp", path: "/camp" },
    { icon: Users, label: "Attendance", path: "/attendance" },
    { icon: LayoutDashboard, label: "Coordinator Dashboard", path: "/dashboard" },
    { icon: User, label: "Add User", path: "/user" },
    { icon: Bell, label: "Notification", path: "/notification" },
    { icon: LayoutDashboard, label: "Admin Dashboard", path: "/admindashboard" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="PCAMS Logo"
              className="rounded-full w-10 h-10 object-cover"
            />
            <span className="font-bold text-xl text-[#2F53AE]">PCAMS</span>
          </div>
          <button onClick={toggleSidebar}>
            {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="bg-white shadow-lg border-t">
            <div className="flex flex-col px-4 py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <div
                    key={item.label}
                    onClick={() => handleMenuClick(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-base
                      ${
                        isActive
                          ? "bg-[#EDEDED] text-[#165FFD] font-semibold"
                          : "hover:bg-[#EDEDED] text-gray-700"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
              {/* Profile in Mobile Menu */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#EDEDED] transition"
                onClick={goToProfile}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={logo}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-base text-black">
                    Seng Kimer
                  </span>
                  <span className="text-sm text-gray-500">Super Admin</span>
                </div>
              </div>
              {/* Logout in Mobile Menu */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-[#EDEDED] rounded-lg"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[272px] bg-[#EDEDED] h-screen overflow-y-auto flex-col shadow-sm border-r fixed top-0 left-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-8">
          <img
            src={logo}
            alt="PCAMS Logo"
            className="rounded-full w-14 h-14 object-cover"
          />
          <span className="font-bold text-3xl text-[#2F53AE]">PCAMS</span>
        </div>

        <hr className="border-[#3D73FA] w-[229px] mx-auto" />

        {/* Navigation */}
        <nav className="p-5 flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.label}
                onClick={() => handleMenuClick(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-lg
                  ${
                    isActive
                      ? "bg-white text-[#165FFD] font-semibold border-l-4 border-[#165FFD] shadow-sm"
                      : "hover:bg-white hover:text-[#165FFD] text-gray-700"
                  }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <hr className="border-[#3D73FA] w-[229px] mx-auto mt-5" />

        {/* User Info - Profile */}
        <div
          className="flex items-center gap-3 px-5 py-6 cursor-pointer hover:bg-white transition"
          onClick={goToProfile}
        >
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
            <img
              src={logo}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg text-black">Seng Kimer</span>
            <span className="text-sm text-gray-500">Super Admin</span>
          </div>
        </div>

        {/* Logout */}
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
    </>
  );
};

export default SidebarMenu;