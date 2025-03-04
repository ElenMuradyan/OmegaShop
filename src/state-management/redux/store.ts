import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userDataSlice';
import shopInfoSlice from './slices/shopInfoSlice';

export const store = configureStore({
    reducer: {
        userData: userDataSlice,
        shopInfo: shopInfoSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;