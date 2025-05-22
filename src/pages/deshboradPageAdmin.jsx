import React, { useState, useMemo, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import SidebarMenu from "../components/sidebar";
import axiosInstance from "../api/axiosInstance";
import { getcamp } from "../api/getcamp";
import {fetchAttendanceData} from "../api/attendancedate"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardAdmin = () => {
  const [selectedCamp, setSelectedCamp] = useState("");
  const [pending, setPending] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [camps, setCamps] = useState([]); 
  const [attendance, setAttendance] = useState([]); 


  // Stats from API
  const [stats, setStats] = useState({
    totalCoordinators: 0,
    totalMonitors: 0,
    totalChildren: 0,
  });

  // Chart data from API
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const chartRef = useRef(null);

  // Handle camp selection change
  const handleCampChange = (e) => {
    setSelectedCamp(e.target.value);
  };

  // Date validation function
  const validateDates = (start, end) => {
    const currentDate = new Date("2025-05-16T15:28:00+07:00");
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (start && end) {
      if (startDateObj > endDateObj) {
        setDateError("Start date must be before or equal to end date");
        return false;
      } else if (endDateObj > currentDate) {
        setDateError("End date cannot be in the future");
        return false;
      } else {
        setDateError("");
        return true;
      }
    } else {
      setDateError("");
      return false;
    }
  };

  // Handlers for start and end date changes
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Get today's date string for max attribute in date inputs
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const today = getTodayDateString();

  // Fetch camps once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const camp = await getcamp();
        if (camp && Array.isArray(camp)) {
          setCamps(camp);
        }
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const valid = validateDates(startDate, endDate);
  
    if (selectedCamp && startDate && endDate && valid) {
      (async () => {
        const data = await fetchAttendanceData({ selectedCamp, startDate, endDate, setPending });
        if (data) {
          setChartLabels(data.labels || []);
          setChartData(data.data || []);
          setAttendance({
            totalCoordinators: data.totalCoordinators || 0,
            totalMonitors: data.totalMonitors || 0,
            totalChildren: data.totalChildren || 0,
          });
        }
      })();
    }
  }, [selectedCamp, startDate, endDate]);
  
  
  

  // Fetch attendance data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendance = await fetchAttendanceData({ selectedCamp, startDate, endDate, setPending });
        if (attendance) {
          setAttendance(attendance);
        }
        console.log("=========================", attendance);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchData();
  }, []);
  
 

  // Prepare chart data with gradient background
  const attendanceChartData = useMemo(() => {
    const chart = chartRef.current;
    let gradient = null;

    if (chart && chart.ctx && chart.chartArea) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, "rgba(79, 124, 255, 0.8)");
      gradient.addColorStop(1, "rgba(79, 124, 255, 0.1)");
    }

    return {
      labels: chartLabels.length > 0 ? chartLabels : ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance",
          data: chartData.length > 0 ? chartData : [10, 20, 25, 30, 50],
          borderColor: "#4F7CFF",
          backgroundColor: gradient || "rgba(79, 124, 255, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#4F7CFF",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#4F7CFF",
        },
      ],
    };
  }, [chartLabels, chartData]);

  // Chart options with dynamic Y max based on data
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...chartData, 50),
          ticks: {
            stepSize: 10,
            color: "#6B7280",
            font: {
              size: 12,
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          ticks: {
            color: "#6B7280",
            font: {
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#374151",
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#fff",
          bodyColor: "#fff",
          borderColor: "#4F7CFF",
          borderWidth: 1,
        },
      },
    }),
    [chartData]
  );

  const cardStyle =
    "border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6 bg-white hover:shadow-md transition-shadow";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 md:ml-[272px]">
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <div className="max-w-md sm:max-w-2xl md:max-w-7xl mx-auto mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                  {/* Camp Select */}
                  <div className="w-full sm:w-64">
                    <label
                      htmlFor="camp-select"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Select Camp
                    </label>
                    <select
                      id="camp-select"
                      value={selectedCamp}
                      onChange={handleCampChange}
                      className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                    >
                      <option value="">All Camps</option>
                      {camps.map((camp) => (
                        <option key={camp.id} value={camp.id}>
                          {camp.camp_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Date */}
                  <div className="w-full sm:w-40">
                    <label
                      htmlFor="start-date"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      max={today}
                      className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                    />
                  </div>

                  {/* End Date */}
                  <div className="w-full sm:w-40">
                    <label
                      htmlFor="end-date"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      End Date
                    </label>
                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      max={today}
                      className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                    />
                  </div>
                </div>
                {dateError && (
                  <p className="text-sm text-red-500 mt-2">{dateError}</p>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className={cardStyle}>
                <h3 className="text-lg font-semibold text-gray-800">Total Coordinators</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{attendance.totalCoordinators}</p>
              </div>
              <div className={cardStyle}>
                <h3 className="text-lg font-semibold text-gray-800">Total Monitors</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{attendance.totalMonitors}</p>
              </div>
              <div className={cardStyle}>
                <h3 className="text-lg font-semibold text-gray-800">Total Children</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">{attendance.totalChildren}</p>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Attendance Trend
              </h2>
              <div className="h-80">
                <Line
                  ref={chartRef}
                  data={attendanceChartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardAdmin;