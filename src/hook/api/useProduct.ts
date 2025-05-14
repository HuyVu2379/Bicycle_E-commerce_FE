import { setCategories, setPromotions, setSuppliers } from '@/store/slices/product.slice'
import { getAllCategory, getAllSupplier, getAllPromotions } from "@/services/Product.service";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
function useProduct() {
    const dispatch = useDispatch();
    const productStore = useSelector((state: RootState) => state.productSlice);
    const { categories, suppliers, promotions } = productStore
    const handleFetchCategories = async () => {
        const response = await getAllCategory();
        dispatch(setCategories(response.data))
    }
    const handleFetchSupplier = async () => {
        const response = await getAllSupplier();
        dispatch(setSuppliers(response.data));
    }
    const handleFetchPromotion = async () => {
        const response = await getAllPromotions();
        dispatch(setPromotions(response));
    }

    return { handleFetchCategories, handleFetchSupplier, categories, suppliers, handleFetchPromotion, promotions };
}

export default useProduct;