import {  useState } from 'react';
import {getSpecifications, getAllReviews} from '@/services/ProductDetail.Service';

interface ProductType {
};

interface SpecificationType {
    specificationId: string;
    productId: string;
    key: string;
    value: string;
    createdAt: string | null;
    updatedAt: string | null;
};

interface ReviewType {
    reviewId: string;
    userId: string;
    productId: string;
    content: string;
    rating: number;
    createdAt: string | null;
    updatedAt: string | null;
};

function useProductDetail() {
    const [specifications, setSpecifications] = useState<SpecificationType[]>([]);
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [productInfo, setProductInfo] = useState<ProductType | null>(null);

    const fetchProduct = async (productId: string) => {
    };

    const fetchSpecifications = async (productId: string) => {
        try {
            const res = await getSpecifications(productId);
            if (res.data) {
                setSpecifications(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch specifications:', error);
        }
    };

    const fetchReviews = async (productId: string) => {
        try {
            const res = await getAllReviews(productId);
            if (res.data) {
                setReviews(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    return{
        productInfo,
        specifications,
        reviews,
        fetchProduct,
        fetchSpecifications,
        fetchReviews
    };
};

export default useProductDetail;
