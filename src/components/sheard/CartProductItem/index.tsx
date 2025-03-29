import { Link } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utilis/constants/constants";
import { CheckOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { cartNames } from "../../../utilis/constants/optionNamesOptions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { useState } from "react";
import { handleAddToOrder, handleDeleteCartItem, handleStockChange } from "../../../utilis/helpers/handleDeleteCart";
import { saveScrollPosition } from "../../../utilis/helpers/handleNavigate";
import { cartProductType } from "../../../typescript/types/userDataState";

const CartProductItem = ({ productId, image, name, price, stock, maxValue, options, index, ordering }: cartProductType) => {    
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo)
    const dispatch = useDispatch<AppDispatch>();
    const [ submitChange, setSubmitChange ] = useState<boolean>(false);
    const [ inputValue, setInputValue ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setSubmitChange(true);
    };

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_o.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 cursor-pointer hover:bg-slate-50">
    <div className="flex items-center gap-6">
        <input type="checkbox" checked={ordering} onChange={() => handleAddToOrder({index, dispatch, userData})}/>
        <Link onClick={() => saveScrollPosition()} to={`${ROUTE_NAMES.PRODUCT}/${productId}`}>
        <img src={image} className="w-16 sm:w-20" alt=""/>
        </Link>
      <div>
        <p className="text-xs sm:text-lg font-medium">{name}</p>
        <div className="flex items-center gap-5 mt-2">
          <p>{price} AMD</p>
          {
            options && Object.entries(options).map((item, index) => {
                return(
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 hover:bg-slate-100" key={index}>{`${cartNames[item[0]]}: ${item[1]}`}</p>
                )
            })
          }
        </div>
      </div>
    </div>
    <div>
    <input type="number" min={1} defaultValue={stock} max={maxValue} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" onChange={(e) => handleInputChange(e.target.value)}/>
    {
        submitChange ? 
        <button>
            {
                loading ? <LoadingOutlined /> : <CheckOutlined onClick={() => handleStockChange({index, userData, setLoading, inputValue, setSubmitChange, dispatch})}/>
            }
        </button>
        : null
    }
    </div>
    <DeleteOutlined className="cursor-pointer" onClick={() => handleDeleteCartItem({index, userData, dispatch})}/>
  </div>
)};
export default CartProductItem;
