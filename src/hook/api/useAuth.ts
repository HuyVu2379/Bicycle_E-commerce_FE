import { setMe } from '@/store/slices/user.slice';
import { login } from '@/services/Auth.service';
import { getUserById } from '@/services/User.service';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { APP_ROUTES } from '@/constants';
import { useNavigate } from "react-router";
import { removeValueInLocalStorage, setValueInLocalStorage } from '@/utils/localStorage';
import { RootState } from '@/store';
import { useCart } from './useCart';

function useAuth() {
    const userStore = useSelector((state: RootState) => state.userSlice);
    const { me } = userStore;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { fetchCartByUserId } = useCart();

    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        if ('success' in response && response.success === true) {
            enqueueSnackbar({ message: 'Login successful!', variant: 'success' });
            navigate(`${APP_ROUTES.DASHBOARD}`);
            setValueInLocalStorage('accessToken', response.data.accessToken);
            setValueInLocalStorage('refreshToken', response.data.refreshToken);
            const userId = response.data.userId;
            setValueInLocalStorage('userId', userId);
            await handleGetMe(userId);
            const data = await fetchCartByUserId(userId); 
            console.log("Check data cart User in useAuth: ", data);
        } else {
            enqueueSnackbar(`${response.message?.response?.data?.message || 'Login failed'}.`, { variant: 'error' });
        }
        return response.data;
    };

    const handleLogout = async () => {
        try {
            removeValueInLocalStorage("accessToken");
            removeValueInLocalStorage("refreshToken");
            removeValueInLocalStorage("userId");
            dispatch(setMe(null));
            enqueueSnackbar({ message: 'Logout successful!', variant: 'success' });
        } catch (error) {
            enqueueSnackbar({ message: 'Logout failed!', variant: 'error' });
        }
    };

    const handleGetMe = async (userId: string) => {
        const user = await getUserById(userId);
        dispatch(setMe(user.data));
    };

    return { handleLogin, handleLogout, me, handleGetMe };
}

export default useAuth;