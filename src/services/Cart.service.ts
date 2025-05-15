import { CartItemsResponse, MessageResponse } from "@/types/cart";
import axiosConfig from "./axiosConfig";

const API_CART = "/api/v1/cart";
const API_CART_ITEM = "/api/v1/cart-items";

export const CartService = {
  // Find cart by user ID
  findCartByUserId: async (
    userId: string
  ): Promise<MessageResponse<CartItemsResponse[]>> => {
    try {
      const url = `${API_CART}/find-cart-by-userId/${userId}`;
      const response = (await axiosConfig.get<
        MessageResponse<CartItemsResponse[]>
      >(url)) as unknown as MessageResponse<CartItemsResponse[]>;
      return response;
    } catch (error: any) {
      console.error("Error finding cart by user ID:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: [],
      };
    }
  },

  // Create a cart item
  createCartItem: async (
    item: CartItemsResponse
  ): Promise<MessageResponse<CartItemsResponse>> => {
    try {
      const url = `${API_CART_ITEM}/create`;
      const { productId, quantity, cartId } = item;
      const response = (await axiosConfig.post<
        MessageResponse<CartItemsResponse>
      >(url, {
        productId,
        quantity,
        cartId,
      })) as unknown as MessageResponse<CartItemsResponse>;
      return response;
    } catch (error: any) {
      console.error("Error creating cart item:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: {} as CartItemsResponse,
      };
    }
  },

  // Delete a cart item
  deleteCartItem: async (
    cartItemId: string
  ): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/remove/${cartItemId}`;
      const response = (await axiosConfig.post<MessageResponse<string>>(
        url
      )) as unknown as MessageResponse<string>;
      return response;
    } catch (error: any) {
      console.error("Error deleting cart item:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: "",
      };
    }
  },

  // Update quantity of a cart item
  updateQuantity: async (
    cartItemId: string,
    quantity: number
  ): Promise<MessageResponse<CartItemsResponse>> => {
    try {
      const url = `${API_CART_ITEM}/update-quantity/${cartItemId}`;
      const response = (await axiosConfig.put<
        MessageResponse<CartItemsResponse>
      >(url, { quantity })) as unknown as MessageResponse<CartItemsResponse>;
      return response;
    } catch (error: any) {
      console.error("Error updating cart item quantity:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: {} as CartItemsResponse,
      };
    }
  },

  // Delete all items in a cart
  deleteAllCartItems: async (): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/delete-all`;
      const response = (await axiosConfig.delete<MessageResponse<string>>(
        url
      )) as unknown as MessageResponse<string>;
      return response;
    } catch (error: any) {
      console.error("Error deleting all cart items:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: "",
      };
    }
  },

  // Bulk delete cart items
  bulkDeleteCartItem: async (): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/bulk-delete`;
      const response = (await axiosConfig.delete<MessageResponse<string>>(
        url
      )) as unknown as MessageResponse<string>;
      return response;
    } catch (error: any) {
      console.error("Error bulk deleting cart items:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: "",
      };
    }
  },
  // Get all cart items
  getAllCartItems: async (): Promise<MessageResponse<CartItemsResponse[]>> => {
    try {
      const url = `${API_CART_ITEM}/all`;
      const response = (await axiosConfig.get<
        MessageResponse<CartItemsResponse[]>
      >(url)) as unknown as MessageResponse<CartItemsResponse[]>;
      return response;
    } catch (error: any) {
      console.error("Error getting all cart items:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: [],
      };
    }
  },
};
