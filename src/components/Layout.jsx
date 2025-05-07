// components/Layout.jsx
import React from 'react';
import Menu from './sidebar';

function Layout({ children }) {
  return (
    <>
      <Menu />
      <div>{children}</div>
    </>
  );
}

export default Layout;
