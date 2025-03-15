import { product } from "./product";

export type shopInfoSliceType = {
    loading: boolean,
    myShopInfo: shopInfoType | null;
}

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
    myproducts: product[],
}

export type businessAddress = {
    businessRegion: string,
    businessCity: string,
    businessStreet: string,
    businessPostIndex: number,
    businessPhone: string,
}