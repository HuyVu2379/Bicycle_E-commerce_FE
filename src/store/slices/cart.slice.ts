import { CartItemsResponse, CartResponse } from '@/types/cart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitStateType {
    currentCart: CartResponse; // Loại bỏ null, luôn có giá trị khởi tạo
    cartItemCount: number;
}

const initState: InitStateType = {
    currentCart: {
        cartId: '',
        userId: '',
        items: [],
    }, // Khởi tạo mặc định để không bị null
    cartItemCount: 0,
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    reducers: {
        setCart: (state: InitStateType, { payload }: PayloadAction<CartResponse>) => {
            state.currentCart = payload;
            state.cartItemCount = payload.items?.length > 0 
                ? payload.items.reduce((total, item) => total + item.quantity, 0) 
                : 0;
        },
        setCartItem: (state: InitStateType, { payload }: PayloadAction<CartItemsResponse>) => {
            const existingItemIndex = state.currentCart.items.findIndex(item => item.productId === payload.productId);
            if (existingItemIndex >= 0) {
                const oldQuantity = state.currentCart.items[existingItemIndex].quantity;
                state.currentCart.items[existingItemIndex] = payload;
                state.cartItemCount = state.cartItemCount - oldQuantity + payload.quantity;
            } else {
                state.currentCart.items.push(payload);
                state.cartItemCount += payload.quantity;
            }
        },
        removeCartItem: (state: InitStateType, { payload }: PayloadAction<string>) => {
            const itemToRemove = state.currentCart.items.find(item => item.productId === payload);
            if (itemToRemove) {
                state.cartItemCount -= itemToRemove.quantity;
                state.currentCart.items = state.currentCart.items.filter(item => item.productId !== payload);
            }
        },
        clearCart: (state: InitStateType) => {
            state.currentCart.items = [];
            state.cartItemCount = 0;
        },
        setNoCart: (state: InitStateType) => {
            state.currentCart = {
                cartId: '',
                userId: '',
                items: [],
            };
            state.cartItemCount = 0;
        },
    },
});

export const { setCart, setCartItem, removeCartItem, clearCart, setNoCart } = cartSlice.actions;

export default cartSlice.reducer;