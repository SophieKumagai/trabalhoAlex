import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Menu />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
