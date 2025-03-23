import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { db } from "../../services/firebase/firebase";
import { ROUTE_NAMES } from "../constants/constants";
import { handleOrderInterface } from "../../typescript/interfaces/handleOrderInterface";

export const handleOrder = async ({cart, setErrorMessage, navigate} : handleOrderInterface) => {
    try{
        const filteredCart = cart.filter(item => item.ordering);

        const stocks = filteredCart.reduce((acc, item) => {
          acc[item.productId] ? acc[item.productId] += item.stock : acc[item.productId] = item.stock;
          return acc;
        }, {} as { [key: string]: number });

        const productPromises = Object.keys(stocks).map(async (key) => {
          const productRef = doc(db, FIRESTORE_PATH_NAMES.PRODUCTS, key);
          const productSnap = await getDoc(productRef);

          if(!productSnap.exists()){
            setErrorMessage(`Error: Product with ID ${key} not found.`);
            throw new Error(`Error: Product with ID ${key} not found.`);  
          }
          const product = productSnap.data();

          if (stocks[key] > product.stock) {       
            setErrorMessage(`Not enough stock for product ID ${key}. Requested: ${stocks[key]}, Available: ${product.stock}`);
            throw new Error(`Not enough stock for product ID ${key}. Requested: ${stocks[key]}, Available: ${product.stock}`);
          }
        });
  
        await Promise.all(productPromises);
        navigate(ROUTE_NAMES.PLACEORDER);
    }catch(err: any){
      setErrorMessage("Stock verification failed. Try again.");
       return { success: false, message: "Stock verification failed. Try again." }; 
    }
  };
