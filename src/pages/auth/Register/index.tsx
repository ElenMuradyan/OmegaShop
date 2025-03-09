import { Breadcrumb } from "antd";
import { ROUTE_NAMES } from "../../../utilis/constants";
import { Link, useLocation } from "react-router-dom";
import SellerRegister from "./SellerRegister";
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import BuyerRegister from "./BuyerRegister/BuyerRegister/BuyerRegister";

const Register = () => {
const { pathname } = useLocation();


  return (
    <div>
<div className="flex justify-center items-center py-4">
      <Breadcrumb className="px-6 py-3 bg-white shadow-md rounded-lg border border-gray-200">
        <Breadcrumb.Item>
          <Link
            to={ROUTE_NAMES.BUYERREGISTER}
            className='text-gray-700 font-semibold transition duration-300'
            style={{
                color: pathname === ROUTE_NAMES.BUYERREGISTER ? "black" : "gray"
            }}
          >
            <ShoppingCartOutlined className="mr-2 text-blue-600" /> Buyer Register
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link
            to={ROUTE_NAMES.SELLERREGISTER}
            className='text-gray-700 font-semibold transition duration-300'
            style={{
                color: pathname === ROUTE_NAMES.SELLERREGISTER ? "black" : "gray"
            }}
          >
            <ShopOutlined className="mr-2 text-purple-600" /> Seller Register
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>

        {pathname === ROUTE_NAMES.BUYERREGISTER ? <BuyerRegister /> : <SellerRegister />}
    </div>
  )
}

export default Register;