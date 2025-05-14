import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Container, Grid, Box, IconButton, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductForm from '@/components/Admin/Product/ProductForm';
import ColorVariantManager from '@/components/Admin/Product/ColorVariantManager';
import SpecificationManager from '@/components/Admin/Product/SpecificationManager';
import CategoryDialog from '@/components/Admin/Product/CategoryDialog';
import SpecificationDialog from '@/components/Admin/Product/SpecificationDialog';
import ImageLightbox from '@/components/Admin/Product/ImageLightBox';
import ProductList from './ProductTable';
import useProduct from '@/hook/api/useProduct';
import { uploadMultipleImages } from '@/services/Upload.service';
import { createProduct, bulkCreateInventory } from '@/services/Product.service';
import { SelectChangeEvent } from '@mui/material';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface Specification {
    key: string;
    value: string;
}

export interface Product {
    name: string;
    description: string; // Stores Markdown
    price: string;
    promotionId: string;
    categoryId: string;
    supplierId: string;
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

export const colorsList = ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Black', 'White', 'Brown', 'Orange'];

const ProductManagement: React.FC = () => {
    // Sử dụng useRef để theo dõi state mà không gây ra render
    const productRef = useRef<Product>({
        name: '',
        description: '',
        price: '',
        promotionId: '',
        categoryId: '',
        supplierId: '',
        colors: [],
        images: {},
        quantities: {},
        specifications: [],
    });

    const imageFilesRef = useRef<{ [color: string]: File[] }>({});

    const [product, setProduct] = useState<Product>(productRef.current);
    const [imageFiles, setImageFiles] = useState<{ [color: string]: File[] }>({});

    const { handleFetchCategories, handleFetchSupplier, handleFetchPromotion, categories, suppliers, promotions } = useProduct();
    const [loading, setLoading] = useState<boolean>(true);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    // Cập nhật ref khi state thay đổi
    useEffect(() => {
        productRef.current = product;
    }, [product]);

    useEffect(() => {
        imageFilesRef.current = imageFiles;
    }, [imageFiles]);

    useEffect(() => {
        if (dataFetched) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    handleFetchCategories(),
                    handleFetchSupplier(),
                    handleFetchPromotion(),
                ]);
                setDataFetched(true);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [handleFetchCategories, handleFetchSupplier, handleFetchPromotion, dataFetched]);

