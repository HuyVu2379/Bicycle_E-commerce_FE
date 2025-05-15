import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
// import { CartService } from './Cart.service';
import { CartItemsResponse } from '@/types/cart';
import { setCart, setCartItem, setNoCart } from '@/store/slices/cart.slice';
import { CartService } from '@/services/Cart.service';

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currentCart } = useSelector((state: RootState) => state.cart);

    const fetchCartByUserId = async (userId: string) => {
        try {
            const data = await CartService.findCartByUserId(userId);
            console.log("Check data in useCart: ",data);
            dispatch(setCart({ carts: data }));
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    };

    const addCartItem = async (item: CartItemsResponse) => {
        try {
            const data = await CartService.createCartItem(item.cartId || '', item);
            dispatch(setCartItem(data));
        } catch (error) {
            console.error('Failed to add cart item:', error);
        }
    };

    const removeCartItem = async (cartId: string, productId: string) => {
        try {
            await CartService.deleteCartItem(cartId, productId);
            dispatch(setCartItem({ ...cart.find(item => item.productId === productId), quantity: 0 }));
        } catch (error) {
            console.error('Failed to remove cart item:', error);
        }
    };

    const updateItemQuantity = async (cartId: string, productId: string, quantity: number) => {
        try {
            const data = await CartService.updateQuantity(cartId, productId, quantity);
            dispatch(setCartItem(data));
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const clearCart = async (cartId: string) => {
        try {
            await CartService.deleteAllCartItems(cartId);
            dispatch(setNoCart(0));
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return {
        cart,
        fetchCartByUserId,
        addCartItem,
        removeCartItem,
        updateItemQuantity,
        clearCart,
    };
};