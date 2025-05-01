import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';

interface OrderDetailItem {
  productId: string;
  quantity: number;
  subtotal: number;
}

interface OrderDetailProps {
  order: {
    orderId: string;
    totalPrice: number;
    orderDetails: OrderDetailItem[];
    promotionId?: string;
  };
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
  // Tính tổng tiền trước giảm giá
  const calculateTotalBeforeDiscount = (): number => {
    return order.orderDetails.reduce((total, item) => total + item.subtotal, 0);
  };

  // Tính tiền giảm giá
  const calculateDiscount = (): number => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    return totalBeforeDiscount - order.totalPrice;
  };

  return (
    <Dialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          Order ID: {order.orderId}
        </Typography>
        
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.productId}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>{(detail.subtotal / detail.quantity).toLocaleString()}₫</TableCell>
                  <TableCell>{detail.subtotal.toLocaleString()}₫</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">
            Tổng tiền: {calculateTotalBeforeDiscount().toLocaleString()}₫
          </Typography>
          <Typography variant="h6" color="error">
            Giảm giá: {calculateDiscount().toLocaleString()}₫
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Thanh toán: {order.totalPrice.toLocaleString()}₫
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetail;