import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/sheard/TitleComponent";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import OrderComponent from "../../components/sheard/OrdersComponent";
import { useEffect } from "react";
import { fetchUserOrderProducts } from "../../state-management/redux/slices/userDataSlice";

const Orders  = () => {
  const { userOrders, userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
     userData && dispatch(fetchUserOrderProducts(userData.orders));
  }, []);
  
  return (      
    <div className="border-t pt-16 px-4 md:px-8">
      <div className="text-2xl mb-6">
        <Title text1="ԻՄ" text2="ՊԱՏՎԵՐՆԵՐԸ" />
      </div>
  
      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order, index) => (
          <OrderComponent order={order} key={index}/>
        ))
      ) : (
        <p className="text-gray-600 text-center mt-6">ՊԱՏՎԵՐՆԵՐ ՉԵՆ ԳՏՆՎԵԼ.</p>
      )}
    </div>
  );
};

export default Orders;