import axiosConfig from "@/services/axiosConfig";
import { setMe } from '@/store/slices/user.slice'
function useUser() {
    const handleRegister = async (user: any) => {
        const response = await axiosConfig.post('/register', user);
        if (response.status === 201) {
            return response.data
        }
        return response.data;
    }
}

export default useUser;