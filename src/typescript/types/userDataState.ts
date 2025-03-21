import { optionType } from "../interfaces/product"

export type userDataSliceType = {
    loading: boolean,
    error: null | string,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null,
        userOrders: order[]
    },
}

export type userData = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    address: address,
    cart: cartProductType[],
    orders: string[],
}

export type order = {
    id: string,
    orderDate: string,
    address: address,
    status: string,
    products: cartProductType[],
    totalPrice: number,
    consumerEmail: string,
    sellerEmail: string,
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
    productId: string,
    autorEmail: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    maxValue: number,
    index: number,
    ordering: boolean,
    options: optionType[],
}