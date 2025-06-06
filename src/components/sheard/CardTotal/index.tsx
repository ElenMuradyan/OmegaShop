import { useSelector } from "react-redux";
import Title from "../TitleComponent";
import { RootState } from "../../../state-management/redux/store";
import { useEffect, useState } from "react";

const CardTotal = () => {
  const { cart } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ subtotal, setSubtotal ] = useState<number>(0);

  useEffect(() => {
    if(cart){
      const sum = cart.filter(item => item.ordering)
      .reduce((acc, item) => acc + item.stock * item.price, 0);
      setSubtotal(sum);
    }
  },[cart]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="PAYMENT" text2="DETAILS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Product Price</p>
          <p>{subtotal} AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>500 AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>{subtotal + 500} AMD</p>
        </div>
      </div>
    </div>
  )
}

export default CardTotal;
