import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Box,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OrderDetail from '../OrderDetail';

interface OrderDetailType {
  productId: string;
  quantity: number;
  subtotal: number;
}

interface OrderType {
  orderId: string;
  userId: string;
  orderDate: string;
  totalPrice: number;
  orderDetails: OrderDetailType[];
  promotionId?: string;
}

const mockOrders: OrderType[] = [
    {
      orderId: "1e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "huy@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
    {
      orderId: "2e159896-1f02-4d02-a0f1-0db2d6486e7f",
      userId: "bao@gmail.com",
      orderDate: "2025-05-01T16:50:39.352291",
      totalPrice: 1700000.0,
      orderDetails: [
        { productId: "67e229c9907a031f3b32f453", quantity: 1, subtotal: 1000000.0 },
        { productId: "67e229d8907a031f3b32f455", quantity: 1, subtotal: 1000000.0 }
      ],
      promotionId: "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
    },
  ];

const OrderList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<'orderId' | 'userId'>('orderId');
  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const itemsPerPage = 5;

  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  return (
    <Box sx={{ p: 2}}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Tìm kiếm theo</InputLabel>
          <Select
            value={searchType}
            label="Tìm kiếm theo"
            onChange={(e) => setSearchType(e.target.value as typeof searchType)}
          >
            <MenuItem value="orderId">Order ID</MenuItem>
            <MenuItem value="userId">User ID</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={`Nhập ${searchType === 'orderId' ? 'Order ID' : 'User ID'}`}
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{  flexGrow: 1,
            '& .MuiInputBase-root': { height: 56 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleSearch}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Order date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((order, index) => (
                <TableRow
                  key={order.orderId}
                  hover
                  onClick={() => setSelectedOrder(order)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell sx={{ color: 'error.main' }}>
                    {order.totalPrice.toLocaleString('vi-VN')}₫
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(mockOrders.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </Box>
  );
};

export default OrderList;