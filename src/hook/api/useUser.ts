import { setMe, setAddress } from '@/store/slices/user.slice'
import { register, editAddress, editProfile, updateAvatar } from "@/services/User.service";
import { useDispatch } from 'react-redux';
function useUser() {
    const dispatch = useDispatch();
    const handleRegister = async (user: any) => {
        const response = await register(user);
        dispatch(setMe(response.data.user))
    }
    const handleEditAddress = async (address: any) => {
        const response = await editAddress(address);
        dispatch(setAddress(response.data));
    }
    const handleEditProfile = async (user: any) => {
        const response = await editProfile(user);
        console.log("check response edit user in useUser: ", response);
        dispatch(setMe(response?.data));
    }
    const handleUpdateAvatar = async (data: any) => {
        const response = await updateAvatar(data);
        return response
    }
    return { handleRegister, handleEditAddress, handleEditProfile, handleUpdateAvatar };
}

export default useUser;