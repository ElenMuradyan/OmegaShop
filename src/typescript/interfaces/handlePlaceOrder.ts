import { Dispatch } from "@reduxjs/toolkit";
import { address, cartProductType, userData } from "../types/userDataState";
import { NavigateFunction } from "react-router-dom";

export interface handlePlaceOrderInterface {
    values: address, 
    userData: userData | null, 
    setLoading: (loading: boolean) => void, 
    cart: cartProductType[], 
    dispatch: Dispatch, 
    navigate: NavigateFunction,
}