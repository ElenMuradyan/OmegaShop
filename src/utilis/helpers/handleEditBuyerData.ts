import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../constants/firebaseConstants";

export const handleEditBuyerData = async (object: Record<string, any>, id: string) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, id);
    await updateDoc(userRef, object)
}

export const handleEditSellerData = async (object: Record<string, any>, id: string) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, id);
    await updateDoc(userRef, object)
}