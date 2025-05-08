import React from 'react'
import './App.css'
// import LoginPage from './pages/loginPage';

import SidebarMenu from './components/sidebar';
// import DashboardAdmin from './pages/deshboradPageAdmin';
// import DashboardCoordinator from './pages/dashboradPageCoordinator';
import StaffTable from './pages/createUserPage'

import PSECampsPage from './pages/campPage'
import TrackingAttendancePage from'./pages/tracking-attendance'
// import SidebarMenu from './components/sidebar';
import DashboardAdmin from './pages/deshboradPageAdmin';
import DashboardCoordinator from './pages/dashboradPageCoordinator';



export default function App() {
  return (
    <>
      {/* <LoginPage /> */}

      <SidebarMenu />
      {/* < DashboardAdmin /> */}
      {/* <DashboardCoordinator /> */}
      {/* < StaffTable /> */}

      <PSECampsPage />
      {/* <TrackingAttendancePage /> */}
      {/* <SidebarMenu /> */}
      {/* < DashboardAdmin /> */}
      {/* <DashboardCoordinator /> */}


    </>
  )
}

