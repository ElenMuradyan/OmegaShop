import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartProductType, order, userData, userDataSliceType } from "../../../typescript/types/userDataState";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../services/firebase/firebase";
import { FIRESTORE_PATH_NAMES } from "../../../utilis/constants/firebaseConstants";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getOrderPriority } from "../../../utilis/helpers/getOrderPriority";

const initialState: userDataSliceType = {
    loading: true,
    error: null,
    authUserInfo: {
        isAuth: false,
        userData: null,
        cart: [],
        userOrders: [],
    },
};


export const fetchUserData = createAsyncThunk(
    "users/fetchUserData",
    async (_, { dispatch }) => {
        return new Promise<userData | null>((resolve, reject) => {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    dispatch(changeLoading(true));
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, user.uid);
                    getDoc(userRef)
                    .then((userData) => {
                        if(userData.exists()){
                            const data = userData.data();
                            dispatch(fetchUserCart(data.id));
                            dispatch(fetchUserOrderProducts(data.orders))
                            resolve(data as userData)
                        }else{
                            resolve(null);
                        }
                    })
                }else{
                    reject('Ինչ որ բան սխալ գնաց։');
                }
          });
        });
    }
);
    

export const fetchUserOrderProducts = createAsyncThunk(
    "orders/fetchUserOrderProducts",
    async (orderIds: string[], { rejectWithValue }) => {
        try{
            const orders: order[] = [];
            for(const orderId of orderIds){
                const orderRef = doc(db, FIRESTORE_PATH_NAMES.ORDERS, orderId);
                const orderSnap = await getDoc(orderRef);

                if(orderSnap.exists()){
                    const orderData = orderSnap.data();

                    const serializedOrder = {
                        ...orderData,
                        id: orderSnap.id,
                    };

                    orders.push(serializedOrder as order);
                }
            }

            orders.sort((a, b) => {
                const priorityA = getOrderPriority(a);
                const priorityB = getOrderPriority(b);
                return priorityA - priorityB;
            });
            
            return orders;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserCart = createAsyncThunk(
    "user/fetchUserCartProducts",
    async (userId: string, { rejectWithValue }) => {
        try{
            const cartRef = collection(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, userId, FIRESTORE_PATH_NAMES.CART);
            const cartSnap = await getDocs(cartRef);

            const cartProducts = cartSnap.docs.map((doc) => ({
                cartItemId: doc.id,
                ...doc.data(),
            }));

            return cartProducts;
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
                state.authUserInfo.cart = action.payload as cartProductType[];
            }
        },
        setOrdering: (state, action) => {            
            if(state.authUserInfo.userData){                
                state.authUserInfo.cart[action.payload.index].ordering = action.payload.ordering;
            }
        },
        deleteItem: (state, action) => {            
            if(state.authUserInfo.userData){        
                state.authUserInfo.cart = state.authUserInfo.cart.filter(item => item !== state.authUserInfo.cart[action.payload]);
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
            state.authUserInfo.cart = [];
            state.authUserInfo.userData = null;
            state.authUserInfo.userOrders = [];
            state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {            
            state.authUserInfo.isAuth = true;
            state.authUserInfo.userData = action.payload;
            state.loading = false;
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
        .addCase(fetchUserCart.fulfilled, (state, action) => {
            state.authUserInfo.cart = action.payload as cartProductType[];
        })
        .addCase(fetchUserCart.rejected, (state) => {
            state.authUserInfo.cart = []
        })
    }
});

export const { changeLoading, setIsAuth, setCart, setOrdering, setUserOrders, deleteItem } = userDataSlice.actions;
export default userDataSlice.reducer;