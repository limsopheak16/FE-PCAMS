import React from "react";
import { Routes, Route } from "react-router-dom";
import PSECampsPage from "./pages/campPage";
import DashboardCoordinator from "./pages/dashboradPageCoordinator";
import TrackingAttendancePage from "./pages/tracking-attendance";
import LoginPage from "./pages/loginPage";
// import StaffTable from "./pages/createUserPage" (Removed duplicate import)
import DashboardAdmin from "./pages/deshboradPageAdmin"
import Notification from "./pages/notificationPage";
import ProfilePage from "./pages/profilePage";
import CreateChildPage from "./pages/createChildrenPage";
import Fromadduser from "./components/AddUser_form";
import StaffTable from "./pages/StaffTable";


const App = () => {
  return (
    <Routes>
      <Route path="/camp" element={<PSECampsPage />} />
      <Route path="/attendance" element={<TrackingAttendancePage />} />
      <Route path="/dashboard" element={<DashboardCoordinator />} />
      <Route path="/user" element={<StaffTable />} />
      <Route path="/notification" element={< Notification/>} />
      <Route path="/adduser" element={<Fromadduser />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admindashboard" element={<DashboardAdmin />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/addchild" element={<CreateChildPage />} />
      <Route path="/staff/:id" element={<div>Staff Details Page (Placeholder)</div>} />


      {/* Optional: Default route */}
      <Route path="*" element={<PSECampsPage />} />
    </Routes>
  );
};


export default App;