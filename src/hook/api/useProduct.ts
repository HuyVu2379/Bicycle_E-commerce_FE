import { setCategories, setSuppliers } from '@/store/slices/product.slice'
import { getAllCategory, getAllSupplier } from "@/services/Product.service";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
function useProduct() {
    const dispatch = useDispatch();
    const productStore = useSelector((state: RootState) => state.productSlice);
    const { categories, suppliers } = productStore
    const handleFetchCategories = async () => {
        const response = await getAllCategory();
        dispatch(setCategories(response.data))
    }
    const handleFetchSupplier = async () => {
        const response = await getAllSupplier();
        dispatch(setSuppliers(response.data));
    }

    return { handleFetchCategories, handleFetchSupplier, categories, suppliers };
}

export default useProduct;