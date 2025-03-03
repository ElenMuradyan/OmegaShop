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
    address: address,
}

export type address = {
        region: string,
        city: string,
        street: string,
        postIndex: number,
}