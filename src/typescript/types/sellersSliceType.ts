import { businessAddress } from "./shopInfoSliceType"

export type sellersSliceType = {
    loading: boolean,
    sellers: seller[],
}

export type seller = {
    businessAddress: businessAddress,
    shopName: string,
    description: string,
    type: string,
    categories: string[],
    id: string,
    email: string,
}