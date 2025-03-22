import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { shopInfoSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";
import { order } from "../../../typescript/types/userDataState";

const initialState: shopInfoSliceType = {
    loading: true,
    myShopInfo: null,
    orders: {
        newOrders: [],
        processingOrders: [],
        sentOrders: [],
        doneOrders: [],
    }
};

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async(orders: Record<string, string[]>, { rejectWithValue, dispatch }) => {
        try{
            const results = await Promise.all(
                Object.entries(orders).map(async([key, value]) => {                    
                    const result = await dispatch(fetchSellerOrderProducts(value));
                    return { key, data: result.payload as order[]};
                })
            );

            const fetchedOrders = results.reduce((acc, { key, data }) => {
                if (key === 'newOrders') acc.newOrders = data;
                if (key === 'sentOrders') acc.sentOrders = data;
                if (key === 'doneOrders') acc.doneOrders = data;
                if (key === 'processingOrders') acc.processingOrders = data;
                if (key === 'failedOrders') acc.failedOrders = data;
                return acc;
            }, {
                newOrders: [] as order[], 
                sentOrders: [] as order[],
                doneOrders: [] as order[],
                processingOrders: [] as order[],
                failedOrders: [] as order[],
            });            

            return fetchedOrders;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSellerOrderProducts = createAsyncThunk(
    "orders/fetchSellerOrderProducts",
    async (orderIds: string[], { rejectWithValue }) => {
        try{
            const { data, error } = await supabase.from('orders').select('*').in("id", orderIds);

            if (error) throw error;

            return data as order[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchShopInfo = createAsyncThunk(
    "sellers/fetchShopInfo",
    async(email :string, { rejectWithValue, dispatch }) => {
        try{
            const { data, error } = await supabase.from('sellers').select('*').eq("email", email).single();
            if(error) throw error;
            
            const orders = {
                newOrders: data.newOrders,
                sentOrders: data.sentOrders,
                doneOrders: data.doneOrders,
                failedOrders: data.failedOrders,
                processingOrders: data.processingOrders
            }
            dispatch(fetchOrders(orders));

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
        handleStatusChange: (state, action) => {
            state.orders = action.payload
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
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state) => {
            state.orders = {
                newOrders: [],
                processingOrders: [],
                sentOrders: [],
                doneOrders: [],
            };
        })
    }
});

export const { changeLoading, handleStatusChange } = shopInfoSlice.actions;
export default shopInfoSlice.reducer;