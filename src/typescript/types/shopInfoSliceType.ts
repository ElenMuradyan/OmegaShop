export type shopInfoSliceType = {
    loading: boolean,
    myShopInfo: shopInfoType | null;
}

export type sellerProfileSliceType = {
    loading: boolean,
    shopInfo: shopInfoType | null;
}

export type shopInfoType = {
    businessAddress: businessAddress,
    email: string,
    shopName: string,
    description: string,
    type: string,
    categories: string[],
}

export type businessAddress = {
    businessRegion: string,
    businessCity: string,
    businessStreet: string,
    businessPostIndex: number,
    businessPhone: string,
}