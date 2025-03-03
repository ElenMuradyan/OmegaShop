export interface buyerRegister {
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
    phone: string;
    region: string;
    city: string;
    street: string;
    postIndex: string;
}


export interface sellerRegister {
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
    phone: string;
    region: string;
    city: string;
    street: string;
    postIndex: string;
    businessRegion: string;
    businessCity: string;
    businessStreet: string;
    businessPostIndex: string;
    businessPhone: string;
    shopName: string;
    description: string;
    type: string;
    categories: string[];
}