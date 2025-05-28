import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Pse-logo.webp";
import { getUserProfile } from "../api/getUserProfile"; // Import the getUserProfile function
import {
  Calendar,
  Users,
  LogOut,
  Bell,
  User,
  LayoutDashboard,
  MenuIcon,
  X as CloseIcon,
} from "lucide-react";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [userRole, setUserRole] = useState("Loading...");
  const [, setError] = useState(null);

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setUserName(profile.username || profile.name || "Unknown User");
        setUserRole(profile.role || "Unknown Role");

        // Navigate to default path based on role after profile is loaded
        const defaultPath = getDefaultPath(profile.role);
        if (location.pathname === "/" || location.pathname === "") {
          navigate(defaultPath);
        }
      } else {
        setError("Failed to load user profile.");
        setUserName("Unknown User");
        setUserRole("Unknown Role");
      }
    };
    fetchUserProfile();
  }, [navigate, location.pathname]);

  // Determine default path based on role
  const getDefaultPath = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "/camp";
      case "coordinator":
        return "/attendance";
      case "monitor":
        return "/attendance";
      default:
        return "/camp"; // Fallback to admin default if role is unknown
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Define all menu items
  const allMenuItems = [
    { icon: Calendar, label: "Camp", path: "/camp" },
    { icon: Calendar, label: "Event Camp", path: "/eventcamp" },
    { icon: Users, label: "Attendance", path: "/attendance" },
    { icon: LayoutDashboard, label: "Coordinator Dashboard", path: "/dashboard" },
    { icon: User, label: "User", path: "/user" },
    // { icon: Bell, label: "Notification", path: "/notification" },
    { icon: LayoutDashboard, label: "Admin Dashboard", path: "/admindashboard" },
  ];

  // Filter menu items based on role
  const menuItems = (() => {
    switch (userRole.toLowerCase()) {
      case "admin":
        return allMenuItems;
      case "coordinator":
        return allMenuItems.filter(
          (item) =>
            item.path === "/attendance" || item.path === "/dashboard"
        );
      case "monitor":
        return allMenuItems.filter((item) => item.path === "/attendance");
      default:
        return allMenuItems; // Fallback to admin view if role is unknown
    }
  })();

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
                const isActive =
                  item.path === "/eventcamp"
                    ? location.pathname === "/eventcamp" ||
                      location.pathname.startsWith("/eventcamp/") ||
                      location.pathname.startsWith("/eventcampdetail/")
                    : location.pathname === item.path;

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
                  <span className="font-medium text-base text-black">{userName}</span>
                  <span className="text-sm text-gray-500">{userRole}</span>
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
            const isActive =
              item.path === "/eventcamp"
                ? location.pathname === "/eventcamp" ||
                  location.pathname.startsWith("/eventcamp/") ||
                  location.pathname.startsWith("/campeventdetail/")
                : location.pathname === item.path;

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
          <img
            src={logo}
            alt="User Avatar"
            className="rounded-full w-12 h-12 object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-lg text-black">{userName}</span>
            <span className="text-sm text-gray-500">{userRole}</span>
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