import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { product, productInitialValue } from "../../../typescript/types/product";

const initialState: productInitialValue = {
    loading: true,
    productInfo: null,
};

export const fetchProductInfo = createAsyncThunk(
    "products/fetchProductInfo",
    async(id :string, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('products').select('*').eq("id", id).single();
            if(error) throw error;
            
            return data as product;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProductInfo.pending, (state) => {
            state.loading = true;
            state.productInfo = null;
        })
        .addCase(fetchProductInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.productInfo = action.payload;
        })
        .addCase(fetchProductInfo.rejected, (state) => {
            state.loading = false;
            state.productInfo = null;
        })
    }
});

export const { changeLoading } = productSlice.actions;
export default productSlice.reducer;