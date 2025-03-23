import { NavigateFunction } from "react-router-dom";
import { product } from "../types/product";
import { userData } from "../types/userDataState";

export interface addProductInterface {
    values: product, 
    userData: userData | null, 
    imageUrls: string[], 
    navigate: NavigateFunction
}