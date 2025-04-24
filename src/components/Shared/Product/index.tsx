import React from "react";
import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/system";

interface Product {
  name: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
}

interface ProductComponentProps extends Product {}

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  boxShadow: "none", // Remove shadow to match the image
  position: "relative", // For positioning the "NEW" badge
  border: "1px solid #e0e0e0", // Add a light border to match the image
}));

const NewBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "red",
  color: "white",
  padding: "2px 8px",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const PriceStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(0.5),
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: "#757575",
  fontSize: "16px",
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "red",
  fontSize: "18px",
}));

const BikeImage = styled("img")(({ theme }) => ({
  height: 200, // Adjusted height to match the image proportions
  width: "100%",
  objectFit: "contain", // Use "contain" to avoid cropping and match the image
}));

const ProductComponent: React.FC<ProductComponentProps> = ({
  name,
  type,
  originalPrice,
  discountedPrice,
  imageUrl,
}) => {
  return (
    <ProductCard>
      <NewBadge>NEW</NewBadge>
      <BikeImage src={imageUrl} alt={`${name} ${type} Bike`} />
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {type}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ paddingTop: 1 }}
        >
          <PriceStack>
            <OriginalPrice>
              $ {originalPrice.toFixed(2)} USD
            </OriginalPrice>
            <DiscountPrice>
              $ {discountedPrice.toFixed(2)} USD
            </DiscountPrice>
          </PriceStack>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#ffffff",
              color: "black",
              border: "1px solid black",
              textTransform: "uppercase",
              fontWeight: "bold",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#EF675F",
                color: "white",
                borderColor: "#EF675F",
              },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </ProductCard>
  );
};

export default ProductComponent;