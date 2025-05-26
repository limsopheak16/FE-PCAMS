import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Sidebar from "../components/sidebar";
import { Calendar, Users, CheckCircle2, Trash2 } from "lucide-react"; // Added Trash2 icon for remove

const CampEventDetailPage = () => {
  const { campEventId } = useParams(); // Get the camp event ID from the URL
  const navigate = useNavigate();
  const [campEvent, setCampEvent] = useState(null);
  const [campName, setCampName] = useState("Unknown Camp");
  const [organizers, setOrganizers] = useState([]);
  const [campEventOrganizers, setCampEventOrganizers] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu dropdown
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [addOrganizerSuccess, setAddOrganizerSuccess] = useState(""); // State for add organizer success message
  const [removeOrganizerSuccess, setRemoveOrganizerSuccess] = useState(""); // State for remove organizer success message

  // Fetch camp event details and organizers
  useEffect(() => {
    const fetchCampEventDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch camp event details
        const campEventResponse = await axiosInstance.get(`/campevents/${campEventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Camp Event Response:", campEventResponse.data);
        if (campEventResponse.data) {
          setCampEvent(campEventResponse.data);

          // Fetch camp name using camp_id from the camp event
          if (campEventResponse.data.camp_id) {
            const campResponse = await axiosInstance.get(`/camps/${campEventResponse.data.camp_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (campResponse.data && campResponse.data.camp_name) {
              setCampName(campResponse.data.camp_name);
            }
          }
        } else {
          setCampEvent(null);
        }

        // Fetch camp event organizers
        const fetchCampEventOrganizers = async () => {
          const organizersResponse = await axiosInstance.get(`/campeventorganizers?camp_event_id=${campEventId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Camp Event Organizers Response:", organizersResponse.data);
          if (organizersResponse.data && Array.isArray(organizersResponse.data)) {
            const enrichedOrganizers = await Promise.all(
              organizersResponse.data
                .filter((organizer) => organizer.camp_event_id === campEventId)
                .map(async (organizer) => {
                  if (organizer.user_id) {
                    const userResponse = await axiosInstance.get(`/users/${organizer.user_id}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    return {
                      ...organizer,
                      username: userResponse.data?.username || userResponse.data?.name || "Unknown User",
                      role: userResponse.data?.role || "Unknown Role",
                    };
                  }
                  return { ...organizer, username: "Unknown User", role: "Unknown Role" };
                })
            );
            setCampEventOrganizers(enrichedOrganizers);
          } else {
            setCampEventOrganizers([]);
          }
        };

        fetchCampEventOrganizers();
      } catch (err) {
        setError("Failed to load camp event details: " + err.message);
      }
    };
    fetchCampEventDetails();
  }, [campEventId]);

  // Fetch available organizers (users)
  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data)) {
          const enrichedOrganizers = response.data.map((organizer) => ({
            ...organizer,
            username: organizer.username || organizer.name || "Unknown User",
            role: organizer.role || "Unknown Role",
          }));
          setOrganizers(enrichedOrganizers);
        } else {
          setOrganizers([]);
        }
      } catch (err) {
        console.error("Failed to load organizers:", err);
      }
    };
    fetchOrganizers();
  }, []);

  // Function to add organizer to camp event
  const handleAddOrganizer = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      // Check if the user is already assigned to any camp
      const allOrganizersResponse = await axiosInstance.get(`/campeventorganizers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allOrganizers = allOrganizersResponse.data || [];
      const isUserAssigned = allOrganizers.some((organizer) => organizer.user_id === userId);
      if (isUserAssigned) {
        setAddOrganizerSuccess("This user is already assigned to another camp.");
        setTimeout(() => setAddOrganizerSuccess(""), 3000); // Hide after 3 seconds
        return;
      }

      const response = await axiosInstance.post(
        `/campeventorganizers`,
        {
          user_id: userId,
          camp_event_id: campEventId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setAddOrganizerSuccess("Organizer added successfully!");
        setTimeout(() => setAddOrganizerSuccess(""), 3000); // Hide after 3 seconds
        // Re-fetch camp event organizers to update the list
        const updatedResponse = await axiosInstance.get(`/campeventorganizers?camp_event_id=${campEventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Updated Camp Event Organizers Response:", updatedResponse.data);
        const enrichedOrganizers = await Promise.all(
          updatedResponse.data
            .filter((organizer) => organizer.camp_event_id === campEventId)
            .map(async (organizer) => {
              if (organizer.user_id) {
                const userResponse = await axiosInstance.get(`/users/${organizer.user_id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                return {
                  ...organizer,
                  username: userResponse.data?.username || userResponse.data?.name || "Unknown User",
                  role: userResponse.data?.role || "Unknown Role",
                };
              }
              return { ...organizer, username: "Unknown User", role: "Unknown Role" };
            })
        );
        setCampEventOrganizers(enrichedOrganizers);
      } else {
        setAddOrganizerSuccess("Failed to add organizer.");
        setTimeout(() => setAddOrganizerSuccess(""), 3000); // Hide after 3 seconds
        console.error("Failed to add organizer:", response.data.message);
      }
    } catch (error) {
      setAddOrganizerSuccess("Error adding organizer.");
      setTimeout(() => setAddOrganizerSuccess(""), 3000); // Hide after 3 seconds
      console.error("Error adding organizer:", error);
    }
  };

  // Function to remove organizer from camp event
  const handleRemoveOrganizer = async (organizerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`/campeventorganizers/${organizerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setRemoveOrganizerSuccess("Organizer removed successfully!");
        setTimeout(() => setRemoveOrganizerSuccess(""), 3000); // Hide after 3 seconds
        // Re-fetch camp event organizers to update the list
        const updatedResponse = await axiosInstance.get(`/campeventorganizers?camp_event_id=${campEventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Updated Camp Event Organizers Response:", updatedResponse.data);
        const enrichedOrganizers = await Promise.all(
          updatedResponse.data
            .filter((organizer) => organizer.camp_event_id === campEventId)
            .map(async (organizer) => {
              if (organizer.user_id) {
                const userResponse = await axiosInstance.get(`/users/${organizer.user_id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                return {
                  ...organizer,
                  username: userResponse.data?.username || userResponse.data?.name || "Unknown User",
                  role: userResponse.data?.role || "Unknown Role",
                };
              }
              return { ...organizer, username: "Unknown User", role: "Unknown Role" };
            })
        );
        setCampEventOrganizers(enrichedOrganizers);
        // Re-fetch available organizers to ensure the removed organizer is back
        const organizersResponse = await axiosInstance.get(`/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (organizersResponse.data && Array.isArray(organizersResponse.data)) {
          const enrichedOrganizers = organizersResponse.data.map((organizer) => ({
            ...organizer,
            username: organizer.username || organizer.name || "Unknown User",
            role: organizer.role || "Unknown Role",
          }));
          setOrganizers(enrichedOrganizers);
        }
      } else {
        setRemoveOrganizerSuccess("Failed to remove organizer.");
        setTimeout(() => setRemoveOrganizerSuccess(""), 3000); // Hide after 3 seconds
        console.error("Failed to remove organizer:", response.data.message);
      }
    } catch (error) {
      setRemoveOrganizerSuccess("Error removing organizer.");
      setTimeout(() => setRemoveOrganizerSuccess(""), 3000); // Hide after 3 seconds
      console.error("Error removing organizer:", error);
    }
  };

  // Function to refresh camp event details
  const handleRefresh = async () => {
    try {
      const token = localStorage.getItem("token");
      const campEventResponse = await axiosInstance.get(`/campevents/${campEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (campEventResponse.data) {
        setCampEvent(campEventResponse.data);
        if (campEventResponse.data.camp_id) {
          const campResponse = await axiosInstance.get(`/camps/${campEventResponse.data.camp_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (campResponse.data && campResponse.data.camp_name) {
            setCampName(campResponse.data.camp_name);
          }
        }
      }
    } catch (err) {
      setError("Failed to refresh camp event details: " + err.message);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50 p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!campEvent) {
    return (
      <div className="flex min-h-screen bg-gray-50 p-6">
        <div>Loading...</div>
      </div>
    );
  }

  // Filter organizers based on search term
  const filteredOrganizers = organizers.filter((organizer) =>
    (organizer.username || organizer.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[272px]">
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Camp Event Detail</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </header>

        <main className="p-6">
          <div className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Camp Event
            </h2>
            <div className="p-4 border rounded flex justify-between items-center">
              <span>{campName}</span>
              {campName === "Unknown Camp" && (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          handleRefresh();
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Refresh
                      </button>
                      <button
                        onClick={() => {
                          navigate(-1);
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Go Back
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" /> Organizers
            </h2>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2"
              />
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
            {filteredOrganizers.map((organizer) => (
              <div
                key={organizer.id}
                className="flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-gray-800">{organizer.username || organizer.name || "Unknown User"}</span>
                  <span className="text-gray-600 text-sm">{organizer.role || "Unknown Role"}</span>
                </div>
                <button
                  onClick={() => handleAddOrganizer(organizer.id)}
                  className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
            ))}
            {addOrganizerSuccess && (
              <p className="mt-4 text-green-600 text-sm font-medium flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> {addOrganizerSuccess}
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-md shadow max-w-7xl mx-auto">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" /> Camp Event Organizers
            </h2>
            {campEventOrganizers.length > 0 ? (
              campEventOrganizers.map((organizer) => (
                <div
                  key={organizer.id}
                  className="flex items-center justify-between p-2 border-b hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-800">{organizer.username}</span>
                    <span className="text-gray-600 text-sm">{organizer.role}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveOrganizer(organizer.id)}
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No organizers assigned to this camp event.</p>
            )}
            {removeOrganizerSuccess && (
              <p className="mt-4 text-green-600 text-sm font-medium flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" /> {removeOrganizerSuccess}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CampEventDetailPage;