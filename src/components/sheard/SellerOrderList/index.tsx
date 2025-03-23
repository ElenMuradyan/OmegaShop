import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { orderStatuses } from "../../../utilis/constants/orderStatuses";
import { Link, useParams } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { useEffect, useState } from "react";
import { order, userData } from "../../../typescript/types/userDataState";

import { FaMoneyBills } from "react-icons/fa6";
import { Modal } from "antd";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeStatus } from "../../../utilis/helpers/sellerOrderListFunctions";
import { handleStatusChange } from "../../../state-management/redux/slices/shopInfoSlice";
import { OrderKeys } from "../../../typescript/types/shopInfoSliceType";
import LoadingWrapper from "../Loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const SellerOrderList = ({ order }: { order: order }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.shopInfo);
  const { products, orderDate, totalPrice, address, consumerEmail } = order;
  const { status } = useParams<{ status: OrderKeys }>();
  const orderInfo = orderStatuses[status as string];
  const [consumerInfo, setConsumerInfo] = useState<userData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const orderStatusesArray = Object.keys(orderStatuses);
  const index = orderStatusesArray.indexOf(status as string);

  useEffect(() => {
    const fetchConsumer = async () => {
      try {
        setLoading(true);
        const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, consumerEmail);
        const userSnap = await getDoc(userRef);
    
        if (!userSnap.exists()) {
          throw new Error("User not found");
        }
    
        setConsumerInfo(userSnap.data() as userData);    
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConsumer();
  }, []);

  const handleModalOk = () => {
    const prev: OrderKeys = orderStatusesArray[index] as OrderKeys;
    const next: OrderKeys = orderStatusesArray[index + 1] as OrderKeys;

    const newOrdersObject = {
      ...orders,
      [prev]: orders[prev].filter((item) => item !== order),
      [next]: [...orders[next], order],
    };
    dispatch(handleStatusChange(newOrdersObject));

    handleChangeStatus({ order, setModalOpen, prev, next });
  };

  return (
    <LoadingWrapper isLoading={loading}>
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <>
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
            <p className="text-gray-500 text-sm">📅 {new Date(orderDate).toLocaleDateString()}</p>
            <p className="text-lg font-semibold text-gray-800">{0.8 * totalPrice} AMD</p>
          </div>

          <div
            className="flex items-center gap-2 py-2 px-4 rounded-lg w-fit mb-4"
            style={{ backgroundColor: orderInfo.color, color: orderInfo.textColor }}
          >
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: orderInfo.color }} />
            <p className="text-sm font-medium">{orderInfo.message}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Գնորդի տվյալներ</h3>
            <Link to={`${ROUTE_NAMES.PROFILE}/${consumerInfo?.id}`} className="text-blue-600 hover:underline">
              Տեսնել գնորդի էջը
            </Link>
            <p className="text-gray-600">
              <UserOutlined /> {consumerInfo?.email}
            </p>
            <p className="text-gray-600">
              <PhoneOutlined /> {consumerInfo?.phone}
            </p>
            <p className="text-gray-600 flex items-center gap-1">
              <EnvironmentOutlined /> {Object.values(address).join(", ")}
            </p>
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <Link key={index} to={`${ROUTE_NAMES.PRODUCT}/${product.productId}`}>
                <div className="p-4 bg-gray-50 border rounded-lg flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                      <p className="text-base font-semibold">{product.price} AMD</p>
                      <p>Քանակ: {product.stock}</p>
                      {Object.entries(product.options).map(([key, value], idx) => (
                        <p key={idx} className="bg-gray-200 px-2 py-1 rounded-md">{`${key}: ${value}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Modal
            title="Հաստատել պատվերը"
            open={modalOpen}
            onOk={handleModalOk}
            onCancel={() => setModalOpen(false)}
            centered
            okText="Հաստատել"
            cancelText="Չեղարկել"
            okButtonProps={{
              className: "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300",
            }}
            cancelButtonProps={{
              className: "bg-gray-300 hover:bg-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-gray-300",
            }}
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">{orderInfo.modalMessage}</p>
            </div>
          </Modal>

          <div className="mt-4 flex gap-3">
            {orderInfo.buttonMessage && (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setModalOpen(true)}
              >
                {orderInfo.buttonMessage}
              </button>
            )}
          </div>

          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <FaMoneyBills /> Դուք կարող եք ստանալ ձեր գումարը, երբ հաճախորդը ստանա ապրանքները։
          </p>
        </>
    </div>
    </LoadingWrapper>
  );
};

export default SellerOrderList;
