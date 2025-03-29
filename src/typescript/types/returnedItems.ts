import { cartProductType, order } from "./userDataState"

export type returnedItemsType = {
    products: cartProductType[],
    returnPrice: number,
    consumerId: string,
    sellerId: string,
    confirmedReturn: boolean,
};

export type returnDetails = {
    order: order,
    orderStatusesArray: string[],
    index: number,
    returnAbleProducts: cartProductType[],
}