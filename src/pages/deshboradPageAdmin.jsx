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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  const [camps] = useState([
    { id: "1", camp_name: "Winter Camp A" },
    { id: "2", camp_name: "Winter Camp B" },
  ]);

  const [chartLabels, setChartLabels] = useState([
    "2025-01-01",
    "2025-01-02",
    "2025-01-03",
    "2025-01-04",
    "2025-01-05",
  ]);
  const [chartData, setChartData] = useState([10, 20, 15, 25, 30]);

  const [stats, setStats] = useState({
    totalCoordinators: 3,
    totalMonitors: 12,
    totalChildren: 150,
  });

  const chartRef = useRef(null);

  const handleCampChange = (e) => {
    setSelectedCamp(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const today = getTodayDateString();

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
      labels: chartLabels,
      datasets: [
        {
          label: "Attendance",
          data: chartData,
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

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: chartData.length > 0 ? Math.max(...chartData) + 5 : 50,
        ticks: {
          stepSize: 5,
          color: "#6B7280",
          font: { size: 15 },
        },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      x: {
        ticks: {
          color: "#6B7280",
          font: { size: 15 },
        },
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#374151",
          font: { size: 14 },
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
  }), [chartData]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu />

      <div className="flex-1 md:ml-[272px]">
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Camp Overview</h1>
        </header>

        <main className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="max-w-7xl mx-auto">

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
                {/* Camp Select */}
                <div className="w-full sm:w-64">
                  <label htmlFor="camp-select" className="block text-sm font-semibold text-gray-700 mb-1">Select Camp</label>
                  <select
                    id="camp-select"
                    value={selectedCamp}
                    onChange={handleCampChange}
                    className="w-full bg-gray-100 rounded-md px-4 py-2"
                  >
                    <option value="">All Camps</option>
                    {camps.map((camp) => (
                      <option key={camp.id} value={camp.id}>{camp.camp_name}</option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="w-full sm:w-40">
                  <label htmlFor="start-date" className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    max={today}
                    className="w-full bg-gray-100 rounded-md px-4 py-2"
                  />
                </div>

                {/* End Date */}
                <div className="w-full sm:w-40">
                  <label htmlFor="end-date" className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    max={today}
                    className="w-full bg-gray-100 rounded-md px-4 py-2"
                  />
                </div>
              </div>
              {dateError && <p className="text-red-500 mt-2 text-sm">{dateError}</p>}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Coordinators</p>
                <h2 className="text-2xl font-bold text-blue-600">{stats.totalCoordinators}</h2>
              </div>
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Monitors</p>
                <h2 className="text-2xl font-bold text-green-600">{stats.totalMonitors}</h2>
              </div>
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Children</p>
                <h2 className="text-2xl font-bold text-orange-500">{stats.totalChildren}</h2>
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="h-80">
                <Line ref={chartRef} data={attendanceChartData} options={chartOptions} />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
