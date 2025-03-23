import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sellerProfileSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";
import { product } from "../../../typescript/types/product";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";

const initialState: sellerProfileSliceType = {
    loading: true,
    shopInfo: null,
    products: [],
};

export const fetchSellerProfileInfo = createAsyncThunk(
    "sellers/fetchSellerProfileInfo",
    async(id :string, { rejectWithValue, dispatch }) => {
        try{
            const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, id);
            const sellerSnap = await getDoc(sellerRef);

            if (!sellerSnap.exists()) {
                throw new Error("Product not found");
            };

            dispatch(fetchSellerProducts(sellerSnap.data().myproducts));

            return {
                id: sellerSnap.id,
                ...sellerSnap.data()
            } as shopInfoType;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSellerProducts = createAsyncThunk(
    "products/fetchSellerProducts",
    async (productIds: string[], { rejectWithValue }) => {
        try{
            const productsRef = collection(db, FIRESTORE_PATH_NAMES.PRODUCTS);

            const productsQuery = query(productsRef, where("id", "in", productIds));
            const querySnapshot = await getDocs(productsQuery);

            if (querySnapshot.empty) {
                throw new Error("No products found for this seller");
            };

            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return products as product[];
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