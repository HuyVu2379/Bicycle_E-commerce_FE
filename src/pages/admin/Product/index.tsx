import React, { useState, useCallback } from 'react';
import {
    Container,
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway as ModalGatewayOriginal } from 'react-images';
import MarkdownEditor from './Description';
import ProductList from './ProductTable';
// Create a properly typed version of ModalGateway
const ModalGateway = (props: { children: React.ReactNode }) => (
    <ModalGatewayOriginal {...props as any} />
);

interface Specification {
    key: string;
    value: string;
}

interface Product {
    name: string;
    description: string;
    price: string;
    category: string;
    supplier: string;
    colors: string[];
    images: string[];
    specifications: Specification[];
}

interface GalleryPhoto {
    src: string;
    width: number;
    height: number;
}

const colorsList = ['Blue', 'Red', 'Grey', 'Black', 'White', 'Brown', 'Orange'];

const ProductManagement: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: '',
        category: '',
        supplier: '',
        colors: [],
        images: [],
        specifications: [],
    });

    const [categories, setCategories] = useState<string[]>(['Điện tử', 'Thời trang', 'Gia dụng']);
    const [suppliers] = useState<string[]>(['Nhà cung cấp A', 'Nhà cung cấp B', 'Nhà cung cấp C']);
    const [newCategory, setNewCategory] = useState<string>('');
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [openSpecDialog, setOpenSpecDialog] = useState<boolean>(false);
    const [newSpec, setNewSpec] = useState<Specification>({ key: '', value: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name as string]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setProduct({ ...product, images: [...product.images, ...newImages] });
        }
    };

    const handleDeleteImage = (image: string) => {
        URL.revokeObjectURL(image);
        setProduct({ ...product, images: product.images.filter((img) => img !== image) });
    };

    const handleColorChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const selectedColors = e.target.value as string[];
        setProduct({ ...product, colors: selectedColors });
    };

    const handleDeleteColor = (color: string) => {
        setProduct({ ...product, colors: product.colors.filter((c) => c !== color) });
    };

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setProduct({ ...product, category: newCategory });
            setNewCategory('');
            setOpenCategoryDialog(false);
        }
    };

    const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSpec({ ...newSpec, [name]: value });
    };

    const handleAddSpec = () => {
        if (newSpec.key && newSpec.value) {
            setProduct({ ...product, specifications: [...product.specifications, newSpec] });
            setNewSpec({ key: '', value: '' });
            setOpenSpecDialog(false);
        }
    };

    const handleDeleteSpec = (spec: Specification) => {
        setProduct({
            ...product,
            specifications: product.specifications.filter((s) => s.key !== spec.key || s.value !== spec.value),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sản phẩm:', product);
        alert('Sản phẩm đã được lưu!');
        product.images.forEach((image) => URL.revokeObjectURL(image));
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            supplier: '',
            colors: [],
            images: [],
            specifications: [],
        });
    };

    const openLightbox = useCallback((event: React.MouseEvent, { index }: { index: number }) => {
        setCurrentImage(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setIsOpen(false);
    };

    const photos: GalleryPhoto[] = product.images.map((image) => ({
        src: image,
        width: 1,
        height: 1,
    }));

    const renderImage = useCallback(
        ({ index, photo }: { index: number; photo: GalleryPhoto }) => (
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                    src={photo.src}
                    alt={`Product Preview ${index + 1}`}
                    style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                    }}
                    onClick={(e) => openLightbox(e, { index })}
                />
                <IconButton
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                    onClick={() => handleDeleteImage(photo.src)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        ),
        [openLightbox, handleDeleteImage]
    );

    return (
        <Container maxWidth="lg" className="py-8">
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                <Grid container spacing={3}>
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
                                {categories.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
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
                                {suppliers.map((sup) => (
                                    <MenuItem key={sup} value={sup}>
                                        {sup}
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
                                name="color"
                                value={product.colors}
                                onChange={handleColorChange}
                                label="Màu sắc"
                                required
                            >
                                {colorsList.map((color) => (
                                    <MenuItem key={color} value={color}>
                                        {color}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Chọn ảnh và preview */}
                    <Grid item xs={6}>
                        <Box className="flex flex-col gap-4">
                            <Button
                                variant="outlined"
                                component="label"
                                className="w-fit"
                                sx={{
                                    backgroundColor: 'white',
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: '#0068FF',
                                        color: 'white',
                                    },
                                }}
                            >
                                Chọn ảnh
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {product.images.length > 0 && (
                                <Box className="mt-2">
                                    <Typography variant="subtitle1">Preview:</Typography>
                                    <Gallery
                                        photos={photos}
                                        renderImage={renderImage}
                                        targetRowHeight={100}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* Thêm thông số kỹ thuật */}
                    <Grid item xs={6}>
                        <Box className="flex flex-col gap-4">
                            <Button
                                variant="outlined"
                                onClick={() => setOpenSpecDialog(true)}
                                className="w-fit"
                                sx={{
                                    backgroundColor: 'white',
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: '#0068FF',
                                        color: 'white',
                                    },
                                }}
                            >
                                Thêm thông số kỹ thuật
                            </Button>
                            {product.specifications.length > 0 && (
                                <Box className="mt-2">
                                    <Typography variant="subtitle1">Thông số kỹ thuật:</Typography>
                                    <Box className="flex flex-wrap gap-2">
                                        {product.specifications.map((spec, index) => (
                                            <Chip
                                                key={index}
                                                label={`${spec.key}: ${spec.value}`}
                                                onDelete={() => handleDeleteSpec(spec)}
                                                color="default"
                                                sx={{ marginRight: 1 }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <MarkdownEditor
                        value={product.description}
                        onChange={(value) => setProduct({ ...product, description: value })}
                    />
                </Grid>
                {/* Nút submit */}
                <Box
                    className="text-center"
                    sx={{
                        mt: 5,
                    }}
                >
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        size="large"
                        className="mt-4"
                        sx={{
                            backgroundColor: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: '#0068FF',
                                color: 'white',
                            },
                        }}
                    >
                        Lưu sản phẩm
                    </Button>
                </Box>
            </Box>
            <ProductList />
            {/* Dialog thêm danh mục mới */}
            <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
                <DialogTitle>Thêm danh mục mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên danh mục"
                        fullWidth
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "26px",
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCategoryDialog(false)}>Hủy</Button>
                    <Button onClick={handleAddCategory} disabled={!newCategory}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog thêm thông số kỹ thuật */}
            <Dialog open={openSpecDialog} onClose={() => setOpenSpecDialog(false)}>
                <DialogTitle>Thêm thông số kỹ thuật</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tên thông số"
                        name="key"
                        fullWidth
                        value={newSpec.key}
                        onChange={handleSpecChange}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "26px",
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Giá trị"
                        name="value"
                        fullWidth
                        value={newSpec.value}
                        onChange={handleSpecChange}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& input": {
                                    paddingY: "26px",
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSpecDialog(false)}>Hủy</Button>
                    <Button onClick={handleAddSpec} disabled={!newSpec.key || !newSpec.value}>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Lightbox xem ảnh */}
            <ModalGateway>
                {isOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={product.images.map((image) => ({ source: image }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </Container>
    );
};

export default ProductManagement;