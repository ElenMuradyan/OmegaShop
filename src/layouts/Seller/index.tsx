import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;