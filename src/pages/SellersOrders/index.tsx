import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import SellerOrderList from "../../components/sheard/SellerOrderList";
import { useParams } from "react-router-dom";
import { OrderKeys } from "../../typescript/types/shopInfoSliceType";
import { useEffect, useState } from "react";
import { order } from "../../typescript/types/userDataState";

const SellersOrders = () => {
  const { orders } = useSelector((state: RootState) => state.shopInfo);
  const { status } = useParams<{ status?: OrderKeys }>(); 
  const [orderList, setOrderList] = useState<order[]>([]);

  useEffect(() => {
    if (status && orders?.[status]) {
      setOrderList(orders[status]);
    } else {
      setOrderList([]);
    }
  }, [status, orders]); 

  return (
    <div>
      {orderList.length > 0 ? (
        orderList.map((item) => (
          <SellerOrderList order={item} key={item.id} /> 
        ))
      ) : (
        <p>ԱՊՐԱՆՔՆԵՐ ՉԵՆ ԳՏՆՎԵԼ</p>
      )}
    </div>
  );
};

export default SellersOrders;
