import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { sellerProfileSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";
import { product } from "../../../typescript/types/product";

const initialState: sellerProfileSliceType = {
    loading: true,
    shopInfo: null,
    products: [],
};

export const fetchSellerProfileInfo = createAsyncThunk(
    "sellers/fetchSellerProfileInfo",
    async(id :string, { rejectWithValue, dispatch }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*').eq("id", id).single();
            if(error) throw error;
            
            dispatch(fetchSellerProducts(data.myproducts));
            return data as shopInfoType;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSellerProducts = createAsyncThunk(
    "products/fetchSellerProducts",
    async (productIds: string[], { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('products').select('*').in("id", productIds);

            if (error) throw error;

            return data as product[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const sellerProfileSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchSellerProfileInfo.pending, (state) => {
            state.loading = true;
            state.shopInfo = null;
            state.products = [];
        })
        .addCase(fetchSellerProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.shopInfo = action.payload;
        })
        .addCase(fetchSellerProfileInfo.rejected, (state) => {
            state.loading = false;
            state.shopInfo = null;
        })
        .addCase(fetchSellerProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        .addCase(fetchSellerProducts.rejected, (state) => {
            state.products = [];
        })
    }
});

export const { changeLoading } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;