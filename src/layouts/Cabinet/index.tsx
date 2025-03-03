import { Outlet } from "react-router-dom";
import React from "react";

const CabinetLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CabinetLayout;