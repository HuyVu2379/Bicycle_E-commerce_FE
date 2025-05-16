import { CartItemsResponse, CartResponse, MessageResponse } from "@/types/cart";
import axiosConfig from "./axiosConfig";

const API_CART = "/api/v1/carts";
const API_CART_ITEM = "/api/v1/cart-items";

export const CartService = {
  // Find cart by user ID
  findCartByUserId: async (
    userId: string
  ): Promise<MessageResponse<CartResponse>> => {
    try {
      console.log("Check data UserId: ", userId);
      const url = `${API_CART}/find-cart-by-userId/${userId}`;
      const response = await axiosConfig.get<MessageResponse<CartResponse>>(url);
      console.log("Check raw response from API: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error finding cart by user ID:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        statusCode: error.statusCode || error.response?.status || 500,
        message: error.message || "An unexpected error occurred in service.",
        success: false,
        data: { cartId: "", userId: "", items: [] },
      };
    }
  },

  // Create a cart item
  createCartItem: async (
    item: CartItemsResponse & { cartId: string }
  ): Promise<MessageResponse<CartItemsResponse>> => {
    try {
      const url = `${API_CART_ITEM}/create`;
      const { productId, productName, quantity, cartId, color, imageUrl } = item;
      const response = await axiosConfig.post<MessageResponse<CartItemsResponse>>(
        url,
        {
          productId,
          productName,
          quantity,
          cartId,
          color,
          imageUrl,
        }
      );
      return response.data;
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
    cartId: string,
    productId: string
  ): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/remove/${cartId}/${productId}`;
      const response = await axiosConfig.delete<MessageResponse<string>>(url);
      return response.data;
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
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<MessageResponse<CartItemsResponse>> => {
    try {
      const url = `${API_CART_ITEM}/update-quantity/${cartId}/${productId}`;
      const response = await axiosConfig.put<MessageResponse<CartItemsResponse>>(
        url,
        { quantity }
      );
      return response.data;
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
  deleteAllCartItems: async (cartId: string): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/delete-all/${cartId}`;
      const response = await axiosConfig.delete<MessageResponse<string>>(url);
      return response.data;
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
  bulkDeleteCartItem: async (cartId: string): Promise<MessageResponse<string>> => {
    try {
      const url = `${API_CART_ITEM}/bulk-delete/${cartId}`;
      const response = await axiosConfig.delete<MessageResponse<string>>(url);
      return response.data;
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
  getAllCartItems: async (cartId: string): Promise<MessageResponse<CartItemsResponse[]>> => {
    try {
      const url = `${API_CART_ITEM}/all/${cartId}`;
      const response = await axiosConfig.get<MessageResponse<CartItemsResponse[]>>(url);
      return response.data;
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