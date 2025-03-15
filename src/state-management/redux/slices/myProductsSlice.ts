import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { myProductsSliceType } from "../../../typescript/types/myProductsSlice";
import { product } from "../../../typescript/types/product";

const initialState: myProductsSliceType = {
    loading: true,
    myProducts: [],
};

export const fetchMyProducts = createAsyncThunk(
    "users/fetchMyProducts",
    async(email : string, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*').eq("email", email).single();
            if(error) throw error;
            const productPromises = data.myproducts.map(async (item: string) => {
                    const { data, error } = await supabase.from('products').select('*').eq("id", item).single();
                    if(error) throw error;
                    return data
            });

            const products = await Promise.all(productPromises);

            return products as product[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const myProductsSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchMyProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMyProducts.fulfilled, (state, action) => {
            state.loading = false;            
            state.myProducts = action.payload;
        })
        .addCase(fetchMyProducts.rejected, (state) => {
            state.loading = false;
            state.myProducts = [];
        })
    }
});

export const { changeLoading } = myProductsSlice.actions;
export default myProductsSlice.reducer;