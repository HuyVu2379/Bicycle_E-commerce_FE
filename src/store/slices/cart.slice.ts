import { CartItemsResponse, CartResponse } from '@/types/cart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InitStateType {
    currentCart: CartResponse | null;
    cartItemCount: number; // Để lưu tổng số lượng sản phẩm trong giỏ hàng
}

const initState: InitStateType = {
    currentCart: null,
    cartItemCount: 0,
};

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    reducers: {
        // Lưu giỏ hàng của người dùng
        setCart: (state: InitStateType, { payload }: PayloadAction<CartResponse>) => {
            state.currentCart = payload;
            // Tính tổng số lượng sản phẩm trong giỏ hàng
            state.cartItemCount = payload.items.reduce((total, item) => total + item.quantity, 0);
        },

        // Thêm hoặc cập nhật một item trong giỏ hàng
        setCartItem: (state: InitStateType, { payload }: PayloadAction<CartItemsResponse>) => {
            if (state.currentCart) {
                const existingItemIndex = state.currentCart.items.findIndex(item => item.productId === payload.productId);
                if (existingItemIndex >= 0) {
                    // Cập nhật item nếu đã tồn tại
                    const oldQuantity = state.currentCart.items[existingItemIndex].quantity;
                    state.currentCart.items[existingItemIndex] = payload;
                    // Cập nhật tổng số lượng: trừ số lượng cũ, cộng số lượng mới
                    state.cartItemCount = state.cartItemCount - oldQuantity + payload.quantity;
                } else {
                    // Thêm item mới
                    state.currentCart.items.push(payload);
                    // Cộng thêm số lượng của item mới vào tổng
                    state.cartItemCount += payload.quantity;
                }
            }
        },

        // Xóa một item khỏi giỏ hàng
        removeCartItem: (state: InitStateType, { payload }: PayloadAction<string>) => {
            if (state.currentCart) {
                const itemToRemove = state.currentCart.items.find(item => item.productId === payload);
                if (itemToRemove) {
                    // Trừ số lượng của item bị xóa khỏi tổng
                    state.cartItemCount -= itemToRemove.quantity;
                    // Xóa item khỏi danh sách
                    state.currentCart.items = state.currentCart.items.filter(item => item.productId !== payload);
                }
            }
        },

        // Xóa toàn bộ giỏ hàng
        clearCart: (state: InitStateType) => {
            if (state.currentCart) {
                state.currentCart.items = [];
                state.cartItemCount = 0;
            }
        },

        // Đặt lại giỏ hàng thành null (khi đăng xuất)
        setNoCart: (state: InitStateType) => {
            state.currentCart = null;
            state.cartItemCount = 0;
        },
    },
});

export const { setCart, setCartItem, removeCartItem, clearCart, setNoCart } = cartSlice.actions;

export default cartSlice.reducer;