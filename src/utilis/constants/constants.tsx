export const ROUTE_NAMES = {
    HOMEPAGE: '/',
    HOME: '/home',
    ABOUT: '/about',
    COLLECTION: '/collection',
    LOGIN: '/login',
    REGISTER: '/register',
    BUYERREGISTER: '/register/buyer',
    SELLERREGISTER: '/register/seller',
    CABINET: '/cabinet',
    CARD: '/cabinet/card',
    ORDERS: '/cabinet/orders',
    NEWORDERS: '/cabinet/customerorders/newOrders',
    SENTORDERS: '/cabinet/customerorders/sentOrders',
    DONEORDERS: '/cabinet/customerorders/doneOrders',
    PROCESSINGORDERS: '/cabinet/customerorders/processingOrders',
    FAILEDORDERS: '/cabinet/customerorders/failedOrders',
    CUSTOMERORDERS: '/cabinet/customerorders',
    PLACEORDER: '/cabinet/placeorder',
    PROFILE: '/cabinet/profile',
    PRODUCT: '/cabinet/product',
    CARDS: '/cabinet/cards',
    ADDRESS: '/cabinet/address',
    EDITDATA: '/cabinet/editdata',
    BUYEREDITDATA: '/cabinet/editdata/buyereditdata',
    SELLEREDITDATA: '/cabinet/editdata/sellereditdata',
    BUYEREDITSDDRESS: '/cabinet/editdata/buyereditaddress',
    SELLEREDITADDRESS: '/cabinet/editdata/sellereditaddress',
    HELP: '/help',
    SHARE: '/share',
    SETTINGS: '/cabinet/settings',
    SELLERS: '/sellers',
    MYPRODUCTS: '/cabinet/myproducts',
    ADDPRODUCT: '/cabinet/addproduct',
    BUYERCONTRACT: '/buyerContract',
    SELLERCONTRACT: '/sellerContract',
    TERMSANDCONDITIONS: '/termsAndConditions',
};

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;