import { doc, getDoc, updateDoc } from "firebase/firestore";
import { handleChangeStatusInterface } from "../../typescript/interfaces/updateOrderStatus ";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { db } from "../../services/firebase/firebase";

export const handleChangeStatus = async ({order, setModalOpen, prev, next} : handleChangeStatusInterface) => {
  try{
      const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, order.sellerId);
      const sellerSnap = await getDoc(sellerRef);
      const seller = sellerSnap.data();
      if(seller){
        await updateDoc(sellerRef, {
          [prev]: seller[prev].filter((item: string) => item !== order.id),
          [next]: [... seller[next], order.id],
        });  
      }else{
        throw new Error('Seller not found.')
      };

      const orderRef = doc(db, FIRESTORE_PATH_NAMES.ORDERS, order.id);  
      await updateDoc(orderRef, {
        status: next
      });
    }catch(err: any){
      console.log(err.message);
    }finally{
      setModalOpen(false)
    }
};