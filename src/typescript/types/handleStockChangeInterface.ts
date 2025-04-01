import { AppDispatch } from "../../state-management/redux/store";
import { userData } from "./userDataState";

export interface handleStockChangeInterface {
    cartItemId: string, 
    userData: userData | null, 
    setLoading: (loading: boolean) => void, 
    inputValue: string, 
    setSubmitChange: (loading: boolean) => void, 
    dispatch: AppDispatch;
    index?: number,
}