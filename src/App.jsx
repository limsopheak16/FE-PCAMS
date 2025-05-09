import React from "react";
import { Routes, Route } from "react-router-dom";
import PSECampsPage from "./pages/campPage";
import DashboardCoordinator from "./pages/dashboradPageCoordinator";
import TrackingAttendancePage from "./pages/tracking-attendance";
import LoginPage from "./pages/loginPage";
import StaffTable from "./pages/createUserPage"
import DashboardAdmin from "./pages/deshboradPageAdmin"
import Notification from "./pages/notificationPage";


const App = () => {
  return (
    <Routes>
      <Route path="/camp" element={<PSECampsPage />} />
      <Route path="/attendance" element={<TrackingAttendancePage />} />
      <Route path="/dashboard" element={<DashboardCoordinator />} />
      <Route path="/adduser" element={<StaffTable />} />
      <Route path="/notification" element={< Notification/>} />
   
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admindashboard" element={<DashboardAdmin />} />

      {/* Optional: Default route */}
      <Route path="*" element={<PSECampsPage />} />
    </Routes>
  );
};


export default App;