import Title from "../../components/sheard/TitleComponent"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import CartProductList from "../../components/sheard/CartProductList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-management/redux/store";
import { useEffect, useState } from "react";
import { handleOrder } from "../../utilis/helpers/handleOrder";
import { fetchUserCart } from "../../state-management/redux/slices/userDataSlice";
import LoadingWrapper from "../../components/sheard/Loading";

const Cart = () => {
  const navigate = useNavigate();
  const { authUserInfo:{cart, userData}, loading } = useSelector((state: RootState) => state.userData);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
   userData && dispatch(fetchUserCart(userData?.uid));
  }, []);
  return (
    <LoadingWrapper isLoading={loading}>
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="ՁԵՐ" text2="ԶԱՄԲՅՈՒՂԸ" />
      </div>
        <CartProductList/>
        <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
        <CardTotal />
        <button disabled={loading} className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => handleOrder({cart, navigate, setErrorMessage})}>GO TO ORDER PAGE</button>
        <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </div>
    </LoadingWrapper>
  )
}

export default Cart;