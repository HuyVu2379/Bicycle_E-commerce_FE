import { useEffect, useState } from "react";
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
  Paper,
  IconButton,
  LinearProgress,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VNPayLogo from '/assets/images/logo-vnpay.png';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateQuantity, removeItem } from "@/store/slices/cart.slice";
import EditAddressModal from "../EditAddress";
import useProduct from "@/hook/api/useProduct";
import ProductList from "@/components/Shared/ProductList/index";
import { ProductResponse } from "@/types/product";
import { getAllProduct } from "@/services/Product.service";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartSlice = useSelector((state: RootState) => state.cartSlice);
  const userSlice = useSelector((state: RootState) => state.userSlice);
  const productSlice = useSelector((state: RootState) => state.productSlice);
  const { me } = userSlice;
  const { cart } = cartSlice;
  const { promotions } = productSlice;
  const { handleFetchPromotion } = useProduct();
  const cartItems = cart.items;
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const giftWrapFee = 50000;
  const freeShippingThreshold = 1000000;
  const [open, setOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const baseTotal = cartItems.reduce(
      (total: number, item: any) => total + Number(item.price) * Number(item.quantity),
      0
    );
    let total = isGiftWrapped ? baseTotal + giftWrapFee : baseTotal;
    if (selectedPromotion) {
      const promotion = promotions.find((p: any) => p.id === selectedPromotion);
      if (promotion && promotion.discount) {
        total *= (100 - promotion.discount) / 100; // Áp dụng phần trăm giảm giá
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
    dispatch(updateQuantity({ cartItemId, quantity: Math.max(1, newQuantity) }));
  };

  const handleDelete = (cartItemId: string) => {
    dispatch(removeItem(cartItemId));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Left side: Cart */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>
            Giỏ hàng
          </Typography>
          {cartItems.length === 0 ? (
            <Typography>Giỏ hàng của bạn đang trống</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item: any) => (
                    <TableRow key={item.cartItemId}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img src={item.imageUrl} alt={item.productName} width={80} />
                          <Box ml={2}>
                            <Typography>{item.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.color} / {item.quantity}
                            </Typography>
                            <Typography color="error">
                              {item.price.toLocaleString()} VND
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Typography mx={2}>{item.quantity}</Typography>
                          <Button
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {(Number(item.price) * Number(item.quantity)).toLocaleString()} VND
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(item.cartItemId)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox
              checked={isGiftWrapped}
              onChange={(e) => setIsGiftWrapped(e.target.checked)}
            />
            <Typography variant="body2">
              Vui lòng gói quà cẩn thận. Phí chỉ {giftWrapFee.toLocaleString()} VND.
            </Typography>
          </Box>

          <hr style={{ margin: "20px 0" }} />

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Có thể bạn sẽ thích
          </Typography>
          <Box mt={2}>
            {loading ? (
              <Typography>Đang tải sản phẩm...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : featuredProducts.length === 0 ? (
              <Typography>Không có sản phẩm đề xuất nào.</Typography>
            ) : (
              <>
                <ProductList products={featuredProducts} />
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
                  />
                )}
              </>
            )}
          </Box>
        </Grid>

        {/* Right side: Summary */}
        <Grid item xs={12} md={4}>
          <Box sx={{ width: "100%", px: 2, py: 2 }}>
            <Box sx={{ position: "relative", height: 10, borderRadius: 5 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ef4444",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "-11px",
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "2px solid #ef4444",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalShippingOutlinedIcon sx={{ color: "#ef4444" }} />
              </Box>
            </Box>
            <Typography variant="body2" align="center" mt={1}>
              Mua thêm <strong>{amountLeft.toLocaleString()} VND</strong> để được{" "}
              <Typography component="span" sx={{ color: "#ef4444", fontWeight: "bold" }}>
                MIỄN PHÍ VẬN CHUYỂN!
              </Typography>
            </Typography>
          </Box>

          <Typography mt={3} fontWeight="bold">
            Thông tin địa chỉ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              id="diaChi"
              label="Địa chỉ"
              variant="outlined"
              margin="normal"
              value={
                me.address
                  ? `${me.address.fullAddress || ""}, ${me.address.ward || ""}, ${me.address.district || ""}, ${me.address.city || ""}, ${me.address.country || ""}`
                  : ""
              }
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, -9px) scale(0.75)",
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    paddingY: "26px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleOpen}
              sx={{ mt: 1, height: "56px" }}
            >
              Sửa
            </Button>
          </Box>
          <EditAddressModal handleClose={handleClose} open={open} />

          <Typography mt={3} fontWeight="bold">
            Chọn khuyến mãi
          </Typography>
          <Select
            fullWidth
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
            displayEmpty
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Không áp dụng khuyến mãi</em>
            </MenuItem>
            {promotions.map((promo: any) => (
              <MenuItem key={promo.promotionId} value={promo.promotionId}>
                {promo.name} ({promo.reducePercent}% giảm)
              </MenuItem>
            ))}
          </Select>
          {selectedPromotion && (
            <Typography color="success.main" mt={1}>
              Đã áp dụng khuyến mãi! Giảm {promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}% tổng giá.
            </Typography>
          )}

          <Typography mt={3} fontWeight="bold">
            Ghi chú đơn hàng
          </Typography>
          <TextField
            label="Thêm ghi chú"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 1 }}
          />

          <Typography mt={3} fontWeight="bold">
            Tổng cộng: {calculateTotal().toLocaleString()} VND
          </Typography>
          {selectedPromotion && (
            <Typography variant="body2" color="text.secondary">
              (Đã giảm {promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}% từ khuyến mãi)
            </Typography>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <Typography variant="body2">
              Tôi đồng ý với Điều khoản & Điều kiện
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#005ea6",
              padding: "16.5px 14px",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            <img
              src={VNPayLogo}
              alt="VNPay Logo"
              style={{ width: 25, marginRight: 8 }}
            />
            Thanh toán VNPay
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}