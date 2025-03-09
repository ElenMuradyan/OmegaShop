import { product } from "./product"

export type myProductsSliceType = {
    loading: boolean,
    myProducts: product[],
}