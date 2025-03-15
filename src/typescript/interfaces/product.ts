export interface product {
    id: string,
    name: string,
    price: number,
    description: string,
    images: string[],
    category: string,
    subCategory: string,
    stock: number,
    usedType: string,
    options: optionType[],
}

export type optionType = {
    optionName: string,
    optionValue: string[],
}