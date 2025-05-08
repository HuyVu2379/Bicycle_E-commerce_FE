import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Address {
    addressId: string;
    district: string;
    city: string;
    street: string;
    ward: string;
    country: string;
}
interface User {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    address: Address;
    avatar: string;
    gender: string
}
export interface InitUserType {
    me: {
        user: Partial<User>;
    }
}

const initUser: InitUserType = {
    me: {
        user: {
            userId: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            dob: '',
            avatar: '',
            gender: '',
            address: {
                addressId: '',
                district: '',
                city: '',
                street: '',
                ward: '',
                country: ''
            },
        },
    },
};


export const useUser = createSlice({
    name: 'userSlice',
    initialState: initUser,
    reducers: {
        setMe: (state: InitUserType, { payload }: PayloadAction<any>) => {
            console.log("check me: ", payload);
            state.me = payload;
        },
    },
});
export const {
    setMe,
} = useUser.actions;

export default useUser.reducer;