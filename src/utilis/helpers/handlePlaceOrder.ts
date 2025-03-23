import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { cartProductType, order } from "../../typescript/types/userDataState";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { orderStatuses } from "../constants/orderStatuses";
import { ROUTE_NAMES } from "../constants/constants";
import { handlePlaceOrderInterface } from "../../typescript/interfaces/handlePlaceOrder";
import { setUserOrders } from "../../state-management/redux/slices/userDataSlice";

export const handlePlaceOrder = async ({values, userData, setLoading, cart, dispatch, navigate}: handlePlaceOrderInterface) => {
    if(userData){
      try{
        setLoading(true);
        const products: cartProductType[] = cart ? cart.filter((item: cartProductType) => item.ordering) : [];
  
        const orderMap = products.reduce<Record<string, cartProductType[]>>((acc, item) => {
          acc[item.autorEmail] = acc[item.autorEmail] ? [...acc[item.autorEmail], item] : [item];
          return acc;
        }, {});
  
        await Promise.all(products.map(async (item) => {
          const productRef = doc(db, FIRESTORE_PATH_NAMES.PRODUCTS, item.id);
          const productSnap = await getDoc(productRef);
          if (!productSnap.exists()) throw new Error(`Product with ID ${item.productId} not found`);
  
          const product = productSnap.data();
          const newStock = product.stock - item.stock;
          if (newStock < 0) throw new Error(`Not enough stock for product ID ${item.productId}`);
    
          await updateDoc(productRef, { stock: newStock });  
      }));
      
        await Promise.all(
          Object.entries(orderMap).map(async([sellerEmail, sellerProducts]) => {
            const totalPrice = sellerProducts.reduce(
              (acc, item) => acc + item.price * item.stock,
              0
            );
  
            const orderDetails: order = {
              orderDate: Date.now(),
              address: values,
              products: sellerProducts,
              totalPrice,
              status: Object.keys(orderStatuses)[0],
              sellerEmail,
              consumerEmail: userData?.email,
            };
  
            dispatch(setUserOrders(orderDetails));
  
            const orderRef = await addDoc(collection(db, FIRESTORE_PATH_NAMES.ORDERS), orderDetails);
            const orderId = orderRef.id;
    
          const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, sellerEmail);
          await updateDoc(sellerRef, { newOrders: arrayUnion(orderId) });
  
          const buyerRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData?.id);
          const updatedCart = cart.filter(item => !item.ordering);
          await updateDoc(
            buyerRef, {
              cart: updatedCart,
              orders: arrayUnion(orderId),  
            }
          )}))
       navigate(ROUTE_NAMES.ORDERS);
      console.log("Պատվերները հաջողությամբ տեղադրված են!");
    }catch(error: any){
      console.error("Պատվերի մշակումը ձախողվեց:", error.message);
    }finally{
      setLoading(false);
    }  
    }
};
