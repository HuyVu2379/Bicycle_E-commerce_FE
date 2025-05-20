import { setCart, addCartItemInCart } from '@/store/slices/cart.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router"
import { RootState } from '@/store';
import { findCartByUserId, createCartItemSerive } from '@/services/Cart.service';
function useCart() {
    const userStore = useSelector((state: RootState) => state.userSlice);
    const { me } = userStore
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const createCartItem = async (data: any) => {
        const cart = await createCartItemSerive(data);
        enqueueSnackbar("Add product to cart successfully", { variant: 'success' });
        dispatch(addCartItemInCart(cart?.data))
    }
    const fetchCartByUserId = async (userId: string) => {
        const cart = await findCartByUserId(userId);
        dispatch(setCart(cart?.data));
    }
    return { fetchCartByUserId, createCartItem };
}

export default useCart;