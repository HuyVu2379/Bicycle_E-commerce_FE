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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface AddressType {
  city: string;
  district: string;
  street: string;
  ward: string;
  country: string;
}

interface SupplierType {
  supplierId: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: AddressType;
}

const suppliers = {
  "statusCode": 200,
  "message": "Suppliers retrieved successfully",
  "success": true,
  "data": {
    "content": [
      {
        "supplierId": "67e22228907a031f3b32f442",
        "name": "ABC Supplies",
        "phone": "0123456789",
        "email": "contact@abc.com",
        "description": "sell bike",
        "address": {
          "addressId": "69cb9927-45d2-49c1-b8b2-a3ec98b267db",
          "city": "Ho Chi Minh",
          "district": "Quan Go Vap",
          "street": "12 Nguyen Van Bao",
          "ward": "Phuong 4",
          "country": "Viet Nam"
        }
      },
      {
        "supplierId": "67e22360907a031f3b32f447",
        "name": "Thống Nhất",
        "phone": "1111-2222-3334",
        "email": "thongnhat@gmail.com",
        "description": "vn bike",
        "address": {
          "addressId": "8b1d5675-2d74-48f0-8d50-ec2271286c8a",
          "city": "Ho Chi Minh",
          "district": "Huyen Binh Chanh",
          "street": "Lien Ap 123",
          "ward": "Vinh Loc B",
          "country": "Viet Nam"
        }
      },
      {
        "supplierId": "680c30a20162751f7cbd88a5",
        "name": "martin supplier",
        "phone": "0123456789",
        "email": "martin@gmail.com",
        "description": "sell bike",
        "address": {
          "addressId": "9cbee659-0fb8-468e-b987-f93a9fc8e71a",
          "city": "Ho Chi Minh",
          "district": "Binh tan",
          "street": "HL 2",
          "ward": "Binh tri dong a",
          "country": "Viet Nam"
        }
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

const SupplierList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<'supplierId' | 'email'>('supplierId');
  const [searchInput, setSearchInput] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    address: {
      city: '',
      district: '',
      street: '',
      ward: '',
      country: 'Viet Nam'
    }
  });

  const handleSearch = () => {
    // Xử lý tìm kiếm
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      description: '',
      address: {
        city: '',
        district: '',
        street: '',
        ward: '',
        country: 'Viet Nam'
      }
    });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleEdit = (supplier: SupplierType) => {
    setSelectedSupplier(supplier);
    setFormData({
      ...supplier,
      address: { ...supplier.address }
    });
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = (supplier: SupplierType) => {
    setSelectedSupplier(supplier);
    setOpenDeleteDialog(true);
  };

  const handleSubmit = () => {
    // Xử lý submit form
    console.log(isEditing ? 'Update:' : 'Create:', formData);
    setOpenModal(false);
  };

  const handleDeleteConfirm = () => {
    // Xử lý xóa
    console.log('Delete:', selectedSupplier?.supplierId);
    setOpenDeleteDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Search và Create */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Tìm kiếm theo</InputLabel>
          <Select
            value={searchType}
            label="Tìm kiếm theo"
            onChange={(e) => setSearchType(e.target.value as any)}
          >
            <MenuItem value="supplierId">Supplier ID</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={`Nhập ${searchType === 'supplierId' ? 'Supplier ID' : 'Email'}`}
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ height: 56 }}
        >
          Create
        </Button>
      </Box>

      {/* Bảng hiển thị */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>STT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Supplier ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.data.content.map((supplier, index) => (
              <TableRow key={supplier.supplierId}>
                <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                <TableCell>{supplier.supplierId}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.description}</TableCell>
                <TableCell>
                  {`${supplier.address.street}, ${supplier.address.ward}, ${supplier.address.district}, ${supplier.address.city}`}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(supplier)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(supplier)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Pagination
        count={suppliers.data.totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />

      {/* Modal tạo/cập nhật */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{isEditing ? 'Update Supplier' : 'Create New Supplier'}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Phone"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="City"
            fullWidth
            value={formData.address.city}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, city: e.target.value }
            })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="District"
            fullWidth
            value={formData.address.district}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, district: e.target.value }
            })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Street"
            fullWidth
            value={formData.address.street}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, street: e.target.value }
            })}
          />
          <TextField
            sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
            margin="dense"
            label="Ward"
            fullWidth
            value={formData.address.ward}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, ward: e.target.value }
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm deleting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete supplier {selectedSupplier?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupplierList;