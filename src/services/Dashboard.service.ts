import axiosConfig from "./axiosConfig";

const api = "api/v1/orders"

export const getDashboardSalesData = async () => {
    try {
        const url = `${api}/sales`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching sales data:", error);
        return { success: false, data: [] }
    }
};


export const getDashboardMonthlyData = async () => {
    try {
        const url = `${api}/monthly-stats`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching stats data:", error);
        return { success: false, data: [] }
    }
};

export const getDashboardStatCards = async () => {
    try {  
        const url = `${api}/stat-cards`
        const result = await axiosConfig.get(url);
        return { success: true, data: Array.isArray(result) ? result : [] };
    } catch (error) {
        console.error("Error fetching top products:", error);
        return { success: false, data: [] }
    }
};


