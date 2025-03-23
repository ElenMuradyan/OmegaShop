import { Dispatch } from "@reduxjs/toolkit";
import { userData } from "./userDataState";

export interface handleDeleteCartItemInterface {
    index: number,
    dispatch: Dispatch,
    userData: userData | null,
}