import Title from "../../components/sheard/TitleComponent"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import CartProductList from "../../components/sheard/CartProductList";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { useState } from "react";
import { handleOrder } from "../../utilis/helpers/handleOrder";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="ՁԵՐ" text2="ԶԱՄԲՅՈՒՂԸ" />
      </div>
        <CartProductList/>
        <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
        <CardTotal />
        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => handleOrder({cart, navigate, setErrorMessage})}>ԱՆՑՆԵԼ ՊԱՏՎԵՐԻ ԷՋ</button>
        <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default Cart;