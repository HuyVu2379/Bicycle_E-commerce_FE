import axiosConfig from "./axiosConfig";
const api = "/api/v1";

// get by id

// get specific product by productId
// /specifications/public/find/6822ecba9b989e58769c1e8b
export const getSpecifications = async (productId: string) => {
    try {
        const url = `${api}/specifications/public/find/${productId}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting product detail:", error);
        return { success: false, message: error };
    }
}

// get all reviews by productId
// /reviews/public/all?productId=6822ecba9b989e58769c1e8b
export const getAllReviews = async (productId: string) => {
    try {
        const url = `${api}/reviews/public/all?productId=${productId}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting reviews:", error);
        return { success: false, message: error };
    }
}