import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shopInfoSliceType, shopInfoType } from "../../../typescript/types/shopInfoSliceType";
import { order } from "../../../typescript/types/userDataState";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";
import { product } from "../../../typescript/types/product";

const initialState: shopInfoSliceType = {
    loading: true,
    myShopInfo: null,
    orders: {
        newOrders: [],
        processingOrders: [],
        sentOrders: [],
        doneOrders: [],
    },
    myproducts: [],
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
                return acc;
            }, {
                newOrders: [] as order[], 
                sentOrders: [] as order[],
                doneOrders: [] as order[],
                processingOrders: [] as order[],
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
            const orderPrmises = orderIds.map(orderId => {
                const orderRef = doc(db, FIRESTORE_PATH_NAMES.ORDERS, orderId);
                return getDoc(orderRef);
            });

            const orderDocs = await Promise.all(orderPrmises);

            const orders = orderDocs.map(orderDoc => {
                if(orderDoc.exists()) {
                    return { id: orderDoc.id, ...orderDoc.data() };
                }else{
                    return null;
                }
            }).filter(order => order !== null);

            return orders;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMyProducts = createAsyncThunk(
    'products/fetchmyproducts',
    async(productIds: string[], { rejectWithValue }) => {
        try{
            const productsRef = collection(db, FIRESTORE_PATH_NAMES.PRODUCTS);
            const productsQuery = query(productsRef, where("id", "in", productIds));

            const productsSnap = await getDocs(productsQuery);
            const products = productsSnap.docs.map(item => ({
                ...item.data()
            }))            
            return products as product[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchShopInfo = createAsyncThunk(
    "sellers/fetchShopInfo",
    async(id :string | null, { rejectWithValue, dispatch }) => {
        if(id){
            try{
                const sellerRef = doc(db, FIRESTORE_PATH_NAMES.SELLERS, id);
                const sellerDoc = await getDoc(sellerRef);
    
                if (!sellerDoc.exists()) {
                    throw new Error("Seller not found");
                }
     
                const sellerData = sellerDoc.data();
                const orders = {
                    newOrders: sellerData.newOrders,
                    sentOrders: sellerData.sentOrders,
                    doneOrders: sellerData.doneOrders,
                    failedOrders: sellerData.failedOrders,
                    processingOrders: sellerData.processingOrders
                }
                dispatch(fetchOrders(orders));
                dispatch(fetchMyProducts(sellerData.myproducts));
    
                return { id: sellerDoc.id, ...sellerData } as shopInfoType;
            }catch(error: any){
                return rejectWithValue(error.message);
            }    
        }else{
            return null;
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
            state.myproducts = [];
            state.orders =  {
                newOrders: [],
                processingOrders: [],
                sentOrders: [],
                doneOrders: [],
            };
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
        .addCase(fetchMyProducts.fulfilled, (state, action) => {            
            state.myproducts = action.payload;
        })
        .addCase(fetchMyProducts.rejected, (state) => {
            state.myproducts = [];
        })
    }
});

export const { changeLoading, handleStatusChange } = shopInfoSlice.actions;
export default shopInfoSlice.reducer;