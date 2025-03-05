import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { seller, sellersSliceType } from "../../../typescript/types/sellersSliceType";

const initialState: sellersSliceType = {
    loading: true,
    sellers: [],
};

export const fetchSellers = createAsyncThunk(
    "sellers/fetchSellers",
    async( _, { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*');

            if(error) throw error;
            return data as seller[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const sellersSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchSellers.pending, (state) => {
            state.loading = true;
            state.sellers = [];
        })
        .addCase(fetchSellers.fulfilled, (state, action) => {
            state.loading = false;
            state.sellers = action.payload;
        })
        .addCase(fetchSellers.rejected, (state) => {
            state.loading = false;
            state.sellers = [];
        })
    }
});

export const { changeLoading } = sellersSlice.actions;
export default sellersSlice.reducer;