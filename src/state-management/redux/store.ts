import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './slices/userDataSlice';

export const store = configureStore({
    reducer: {
        userData: userDataSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;