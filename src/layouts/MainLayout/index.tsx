import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import React from "react";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
