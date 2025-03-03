import { DeleteOutlined } from "@ant-design/icons";
import Title from "../../components/sheard/Title"
import image from '../../utilis/Images/hero4.jpg';
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CARD" />
      </div>
{/* change quantity and  card products */}
      <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_o.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 cursor-pointer hover:bg-slate-50">
        <div className="flex items-start gap-6">
          <img src={image} className="w-16 sm:w-20" alt=""/>
          <div>
            <p className="text-xs sm:text-lg font-medium">Soap</p>
            <div className="flex items-center gap-5 mt-2">
              <p>450 AMD</p>
              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 hover:bg-slate-100">S</p>
            </div>
          </div>
        </div>
        <input type="number" min={1} defaultValue={5} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"/>
        <DeleteOutlined className="cursor-pointer"/>
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]"><CardTotal />
        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => navigate(ROUTE_NAMES.PLACEORDER)}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Card