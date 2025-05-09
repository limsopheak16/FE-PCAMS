import React, { useState, useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import SidebarMenu from "../components/sidebar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardAdmin = () => {
  const [, setSelectedCamp] = useState('');
  const [pending, setPending] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const chartRef = useRef(null);

  const handleCampChange = (e) => {
    const value = e.target.value;
    setSelectedCamp(value);
    if (value !== 'Select Camp') {
      setPending(true);
      setTimeout(() => setPending(false), 1000);
    }
  };

  const attendanceChartData = useMemo(() => {
    const chart = chartRef.current;

    let gradient = null;
    if (chart && chart.ctx && chart.chartArea) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, 'rgba(22, 95, 253, 0.8)');
      gradient.addColorStop(1, 'rgba(22, 95, 253, 0.1)');
    }

    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Attendance',
          data: [10, 20, 25, 30, 50],
          borderColor: '#165FFD',
          backgroundColor: gradient || 'rgba(22, 95, 253, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 50,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const stats = {
    camps: 4,
    coordinators: 12,
    monitors: 24,
    children: 150,
  };

  const cardStyle = 'border border-[#165FFD] rounded-lg shadow-md text-center p-6';

  return (
    <div className="flex min-h-screen">
      <SidebarMenu />

      <div className="flex-1 px-8 py-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Camp Overview</h1>

        <div className="mb-6 flex flex-wrap gap-6 justify-between items-end">
          <div className="w-full sm:w-64">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Camp</label>
            <select
              onChange={handleCampChange}
              className="w-full bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Select Camp</option>
              <option>Teenager</option>
              <option>Control</option>
              <option>Kids</option>
              <option>Others</option>
            </select>
            {pending && <p className="text-sm text-gray-500 mt-1 italic">Loading data...</p>}
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-100 text-gray-700 font-medium rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([label, value]) => (
            <div key={label} className={cardStyle}>
              <p className="text-3xl font-bold text-blue-700">{value}</p>
              <h2 className="text-lg font-semibold capitalize">{label}</h2>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-white mb-12">
          <h2 className="text-xl font-semibold mb-4">Total Attendance</h2>
          <Line ref={chartRef} data={attendanceChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
