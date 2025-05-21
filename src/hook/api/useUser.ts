import { setMe, setAddress } from "@/store/slices/user.slice";
import {
  register,
  editAddress,
  editProfile,
  updateAvatar,
} from "@/services/User.service";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { APP_ROUTES } from "@/constants";
function useUser() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); 
  const navigate = useLocation();

  const handleRegister = async (user: any) => {
    const response = await register(user);
    console.log("Check response in user service: ", response);
    dispatch(setMe(response));
    enqueueSnackbar(`${"Register Success"}.`, { variant: "success" });
  };
  const handleEditAddress = async (address: any) => {
    const response = await editAddress(address);
    dispatch(setAddress(response.data));
  };
  const handleEditProfile = async (user: any) => {
    const response = await editProfile(user);
    console.log("check response edit user in useUser: ", response);
    dispatch(setMe(response?.data));
  };
  const handleUpdateAvatar = async (data: any) => {
    const response = await updateAvatar(data);
    return response;
  };
  return {
    handleRegister,
    handleEditAddress,
    handleEditProfile,
    handleUpdateAvatar,
  };
}

export default useUser;
