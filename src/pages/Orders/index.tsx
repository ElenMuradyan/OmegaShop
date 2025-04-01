import { useSelector } from "react-redux";
import Title from "../../components/sheard/TitleComponent";
import { RootState } from "../../state-management/redux/store";
import OrderComponent from "../../components/sheard/OrdersComponent";

const Orders  = () => {
  const { userOrders } = useSelector((state: RootState) => state.userData.authUserInfo);
  
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