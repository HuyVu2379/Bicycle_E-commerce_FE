import axiosConfig from "./axiosConfig";

const api_product = "/api/v1/products"
const api_category = "/api/v1/categories"
const api_supplier = "/api/v1/suppliers"
const api_specification = "/api/v1/specifications"
export const getProductWithPage = async (data: any) => {
    try {
        const url = `${api_product}/public/getProductsWithPage`;
        const result = await axiosConfig.get(url, {
            params: data
        });
        return result;
    } catch (error) {
        console.error("Error get Product:", error);
        return { success: false };
    }
}
export const getAllCategory = async () => {
    try {
        const url = `${api_category}/public/getAll`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get category:", error);
        return { success: false };
    }
}
export const getAllSupplier = async () => {
    try {
        const url = `${api_supplier}/getAllSupplier`;
        const result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error get supplier:", error);
        return { success: false };
    }
}
export const createSpecifications = async (data: any) => {
    try {
        const url = `${api_supplier}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create specification:", error);
        return { success: false };
    }
}
export const createCategory = async (data: any) => {
    try {
        const url = `${api_supplier}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create category:", error);
        return { success: false };
    }
}
export const createProduct = async (data: any) => {
    try {
        const url = `${api_product}/create`;
        const result = await axiosConfig.post(url, data);
        return result.data;
    } catch (error) {
        console.error("Error create product:", error);
        return { success: false };
    }
}