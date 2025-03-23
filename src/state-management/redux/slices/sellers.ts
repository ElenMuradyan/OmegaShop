import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { seller, sellersSliceType } from "../../../typescript/types/sellersSliceType";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const initialState: sellersSliceType = {
    loading: true,
    sellers: [],
};

export const fetchSellers = createAsyncThunk(
    "sellers/fetchSellers",
    async( _, { rejectWithValue }) => {
        try{
            const sellerRef = collection(db, FIRESTORE_PATH_NAMES.SELLERS);
            const sellersSnap = await getDocs(sellerRef);

            const sellers = sellersSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              
              return sellers as seller[];
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
            state.sellers = action.payload ;
        })
        .addCase(fetchSellers.rejected, (state) => {
            state.loading = false;
            state.sellers = [];
        })
    }
});

export const { changeLoading } = sellersSlice.actions;
export default sellersSlice.reducer;