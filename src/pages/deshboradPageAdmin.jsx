import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { toast } from "react-toastify";
import { fetchDataAdmin } from "../api/getforadmin";

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
  const [startDate, setStartDate] = useState(""); // Default to match Postman test
  const [endDate, setEndDate] = useState(""); // Default to match Postman test
  const [dateError, setDateError] = useState("");
  const [pending, setPending] = useState(false);

  const [chartLabels, setChartLabels] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [absentData, setAbsentData] = useState([]);
  const [stats, setStats] = useState({
    totalCoordinators: 0,
    totalMonitors: 0,
    totalChildren: 0,
    attendanceSummary: {
      totalChildren: 0,
      presentChildren: 0,
      absentChildren: 0,
    },
  });

  const chartRef = useRef(null);

  // Fetch dashboard data when startDate or endDate changes
  useEffect(() => {
    if (!startDate || !endDate) return;

    // Validate dates (only check if start date is after end date)
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setDateError("Start date cannot be after end date");
      return;
    }
    // Removed future date validation to match Postman
    // if (end > today) {
    //   setDateError("End date cannot be in the future");
    //   return;
    // }
    setDateError("");

    const fetchData = async () => {
      try {
        console.log("Fetching data with params:", { startDate, endDate });
        const data = await fetchDataAdmin({
          startDate,
          endDate,
          setPending,
        });

        if (data) {
          // Map the API response to the state
          setStats({
            totalCoordinators: data.totalCoordinators || 0,
            totalMonitors: data.totalMonitors || 0,
            totalChildren: data.totalChildren || 0,
            attendanceSummary: {
              totalChildren: data.attendanceSummary.totalChildren || 0,
              presentChildren: data.attendanceSummary.presentChildren || 0,
              absentChildren: data.attendanceSummary.absentChildren || 0,
            },
          });

          // Set chart data for present vs absent children
          const labels = [startDate, endDate];
          const present = data.attendanceSummary.presentChildren || 0;
          const absent = data.attendanceSummary.absentChildren || 0;
          setChartLabels(labels);
          setPresentData([present, present]);
          setAbsentData([absent, absent]);

          console.log("Fetched dashboard data:", data);
        } else {
          toast.error("Failed to fetch dashboard data");
          setChartLabels([]);
          setPresentData([]);
          setAbsentData([]);
          setStats({
            totalCoordinators: 0,
            totalMonitors: 0,
            totalChildren: 0,
            attendanceSummary: {
              totalChildren: 0,
              presentChildren: 0,
              absentChildren: 0,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
        setChartLabels([]);
        setPresentData([]);
        setAbsentData([]);
        setStats({
          totalCoordinators: 0,
          totalMonitors: 0,
          totalChildren: 0,
          attendanceSummary: {
            totalChildren: 0,
            presentChildren: 0,
            absentChildren: 0,
          },
        });
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Removed unused getTodayDateString function to resolve the compile error


  const attendanceChartData = useMemo(() => {
    const chart = chartRef.current;
    let gradientPresent = null;
    let gradientAbsent = null;

    if (chart && chart.ctx && chart.chartArea) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      gradientPresent = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradientPresent.addColorStop(0, "rgba(79, 124, 255, 0.8)");
      gradientPresent.addColorStop(1, "rgba(79, 124, 255, 0.1)");

      gradientAbsent = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradientAbsent.addColorStop(0, "rgba(255, 99, 132, 0.8)");
      gradientAbsent.addColorStop(1, "rgba(255, 99, 132, 0.1)");
    }

    return {
      labels: chartLabels,
      datasets: [
        {
          label: "Present Children",
          data: presentData,
          borderColor: "#4F7CFF",
          backgroundColor: gradientPresent || "rgba(79, 124, 255, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#4F7CFF",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#4F7CFF",
        },
        {
          label: "Absent Children",
          data: absentData,
          borderColor: "#FF6384",
          backgroundColor: gradientAbsent || "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#FF6384",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#FF6384",
        },
      ],
    };
  }, [chartLabels, presentData, absentData]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...presentData, ...absentData, 50) + 5,
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
    }),
    [presentData, absentData]
  );

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
                {/* Start Date */}
                <div className="w-full sm:w-40">
                  <label htmlFor="start-date" className="block text-sm font-semibold text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    // Removed max={today} to allow future dates
                    className="w-full bg-gray-100 rounded-md px-4 py-2"
                  />
                </div>

                {/* End Date */}
                <div className="w-full sm:w-40">
                  <label htmlFor="end-date" className="block text-sm font-semibold text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    // Removed max={today} to allow future dates
                    className="w-full bg-gray-100 rounded-md px-4 py-2"
                  />
                </div>
              </div>
              {dateError && <p className="text-red-500 mt-2 text-sm">{dateError}</p>}
            </div>

            {/* Loading Indicator */}
            {pending && <p className="text-gray-500 text-center">Loading dashboard data...</p>}

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
                <p className="text-sm text-gray-500">Total Children (Unique)</p>
                <h2 className="text-2xl font-bold text-orange-500">{stats.totalChildren}</h2>
              </div>
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Total Attendance Records</p>
                <h2 className="text-2xl font-bold text-purple-600">{stats.attendanceSummary.totalChildren}</h2>
              </div>
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Present Children</p>
                <h2 className="text-2xl font-bold text-green-600">{stats.attendanceSummary.presentChildren}</h2>
              </div>
              <div className="bg-white p-4 shadow-sm border rounded-xl text-center">
                <p className="text-sm text-gray-500">Absent Children</p>
                <h2 className="text-2xl font-bold text-red-600">{stats.attendanceSummary.absentChildren}</h2>
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