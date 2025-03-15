import { DeleteOutlined } from "@ant-design/icons";
import Title from "../../components/sheard/Title"
import image from '../../utilis/Images/hero4.jpg';
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants";
import CartProductList from "../../components/sheard/CartProductList";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CARD" />
      </div>
{/* change quantity and  card products */}
<CartProductList/>
        <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]"><CardTotal />
        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => navigate(ROUTE_NAMES.PLACEORDER)}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Card