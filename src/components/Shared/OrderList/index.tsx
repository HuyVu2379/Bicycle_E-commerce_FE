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
  createdAt: string;
  updatedAt: string | null;
  orderDetailId: string;
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

const mockOrder = {
  "statusCode": 200,
  "message": "Orders found",
  "success": true,
  "data": {
      "content": [
          {
              "createdAt": "2025-05-01T16:50:43.828601",
              "updatedAt": null,
              "orderId": "1e159896-1f02-4d02-a0f1-0db2d6486e7f",
              "userId": "huy@gmail.com",
              "orderDate": "2025-05-01T16:50:39.352291",
              "totalPrice": 1700000.0,
              "orderDetails": [
                  {
                      "createdAt": "2025-05-01T16:50:43.853755",
                      "updatedAt": null,
                      "orderDetailId": "fcb40c58-c120-4277-91a2-efacab9f1900",
                      "productId": "67e229c9907a031f3b32f453",
                      "quantity": 1,
                      "subtotal": 1000000.0
                  },
                  {
                      "createdAt": "2025-05-01T16:50:43.853755",
                      "updatedAt": null,
                      "orderDetailId": "d2dca458-ae1e-43f6-9c9b-ef6c14f5d6ad",
                      "productId": "67e229d8907a031f3b32f455",
                      "quantity": 1,
                      "subtotal": 1000000.0
                  }
              ],
              "promotionId": "23f0aaa3-d88c-4d5f-8c56-3458876a0a8c"
          },
          {
              "createdAt": "2025-04-26T08:08:58.504594",
              "updatedAt": null,
              "orderId": "130a509f-9210-433e-abbf-8154ea834f54",
              "userId": "huy@gmail.com",
              "orderDate": "2025-04-26T08:08:57.343606",
              "totalPrice": 7000000.0,
              "orderDetails": [
                  {
                      "createdAt": "2025-04-26T08:08:58.552818",
                      "updatedAt": null,
                      "orderDetailId": "b57ad1da-b09f-46f9-9625-e75c2205a6a1",
                      "productId": "67e229c9907a031f3b32f453",
                      "quantity": 5,
                      "subtotal": 5000000.0
                  },
                  {
                      "createdAt": "2025-04-26T08:08:58.553701",
                      "updatedAt": null,
                      "orderDetailId": "4e2d8f92-90b0-4923-9fbc-be4a0266ba0b",
                      "productId": "67e229d8907a031f3b32f455",
                      "quantity": 2,
                      "subtotal": 2000000.0
                  }
              ],
              "promotionId": null
          },
          {
              "createdAt": "2025-04-25T21:38:08.539261",
              "updatedAt": null,
              "orderId": "8ecffb58-db7c-45ad-a862-7509c0157baa",
              "userId": "bao@gmail.com",
              "orderDate": "2025-04-25T21:38:04.021903",
              "totalPrice": 3000000.0,
              "orderDetails": [
                  {
                      "createdAt": "2025-04-25T21:38:08.592004",
                      "updatedAt": null,
                      "orderDetailId": "ab32422f-5945-4189-8c18-2eddbe18fe83",
                      "productId": "67e229c9907a031f3b32f453",
                      "quantity": 2,
                      "subtotal": 2000000.0
                  },
                  {
                      "createdAt": "2025-04-25T21:38:08.593005",
                      "updatedAt": null,
                      "orderDetailId": "33f47160-6124-4811-9c83-9a399cd17d88",
                      "productId": "67e229d8907a031f3b32f455",
                      "quantity": 1,
                      "subtotal": 1000000.0
                  }
              ],
              "promotionId": null
          }
      ],
      "pageable": {
          "pageNumber": 0,
          "pageSize": 10,
          "sort": [
              {
                  "direction": "DESC",
                  "property": "orderDate",
                  "ignoreCase": false,
                  "nullHandling": "NATIVE",
                  "ascending": false,
                  "descending": true
              }
          ],
          "offset": 0,
          "paged": true,
          "unpaged": false
      },
      "last": true,
      "totalElements": 3,
      "totalPages": 1,
      "size": 10,
      "number": 0,
      "sort": [
          {
              "direction": "DESC",
              "property": "orderDate",
              "ignoreCase": false,
              "nullHandling": "NATIVE",
              "ascending": false,
              "descending": true
          }
      ],
      "first": true,
      "numberOfElements": 3,
      "empty": false
  }
};

const OrderList: React.FC = () => {
  const [page, setPage] = useState<number>(mockOrder.data.number + 1);
  const [searchType, setSearchType] = useState<'orderId' | 'userId'>('orderId');
  const [searchInput, setSearchInput] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const itemsPerPage = mockOrder.data.size;

  const handleSearch = () => {
    // Logic tìm kiếm có thể thêm sau
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    const apiPage = newPage - 1; // Chuyển từ 1-based sang 0-based
    setPage(newPage);
    // fetchOrders(apiPage);
  };

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
            {mockOrder.data.content
              
              .map((order, index) => (
                <TableRow
                  key={order.orderId}
                  hover
                  onClick={() => setSelectedOrder(order as OrderType)}
                  sx={{ cursor: 'pointer' }}
                >
                  {/* <TableCell>{(page - 1) * itemsPerPage + index + 1}</TableCell> */}
                  <TableCell>{(mockOrder.data.number * mockOrder.data.size) + index + 1}</TableCell>
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
        count={mockOrder.data.totalPages}
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