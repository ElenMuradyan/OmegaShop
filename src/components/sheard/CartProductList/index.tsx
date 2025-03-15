import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import CartProductItem from "../CartProductItem";

const CartProductList = () => {
    const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
    console.log(userData?.cart);
    
  return (
    <div className="gap-y-6">
      {
        userData?.cart.map((item, key) => {
            const { productId, stock, image, price, name, options, maxValue } = item;
            
            return(
                <CartProductItem productId={productId} image={image} name={name} price={price} stock={stock} index={key} key={key} options={options} maxValue={maxValue}/>
            )
        })
      }
    </div>
  )
}

export default CartProductList;