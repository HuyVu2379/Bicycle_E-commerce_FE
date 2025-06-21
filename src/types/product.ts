export interface ProductResponse {
    productId: string;
    name: string;
    price: number;
    priceReduced: number;
    originalData: any;
    image: string;
}

export interface ProductListProps {
    products: ProductResponse[];
}