import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { shopInfoSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";

const initialState: shopInfoSliceType = {
    loading: true,
    myShopInfo: null
};

export const fetchShopInfo = createAsyncThunk(
    "sellers/fetchShopInfo",
    async(email :string, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*').eq("email", email).single();
            if(error) throw error;
            
            return data as shopInfoType;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const shopInfoSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchShopInfo.pending, (state) => {
            state.loading = true;
            state.myShopInfo = null;
        })
        .addCase(fetchShopInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.myShopInfo = action.payload;
        })
        .addCase(fetchShopInfo.rejected, (state) => {
            state.loading = false;
            state.myShopInfo = null;
        })
    }
});

export const { changeLoading } = shopInfoSlice.actions;
export default shopInfoSlice.reducer;