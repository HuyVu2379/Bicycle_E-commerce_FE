import React from 'react';
import {
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
    Chip,
    SelectChangeEvent,
} from '@mui/material';
import MarkdownEditor from './Description'
import { Product, colorsList } from '@/pages/Admin/Product';
interface ProductFormProps {
    product: Product;
    categories: string[];
    suppliers: string[];
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => void;
    handleColorChange: (e: SelectChangeEvent<string[]>) => void;
    setOpenCategoryDialog: (open: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    categories,
    suppliers,
    handleInputChange,
    handleColorChange,
    setOpenCategoryDialog,
}) => {
    return (
        <>
            {/* Tên sản phẩm */}
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                        },
                    }}
                />
            </Grid>

            {/* Giá */}
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Giá"
                    name="price"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingY: "26px",
                            },
                        },
                    }}
                    value={product.price}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                />
            </Grid>

            {/* Danh mục */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        label="Danh mục"
                        required
                    >
                        {categories.map((cat: any) => (
                            <MenuItem key={cat} value={cat}>
                                {cat.name}
                            </MenuItem>
                        ))}
                        <MenuItem value="add_new" onClick={() => setOpenCategoryDialog(true)}>
                            + Thêm danh mục mới
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Nhà cung cấp */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Nhà cung cấp</InputLabel>
                    <Select
                        name="supplier"
                        value={product.supplier}
                        onChange={handleInputChange}
                        label="Nhà cung cấp"
                        required
                    >
                        {suppliers.map((sup: any) => (
                            <MenuItem key={sup} value={sup}>
                                {sup.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Màu sắc */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Màu sắc</InputLabel>
                    <Select
                        name="colors"
                        multiple
                        value={product.colors}
                        onChange={handleColorChange}
                        label="Màu sắc"
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {colorsList.map((color) => (
                            <MenuItem key={color} value={color}>
                                {color}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Mô tả */}
            <Grid item xs={12}>
                <MarkdownEditor
                    value={product.description}
                    onChange={(value) => handleInputChange({ target: { name: 'description', value } } as any)}
                />
            </Grid>

        </>
    );
};

export default ProductForm;