import { useSelector } from "react-redux";
import Title from "../TitleComponent";
import { RootState } from "../../../state-management/redux/store";
import { useEffect, useState } from "react";

const CardTotal = () => {
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ subtotal, setSubtotal ] = useState<number>(0);

  useEffect(() => {
    if(userData){
      const sum = userData.cart.filter(item => item.ordering)
      .reduce((acc, item) => acc + item.stock * item.price, 0);
      setSubtotal(sum);
    }
  },[userData?.cart]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="ՎՃԱՐԱՅԻՆ" text2="ՏՎՅԱԼՆԵՐ" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>Ապրանքի վճար</p>
            <p>{subtotal} AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
            <p>Առաքման վճար</p>
            <p>500 AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
            <p>Ընդհանուր</p>
            <p>{subtotal+500} AMD</p>
        </div>
      </div>
    </div>
  )
}

export default CardTotal;
