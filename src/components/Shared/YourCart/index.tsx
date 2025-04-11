import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const sampleCartItem = {
  name: 'Giant Defy Advanced',
  color: 'Green',
  size: '52',
  price: 299,
  quantity: 1,
  image: '/assets/images/item.jpg',
};

const recommendedItems = [
  {
    name: 'Merida Scultura Sukura',
    price: 299,
    image: '/assets/images/item.jpg',
  },
  {
    name: 'Cannondale Topstone',
    price: 299,
    image: '/assets/images/item.jpg',
  },
];

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [country, setCountry] = useState('United States');
  const [province, setProvince] = useState('Alabama');
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const giftWrapFee = 5;

  const calculateTotal = () => {
    let baseTotal = sampleCartItem.price * quantity;
    if (isGiftWrapped) {
      baseTotal += giftWrapFee;
    }
    return baseTotal;
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Left side: Cart */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>Cart</Typography>

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
                {!isDeleted && (
                  <TableRow>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={sampleCartItem.image} alt={sampleCartItem.name} width={80} />
                        <Box ml={2}>
                          <Typography>{sampleCartItem.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{sampleCartItem.color} / {sampleCartItem.size}</Typography>
                          <Typography color="error">${sampleCartItem.price}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                        <Typography mx={2}>{quantity}</Typography>
                        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                      </Box>
                    </TableCell>
                    <TableCell>${(sampleCartItem.price * quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setIsDeleted(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox checked={isGiftWrapped} onChange={(e) => setIsGiftWrapped(e.target.checked)} />
            <Typography variant="body2">
              Please wrap the product carefully. Fee is only ${giftWrapFee.toFixed(2)}. (You can choose or not)
            </Typography>
          </Box>

          <hr style={{ margin: '20px 0' }} />

          <Typography variant="h5">You may also like</Typography>
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
                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>ADD TO CART</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right side: Summary */}
        <Grid item xs={12} md={4}>
          <Typography color="error">Spend ${(53 - calculateTotal()).toFixed(2)} more to enjoy FREE SHIPPING!</Typography>

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
            sx={{ mt: 2 }}
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>ESTIMATE</Button>

          <Typography mt={4}>Subtotal: ${calculateTotal()}</Typography>

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox />
            <Typography variant="body2">I agree with Terms & Conditions</Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>CHECKOUT</Button>
          <Button variant="contained" fullWidth sx={{ mt: 1, backgroundColor: '#ff3b30' }}>PayPal</Button>
        </Grid>
      </Grid>
    </Box>
  );
}