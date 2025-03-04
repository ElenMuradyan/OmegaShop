export type shopInfoSliceType = {
    loading: boolean,
    shopInfo: shopInfoType | null
}

export type shopInfoType = {
    businessAddress: businessAddress,
    businessPhone: string,
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