import { product } from "./product";
import { order } from "./userDataState";

export type shopInfoSliceType = {
    loading: boolean,
    myShopInfo: shopInfoType | null;
    orders: orders
}

export type orders = {
    newOrders: order[],
    processingOrders: order[],
    sentOrders: order[],
    doneOrders: order[],
}

export type OrderKeys = 'newOrders' | 'processingOrders' | 'sentOrders' | 'doneOrders';

export type sellerProfileSliceType = {
    loading: boolean,
    shopInfo: shopInfoType | null;
    products: product[],
}

export type shopInfoType = {
    businessAddress: businessAddress,
    email: string,
    shopName: string,
    description: string,
    type: string,
    categories: string[],
    myproducts: string[],
    newOrders: string[],
    processingOrders: string[],
    sentOrders: string[],
    doneOrders: string[],
}

export type businessAddress = {
    businessRegion: string,
    businessCity: string,
    businessStreet: string,
    businessPostIndex: number,
    businessPhone: string,
}