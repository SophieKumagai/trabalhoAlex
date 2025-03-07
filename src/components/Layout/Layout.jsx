import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <div style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
