import { product } from "./product"

export type myProductsSliceType = {
    loading: boolean,
    myProducts: product[],
}

export type productsSliceType = {
    loading: boolean,
    products: product[],
}