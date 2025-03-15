import { Link } from "react-router-dom";
import { cartProduct } from "../../../typescript/interfaces/product";
import { ROUTE_NAMES } from "../../../utilis/constants";
import { DeleteOutlined } from "@ant-design/icons";
import { cartNames } from "../../../utilis/optionNamesOptions";
import { supabase } from "../../../services/supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state-management/redux/store";
import { setCart, setOrdering } from "../../../state-management/redux/slices/userDataSlice";

const CartProductItem = ({ productId, image, name, price, stock, maxValue, options, index, ordering }: cartProduct) => {    
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo)
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = async (index: number) => {
    try{
      const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("cart")
      .eq("id", userData?.id)
      .single();

      if (fetchError) throw fetchError;

      let updatedCart = user.cart ? [...user.cart] : [];
      updatedCart.splice(index, 1);

      const { error: updateError } = await supabase
      .from("users")
      .update({ cart: updatedCart })
      .eq("id", userData?.id);

      if (updateError) throw updateError;
      dispatch(setCart(updatedCart));
    }catch(error: any){
      console.error("Error deleting from cart:", error.message);
    }
    };

    const addToOrder = async (index: number) => {
        try{
            const { data: user, error: fetchError } = await supabase
            .from("users")
            .select("cart")
            .eq("id", userData?.id)
            .single();
      
            if (fetchError) throw fetchError;
      
            let updatedCart = user.cart ? [...user.cart] : [];
            let ordering = !updatedCart[index].ordering;
            updatedCart[index].ordering = ordering;

            const { error: updateError } = await supabase
            .from("users")
            .update({ cart: updatedCart })
            .eq("id", userData?.id);
      
            if (updateError) throw updateError;

            dispatch(setOrdering({
                index,
                ordering
            }));
        }catch(error: any){
            console.error("Error changing ordering;", error.message);
          }
        }

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_o.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 cursor-pointer hover:bg-slate-50">
    <div className="flex items-center gap-6">
        <input type="checkbox" checked={ordering} onChange={() => addToOrder(index)}/>
        <Link to={`${ROUTE_NAMES.PRODUCT}/${productId}`}>
        <img src={image} className="w-16 sm:w-20" alt=""/>
        </Link>
      <div>
        <p className="text-xs sm:text-lg font-medium">{name}</p>
        <div className="flex items-center gap-5 mt-2">
          <p>{price} AMD</p>
          {
            Object.entries(options).map((item, index) => {
                return(
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 hover:bg-slate-100" key={index}>{`${cartNames[item[0]]}: ${item[1]}`}</p>
                )
            })
          }
        </div>
      </div>
    </div>
    <input type="number" min={1} defaultValue={stock} max={maxValue} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" readOnly/>
    <DeleteOutlined className="cursor-pointer" onClick={() => handleDelete(index)}/>
  </div>
)};
export default CartProductItem;