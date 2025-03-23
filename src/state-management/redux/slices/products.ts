import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsSliceType } from "../../../typescript/types/myProductsSlice";
import { product } from "../../../typescript/types/product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const initialState: productsSliceType = {
    loading: true,
    products: [],
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async( _, { rejectWithValue }) => {
        try{
            const productsRef = collection(db, FIRESTORE_PATH_NAMES.PRODUCTS);
            const productsSnap = await getDocs(productsRef);

            const products = productsSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return products as product[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.products = [];
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.loading = false;
            state.products = [];
        })
    }
});

export const { changeLoading } = productsSlice.actions;
export default productsSlice.reducer;