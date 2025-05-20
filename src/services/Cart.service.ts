import axiosConfig from "./axiosConfig";
const api_CartItems = "/api/v1/cart-items"
const api_Cart = "/api/v1/carts"
export const createCartItemSerive = async (data: any) => {
    try {
        const url = `${api_CartItems}/create`;
        console.log("check url: ", url);
        let result = await axiosConfig.post(url, data);
        return result;
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, message: error };
    }
}
export const findCartByUserId = async (userId: string) => {
    try {
        const url = `${api_Cart}/find-cart-by-userId/${userId}`;
        let result = await axiosConfig.get(url);
        console.log("check cart after fetch cart by userId: ", result);
        return result;
    } catch (error) {
        console.error("Error get cart by userId:", error);
        return { success: false, message: error };
    }
}
export const updateQuantityCartItems = async (cartItemId: string, quantity: number) => {
    try {
        const url = `${api_CartItems}/update-quantity/${cartItemId}`;
        let result = await axiosConfig.put(url, quantity);
        console.log("check cart after fetch cart by userId: ", result);
        return result;
    } catch (error) {
        console.error("Error get cart by userId:", error);
        return { success: false, message: error };
    }
}
export const removeCartItemService = async (cartItemId: string) => {
    try {
        const url = `${api_CartItems}/remove/${cartItemId}`;
        let result = await axiosConfig.delete(url);
        return result;
    } catch (error) {
        console.error("Error removing cart item:", error);
        return { success: false, message: error };
    }
}
export const bulkDeleteCartItems = async (cartItemIds: string[]) => {
    try {
        const url = `${api_CartItems}/bulk-delete`;
        let result = await axiosConfig.delete(url, { data: cartItemIds });
        return result;
    } catch (error) {
        console.error("Error bulk delete cart items:", error);
        return { success: false, message: error };
    }
}
