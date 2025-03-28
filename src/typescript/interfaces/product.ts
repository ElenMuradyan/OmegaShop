export interface product {
    id: string,
    name: string,
    price: number,
    description: string,
    autor: string,
    images: string[],
    category: string,
    subCategory: string,
    stock: number,
    usedType: string,
    options?: optionType[],
}

export type optionType = {
    optionName: string,
    optionValue: string[],
}

export interface cartProduct {
    autor: string,
    productId: string,
    cartItemId: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    maxValue: number,
    index: number,
    ordering: boolean,
    options?: optionType[],
}