import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  TextField,
  Grid,
  CardMedia,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import useCart from "@/hook/api/useCart";
const ProductInformation = ({ product }: any) => {
  if (!product) return null;
  const { createCartItem } = useCart();
  const cartSlice = useSelector((state: RootState) => state.cartSlice);
  const currentCart = cartSlice.cart;

  console.log("Product Information: ", product);
  // Lọc các inventory có số lượng > 0
  const availableInventories =
    product.inventory?.filter((inv: any) => inv.quantity > 0) || [];

  // Danh sách màu từ các inventory còn hàng
  const colors = availableInventories.map((inv: any) => inv.color);

  // State: chọn inventory đầu tiên còn hàng làm mặc định
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Lấy inventory tương ứng với màu đang chọn
  const selectedInventory = availableInventories.find(
    (inv: any) => inv.color === selectedColor
  );
  const images = selectedInventory?.imageUrls || [];

  const [mainImage, setMainImage] = useState(images[0] || "");

  // Khi người dùng chọn màu
  const handleColorChange = (event: any) => {
    const color = event.target.value;
    setSelectedColor(color);
    const inv = availableInventories.find((i) => i.color === color);
    setMainImage(inv?.imageUrls?.[0] || "");
  };

  const handleImageChange = (image: any) => setMainImage(image);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);


  const handleAddToCart = async () => {
    const cartItem = {
      productId: product.product.productId,
      cartId: currentCart.cartId,
      color: selectedColor,
      quantity: quantity
    };
    console.log("Check cart item in Product Info: ", cartItem);
    await createCartItem(cartItem);
  };
  console.log("check cart: ", currentCart);
  return (
    <Box sx={{ padding: 4, maxWidth: 1400, margin: "auto" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={product.product.name}
              sx={{
                width: 700,
                height: 450,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 3,
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: "100%",
              overflowX: "auto"
            }}
          >
            {images.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  border: mainImage === image ? "3px solid #1976d2" : "2px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: "3px solid #1976d2",
                    transform: "scale(1.05)"
                  }
                }}
                onClick={() => handleImageChange(image)}
              />
            ))}
          </Box>
        </Grid>        <Grid item xs={12} md={5}>
          <Box sx={{ pl: { md: 2 }, height: "100%" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }} gutterBottom>
              {product.product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Category: {product.category?.name || "Không rõ danh mục"}
            </Typography>
            <Typography variant="h4" color="primary" sx={{ fontWeight: "bold", mb: 3 }}>
              {product.product.priceReduced.toLocaleString()} đ
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Supplier:
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              {product.supplier?.name || "UNKNOWN"}
            </Typography>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Color
            </Typography>
            <RadioGroup row value={selectedColor} onChange={handleColorChange} sx={{ mb: 3 }}>
              {colors.map((color) => (
                <FormControlLabel
                  key={color}
                  value={color}
                  control={
                    <Radio
                      sx={{
                        color: color.toLowerCase(),
                        "&.Mui-checked": { color: color.toLowerCase() },
                      }}
                    />
                  }
                  label=""
                />
              ))}
            </RadioGroup>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Quantity:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <IconButton
                onClick={handleDecrease}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                inputProps={{ style: { textAlign: "center" } }}
                sx={{
                  width: 80,
                  mx: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1
                  }
                }}
                disabled
              />
              <IconButton
                onClick={handleIncrease}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#f5f5f5" }
                }}
              >
                <Add />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  flexGrow: 1,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                sx={{
                  flexGrow: 1,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: 2
                }}
                component={Link}
                to={`/payment/${product.product.productId}/${selectedColor}/${quantity}`}
              >
                Buy Now
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Orders ship within 5 to 10 business days
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInformation;
