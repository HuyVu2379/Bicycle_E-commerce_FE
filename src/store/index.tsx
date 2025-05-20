import { configureStore } from "@reduxjs/toolkit";
import { Store } from "@reduxjs/toolkit";
import useUser from "./slices/user.slice";
import useProduct from "./slices/product.slice";
import cartSlice from "./slices/cart.slice";
export const store: Store = configureStore({
    reducer: {
        userSlice: useUser,
        productSlice: useProduct,
        cartSlice: cartSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
