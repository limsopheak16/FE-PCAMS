import React, { useState, useMemo, useRef } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardAdmin = () => {
  const [selectedCamp, setSelectedCamp] = useState("");
  const [pending, setPending] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const chartRef = useRef(null);

  const handleCampChange = (e) => {
    const value = e.target.value;
    setSelectedCamp(value);
    if (value !== "Select Camp") {
      setPending(true);
      setTimeout(() => setPending(false), 1000);
    }
  };

  const validateDates = (start, end) => {
    const currentDate = new Date("2025-05-16T15:28:00+07:00"); // 03:28 PM +07, May 16, 2025
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (start && end) {
      if (startDateObj > endDateObj) {
        setDateError("Start date must be before or equal to end date");
      } else if (endDateObj > currentDate) {
        setDateError("End date cannot be in the future");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    validateDates(value, endDate);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    validateDates(startDate, value);
  };

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
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance",
          data: [10, 20, 25, 30, 50],
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
  }, []);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
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
    []
  );

  const stats = {
    camps: 4,
    coordinators: 12,
    monitors: 24,
    children: 150,
  };

  const cardStyle =
    "border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6 bg-white hover:shadow-md transition-shadow";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[272px]">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        {/* Main Content */}
        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Filters Section */}
            <div className="max-w-md sm:max-w-2xl md:max-w-7xl mx-auto mb-8 ">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                  <div className="w-full sm:w-64">
                    <label
                      htmlFor="camp-select"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Select Camp
                    </label>
                    <select
                      id="camp-select"
                      onChange={handleCampChange}
                      value={selectedCamp}
                      className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                      aria-label="Select a camp"
                    >
                      <option value="Select Camp">Select Camp</option>
                      <option value="Teenager">Teenager</option>
                      <option value="Control">Control</option>
                      <option value="Kids">Kids</option>
                      <option value="Others">Others</option>
                    </select>
                    {pending && (
                      <p className="text-sm text-gray-500 mt-1 italic">Loading data...</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
                        max="2025-05-16"
                        className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                        aria-label="Select start date"
                      />
                    </div>
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
                        max="2025-05-16"
                        className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 sm:py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F7CFF] transition"
                        aria-label="Select end date"
                      />
                    </div>
                  </div>
                </div>
                {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
              </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-md sm:max-w-2xl md:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {Object.entries(stats).map(([label, value]) => (
                <div
                  key={label}
                  className={cardStyle}
                  role="region"
                  aria-label={`${label}: ${value}`}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-[#4F7CFF]">{value}</p>
                  <h2 className="text-base sm:text-lg font-semibold capitalize text-gray-700">{label}</h2>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="max-w-md sm:max-w-2xl md:max-w-7xl mx-auto">
              <div className="p-4 sm:p-6 rounded-xl shadow-sm bg-white border border-gray-200 h-[350px] sm:h-[400px]">
                <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Total Attendance</h2>
                {pending ? (
                  <div className="flex justify-center items-center h-[270px] sm:h-[320px]">
                    <p className="text-gray-500 italic">Loading chart...</p>
                  </div>
                ) : (
                  <Line
                    ref={chartRef}
                    data={attendanceChartData}
                    options={{ ...chartOptions, maintainAspectRatio: false }}
                    aria-label="Attendance chart showing total attendance over selected days"
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;