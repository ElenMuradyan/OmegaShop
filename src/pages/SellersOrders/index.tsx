import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import SellerOrderList from "../../components/sheard/SellerOrderList";
import { useParams } from "react-router-dom";
import { OrderKeys } from "../../typescript/types/shopInfoSliceType";
import { useEffect, useState } from "react";
import { order } from "../../typescript/types/userDataState";
import { fetchShopInfo } from "../../state-management/redux/slices/shopInfoSlice";

const SellersOrders = () => {
  const { orders } = useSelector((state: RootState) => state.shopInfo);
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const { status } = useParams<{ status?: OrderKeys }>(); 
  const [orderList, setOrderList] = useState<order[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status && orders?.[status]) {
      setOrderList(orders[status]);
    } else {
      setOrderList([]);
    }
  }, [status, orders]); 

  useEffect(() => {
    userData && dispatch(fetchShopInfo(userData.uid));
  }, []);
  
  return (
    <div>
      {orderList.length > 0 ? (
        orderList.map((item) => (
          <SellerOrderList order={item} key={item.id} /> 
        ))
      ) : (
        <p>NO PRODUCTS</p>
      )}
    </div>
  );
};

export default SellersOrders;
