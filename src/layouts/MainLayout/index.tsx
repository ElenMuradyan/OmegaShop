import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import React from "react";
import Footer from "../../components/Footer";
import SearchBar from "../../components/Search";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
