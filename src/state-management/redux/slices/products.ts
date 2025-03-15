import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { productsSliceType } from "../../../typescript/types/myProductsSlice";
import { product } from "../../../typescript/types/product";

const initialState: productsSliceType = {
    loading: true,
    products: [],
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async( _, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('products').select('*');

            if(error) throw error;
            return data as product[];
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