    const [newCategory, setNewCategory] = useState<string>('');
    const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
    const [openSpecDialog, setOpenSpecDialog] = useState<boolean>(false);
    const [openPromotionDialog, setOpenPromotionDialog] = useState<boolean>(false);
    const [newSpec, setNewSpec] = useState<Specification>({ key: '', value: '' });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
            const { name, value } = e.target;
            setProduct((prev) => ({ ...prev, [name as string]: value }));
        },
        []
    );

    // Sử dụng ref thay vì state trong các callback để tránh re-render
    const handleColorChange = useCallback((e: SelectChangeEvent<string[]>) => {
        const selectedColors = e.target.value as string[];
        const currentProduct = productRef.current;
        const currentImageFiles = imageFilesRef.current;

        const updatedImages = { ...currentProduct.images };
        const updatedQuantities = { ...currentProduct.quantities };
        const updatedImageFiles = { ...currentImageFiles };

        Object.keys(updatedImages).forEach((color) => {
            if (!selectedColors.includes(color)) {
                updatedImages[color].forEach((img) => URL.revokeObjectURL(img));
                delete updatedImages[color];
                delete updatedQuantities[color];
                delete updatedImageFiles[color];
            }
        });

        setProduct((prev) => ({
            ...prev,
            colors: selectedColors,
            images: updatedImages,
            quantities: updatedQuantities
        }));

        setImageFiles(updatedImageFiles);
    }, []);

    const handleImageChange = useCallback(
        (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
                const newFiles = Array.from(files);
                const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));

                setProduct((prev) => ({
                    ...prev,
                    images: {
                        ...prev.images,
                        [color]: [...(prev.images[color] || []), ...newImageUrls],
                    },
                }));

                setImageFiles((prev) => ({
                    ...prev,
                    [color]: [...(prev[color] || []), ...newFiles],
                }));
            }
        },
        []
    );

    const handleQuantityChange = useCallback(
        (color: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                setProduct((prev) => ({
                    ...prev,
                    quantities: {
                        ...prev.quantities,
                        [color]: value === '' ? 0 : Number(value),
                    },
                }));
            }
        },
        []
    );

    const handleDeleteImage = useCallback(
        (color: string, image: string) => {
            // Sử dụng ref để truy cập giá trị mới nhất
            const currentProduct = productRef.current;
            const currentImageFiles = imageFilesRef.current;

            const index = currentProduct.images[color]?.indexOf(image) ?? -1;
            if (index !== -1) {
                URL.revokeObjectURL(image);

                const updatedImages = {
                    ...currentProduct.images,
                    [color]: currentProduct.images[color].filter((_, i) => i !== index),
                };

                const updatedImageFiles = {
                    ...currentImageFiles,
                    [color]: (currentImageFiles[color] || []).filter((_, i) => i !== index),
                };

                setProduct((prev) => ({ ...prev, images: updatedImages }));
                setImageFiles(updatedImageFiles);
            }
        },
        []
    );

    const handleAddCategory = useCallback(() => {
        if (newCategory && !categories.find((cat: any) => cat.name === newCategory)) {
            setProduct((prev) => ({ ...prev, categoryId: newCategory }));
            setNewCategory('');
            setOpenCategoryDialog(false);
        }
    }, [newCategory, categories]);

    const handleAddPromotion = useCallback((promotionId: string) => {
        setProduct((prev) => ({ ...prev, promotionId }));
        setOpenPromotionDialog(false);
    }, []);

    const handleSpecChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSpec((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAddSpec = useCallback(() => {
        // Tạo bản sao của newSpec để tránh tham chiếu
        const specToAdd = { ...newSpec };

        if (specToAdd.key && specToAdd.value) {
            setProduct((prev) => ({
                ...prev,
                specifications: [...prev.specifications, specToAdd]
            }));
            setNewSpec({ key: '', value: '' });
            setOpenSpecDialog(false);
        }
    }, [newSpec]);

    const handleDeleteSpec = useCallback((specToDelete: Specification) => {
        setProduct((prev) => ({
            ...prev,
            specifications: prev.specifications.filter(
                (spec) => spec.key !== specToDelete.key || spec.value !== specToDelete.value
            ),
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            // Sử dụng ref để truy cập giá trị mới nhất
            const currentProduct = productRef.current;
            const currentImageFiles = imageFilesRef.current;

            const missingQuantities = currentProduct.colors.filter(
                (color) => !currentProduct.quantities[color] && currentProduct.quantities[color] !== 0
            );

            if (missingQuantities.length > 0) {
                alert(`Vui lòng nhập số lượng cho các màu: ${missingQuantities.join(', ')}`);
                return;
            }

            try {
                const parsedDescription = await marked.parse(currentProduct.description);
                const descriptionHtml = DOMPurify.sanitize(parsedDescription);
                const productData = {
                    name: currentProduct.name,
                    description: descriptionHtml,
                    price: parseFloat(currentProduct.price),
                    promotionId: currentProduct.promotionId || undefined,
                    categoryId: currentProduct.categoryId,
                    supplierId: currentProduct.supplierId,
                };
                const createdProduct = await createProduct(productData);
                console.log("check createdProduct", createdProduct);

                const productId = createdProduct.productId;

                const uploadedImages: { [color: string]: string[] } = {};
                for (const color of currentProduct.colors) {
                    const files = currentImageFiles[color] || [];
                    if (files.length > 0) {
                        const serverUrls = await uploadMultipleImages(files);
                        console.log('Đã tải lên hình ảnh:', serverUrls);
                        uploadedImages[color] = serverUrls.imageUrls;
                    } else {
                        uploadedImages[color] = [];
                    }
                }

                const inventories = currentProduct.colors.map((color) => ({
                    productId,
                    importDate: new Date().toISOString(),
                    color: color.toUpperCase(),
                    quantity: currentProduct.quantities[color] || 0,
                    imageUrls: uploadedImages[color],
                }));
                console.log('inventories', inventories);

                const inventotyCreated = await bulkCreateInventory(inventories);
                console.log('Kho đã tạo:', inventotyCreated);

                alert('Sản phẩm và kho đã được lưu!');

                // Clean up object URLs
                Object.values(currentProduct.images).forEach((images) => {
                    images.forEach((image) => URL.revokeObjectURL(image));
                });

                const resetProduct = {
                    name: '',
                    description: '',
                    price: '',
                    promotionId: '',
                    categoryId: '',
                    supplierId: '',
                    colors: [],
                    images: {},
                    quantities: {},
                    specifications: [],
                };

                setProduct(resetProduct);
                setImageFiles({});
            } catch (error) {
                console.error('Lỗi khi tạo sản phẩm hoặc kho:', error);
                alert('Đã xảy ra lỗi khi lưu sản phẩm. Vui lòng thử lại.');
            }
        },
        [] // Không có dependencies vì chúng ta sử dụng ref
    );

    const openLightbox = useCallback((event: React.MouseEvent, { index }: { index: number }) => {
        setCurrentImage(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setCurrentImage(0);
        setIsOpen(false);
    }, []);

    const photos: GalleryPhoto[] = useMemo(() => {
        return product.colors.reduce((acc: GalleryPhoto[], color) => {
            const colorImages = (product.images[color] || []).map((image) => ({
                src: image,
                width: 1,
                height: 1,
                color,
            }));
            return [...acc, ...colorImages];
        }, []);
    }, [product.colors, product.images]);

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
        [openLightbox, handleDeleteImage] // Chỉ phụ thuộc vào hàm callback
    );

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container disableGutters sx={{ width: '100%', height: '100%', py: 4 }}>
            <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                <Grid container spacing={3}>
                    <ProductForm
                        product={product}
                        categories={categories}
                        suppliers={suppliers}
                        promotions={promotions}
                        openPromotionDialog={openPromotionDialog}
                        handleInputChange={handleInputChange}
                        handleColorChange={handleColorChange}
                        setOpenCategoryDialog={setOpenCategoryDialog}
                        setOpenPromotionDialog={setOpenPromotionDialog}
                        handleAddPromotion={handleAddPromotion}
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