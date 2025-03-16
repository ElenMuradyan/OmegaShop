import Title from "../../components/sheard/Title"
import CardTotal from "../../components/sheard/CardTotal";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../../utilis/constants";
import CartProductList from "../../components/sheard/CartProductList";
import { useSelector } from "react-redux";
import { RootState } from "../../state-management/redux/store";
import { supabase } from "../../services/supabase/supabase";
import { useState } from "react";

const Card = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.userData.authUserInfo);
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  const handleOrder = async () => {
    try{
      if(userData){
        const filteredCart = userData.cart.filter(item => item.ordering);

        const stocks = filteredCart.reduce((acc, item) => {
          acc[item.productId] ? acc[item.productId] += item.stock : acc[item.productId] = item.stock;
          return acc;
        }, {} as { [key: string]: number });

        const productPromises = Object.keys(stocks).map(async (key) => {
          const { data: product, error: fetchError } = await supabase
            .from("products")
            .select('*')
            .eq("id", key)
            .single();
  
          if (fetchError) {
            setErrorMessage(`Error fetching product with ID ${key}: ${fetchError.message}`);
            throw new Error(`Error fetching product with ID ${key}: ${fetchError.message}`);
          }
  
          if (stocks[key] > product.stock) {       
            setErrorMessage(`Not enough stock for product ID ${key}. Requested: ${stocks[key]}, Available: ${product.stock}`);
            throw new Error(`Not enough stock for product ID ${key}. Requested: ${stocks[key]}, Available: ${product.stock}`);
          }
        });
  
        await Promise.all(productPromises);
        navigate(ROUTE_NAMES.PLACEORDER);}
    }catch(err: any){
      setErrorMessage("Stock verification failed. Try again.");
       return { success: false, message: "Stock verification failed. Try again." }; 
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CARD" />
      </div>
        <CartProductList/>
        <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
        <CardTotal />
        <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => userData && handleOrder()}>PROCEED TO CHECKOUT</button>
        <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default Card