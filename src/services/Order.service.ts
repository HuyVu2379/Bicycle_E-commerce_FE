import axiosConfig from "./axiosConfig";
import { Order, OrdersPageResponse, SpringPage } from "../types/order";

const api = "/api/v1/orders";

export const getOrdersByUserId = async (
    pageNo: number = 0,
    pageSize: number = 10,
    sortBy: string = "orderDate",
    sortDirection: string = "desc"
): Promise<OrdersPageResponse> => {
    try {
        const url = `${api}/history-orders`;
        console.log("Calling API:", url, { params: { pageNo, pageSize, sortBy, sortDirection } });
        const response = await axiosConfig.get<SpringPage<Order>>(url, {
            params: {
                pageNo,
                pageSize,
                sortBy,
                sortDirection,
            }
        });
        console.log("API response data:", response.data);
        return {
            success: true,
            data: response.data,
            message: "Lấy danh sách đơn hàng thành công"
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        const emptyResponse: SpringPage<Order> = {
            content: [],
            pageable: {
                sort: { sorted: false, unsorted: true, empty: true },
                offset: 0,
                pageNumber: 0,
                pageSize: pageSize,
                paged: true,
                unpaged: false,
            },
            totalPages: 0,
            totalElements: 0,
            last: true,
            size: pageSize,
            number: 0,
            sort: { sorted: false, unsorted: true, empty: true },
            numberOfElements: 0,
            first: true,
            empty: true,
        };

        return {
            success: false,
            data: emptyResponse,
            message: errorMessage,
        };
    }
};