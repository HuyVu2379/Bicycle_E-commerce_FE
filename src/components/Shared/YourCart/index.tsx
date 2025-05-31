import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    IconButton,
    LinearProgress,
    Select,
    MenuItem,
    Pagination,
    CircularProgress,
    Card,
    CardContent,
    Divider,
    Chip,
    Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VNPayLogo from '/assets/images/logo-vnpay.png';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditAddressModal from "../EditAddress";
import useProduct from "@/hook/api/useProduct";
import ProductList from "@/components/Shared/ProductList/index";
import { ProductResponse } from "@/types/product";
import { getAllProduct } from "@/services/Product.service";
import useCart from "@/hook/api/useCart";
import { getValueFromLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { createPayment, getPaymentStatus } from "@/services/Payment.service";
import { createOrder } from "@/services/Order.service";
import theme from "@/themes/ThemeMUI";
interface CartItem {
    cartItemId: string;
    productName: string;
    imageUrl: string;
    color: string;
    quantity: number;
    price: number;
}

export default function CheckoutPage() {
    const cartSlice = useSelector((state: RootState) => state.cartSlice);
    const userSlice = useSelector((state: RootState) => state.userSlice);
    const productSlice = useSelector((state: RootState) => state.productSlice);
    const { updateQuantityCartItem, removeCartItem, fetchCartByUserId, removeCartItems } = useCart();
    const { me } = userSlice;
    const { cart } = cartSlice;
    const { promotions } = productSlice;
    const { handleFetchPromotion } = useProduct();
    const cartItems = cart.items;
    const { enqueueSnackbar } = useSnackbar();
    const [isGiftWrapped, setIsGiftWrapped] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<string>("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const giftWrapFee = 50000;
    const freeShippingThreshold = 1000000;
    const [open, setOpen] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const userId = getValueFromLocalStorage("userId").replace(/^"|"$/g, '');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartByUserId(userId);
    }, [userId]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelectItem = (item: CartItem) => {
        setSelectedItems(prev => {
            if (prev.some(selectedItem => selectedItem.cartItemId === item.cartItemId)) {
                return prev.filter(selectedItem => selectedItem.cartItemId !== item.cartItemId);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems?.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems || []);
        }
    };

    const handlePayment = async () => {
        if (selectedItems.length === 0) {
            enqueueSnackbar("Please select at least one item to pay", { variant: 'warning' });
            return;
        }

        sessionStorage.removeItem('processedPayment');

        const products = selectedItems.map((item: any) => ({
            productId: item.productId,
            color: item.color.toUpperCase(),
            quantity: item.quantity
        }));
        const dataCreateOrder = {
            promotionId: selectedPromotion,
            products: products,
        }
        const order = await createOrder(dataCreateOrder)

        const data = {
            orderId: order.orderId,
            userId: order.userId,
            amount: calculateTotal(),
            currency: "VND",
            paymentMethod: "VN_PAY",
            orderInfo: `Thanh toan don hang ${order.orderId}`,
            language: "vn",
        }
        const response = await createPayment(data);

        if (response && response.paymentUrl) {
            localStorage.setItem('pendingPayment', JSON.stringify({
                selectedItems,
                orderId: order.orderId
            }));
            window.location.href = response.paymentUrl;
        } else {
            enqueueSnackbar("Có lỗi xảy ra khi tạo thanh toán", { variant: 'error' });
        }
    };

    const fetchHomeData = async (pageNo = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllProduct(pageNo);
            if (response && response.content) {
                setFeaturedProducts(response.content);
                if (response.page) {
                    setTotalPages(response.page.totalPages);
                }
            } else {
                setFeaturedProducts([]);
                setError("Không có sản phẩm đề xuất nào.");
            }
        } catch (error: any) {
            setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu.");
            setFeaturedProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!cartItems) return 0;
        const baseTotal = selectedItems.reduce(
            (total: number, item: any) => total + Number(item.price) * Number(item.quantity),
            0
        );
        let total = isGiftWrapped ? baseTotal + giftWrapFee : baseTotal;
        if (selectedPromotion) {
            const promotion = promotions.find((p: any) => p.promotionId === selectedPromotion);
            if (promotion && promotion.reducePercent) {
                total *= (100 - promotion.reducePercent) / 100;
            }
        }
        return total;
    };

    useEffect(() => {
        handleFetchPromotion();
        fetchHomeData(page);
    }, [page]);

    const currentAmount = calculateTotal();
    const progress = Math.min((currentAmount / freeShippingThreshold) * 100, 100);
    const amountLeft = Math.max(freeShippingThreshold - currentAmount, 0).toFixed(0);

    const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
        updateQuantityCartItem(cartItemId, Math.max(1, newQuantity));
    };

    const handleDelete = (cartItemId: string) => {
        removeCartItem(cartItemId);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    useEffect(() => {
        const handlePaymentResult = async () => {
            const pendingPayment = localStorage.getItem('pendingPayment');
            if (pendingPayment) {
                const { selectedItems } = JSON.parse(pendingPayment);
                try {
                    setIsProcessingPayment(true);
                    const urlParams = new URLSearchParams(window.location.search);
                    const vnpParams: { [key: string]: string } = {};

                    urlParams.forEach((value, key) => {
                        if (key.startsWith('vnp_')) {
                            vnpParams[key] = value;
                        }
                    });

                    if (Object.keys(vnpParams).length > 0) {
                        const response = await getPaymentStatus(vnpParams);
                        console.log("check response payment status: ", response);

                        if (response?.vnpResponseCode === "00") {
                            const cartItemIds = selectedItems.map((item: any) => item.cartItemId);
                            await removeCartItems(cartItemIds);
                            setSelectedItems([]);

                            enqueueSnackbar("Thanh toán thành công!", { variant: 'success' });
                            navigate('/home/cart', { replace: true });
                        } else {
                            enqueueSnackbar("Thanh toán thất bại. Vui lòng thử lại!", { variant: 'error' });
                            navigate('/home/cart', { replace: true });
                        }
                    }
                } catch (error) {
                    console.error('Payment processing error:', error);
                    enqueueSnackbar("Có lỗi xảy ra khi xử lý kết quả thanh toán", { variant: 'error' });
                    navigate('/home/cart', { replace: true });
                } finally {
                    setIsProcessingPayment(false);
                    localStorage.removeItem('pendingPayment');
                }
            }
        };

        handlePaymentResult();
    }, [navigate]); return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            p: 4,
            width: '100%'
        }}>
            {isProcessingPayment && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <Card
                        sx={{
                            padding: 4,
                            borderRadius: 3,
                            textAlign: 'center',
                            maxWidth: 400,
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CircularProgress size={60} sx={{ color: '#3b82f6', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Đang xử lý thanh toán...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Vui lòng đợi trong giây lát
                        </Typography>
                    </Card>
                </Box>
            )}

            <Box sx={{ width: '100%' }}>
                <Grid container spacing={3}>
                    {/* Left side: Cart */}
                    <Grid item xs={12} md={8}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            mb: 3
                        }}>
                            <Box sx={{
                                background: theme.palette.primary.main,
                                color: 'white',
                                p: 3,
                                borderRadius: '8px 8px 0 0'
                            }}>
                                <Box display="flex" alignItems="center">
                                    <ShoppingCartIcon sx={{ mr: 2, fontSize: 28 }} />
                                    <Typography variant="h5" fontWeight="600">
                                        Giỏ hàng của bạn
                                    </Typography>
                                    {cartItems && cartItems.length > 0 && (
                                        <Chip
                                            label={`${cartItems.length} sản phẩm`}
                                            sx={{
                                                ml: 2,
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                fontWeight: '600'
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            <CardContent sx={{ p: 0 }}>
                                {cartItems && cartItems.length === 0 ? (
                                    <Box sx={{ textAlign: 'center', py: 8, px: 4 }}>
                                        <ShoppingCartIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                            Giỏ hàng của bạn đang trống
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Hãy thêm một số sản phẩm tuyệt vời vào giỏ hàng!
                                        </Typography>
                                    </Box>
                                ) : (
                                    <TableContainer sx={{ boxShadow: 'none' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={selectedItems.length === cartItems?.length}
                                                            indeterminate={selectedItems.length > 0 && selectedItems.length < (cartItems?.length || 0)}
                                                            onChange={handleSelectAll}
                                                            sx={{
                                                                color: '#3b82f6',
                                                                '&.Mui-checked': { color: '#3b82f6' }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: '600', color: '#374151' }}>Sản phẩm</TableCell>
                                                    <TableCell sx={{ fontWeight: '600', color: '#374151' }}>Số lượng</TableCell>
                                                    <TableCell sx={{ fontWeight: '600', color: '#374151' }}>Tổng</TableCell>
                                                    <TableCell sx={{ fontWeight: '600', color: '#374151' }}>Hành động</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cartItems && cartItems.map((item: CartItem) => (
                                                    <TableRow
                                                        key={item.cartItemId}
                                                        sx={{
                                                            '&:hover': { backgroundColor: '#f8fafc' },
                                                            borderLeft: selectedItems.some(selectedItem => selectedItem.cartItemId === item.cartItemId)
                                                                ? '4px solid #3b82f6' : '4px solid transparent',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={selectedItems.some(selectedItem => selectedItem.cartItemId === item.cartItemId)}
                                                                onChange={() => handleSelectItem(item)}
                                                                sx={{
                                                                    color: '#3b82f6',
                                                                    '&.Mui-checked': { color: '#3b82f6' }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box display="flex" alignItems="center">
                                                                <Avatar
                                                                    src={item.imageUrl}
                                                                    alt={item.productName}
                                                                    sx={{
                                                                        width: 80,
                                                                        height: 80,
                                                                        borderRadius: 2,
                                                                        mr: 2,
                                                                        border: '1px solid #e5e7eb'
                                                                    }}
                                                                    variant="rounded"
                                                                />
                                                                <Box>
                                                                    <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 0.5 }}>
                                                                        {item.productName}
                                                                    </Typography>
                                                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                                        <Chip
                                                                            label={item.color}
                                                                            size="small"
                                                                            sx={{
                                                                                backgroundColor: '#f3f4f6',
                                                                                fontWeight: '500'
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Typography
                                                                        variant="h6"
                                                                        sx={{
                                                                            color: '#dc2626',
                                                                            fontWeight: '600'
                                                                        }}
                                                                    >
                                                                        {item.price.toLocaleString()} VND
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                sx={{
                                                                    border: '1px solid #e5e7eb',
                                                                    borderRadius: 2,
                                                                    p: 0.5,
                                                                    width: 'fit-content',
                                                                    backgroundColor: '#ffffff'
                                                                }}
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                                                                    sx={{
                                                                        '&:hover': { backgroundColor: '#3b82f6', color: 'white' }
                                                                    }}
                                                                >
                                                                    <RemoveIcon fontSize="small" />
                                                                </IconButton>
                                                                <Typography
                                                                    sx={{
                                                                        mx: 2,
                                                                        minWidth: 30,
                                                                        textAlign: 'center',
                                                                        fontWeight: '600'
                                                                    }}
                                                                >
                                                                    {item.quantity}
                                                                </Typography>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                                                                    sx={{
                                                                        '&:hover': { backgroundColor: '#3b82f6', color: 'white' }
                                                                    }}
                                                                >
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6" sx={{ fontWeight: '600', color: '#1f2937' }}>
                                                                {(Number(item.price) * Number(item.quantity)).toLocaleString()} VND
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={() => handleDelete(item.cartItemId)}
                                                                sx={{
                                                                    color: '#dc2626',
                                                                    '&:hover': {
                                                                        backgroundColor: '#dc2626',
                                                                        color: 'white'
                                                                    }
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </Card>

                        {/* Gift Wrap Option */}
                        <Card sx={{
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: isGiftWrapped ? '2px solid #3b82f6' : '2px solid transparent',
                            transition: 'all 0.3s ease'
                        }}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <Checkbox
                                        checked={isGiftWrapped}
                                        onChange={(e) => setIsGiftWrapped(e.target.checked)}
                                        sx={{
                                            color: '#3b82f6',
                                            '&.Mui-checked': { color: '#3b82f6' }
                                        }}
                                    />
                                    <Box ml={1}>
                                        <Typography variant="body1" fontWeight="600">
                                            Gói quà cao cấp
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Vui lòng gói quà cẩn thận. Phí chỉ {giftWrapFee.toLocaleString()} VND.
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        <Divider sx={{ my: 4 }} />

                        {/* Featured Products Section */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <Box sx={{
                                background: theme.palette.primary.main,
                                color: 'white',
                                p: 3,
                                borderRadius: '8px 8px 0 0'
                            }}>
                                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                                    Có thể bạn sẽ thích
                                </Typography>
                            </Box>
                            <CardContent>
                                {loading ? (
                                    <Box textAlign="center" py={4}>
                                        <CircularProgress sx={{ color: '#3b82f6' }} />
                                        <Typography sx={{ mt: 2 }}>Đang tải sản phẩm...</Typography>
                                    </Box>
                                ) : error ? (
                                    <Typography color="error" textAlign="center" py={4}>
                                        {error}
                                    </Typography>
                                ) : featuredProducts.length === 0 ? (
                                    <Typography textAlign="center" py={4}>
                                        Không có sản phẩm đề xuất nào.
                                    </Typography>
                                ) : (
                                    <>
                                        <ProductList products={featuredProducts} />
                                        {totalPages > 1 && (
                                            <Box display="flex" justifyContent="center" mt={4}>
                                                <Pagination
                                                    count={totalPages}
                                                    page={page + 1}
                                                    onChange={handlePageChange}
                                                    color="primary"
                                                    size="large"
                                                    sx={{
                                                        '& .MuiPaginationItem-root': {
                                                            borderRadius: 2,
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right side: Summary */}
                    <Grid item xs={12} md={4}>
                        {/* Free Shipping Progress */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            mb: 3,
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                background: theme.palette.primary.main,
                                color: 'white',
                                p: 3
                            }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <LocalShippingOutlinedIcon sx={{ mr: 1, fontSize: 28 }} />
                                    <Typography variant="h6" fontWeight="600">
                                        Miễn phí vận chuyển
                                    </Typography>
                                </Box>
                                <Box sx={{ position: "relative", mb: 2 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={{
                                            height: 12,
                                            borderRadius: 6,
                                            backgroundColor: 'rgba(255,255,255,0.3)',
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: "#fbbf24",
                                                borderRadius: 6,
                                            },
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "-8px",
                                            left: `${Math.min(progress, 95)}%`,
                                            transform: "translateX(-50%)",
                                            backgroundColor: "#fbbf24",
                                            borderRadius: "50%",
                                            border: "3px solid white",
                                            width: 28,
                                            height: 28,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <LocalShippingOutlinedIcon sx={{ color: "#10b981", fontSize: 16 }} />
                                    </Box>
                                </Box>
                                <Typography variant="body2" textAlign="center">
                                    {progress >= 100 ? (
                                        <span style={{ color: '#fbbf24', fontWeight: '600' }}>
                                            🎉 Bạn được miễn phí vận chuyển!
                                        </span>
                                    ) : (
                                        <>
                                            Mua thêm <strong style={{ color: '#fbbf24' }}>{amountLeft.toLocaleString()} VND</strong> để được{" "}
                                            <strong style={{ color: '#fbbf24' }}>MIỄN PHÍ VẬN CHUYỂN!</strong>
                                        </>
                                    )}
                                </Typography>
                            </Box>
                        </Card>

                        {/* Address Information */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            mb: 3
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="600" mb={2}>
                                    📍 Thông tin địa chỉ
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ giao hàng"
                                        variant="outlined"
                                        value={
                                            me.address
                                                ? `${me.address.fullAddress || ""}, ${me.address.ward || ""}, ${me.address.district || ""}, ${me.address.city || ""}, ${me.address.country || ""}`
                                                : "Chưa có địa chỉ"
                                        }
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: 2,
                                                backgroundColor: '#f8fafc',
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#3b82f6",
                                                },
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={handleOpen}
                                        sx={{
                                            height: "56px",
                                            borderRadius: 2,
                                            backgroundColor: '#3b82f6',
                                            '&:hover': {
                                                backgroundColor: '#2563eb',
                                            }
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        <EditAddressModal handleClose={handleClose} open={open} />

                        {/* Promotion Selection Section */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            mb: 3,
                            overflow: 'hidden'
                        }}>
                            <Box sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                p: 3
                            }}>
                                <Box display="flex" alignItems="center">
                                    <LocalOfferIcon sx={{ mr: 1, fontSize: 28 }} />
                                    <Typography variant="h6" fontWeight="600">
                                        Khuyến mãi đặc biệt
                                    </Typography>
                                </Box>
                            </Box>

                            <CardContent>
                                <Select
                                    fullWidth
                                    value={selectedPromotion}
                                    onChange={(e) => setSelectedPromotion(e.target.value)}
                                    displayEmpty
                                    sx={{
                                        borderRadius: 2,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#e5e7eb'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6'
                                        }
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Không áp dụng khuyến mãi</em>
                                    </MenuItem>
                                    {promotions.map((promo: any) => (
                                        <MenuItem key={promo.promotionId} value={promo.promotionId}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                                <Box>
                                                    <Typography fontWeight="600">
                                                        {promo.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Giảm {promo.reducePercent}% tổng đơn hàng
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={`-${promo.reducePercent}%`}
                                                    sx={{
                                                        backgroundColor: '#dc2626',
                                                        color: 'white',
                                                        fontWeight: '600'
                                                    }}
                                                />
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>

                                {selectedPromotion && (
                                    <Box
                                        sx={{
                                            mt: 2,
                                            p: 2,
                                            backgroundColor: '#dcfdf7',
                                            borderRadius: 2,
                                            border: '1px solid #10b981'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: '#059669', fontWeight: '600' }}>
                                            ✨ Khuyến mãi đã được áp dụng! Bạn tiết kiệm được{" "}
                                            {promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}%
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order Notes Section */}
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            mb: 3
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="600" mb={2}>
                                    📝 Ghi chú đơn hàng
                                </Typography>
                                <TextField
                                    label="Thêm ghi chú cho đơn hàng của bạn"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="Ví dụ: Giao hàng vào buổi sáng, để ở cửa sau..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#3b82f6'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#3b82f6'
                                            }
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Total Summary Section */}
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '2px solid #e5e7eb'
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="600" mb={3}>
                                    💳 Tổng thanh toán
                                </Typography>

                                {selectedItems.length > 0 && (
                                    <Box mb={3}>
                                        <Box display="flex" justifyContent="space-between" mb={1.5}>
                                            <Typography>Tạm tính ({selectedItems.length} sản phẩm):</Typography>
                                            <Typography fontWeight="600">
                                                {selectedItems.reduce(
                                                    (total: number, item: any) => total + Number(item.price) * Number(item.quantity),
                                                    0
                                                ).toLocaleString()} VND
                                            </Typography>
                                        </Box>

                                        {isGiftWrapped && (
                                            <Box display="flex" justifyContent="space-between" mb={1.5}>
                                                <Typography>🎁 Phí gói quà:</Typography>
                                                <Typography fontWeight="600">
                                                    +{giftWrapFee.toLocaleString()} VND
                                                </Typography>
                                            </Box>
                                        )}

                                        {selectedPromotion && (
                                            <Box display="flex" justifyContent="space-between" mb={1.5}
                                                sx={{
                                                    backgroundColor: '#fef3c7',
                                                    p: 1,
                                                    borderRadius: 1
                                                }}>
                                                <Typography fontWeight="600" sx={{ color: '#d97706' }}>
                                                    🎉 Giảm giá ({promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}%):
                                                </Typography>
                                                <Typography fontWeight="600" sx={{ color: '#d97706' }}>
                                                    -{(() => {
                                                        const promotion = promotions.find((p: any) => p.promotionId === selectedPromotion);
                                                        if (promotion) {
                                                            const baseTotal = selectedItems.reduce(
                                                                (total: number, item: any) => total + Number(item.price) * Number(item.quantity),
                                                                0
                                                            );
                                                            const savings = (baseTotal * promotion.reducePercent) / 100;
                                                            return savings.toLocaleString();
                                                        }
                                                        return "0";
                                                    })()} VND
                                                </Typography>
                                            </Box>
                                        )}

                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                )}

                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h5" fontWeight="600">
                                        Tổng cộng:
                                    </Typography>
                                    <Typography variant="h4" fontWeight="600" sx={{ color: '#dc2626' }}>
                                        {calculateTotal().toLocaleString()} VND
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" mb={3}>
                                    <Checkbox
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        sx={{
                                            color: '#3b82f6',
                                            '&.Mui-checked': { color: '#3b82f6' }
                                        }}
                                    />
                                    <Typography variant="body2">
                                        Tôi đồng ý với{" "}
                                        <Typography
                                            component="span"
                                            sx={{
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                color: '#3b82f6'
                                            }}
                                        >
                                            Điều khoản & Điều kiện
                                        </Typography>
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    disabled={!agreeTerms || selectedItems.length === 0}
                                    onClick={handlePayment}
                                    sx={{
                                        backgroundColor: agreeTerms && selectedItems.length > 0 ? '#005ea6' : '#9ca3af',
                                        borderRadius: 2,
                                        py: 2,
                                        fontWeight: "600",
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        boxShadow: agreeTerms && selectedItems.length > 0
                                            ? '0 4px 6px -1px rgba(0, 94, 166, 0.3)'
                                            : 'none',
                                        '&:hover': {
                                            backgroundColor: agreeTerms && selectedItems.length > 0 ? '#004a8a' : '#9ca3af',
                                            transform: agreeTerms && selectedItems.length > 0 ? 'translateY(-1px)' : 'none',
                                        },
                                        '&:disabled': {
                                            color: '#6b7280'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <img
                                            src={VNPayLogo}
                                            alt="VNPay Logo"
                                            style={{ width: 28, marginRight: 12 }}
                                        />
                                        <Typography fontWeight="600" fontSize="1.1rem">
                                            Thanh toán VNPay
                                        </Typography>
                                    </Box>
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
