import React, { useState, useCallback, useEffect } from 'react';
import { Container, Grid, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductForm from '@/components/Admin/Product/ProductForm';
import ColorVariantManager from '@/components/Admin/Product/ColorVariantManager';
import SpecificationManager from '@/components/Admin/Product/SpecificationManager';
import CategoryDialog from '@/components/Admin/Product/CategoryDialog';
import SpecificationDialog from '@/components/Admin/Product/SpecificationDialog';
import ImageLightbox from '@/components/Admin/Product/ImageLightBox';
import ProductList from './ProductTable';
import useProduct from '@/hook/api/useProduct';
import { SelectChangeEvent } from '@mui/material';

export interface Specification {
    key: string;
    value: string;
}

export interface Product {
    name: string;
    description: string;
    price: string;
    category: string;
    supplier: string;
    colors: string[];
    images: { [color: string]: string[] };
    quantities: { [color: string]: number };
    specifications: Specification[];
}

export interface GalleryPhoto {
    src: string;
    width: number;
    height: number;
    color: string;
}

export const colorsList = ['Blue', 'Red', 'Grey', 'Black', 'White', 'Brown', 'Orange'];

const ProductManagement: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: '',
        category: '',
        supplier: '',
        colors: [],
        images: {},
        quantities: {},
        specifications: [],
    });
    const { handleFetchCategories, handleFetchSupplier, categories, suppliers } = useProduct();
    useEffect(() => {
        const fetchData = async () => {
            await handleFetchCategories();
            await handleFetchSupplier();
        };
        fetchData();
    }, []);
    const [newCategory, setNewCategory] = useState<string>('');
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const [openSpecDialog, setOpenSpecDialog] = useState<boolean>(false);
    const [newSpec, setNewSpec] = useState<Specification>({ key: '', value: '' });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name as string]: value });
    };
    console.log("Check img selected", product.images);

    const handleColorChange = (e: SelectChangeEvent<string[]>) => {
        const selectedColors = e.target.value as string[];
        const updatedImages = { ...product.images };
        const updatedQuantities = { ...product.quantities };
        Object.keys(updatedImages).forEach((color) => {
            if (!selectedColors.includes(color)) {
                updatedImages[color].forEach((img) => URL.revokeObjectURL(img));
                delete updatedImages[color];
                delete updatedQuantities[color];
            }
        });
        setProduct({ ...product, colors: selectedColors, images: updatedImages, quantities: updatedQuantities });
    };

    const handleImageChange = (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
            setProduct({
                ...product,
                images: {
                    ...product.images,
                    [color]: [...(product.images[color] || []), ...newImages],
                },
            });
        }
    };

    const handleQuantityChange = (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
            setProduct({
                ...product,
                quantities: {
                    ...product.quantities,
                    [color]: value === '' ? 0 : Number(value),
                },
            });
        }
    };

    const handleDeleteImage = (color: string, image: string) => {
        URL.revokeObjectURL(image);
        setProduct({
            ...product,
            images: {
                ...product.images,
                [color]: product.images[color].filter((img) => img !== image),
            },
        });
    };

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
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
        const missingQuantities = product.colors.filter((color) => !product.quantities[color] && product.quantities[color] !== 0);
        if (missingQuantities.length > 0) {
            alert(`Vui lòng nhập số lượng cho các màu: ${missingQuantities.join(', ')}`);
            return;
        }
        console.log('Sản phẩm:', product);
        alert('Sản phẩm đã được lưu!');
        Object.values(product.images).forEach((images) => {
            images.forEach((image) => URL.revokeObjectURL(image));
        });
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            supplier: '',
            colors: [],
            images: {},
            quantities: {},
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

    const photos: GalleryPhoto[] = product.colors.reduce((acc: GalleryPhoto[], color) => {
        const colorImages = (product.images[color] || []).map((image) => ({
            src: image,
            width: 1,
            height: 1,
            color,
        }));
        return [...acc, ...colorImages];
    }, []);

    const renderImage = useCallback(
        ({ index, photo }: { index: number; photo: GalleryPhoto }) => (
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                    src={photo.src}
                    alt={`Product Preview ${photo.color} ${index + 1}`}
                    style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        cursor: 'pointer',
                        margin: '5px',
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
                    onClick={() => handleDeleteImage(photo.color, photo.src)}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>
        ),
        [openLightbox, handleDeleteImage]
    );

    return (
        <Container disableGutters sx={{ width: '100%', height: '100%', py: 4 }}>
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                <Grid container spacing={3}>
                    <ProductForm
                        product={product}
                        categories={categories}
                        suppliers={suppliers}
                        handleInputChange={handleInputChange}
                        handleColorChange={handleColorChange}
                        setOpenCategoryDialog={setOpenCategoryDialog}
                    />
                    <ColorVariantManager
                        colors={product.colors}
                        quantities={product.quantities}
                        images={product.images}
                        photos={photos}
                        handleImageChange={handleImageChange}
                        handleQuantityChange={handleQuantityChange}
                        renderImage={renderImage}
                        handleDeleteImage={handleDeleteImage}
                    />
                    <SpecificationManager
                        specifications={product.specifications}
                        handleDeleteSpec={handleDeleteSpec}
                        setOpenSpecDialog={setOpenSpecDialog}
                    />
                </Grid>
                {/* Nút submit */}
                <Grid item xs={12}>
                    <Box className="text-center" sx={{ mt: 5 }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            size="large"
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
                </Grid>
            </Box>
            <ProductList />
            <CategoryDialog
                open={openCategoryDialog}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddCategory={handleAddCategory}
                handleClose={() => setOpenCategoryDialog(false)}
            />
            <SpecificationDialog
                open={openSpecDialog}
                newSpec={newSpec}
                handleSpecChange={handleSpecChange}
                handleAddSpec={handleAddSpec}
                handleClose={() => setOpenSpecDialog(false)}
            />
            <ImageLightbox
                isOpen={isOpen}
                currentImage={currentImage}
                photos={photos}
                closeLightbox={closeLightbox}
            />
        </Container>
    );
};

export default ProductManagement;