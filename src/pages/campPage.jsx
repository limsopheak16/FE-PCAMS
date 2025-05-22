import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SidebarMenu from "../components/sidebar";
import { getCamps } from "../api/getcamp";

const PSECampsPage = () => {
  const navigate = useNavigate();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamps = async () => {
      const data = await getCamps();
      if (data) {
        setCamps(data);
      } else {
        toast.error("Failed to fetch camp data.");
      }
      setLoading(false);
    };

    fetchCamps();
  }, []);

  const handleRowClick = (campId) => {
    navigate(`/camp/${campId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />
      <div className="flex-1 md:ml-[250px]">
        {/* Unified Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-5 md:py-3">
          <h1 className="text-lg font-bold text-gray-900 md:text-xl">PSE Camps</h1>
          <button
            onClick={() => navigate("/addcamp")}
            className="flex items-center gap-2 bg-[#4F7CFF] text-white px-4 py-2 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-sm md:text-base md:px-5 md:py-2.5"
            aria-label="Create a new camp"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Camp</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Create Camp Button (Mobile) */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => navigate("/addcamp")}
                className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] text-white px-4 py-3 rounded-lg hover:bg-[#3B65E6] transition-shadow hover:shadow-md text-base"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create Camp</span>
              </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        Loading...
                      </td>
                    </tr>
                  ) : camps.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-8 text-sm md:text-base">
                        No camps found.
                      </td>
                    </tr>
                  ) : (
                    camps.map((camp) => (
                      <tr
                        key={camp.id}
                        onClick={() => handleRowClick(camp.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{camp.camp_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{camp.camp_location}</td>
                    
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {loading ? (
                <div className="text-center text-gray-500 py-8 text-sm">Loading...</div>
              ) : camps.length === 0 ? (
                <div className="text-center text-gray-500 py-8 text-sm">No camps found.</div>
              ) : (
                camps.map((camp) => (
                  <div
                    key={camp.id}
                    onClick={() => handleRowClick(camp.id)}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 truncate">{camp.camp_name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Location: {camp.camp_location}</p>
                    
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PSECampsPage;
