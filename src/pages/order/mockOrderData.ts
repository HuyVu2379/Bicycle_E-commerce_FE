import { Order } from "../../types/order"; // Điều chỉnh đường dẫn nếu cần

export const mockOrders: Order[] = [
  {
    orderId: "ORD001",
    userId: "user123",
    orderDate: new Date("2023-10-26T10:30:00Z").toISOString(),
    price: 2500000, // Thêm giá gốc của sản phẩm
    totalPrice: 2550000,
    promotionId: "PROMOXMAS",
    productName: "Xe đạp địa hình Mountain Pro", // Thêm tên sản phẩm để hiển thị
    orderDetails: [
      {
        orderDetailId: "OD001A",
        productId: "PROD_BIKE_01",
        quantity: 1,
        subtotal: 2500000,
        imageUrl: "https://via.placeholder.com/150/0000FF/808080?Text=Bike1", // Thêm URL hình ảnh
      },
      {
        orderDetailId: "OD001B",
        productId: "PROD_HELMET_01",
        productName: "Mũ bảo hiểm XYZ",
        quantity: 1,
        subtotal: 50000,
        price: 50000,
        imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?Text=Helmet1",
      },
    ],
    status: "Completed", // Thêm trạng thái đơn hàng
  },
  {
    orderId: "ORD002",
    userId: "user123",
    orderDate: new Date("2023-11-15T14:00:00Z").toISOString(),
    totalPrice: 1200000,
    orderDetails: [
      {
        orderDetailId: "OD002A",
        productId: "PROD_LIGHT_01",
        productName: "Đèn pha xe đạp SuperBright",
        quantity: 2,
        subtotal: 400000,
        price: 200000,
        imageUrl: "https://via.placeholder.com/150/FFFF00/000000?Text=Light1",
      },
      {
        orderDetailId: "OD002B",
        productId: "PROD_LOCK_01",
        productName: "Khóa xe đạp an toàn",
        quantity: 1,
        subtotal: 800000,
        price: 800000,
        imageUrl: "https://via.placeholder.com/150/00FF00/FFFFFF?Text=Lock1",
      },
    ],
    status: "Processing",
  },
  {
    orderId: "ORD003",
    userId: "user456", // Một user khác để kiểm tra
    orderDate: new Date("2023-12-01T09:15:00Z").toISOString(),
    totalPrice: 850000,
    orderDetails: [
      {
        orderDetailId: "OD003A",
        productId: "PROD_GLOVES_01",
        productName: "Găng tay xe đạp ProFit",
        quantity: 1,
        subtotal: 350000,
        price: 350000,
        imageUrl: "https://via.placeholder.com/150/FFC0CB/000000?Text=Gloves1",
      },
       {
        orderDetailId: "OD003B",
        productId: "PROD_BOTTLE_01",
        productName: "Bình nước thể thao",
        quantity: 2,
        subtotal: 500000,
        price: 250000,
        imageUrl: "https://via.placeholder.com/150/ADD8E6/000000?Text=Bottle1",
      },
    ],
    status: "Shipped",
  },
];

// Thêm dữ liệu phân trang giả lập nếu component của bạn cần
export const mockOrderHistoryResponse = {
  content: mockOrders,
  totalPages: 5,
  totalElements: 50, // Tổng số đơn hàng giả lập
  size: 3, // Số đơn hàng trên mỗi trang (bằng mockOrders.length cho đơn giản)
  number: 0, // Trang hiện tại (bắt đầu từ 0)
};