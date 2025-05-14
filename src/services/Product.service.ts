import axiosConfig from "./axiosConfig";
import { ProductResponse } from "../types/product";

const api = "/api/v1/products"

interface MessageResponse<T> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T;
}

export const getAllProduct = async (): Promise<MessageResponse<ProductResponse[]>> => {
    try {
        const url = `${api}/public/getAllProduct`;
        const response = await axiosConfig.get<MessageResponse<ProductResponse[]>>(url) as unknown as MessageResponse<ProductResponse[]>;

        return response;
    } catch (error: any) {
        console.error("Error get Product:", error);
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            statusCode: error.statusCode || error.response?.status || 500,
            message: error.message || "An unexpected error occurred in service.",
            success: false,
            data: [] as ProductResponse[],
        }
    }
};

export const getProductWithPage = async (data: any) => {
    try {
        const url = `${api}/public/getProductsWithPage`;
        const result = await axiosConfig.get(url, {
            params: data
        });
        return result;
    } catch (error) {
        console.error("Error get Product:", error);
        return { success: false };
    }
}
