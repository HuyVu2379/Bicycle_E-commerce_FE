import axiosConfig from "./axiosConfig";

const api = "/api/v1/users"

export const register = async (data: any) => {
    try {
        const url = `${api}/register`;
        return await axiosConfig.post(url, data);
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false };
    }
}