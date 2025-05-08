import React from "react";
import { Routes, Route } from "react-router-dom";
import PSECampsPage from "./pages/campPage";
import DashboardCoordinator from "./pages/dashboradPageCoordinator";
import TrackingAttendancePage from "./pages/tracking-attendance";
// import AddCharacterPage from "./pages/addCharacterPage";
import LoginPage from "./pages/loginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/camp" element={<PSECampsPage />} />
      <Route path="/dashboard" element={<DashboardCoordinator />} />
      <Route path="/attendance" element={<TrackingAttendancePage />} />
      {/* <Route path="/add-character" element={<AddCharacterPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      {/* Optional: Default route */}
      <Route path="*" element={<PSECampsPage />} />
    </Routes>
  );
};

export default App;