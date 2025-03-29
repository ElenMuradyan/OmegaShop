import { optionType } from "../interfaces/product"

export type product = {
    id: string, 
    images: string[], 
    name: string,
    price: number,
    description: string,
    category: string, 
    subCategory: string,
    stock: number,
    usedType: string,
    autor: string,
    returnType: boolean,
    options?: optionType[],
}

export type productInitialValue = {
    loading: boolean,
    productInfo: product | null
}