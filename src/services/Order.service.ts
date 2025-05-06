import axiosConfig from "./axiosConfig";
const api = "/api/v1/orders";
export const getOrders = async () => {
    try {
        const url = `${api}/get-all`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

export const getOrdersByPage = async (pageNo: number) => {
    try {
        const url = `${api}/get-all?pageNo=${pageNo}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

export const getOrdersByUserId = async (userId: string, pageNo: number) => {
    try {
        const url = `${api}/get-by-user/${userId}?pageNo=${pageNo}`;
        let result = await axiosConfig.get(url);
        return result;
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, message: error };
    }
}

//get order by orderId
export const getOrderById = async (orderId: string) => {
    try {   
        const url = `${api}/get/${orderId}`;
        const result = await axiosConfig.get(url, {
            maxRedirects: 0, // chặn redirect và xử lý nó nếu xảy ra
            validateStatus: (status) => status < 400 // không ném lỗi cho 3xx
          });
        return result;
    } catch (error) {
        console.error("Error getting order:", error);
        return { success: false, message: error };
    }
}