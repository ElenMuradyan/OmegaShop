import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { addProductInterface } from "../../typescript/interfaces/addProductInterface";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";
import { notification } from "antd";
import { ROUTE_NAMES } from "../constants/constants";

export const handleAddProduct = async ({values, userData, imageUrls, navigate}: addProductInterface) => {
        const { name, description, price, category, subCategory, usedType, stock, options, returnType } = values;
        if(userData){
            const sanitizedOptions = options || [];

        try {
                const productRef = await addDoc(collection(db, FIRESTORE_PATH_NAMES.PRODUCTS),
                {
                    id: '',
                    name,
                    description,
                    price: Number(price),
                    images: imageUrls,
                    category,
                    subCategory,
                    usedType,
                    stock: Number(stock),
                    autor: userData.uid,
                    options: sanitizedOptions,
                    returnType,
                }
            )

            const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, userData.uid);
            await updateDoc(sellerRef, {
                myproducts: arrayUnion(productRef.id),
            });
            await updateDoc(productRef, {
                id: productRef.id
            })
    
            notification.success({
                message: "Ապրանքն ավելացվեց։",
            });
    
            navigate(ROUTE_NAMES.MYPRODUCTS);    
        } catch (error: any) {
            notification.error({
                message: "Ապրանքը չավելացվեց։",
                description: error.message,
        });
    }}
};