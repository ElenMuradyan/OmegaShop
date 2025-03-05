import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { sellerProfileSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";

const initialState: sellerProfileSliceType = {
    loading: true,
    shopInfo: null,
};

export const fetchSellerProfileInfo = createAsyncThunk(
    "sellers/fetchSellerProfileInfo",
    async(id :string, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*').eq("id", id).single();
            if(error) throw error;
            
            return data as shopInfoType;
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
        })
        .addCase(fetchSellerProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.shopInfo = action.payload;
        })
        .addCase(fetchSellerProfileInfo.rejected, (state) => {
            state.loading = false;
            state.shopInfo = null;
        })
    }
});

export const { changeLoading } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;