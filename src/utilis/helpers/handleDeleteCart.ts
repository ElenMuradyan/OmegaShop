import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { fetchUserCart, setCart, setOrdering } from "../../state-management/redux/slices/userDataSlice";
import { handleDeleteCartItemInterface } from "../../typescript/types/handleDeleteCartItemInterface";
import { cartProductType } from "../../typescript/types/userDataState";
import { handleStockChangeInterface } from "../../typescript/types/handleStockChangeInterface";

export const handleDeleteCartItem = async ({index, userData, dispatch}: handleDeleteCartItemInterface) => {
    if(userData){
    try{
        const cartRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART);
        const cartSnap = await getDocs(cartRef);
        const cartItems = cartSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (index < 0 || index >= cartItems.length) {
            throw new Error("Invalid cart index.");
          }
      
        const itemToDelete = cartItems[index];
        await deleteDoc(doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, itemToDelete.id));
        
        const updatedCart = cartItems.filter((_, i) => i !== index);
        dispatch(setCart(updatedCart));
    }catch(error: any){
        console.error("Սխալ զամբյուղից հեռացնելիս:", error.message);
    }    
    }
};

export const handleAddToOrder = async ({index, userData, dispatch}: handleDeleteCartItemInterface) => {
    if(userData){
        try{
            const cartRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, "cart");
            const cartSnap = await getDocs(cartRef);
            const cartItems = cartSnap.docs.map(doc => ({ cartItemId: doc.id, ...doc.data() } as cartProductType));
            const item = cartItems[index];
            let ordering = !item.ordering;

            const itemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, "cart", item.cartItemId);
            
            await updateDoc(itemRef, { ordering: ordering });

            dispatch(setOrdering({
                index,
                ordering
            }));
        }catch(error: any){
            console.error("Սխալ պատվերը փոխելու ժամանակ;", error.message);
        }
    }
};

export const handleStockChange = async ({index, userData, setLoading, inputValue, setSubmitChange, dispatch}: handleStockChangeInterface) => {
    if(userData){
        try{
            setLoading(true);
            const cartRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, "cart");
            const cartSnap = await getDocs(cartRef);
            const cartItems = cartSnap.docs.map(doc => ({ cartItemId: doc.id, ...doc.data() } as cartProductType));
            const item = cartItems[index];
            const itemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, "cart", item.cartItemId);
    
            await updateDoc(itemRef, {
                stock: inputValue
            });

            setSubmitChange(false);
            dispatch(fetchUserCart(userData.uid));
        }catch(error: any){
            console.log(error.message);
        }finally{
            setLoading(false);
        }    
    }
}