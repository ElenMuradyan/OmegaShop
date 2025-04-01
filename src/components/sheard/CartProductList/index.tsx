import { useSelector } from "react-redux";
import { RootState } from "../../../state-management/redux/store";
import CartProductItem from "../CartProductItem";

const CartProductList = () => {
  const { cart } = useSelector((state: RootState) => state.userData.authUserInfo);
  const reversedCart = [...cart].reverse();

  return (
    <div className="gap-y-6">
      {
        reversedCart.map((item, key) => {
            const { productId, autor, stock, image, price, name, options, maxValue, ordering, cartItemId, returnType } = item;
            
            return(
                <CartProductItem returnType={returnType} cartItemId={cartItemId} autor={autor} productId={productId} image={image} name={name} price={price} stock={stock} index={reversedCart.length - 1- key} key={key} options={options} maxValue={maxValue} ordering={ordering}/>
            )
        })
      }
    </div>
  )
}

export default CartProductList;