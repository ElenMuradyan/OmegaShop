import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userDataSlice';
import shopInfoSlice from './slices/shopInfoSlice';
import sellersSlice from './slices/sellers';
import sellerProfileInfoSlice from './slices/sellerProfileSlice';
import productSlice from './slices/productSlice';
import productsSlice from './slices/products';

export const store = configureStore({
    reducer: {
        userData: userDataSlice,
        shopInfo: shopInfoSlice,
        sellers: sellersSlice,
        sellerProfile: sellerProfileInfoSlice,
        productInfo: productSlice,
        products: productsSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;