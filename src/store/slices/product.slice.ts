import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Category {
    categoryId: string,
    name: string,
    description: string,
}
interface Supplier {
    supplierId: string,
    name: string,
    addressId: string,
    phone: string,
    email: string,
    description: string,
}
export interface InitStateType {
    categories: Partial<Category>[]
    suppliers: Partial<Supplier>[]
}

const initState: InitStateType = {
    categories: [],
    suppliers: []
};


export const useProduct = createSlice({
    name: 'productSlice',
    initialState: initState,
    reducers: {
        setCategories: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.categories = payload
        },
        setSuppliers: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.suppliers = payload
        }
    },
});
export const {
    setCategories,
    setSuppliers
} = useProduct.actions;

export default useProduct.reducer;