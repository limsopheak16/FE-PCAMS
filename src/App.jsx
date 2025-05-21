import React from "react";
import { Routes, Route } from "react-router-dom";
import PSECampsPage from "./pages/campPage";
import DashboardCoordinator from "./pages/dashboradPageCoordinator";
import TrackingAttendancePage from "./pages/tracking-attendance";
import LoginPage from "./pages/loginPage";
import DashboardAdmin from "./pages/deshboradPageAdmin";
import Notification from "./pages/notificationPage";
import ProfilePage from "./pages/profilePage";
import CreateChildPage from "./pages/createChildrenPage";
import CreateCampPage from "./pages/createCampPage";
import Fromadduser from "./components/AddUser_form";
import StaffTable from "./pages/StaffTable";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/camp"
        element={
          <ProtectedRoute>
            <PSECampsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addcamp"
        element={
          <ProtectedRoute>
            <CreateCampPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <TrackingAttendancePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardCoordinator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <StaffTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adduser"
        element={
          <ProtectedRoute>
            <Fromadduser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addchild"
        element={
          <ProtectedRoute>
            <CreateChildPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/:id"
        element={
          <ProtectedRoute>
            <div>Staff Details Page (Placeholder)</div>
          </ProtectedRoute>
        }
      />

      {/* Default route goes to login if no token */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
