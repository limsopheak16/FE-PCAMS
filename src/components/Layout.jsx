// components/Layout.jsx
import React from 'react';
import SidebarMenu from "../components/sidebar";

function Layout({ children }) {
  return (
    <>
      <SidebarMenu />
      <div>{children}</div>
    </>
  );
}

export default Layout;
