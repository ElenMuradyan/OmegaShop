import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { deleteItem, setOrdering } from "../../state-management/redux/slices/userDataSlice";
import { handleDeleteCartItemInterface } from "../../typescript/types/handleDeleteCartItemInterface";
import { handleStockChangeInterface } from "../../typescript/types/handleStockChangeInterface";

export const handleDeleteCartItem = async ({cartItemId, userData, dispatch, index}: handleDeleteCartItemInterface) => {
    if(userData){
    try{
        dispatch(deleteItem(index));
        await deleteDoc(doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, cartItemId));
    }catch(error: any){
        console.error("Սխալ զամբյուղից հեռացնելիս:", error.message);
    }    
    }
};

export const handleAddToOrder = async ({cartItemId, userData, dispatch, index, ordering}: handleDeleteCartItemInterface) => {
    if(userData){
        try{
            dispatch(setOrdering({
                index,
                ordering: !ordering
            }));
            const itemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, cartItemId);            
            await updateDoc(itemRef, { ordering: ordering });
        }catch(error: any){
            console.error("Սխալ պատվերը փոխելու ժամանակ;", error.message);
        }
    }
};

export const handleStockChange = async ({cartItemId, userData, setLoading, inputValue, setSubmitChange}: handleStockChangeInterface) => {
    if(userData){
        try{
            setLoading(true);
            const itemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, cartItemId);    
            await updateDoc(itemRef, {
                stock: inputValue
            });
            setSubmitChange(false);
        }catch(error: any){
            console.log(error.message);
        }finally{
            setLoading(false);
        }    
    }
}