import { cartNames, optionNamesOptions } from "../../../utilis/constants/optionNamesOptions";
import { orderStatuses } from "../../../utilis/constants/orderStatuses";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { EnvironmentOutlined } from "@ant-design/icons";
import { cartProductType, order } from "../../../typescript/types/userDataState";
import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import { OrderKeys } from "../../../typescript/types/shopInfoSliceType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { handleStatusChange } from "../../../state-management/redux/slices/shopInfoSlice";
import { handleChangeStatus } from "../../../utilis/helpers/sellerOrderListFunctions";
import { fetchUserOrderProducts } from "../../../state-management/redux/slices/userDataSlice";

const OrderComponent  = ({ order }: {order: order}) => {
    const { orders } = useSelector((state: RootState) => state.shopInfo);
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
    const dispatch = useDispatch<AppDispatch>();
    const { products, orderDate, totalPrice, address, status, consumerId, sellerId, id, returnedItemsDetails } = order;
    const orderInfo = orderStatuses[status as string];
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const orderStatusesArray = Object.keys(orderStatuses);
    const index = orderStatusesArray.indexOf(status);
    const returnAbleProducts = products.filter(item => item.returnType);
    const navigate = useNavigate();

    useEffect(() => {
        userData && dispatch(fetchUserOrderProducts(userData.orders));
    }, [order]);

    const handleModalOk = () => {
        const prev: OrderKeys = orderStatusesArray[index] as OrderKeys;
        const next: OrderKeys = orderStatusesArray[index+1] as OrderKeys;

        const newOrdersObject = {
        ...orders,
        [prev]: orders[prev].filter((item) => item !== order),
        [next]: [...orders[next], order],  
        };
        dispatch(handleStatusChange(newOrdersObject));
        userData && dispatch(fetchUserOrderProducts(userData.orders));
        handleChangeStatus({order, setModalOpen, prev, next});
    };
        
    const handleReturn = () => {
        const returnDetails = {
            order,
            orderStatusesArray,
            index,
            returnAbleProducts,
        };
        navigate(ROUTE_NAMES.RETURN);
        localStorage.setItem('returnDetails', JSON.stringify(returnDetails));
    };

    return (      
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {/* Confirmation Modal */}
            <Modal
                open={modalOpen}
                onOk={handleModalOk}
                onCancel={() => setModalOpen(false)}
                centered
                okText="ՀԱՍՏԱՏԵԼ"
                cancelText="ՉԵՂԱՐԿԵԼ"
                okButtonProps={{ className: "bg-blue-500 text-white hover:bg-blue-600" }}
                cancelButtonProps={{ className: "bg-gray-300 hover:bg-gray-400 text-black" }}
            >
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-700">{orderInfo?.buyerModalMessage}</p>
                </div>
            </Modal>

            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                <p className="text-gray-500 text-sm">{new Date(orderDate).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-gray-800">{totalPrice} AMD</p>
            </div>

            <div className="flex items-center gap-2 py-2 px-4 rounded-lg w-fit mb-4" style={{ backgroundColor: orderInfo?.color || "#fff", color: orderInfo?.textColor || "#000" }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: orderInfo?.color }} />
                <p className="text-sm font-medium">{orderInfo?.message}</p>
            </div>

            <EnvironmentOutlined /> {Object.values(address).join(", ")}
            
            <div className="space-y-4">
                {products.map((product, index) => (
                    <Link key={index} to={`/product/${product.productId}`}>
                        <div className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row md:items-center gap-4">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                                    <p className="text-base font-semibold">{product.price} AMD</p>
                                    <p>Քանակը: {product.stock}</p>
                                    {product.options && Object.entries(product.options).map(([key, value], idx) => (
                                        <p key={idx} className="bg-gray-200 px-2 py-1 rounded-md">{`${cartNames[key]}: ${value}`}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {status === 'sentOrders' && (
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setModalOpen(true)}>
                        Ստացել ե՞ք պատվերը
                    </button>
                    {returnAbleProducts.length > 0 && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => handleReturn()}>
                            Վերադարձրել ե՞ք ապրանքները
                        </button>
                    )}
                </div>
            )}

            {status === 'doneOrders' && returnedItemsDetails && (
                <div>
                    <p className="font-bold text-gray-700">Վերադարձված ապրանքներ</p>
                    <p className="font-bold text-gray-700">Վերադարձի գումար։ {returnedItemsDetails.returnPrice}</p>
                    {
                        !returnedItemsDetails.confirmedReturn && <p className="font-bold text-red-700">Վերադարձված ապրանքների գումարը կստանաք,երբ վերադարձը հաստատվի վաճառողի կողմից։</p>
                    }

                    {returnedItemsDetails.products.map((product, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg border shadow-sm gap-4">
                            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <p className="text-base font-semibold text-gray-700">{product.price} AMD</p>
                                <p className="text-sm text-gray-600">Քանակ: {product.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderComponent;