import axiosConfig from "./axiosConfig";

const api = "/api/v1/products"

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