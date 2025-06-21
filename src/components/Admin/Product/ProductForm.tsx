import React, { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, FormHelperText } from '@mui/material';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Product, colorsList } from '@/pages/admin/Product';
import { SelectChangeEvent } from '@mui/material';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
marked.setOptions({ gfm: true, breaks: true });
const purify = DOMPurify(window);

interface ProductFormProps {
    product: Product;
    categories?: any;
    suppliers?: any;
    promotions?: any;
    openPromotionDialog: boolean;
    errors?: Partial<Record<keyof Product, string>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>, immediate?: boolean) => void;
    handleColorChange: (e: SelectChangeEvent<string[]>) => void;
    handleCategoryChange: (e: SelectChangeEvent<string[]>) => void;
    setOpenCategoryDialog: (open: boolean) => void;
    setOpenPromotionDialog: (open: boolean) => void;
    handleAddPromotion: (promotionId: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    categories = [],
    suppliers = [],
    promotions = [],
    openPromotionDialog,
    errors = {},
    handleInputChange,
    handleColorChange,
    handleCategoryChange,
    setOpenCategoryDialog,
    setOpenPromotionDialog,
    handleAddPromotion,
}) => {
    const [localDescription, setLocalDescription] = useState(product.description);

    // Đồng bộ localDescription với product.description
    useEffect(() => {
        setLocalDescription(product.description);
    }, [product.description]);

    // Chuyển Markdown thành HTML
    const renderHTML = useCallback((text: string) => {
        try {
            const parsed = marked.parse(text);
            return purify.sanitize(typeof parsed === 'string' ? parsed : '');
        } catch (error) {
            console.error('Error rendering Markdown:', error);
            return '<p>Error rendering Markdown</p>';
        }
    }, []);    // Xử lý thay đổi Markdown (không debounce để cập nhật tức thì)
    const handleMarkdownChange = useCallback(
        ({ text }: { text: string }) => {
            const html = renderHTML(text);
            // Debug: handleMarkdownChange
            setLocalDescription(text);
            debouncedInputChange(text);
        },
        [renderHTML],
    );

    // Debounce cho handleInputChange để giảm gọi API
    const debouncedInputChange = useCallback(
        debounce((text: string) => {
            handleInputChange({ target: { name: 'description', value: text } } as any, true);
        }, 300),
        [handleInputChange],
    );

    // Xử lý blur cho Markdown
    const handleMarkdownBlur = useCallback(() => {
        const html = renderHTML(localDescription);
        // Debug: handleMarkdownBlur
        handleInputChange({ target: { name: 'description', value: localDescription } } as any, true);
    }, [handleInputChange, localDescription, renderHTML]);

    // Hủy debounce khi component unmount
    useEffect(() => () => debouncedInputChange.cancel(), [debouncedInputChange]);

    // Xử lý thay đổi Select chung
    const handleSelectChange = useCallback(
        (e: SelectChangeEvent<string>, field: string, openDialog?: () => void) => {
            const { value } = e.target;
            // Debug: handle field change
            if (value === 'add_new' && openDialog) {
                openDialog();
            } else if (value && value !== 'undefined') {
                handleInputChange({ target: { name: field, value } } as any, true);
            } else {
                console.warn(`Invalid ${field} value:`, value);
            }
        },
        [handleInputChange],
    );

    const inputSx = { '& .MuiOutlinedInput-root input': { paddingY: '26px' } };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    name="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e, false)}
                    required
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={inputSx}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Giá"
                    name="price"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={product.price}
                    onChange={(e) => handleInputChange(e, false)}
                    required
                    variant="outlined"
                    error={!!errors.price}
                    helperText={errors.price}
                    sx={inputSx}
                />
            </Grid>            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.categoryIds}>
                    <InputLabel>Danh mục</InputLabel>
                    <Select
                        name="categoryIds"
                        multiple
                        value={product.categoryIds || []}
                        onChange={handleCategoryChange}
                        label="Danh mục"
                        required
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => {
                                    const category = categories.find((cat: any) => cat.categoryId === value);
                                    return <Chip key={value} label={category?.name || value} />;
                                })}
                            </Box>
                        )}
                    >
                        {categories.length ? categories.filter((cat: any) => cat && cat.categoryId).map((cat: any) => (
                            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.name}</MenuItem>
                        )) : <MenuItem disabled>Không có danh mục</MenuItem>}
                        <MenuItem onClick={() => setOpenCategoryDialog(true)} value="add_new">+ Thêm danh mục mới</MenuItem>
                    </Select>
                    {errors.categoryIds && <FormHelperText>{errors.categoryIds}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.supplierId}>
                    <InputLabel>Nhà cung cấp</InputLabel>
                    <Select
                        name="supplierId"
                        value={product.supplierId || ''}
                        onChange={(e) => handleSelectChange(e, 'supplierId')}
                        label="Nhà cung cấp"
                        required                    >                        {suppliers.length ? suppliers.filter((sup: any) => sup && sup.supplierId).map((sup: any) => (
                            <MenuItem key={sup.supplierId} value={sup.supplierId}>{sup.name}</MenuItem>
                        )) : <MenuItem disabled>Không có nhà cung cấp</MenuItem>}
                    </Select>
                    {errors.supplierId && <FormHelperText>{errors.supplierId}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setOpenPromotionDialog(true)}
                    sx={{ py: '14px' }}
                >
                    {product.promotionId ? `Khuyến mãi: ${promotions.find((p: any) => p._id === product.promotionId)?.name || product.promotionId}` : 'Chọn khuyến mãi'}
                </Button>
                <Dialog open={openPromotionDialog} onClose={() => setOpenPromotionDialog(false)}>
                    <DialogTitle>Chọn mã khuyến mãi</DialogTitle>
                    <DialogContent>
                        <List>
                            {promotions.length ? promotions.map((promotion: any) => (
                                <ListItem
                                    key={promotion.promotionId}
                                    component="button"
                                    onClick={() => {
                                        // Debug: Selected promotion
                                        handleAddPromotion(promotion.promotionId);
                                    }}
                                >
                                    <ListItemText primary={promotion.name} secondary={promotion.promotionId} />
                                </ListItem>
                            )) : <ListItem><ListItemText primary="Không có khuyến mãi nào" /></ListItem>}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenPromotionDialog(false)}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
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
                                {(selected as string[]).map((value) => <Chip key={value} label={value} />)}
                            </Box>
                        )}
                    >
                        {colorsList.map((color) => <MenuItem key={color} value={color}>{color}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <MdEditor
                    style={{ height: '300px' }}
                    value={localDescription}
                    renderHTML={renderHTML}
                    onChange={handleMarkdownChange}
                    onBlur={handleMarkdownBlur}
                    placeholder="Nhập mô tả sản phẩm (hỗ trợ Markdown)"
                />
            </Grid>
        </Grid>
    );
};

export default React.memo(ProductForm, (prev, next) => (
    prev.product.name === next.product.name &&
    prev.product.price === next.product.price &&
    isEqual(prev.product.categoryIds, next.product.categoryIds) &&
    prev.product.supplierId === next.product.supplierId &&
    prev.product.promotionId === next.product.promotionId &&
    prev.product.description === next.product.description &&
    isEqual(prev.product.colors, next.product.colors) &&
    isEqual(prev.categories, next.categories) &&
    isEqual(prev.suppliers, next.suppliers) &&
    isEqual(prev.promotions, next.promotions) &&
    prev.openPromotionDialog === next.openPromotionDialog &&
    prev.errors === next.errors
));