import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { cartProductType, order, userData } from "../../typescript/types/userDataState";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { orderStatuses } from "../constants/orderStatuses";
import { ROUTE_NAMES } from "../constants/constants";
import { handlePlaceOrderInterface } from "../../typescript/interfaces/handlePlaceOrder";
import { setUserOrders } from "../../state-management/redux/slices/userDataSlice";
import { seller } from "../../typescript/types/sellersSliceType";

export const handlePlaceOrder = async ({values, userData, setLoading, cart, dispatch, navigate}: handlePlaceOrderInterface) => {
    if(userData){
      try{
        setLoading(true);
        const products: cartProductType[] = cart ? cart.filter((item: cartProductType) => item.ordering) : [];
  
        const orderMap = products.reduce<Record<string, cartProductType[]>>((acc, item) => {
          acc[item.autor] = acc[item.autor] ? [...acc[item.autor], item] : [item];          
          return acc;
        }, {});
  
        await Promise.all(products.map(async (item) => {
          const productRef = doc(db, FIRESTORE_PATH_NAMES.PRODUCTS, item.productId);

          const productSnap = await getDoc(productRef);
          if (!productSnap.exists()) throw new Error(`Product with ID ${item.productId} not found`);
  
          const product = productSnap.data();
          const newStock = product.stock - item.stock;
          if (newStock < 0) throw new Error(`Not enough stock for product ID ${item.productId}`);

          await updateDoc(productRef, { stock: newStock });  
          const cartItemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, item.cartItemId);
          await deleteDoc(cartItemRef);
      }));

        await Promise.all(
          Object.entries(orderMap).map(async([sellerId, sellerProducts]) => {
            const totalPrice = sellerProducts.reduce(
              (acc, item) => acc + item.price * item.stock,
              0
            );
  
            const orderDetails: order = {
              id: '',
              orderDate: Date.now(),
              address: values,
              products: sellerProducts,
              totalPrice,
              status: Object.keys(orderStatuses)[0],
              sellerId,
              consumerId: userData?.uid,
              returnedItemsDetails: null,
            };

            dispatch(setUserOrders(orderDetails));
  
            const orderRef = await addDoc(collection(db, FIRESTORE_PATH_NAMES.ORDERS), orderDetails);
            const orderId = orderRef.id;

            await updateDoc(orderRef, {id: orderId});
            const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, sellerId);
            const sellerSnap = await getDoc(sellerRef);
            const sellerData = sellerSnap.data() as seller;          
            const newOrders = sellerData.newOrders ? [...sellerData.newOrders, orderId] : [];

            await updateDoc(sellerRef, { newOrders: newOrders });
    
            const buyerRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData?.uid);
            const buyerSnap = await getDoc(buyerRef);
            const buyerData = buyerSnap.data() as userData;
            const orders = buyerData.orders ? [...buyerData.orders, orderId] : [];

            await updateDoc(
                buyerRef, {
                orders: orders,  
                }
            )}));
       navigate(ROUTE_NAMES.ORDERS);
      console.log("Պատվերները հաջողությամբ տեղադրված են!");
    }catch(error: any){
      console.error("Պատվերի մշակումը ձախողվեց:", error.message);
    }finally{
      setLoading(false);
    }  
    }
};
