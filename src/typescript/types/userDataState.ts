import { optionType } from "../interfaces/product"
import { returnedItemsType } from "./returnedItems";

export type userDataSliceType = {
    loading: boolean,
    error: null | string,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null,
        cart: cartProductType[],
        userOrders: order[]
    },
}

export type userData = {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    address: address,
    orders: string[],
}

export type order = {
    id: string,
    orderDate: number,
    address: address,
    status: string,
    products: cartProductType[],
    totalPrice: number,
    consumerId: string,
    sellerId: string,
    returnedItemsDetails?: returnedItemsType | null,
};

export type address = {
        region: string,
        city: string,
        street: string,
        postIndex: number,
}

export type sellerAddresses = {
    region: string,
    city: string,
    street: string,
    postIndex: number,
    businessRegion: string,
    businessCity: string,
    businessStreet: string,
    businessPostIndex: number,
    businessPhone: string,
}

export type cartProductType = {
    cartItemId: string,
    productId: string,
    autor: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    maxValue: number,
    index: number,
    ordering: boolean,
    returnType: boolean,
    options?: optionType[],
}