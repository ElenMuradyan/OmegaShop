export type userDataSliceType = {
    loading: boolean,
    error: null | string,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null,
    },
}

export type userData = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    address: address,
}

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