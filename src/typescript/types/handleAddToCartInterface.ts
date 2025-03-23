import { Dispatch } from "@reduxjs/toolkit";
import { orderedProductInfo, selectedOptions } from "./oderedProductInfo";
import { product } from "./product";
import { userData } from "./userDataState";

export interface handleAddToCartInterface{
    productInfo: product | null, 
    choosenOptions: selectedOptions, 
    setErrorMessage: (message: string) => void, 
    orderedProductInfo: orderedProductInfo, 
    userData: userData | null, 
    setButtonLoading: (loading: boolean) => void, 
    productId: string | undefined, 
    dispatch: Dispatch, 
    setChoosenOptions: (options: selectedOptions) => void; 
    setOrderedProductInfo: React.Dispatch<React.SetStateAction<orderedProductInfo>>;
}