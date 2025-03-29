import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { db } from "../../services/firebase/firebase";
import { setCart } from "../../state-management/redux/slices/userDataSlice";
import { optionType } from "../../typescript/interfaces/product";
import { handleAddToCartInterface } from "../../typescript/types/handleAddToCartInterface";
import { notification } from "antd";

export const handleAddToCart = async ({productInfo, choosenOptions, setErrorMessage, orderedProductInfo, userData, setButtonLoading, productId, dispatch, setChoosenOptions, setOrderedProductInfo} : handleAddToCartInterface) => {
    const allOptionsSelected = productInfo?.options?.every(
      (item: optionType) => choosenOptions[item.optionName]
    );

    if (!allOptionsSelected) {
      setErrorMessage("Խնդրում ենք ընտրել բոլոր հատկությունները (Please select all options)");
      return;
    }

    if (!(orderedProductInfo.stock > 0 && productInfo?.stock && orderedProductInfo.stock <= productInfo?.stock) || !orderedProductInfo.stock) {
      setErrorMessage("Խնդրում ենք մուտքագրել ճիշտ քանակ (Please enter a valid stock amount)");
      return;
    }
    if(userData){
      try{
        setButtonLoading(true);
        const cartCollectionRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART);

        const cartItem = {
            autor: productInfo.autor,
            returnType: productInfo.returnType,
            productId,
            stock: orderedProductInfo.stock,
            options: orderedProductInfo.options,
            price: productInfo.price,
            image: productInfo.images[0],
            name: productInfo.name,
            ordering: false,
            maxValue: productInfo.stock,
            cartItemId: '',
        };
        const cartItemSnap = await addDoc(cartCollectionRef, cartItem);
        const cartItemRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userData.uid, FIRESTORE_PATH_NAMES.CART, cartItemSnap.id);
        await updateDoc(cartItemRef, {
            cartItemId: cartItemSnap.id,
        })
        const updatedCartSnapshot = await getDocs(cartCollectionRef);
        const updatedCart = updatedCartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
        dispatch(setCart(updatedCart));
        setChoosenOptions({});
        setOrderedProductInfo({stock: 0, options: {}});
        notification.success({
            message: 'Հաջողությամբ ավելացվեց զամբյուղին։'
        })
      }catch(error: any){
        notification.error({
            message: 'Զամբյուղին ավելացնելիս սղալ առաջացավ։',
            description: error.message
        })
      }finally{
        setButtonLoading(false);
      }
    }
};