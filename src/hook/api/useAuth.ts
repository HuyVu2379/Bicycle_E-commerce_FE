import { setMe } from '@/store/slices/user.slice'
import { login } from '@/services/Auth.service'
import { getUserById } from '@/services/User.service'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack';
import { APP_ROUTES } from '@/constants';
import { setValueInLocalStorage } from '@/utils/localStorage';
function useUser() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleLogin = async (email: string, password: string) => {
        const response = await login(email, password);
        console.log("check response login: ", response);
        if (response.statusCode === 200 && response.success === true) {
            console.log("Check userId: ", response.data.userId);

            const user = await getUserById(response.data.userId);
            console.log("check user fetch: ", user);
            dispatch(setMe(user.data));
            setValueInLocalStorage('accessToken', response.data.accessToken);
            setValueInLocalStorage('refreshToken', response.data.refreshToken);
            enqueueSnackbar({ message: 'Login successful!', variant: 'success' });
        } else {
            enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
        }
        return response.data;
    }
    return { handleLogin };
}

export default useUser;