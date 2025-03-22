import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { product, productInitialValue } from "../../../typescript/types/product";
import { db } from "../../../services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const initialState: productInitialValue = {
    loading: true,
    productInfo: null,
};

export const fetchProductInfo = createAsyncThunk(
    "products/fetchProductInfo",
    async(id :string, { rejectWithValue }) => {
        try{
            const productRef = doc(db, FIRESTORE_PATH_NAMES.PRODUCTS, id);
            const productSnap = await getDoc(productRef);

            if (!productSnap.exists()) {
                throw new Error("Product not found");
            };

            return{
                id: productSnap.id,
                ...productSnap.data()
            } as product;
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