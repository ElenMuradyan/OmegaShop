import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants/constants";
import {
    ShoppingCartOutlined,
    RocketOutlined,
    CheckCircleOutlined,
    FieldTimeOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { fetchShopInfo } from "../../state-management/redux/slices/shopInfoSlice";

const CustomersOrdersLayout: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo) 

    useEffect(() => {
      userData && dispatch(fetchShopInfo(userData?.uid));
    }, [pathname])
    return (
        <div>
            <div className="flex justify-center items-center py-4">
                <Breadcrumb className="px-6 py-3 bg-white shadow-md rounded-lg border border-gray-200">
                    <Breadcrumb.Item>
                        <Link
                            to={ROUTE_NAMES.NEWORDERS}
                            className="text-gray-700 font-semibold transition duration-300"
                            style={{
                                color: pathname === ROUTE_NAMES.NEWORDERS ? "black" : "gray",
                            }}
                        >
                            <ShoppingCartOutlined className="text-blue-600 text-lg" /> 
                            Նոր պատվերներ
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link
                            to={ROUTE_NAMES.PROCESSINGORDERS}
                            className="text-gray-700 font-semibold transition duration-300"
                            style={{
                                color: pathname === ROUTE_NAMES.PROCESSINGORDERS ? "black" : "gray",
                            }}
                        >
                            <FieldTimeOutlined className="text-yellow-600 text-lg" /> 
                            Մշակման փուլում
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link
                            to={ROUTE_NAMES.SENTORDERS}
                            className="text-gray-700 font-semibold transition duration-300"
                            style={{
                                color: pathname === ROUTE_NAMES.SENTORDERS ? "black" : "gray",
                            }}
                        >
                            <RocketOutlined className="text-orange-500 text-lg" /> 
                            Ուղարկված պատվերներ
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link
                            to={ROUTE_NAMES.DONEORDERS}
                            className="text-gray-700 font-semibold transition duration-300"
                            style={{
                                color: pathname === ROUTE_NAMES.DONEORDERS ? "black" : "gray",
                            }}
                        >
                            <CheckCircleOutlined className="text-green-600 text-lg" /> 
                            Ավարտված պատվերներ
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Outlet />
        </div>
    );
};

export default CustomersOrdersLayout;