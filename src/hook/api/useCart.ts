import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { CartItemsResponse, CartResponse } from '@/types/cart';
import { setCart, setCartItem, setNoCart, removeCartItem, clearCart } from '@/store/slices/cart.slice';
import { CartService } from '@/services/Cart.service';
import { useState } from 'react';

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentCart, cartItemCount } = useSelector((state: RootState) => state.cartSlice);
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading

    const fetchCartByUserId = async (userId: string) => {
        setLoading(true); // Bắt đầu tải dữ liệu
        try {
            console.log("Check data userId in useCart: ", userId);
            const response = await CartService.findCartByUserId(userId);
            console.log("Check data in useCart: ", response);
            return response;
        } catch (error) {
            console.error("Failed to fetch cart:", error);
        } finally {
            setLoading(false); // Kết thúc tải dữ liệu
        }
    };

    const addCartItems = async (item: CartItemsResponse & { cartId: string }) => {
        try {
            const response = await CartService.createCartItem(item);
            if (response.success) {
                dispatch(setCartItem(response.data));
            } else {
                console.error('Failed to add cart item:', response.message);
            }
            return response;
        } catch (error) {
            console.error('Failed to add cart item:', error);
        }
    };

    const removeCartItems = async (cartId: string, productId: string) => {
        try {
            const response = await CartService.deleteCartItem(cartId, productId);
            if (response.success) {
                dispatch(removeCartItem(productId));
            } else {
                console.error('Failed to remove cart item:', response.message);
            }
        } catch (error) {
            console.error('Failed to remove cart item:', error);
        }
    };

    const updateItemQuantity = async (cartId: string, productId: string, quantity: number) => {
        try {
            const response = await CartService.updateQuantity(cartId, productId, quantity);
            if (response.success) {
                dispatch(setCartItem(response.data));
            } else {
                console.error('Failed to update quantity:', response.message);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const clearCarts = async (cartId: string) => {
        try {
            const response = await CartService.deleteAllCartItems(cartId);
            if (response.success) {
                dispatch(setNoCart());
                dispatch(clearCart());
            } else {
                console.error('Failed to clear cart:', response.message);
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return {
        currentCart,
        cartItemCount,
        loading, // Trả về trạng thái loading
        fetchCartByUserId,
        addCartItems,
        removeCartItems,
        updateItemQuantity,
        clearCarts,
    };
};