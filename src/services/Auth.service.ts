import axiosConfig from "./axiosConfig";
const api = "/api/v1/auth"
export const login = async (email: string, password: string) => {
    try {
        const url = `${api}/login`;
        console.log("check url: ", url);
        let result = await axiosConfig.post(url, { email, password });
        return result;
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, message: error };
    }
}
