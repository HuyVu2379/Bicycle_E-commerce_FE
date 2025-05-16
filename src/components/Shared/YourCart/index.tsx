import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  MenuItem,
  Select,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PayPalLogo from "/assets/images/logo-paypal.png";
import { useCart } from "@/hook/api/useCart";

const recommendedItems = [
  {
    name: "Merida Scultura Sukura",
    price: 299,
    image: "/assets/images/item.jpg",
  },
  {
    name: "Cannondale Topstone",
    price: 299,
    image: "/assets/images/item.jpg",
  },
];

export default function CheckoutPage() {
  const { currentCart, removeCartItems, updateItemQuantity } = useCart();
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [country, setCountry] = useState("United States");
  const [province, setProvince] = useState("Alabama");
  const giftWrapFee = 5;

  const currentAmount = currentCart?.items.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  const freeShippingThreshold = 100;
  const progress = (currentAmount / freeShippingThreshold) * 100;
  const amountLeft = (freeShippingThreshold - currentAmount).toFixed(2);

  const calculateTotal = () => {
    let baseTotal = currentCart?.items.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    if (isGiftWrapped) {
      baseTotal += giftWrapFee;
    }
    return baseTotal;
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (currentCart) {
      const item = currentCart.items.find((item) => item.productId === productId);
      if (item && newQuantity >= 1) {
        updateItemQuantity(currentCart.cartId, productId, newQuantity);
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (currentCart) {
      removeCartItems(currentCart.cartId, productId);
    }
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Left side: Cart */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>
            Cart
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCart?.items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                        />
                        <Box ml={2}>
                          <Typography>{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.color} / {item.size || "N/A"}
                          </Typography>
                          <Typography color="error">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Typography mx={2}>{item.quantity}</Typography>
                        <Button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(item.productId)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox
              checked={isGiftWrapped}
              onChange={(e) => setIsGiftWrapped(e.target.checked)}
            />
            <Typography variant="body2">
              Please wrap the product carefully. Fee is only $
              {giftWrapFee.toFixed(2)}. (You can choose or not)
            </Typography>
          </Box>

          <hr style={{ margin: "20px 0" }} />

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            You may also like
          </Typography>
          <Grid container spacing={2} mt={2}>
            {recommendedItems.map((item, idx) => (
              <Grid item xs={6} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography>{item.name}</Typography>
                    <Typography color="error">${item.price}</Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                    >
                      ADD TO CART
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
              Spend <strong>${amountLeft}</strong> more to enjoy{" "}
              <Typography
                component="span"
                sx={{ color: "#ef4444", fontWeight: "bold" }}
              >
                FREE SHIPPING!
              </Typography>
            </Typography>
          </Box>
          <Typography color="error">
            Spend ${(freeShippingThreshold - calculateTotal()).toFixed(2)} more to enjoy FREE
            SHIPPING!
          </Typography>

          <TextField
            label="Add order note"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Typography mt={3}>Estimate Shipping</Typography>
          <Select
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            sx={{ mt: 1 }}
          >
            <MenuItem value="United States">United States</MenuItem>
          </Select>

          <Select
            fullWidth
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Alabama">Alabama</MenuItem>
            <MenuItem value="California">California</MenuItem>
          </Select>

          <TextField
            label="Postal/ZIP code"
            fullWidth
            sx={{
              mt: 2,
              "& .MuiInputBase-root": {
                height: 56,
              },
              "& input": {
                padding: "16.5px 14px",
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
              padding: "16.5px 14px",
            }}
          >
            ESTIMATE
          </Button>

          <Typography mt={4}>Subtotal: ${calculateTotal().toFixed(2)}</Typography>

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox />
            <Typography variant="body2">
              I agree with Terms & Conditions
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              padding: "16.5px 14px",
              backgroundColor: "white",
              color: "black",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "gray",
            }}
          >
            CHECKOUT
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#ff3b30",
              padding: "16.5px 14px",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            <img
              src={PayPalLogo}
              alt="PayPal Logo"
              style={{ width: 25, marginRight: 1 }}
            />
            PayPal
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}