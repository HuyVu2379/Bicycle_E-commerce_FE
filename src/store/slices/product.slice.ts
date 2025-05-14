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
interface Promotion {
    createdAt: Date,
    updatedAt: Date,
    promotionId: string,
    name: string,
    reducePercent: number,
    startDate: Date,
    endDate: Date,
    limitValue: number,
    applyFor: string,
    active: boolean
}
export interface InitStateType {
    categories: Partial<Category>[]
    suppliers: Partial<Supplier>[]
    promotions: Partial<Promotion>[]
}

const initState: InitStateType = {
    categories: [],
    suppliers: [],
    promotions: []
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
        },
        setPromotions: (state: InitStateType, { payload }: PayloadAction<any>) => {
            state.promotions = payload
        }
    },
});
export const {
    setCategories,
    setSuppliers,
    setPromotions
} = useProduct.actions;

export default useProduct.reducer;