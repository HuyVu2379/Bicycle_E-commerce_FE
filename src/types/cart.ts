export interface CartItemsResponse {
    productId: string;
    // cartItemId: string;
    productName: string;
    price: number;
    color: string; 
    quantity: number;
    imageUrl: string; 
}

export interface CartResponse {
    cartId: string;
    userId: string;
    items: CartItemsResponse[];
}

export interface MessageResponse<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
}