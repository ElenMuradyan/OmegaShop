import { useSelector } from "react-redux";
import Title from "../../components/sheard/Title";
import { RootState } from "../../state-management/redux/store";
import OrderComponent from "../../components/sheard/OrdersComponent";

const Orders  = () => {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);

  return (      
    <div className="border-t pt-16 px-4 md:px-8">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>
  
      {userData?.orders && userData?.orders.length > 0 ? (
        userData.orders.map((order, index) => (
          <OrderComponent order={order} key={index}/>
        ))
      ) : (
        <p className="text-gray-600 text-center mt-6">No orders found.</p>
      )}
    </div>
  );
}
export default Orders;
