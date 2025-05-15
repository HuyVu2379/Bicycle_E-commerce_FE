export interface CartItemsResponse {
    productId: string;
    cartItemId : string,
    name: string;
    price: number;
    selectedColor: string,
    quantity: number,
    image: string,
}

export interface CartResponse {
    cartId: string,
    userId: string,
    items: CartItemsResponse[];
}

export interface MessageResponse<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
}