import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/supabase/supabase";
import { order, userData, userDataSliceType } from "../../../typescript/types/userDataState";
import { cartProduct } from "../../../typescript/interfaces/product";

const initialState: userDataSliceType = {
    loading: true,
    error: null,
    authUserInfo: {
        isAuth: false,
        userData: null,
        userOrders: [],
    },
};

export const fetchUserData = createAsyncThunk(
    "users/fetchUserData",
    async(email : string, { rejectWithValue, dispatch }) => {
        try{
            const { data, error } = await supabase.from('users').select('*').eq("email", email).single();
            if(error) throw error;

            dispatch(fetchUserOrderProducts(data.orders));
            return data as userData;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserOrderProducts = createAsyncThunk(
    "orders/fetchUserOrderProducts",
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

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsAuth: (state, action) => {
            state.authUserInfo.isAuth = action.payload
        },
        setCart: (state, action) => {
            if(state.authUserInfo.userData){
                state.authUserInfo.userData.cart = action.payload as cartProduct[];
            }
        },
        setOrdering: (state, action) => {
            if(state.authUserInfo.userData){
                state.authUserInfo.userData.cart[action.payload.index].ordering = action.payload.ordering;
            }
        },
        setUserOrders: (state, action) => {
            const updatedOrders = [...state.authUserInfo.userOrders, action.payload];
            state.authUserInfo.userOrders = updatedOrders;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.authUserInfo.isAuth = true;
            state.authUserInfo.userData = action.payload;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.authUserInfo.isAuth = false;
        })
        .addCase(fetchUserOrderProducts.fulfilled, (state, action) => {
            state.authUserInfo.userOrders = action.payload;
        })
        .addCase(fetchUserOrderProducts.rejected, (state) => {
            state.authUserInfo.userOrders = [];
        })
    }
});

export const { changeLoading, setIsAuth, setCart, setOrdering, setUserOrders } = userDataSlice.actions;
export default userDataSlice.reducer;