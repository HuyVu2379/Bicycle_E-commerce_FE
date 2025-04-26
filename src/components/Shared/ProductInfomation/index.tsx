import React, { useState } from 'react';
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
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProductInformation = ({ productData }) => {
  // Giả lập dữ liệu từ API, bạn sẽ thay bằng dữ liệu thực từ API
  const product = productData || {
    name: 'GIANT DEFY ADVANCED',
    rating: 4.5,
    reviews: 129,
    price: 2990.00,
    description: 'Experience unmatched comfort and performance with the GIANT Defy Advanced. This endurance road bike features a lightweight carbon frame, advanced compliance technology.',
    colors: ['Green', 'Red', 'Yellow'],
    images: [
      '/assets/images/item.jpg', // Ảnh chính /400x300
      '/assets/images/item2.jpg', // Ảnh nhỏ 1 /80x80
      '/assets/images/item2.jpg', // Ảnh nhỏ 2
      '/assets/images/item2.jpg', // Ảnh nhỏ 3
      '/assets/images/item2.jpg', // Ảnh nhỏ 4
      '/assets/images/item2.jpg', // Ảnh nhỏ 5
    ],
  };

  // State để quản lý số lượng và màu sắc được chọn
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);

  // Xử lý tăng giảm số lượng
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Xử lý chọn màu
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  // Xử lý chọn ảnh nhỏ để thay đổi ảnh chính
  const handleImageChange = (image) => {
    setMainImage(image);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    console.log(`Added to cart: ${product.name}, Quantity: ${quantity}, Color: ${selectedColor}`);
    // Gọi API hoặc dispatch action để thêm vào giỏ hàng tại đây
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: 'auto' }}>
      <Grid container spacing={4}>
        {/* Phần ảnh sản phẩm */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={mainImage}
            alt={product.name}
            sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
            {product.images.slice(1).map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: mainImage === image ? '2px solid #1976d2' : 'none',
                }}
                onClick={() => handleImageChange(image)}
              />
            ))}
          </Box>
        </Grid>

        {/* Phần thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviews} reviews)
            </Typography>
            <Typography variant="body2" sx={{ ml: 1, color: 'primary.main', cursor: 'pointer' }}>
              View All
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)} USD
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          {/* Chọn màu sắc */}
          <Typography variant="subtitle1" gutterBottom>
            Color
          </Typography>
          <RadioGroup row value={selectedColor} onChange={handleColorChange}>
            {product.colors.map((color) => (
              <FormControlLabel
                key={color}
                value={color}
                control={
                  <Radio
                    sx={{
                      color: color.toLowerCase(),
                      '&.Mui-checked': { color: color.toLowerCase() },
                    }}
                  />
                }
                label=""
              />
            ))}
          </RadioGroup>

          {/* Chọn số lượng */}
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Quantity:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleDecrease}>
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              inputProps={{ style: { textAlign: 'center' } }}
              sx={{ width: 60, mx: 1 }}
              disabled
            />
            <IconButton onClick={handleIncrease}>
              <Add />
            </IconButton>
          </Box>

          {/* Nút hành động */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ flexGrow: 1 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Link to="/payment" style={{ textDecoration: 'none', color: 'inherit' }}>
                Buy Now
            </Link>
          </Box>

          {/* Thanh toán an toàn */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Guaranteed Safe Checkout:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
            <img src="/assets/images/logo_VISA.png" width="40" height="24" alt="Visa" />
            <img src="/assets/images/logo_MOMO.png" width="30" height="30" alt="MasterCard" />
            <img src="/assets/images/logo_ZALOPAY.png" width="45" height="14" alt="Amex" />
            <img src="/assets/images/logo_COD.png" width="30" height="30" alt="Paypal" />
          </Box>

          {/* Thông tin giao hàng */}
          <Typography variant="body2" color="text.secondary">
            Orders ship within 5 to 10 business days
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInformation;