import { NavigateFunction } from "react-router-dom";
import { cartProductType } from "../types/userDataState";

export interface handleOrderInterface {
    cart: cartProductType[],
    navigate: NavigateFunction,
    setErrorMessage: (message: string) => void; 
}