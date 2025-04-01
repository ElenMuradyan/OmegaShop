import { Dispatch } from "@reduxjs/toolkit";
import { userData } from "./userDataState";
import { AppDispatch } from "../../state-management/redux/store";

export interface handleDeleteCartItemInterface {
    ordering?: boolean,
    cartItemId: string,
    dispatch: Dispatch,
    appDispatch?: AppDispatch,
    userData: userData | null,
    index?: number,
}