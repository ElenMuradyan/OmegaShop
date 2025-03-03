import { Outlet } from "react-router-dom";
import Navbar from "../../components/global/Navbar";
import React from "react";
import Footer from "../../components/global/Footer";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;