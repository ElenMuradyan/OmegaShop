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
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo); 
    const { orders } = useSelector((state: RootState) => state.shopInfo);

    const returnedOrders = orders.doneOrders.filter(item => item.returnedItemsDetails && !item.returnedItemsDetails.confirmedReturn);
    useEffect(() => {
      userData && dispatch(fetchShopInfo(userData?.uid));
    }, [pathname]);

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
                      <div className="relative flex items-center gap-2 text-gray-800">
                        <div className="relative">
                        <ShoppingCartOutlined className="text-blue-600 text-lg" /> 
                        {
                          orders.newOrders.length > 0 &&                         
                        <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[8px] rounded-full">
                          {orders.newOrders.length}
                        </span>
                        }
                        </div>
                        <p className="text-sm font-medium">Նոր պատվերներ</p>
                      </div>                            
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
                      <div className="relative flex items-center gap-2 text-gray-800">
                        <div className="relative">
                          <FieldTimeOutlined className="text-yellow-600 text-lg" />
                          {
                            orders.processingOrders.length > 0 && 
                            <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[8px] rounded-full">
                            {orders.processingOrders.length}
                            </span>
                          }
                        </div>
                        <p className="text-sm font-medium">Մշակման փուլում</p>
                      </div>
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
                      <div className="relative flex items-center gap-2 text-gray-800">
                        <div className="relative">
                        <RocketOutlined className="text-orange-500 text-lg" /> 
                        {
                            orders.sentOrders.length > 0 && 
                            <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-gray-500 text-white text-[8px] rounded-full">
                            {orders.sentOrders.length}
                            </span>
                        }
                        </div>
                        <p className="text-sm font-medium">Ուղարկված պատվերներ</p>
                      </div>                              
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
                        <div className="relative flex items-center gap-2 text-gray-800">
                        <div className="relative">
                        <CheckCircleOutlined className="text-green-600 text-lg" /> 
                        {
                            returnedOrders.length > 0 && 
                            <span className="absolute -right-1 -bottom-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[8px] rounded-full">
                            {returnedOrders.length}
                            </span>
                        }
                        </div>
                        <p className="text-sm font-medium">Ավարտված պատվերներ</p>
                      </div>                              
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Outlet />
        </div>
    );
};

export default CustomersOrdersLayout;