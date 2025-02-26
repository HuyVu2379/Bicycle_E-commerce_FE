import React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/system";

interface Product {
    name: string;
    type: string;
    originalPrice: number;
    discountedPrice: number;
    imageUrl: string;
}

const ProductCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2),
}));

const PriceStack = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1),
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
    textDecoration: "line-through",
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    color: "red",
}));

const BikeImage = styled("img")(({ theme }) => ({
    height: 250,
    width: "100%",
    objectFit: "cover",
    paddingBottom: 20,
    borderBottom: "1px solid grey",
    borderRadius: theme.spacing(1, 1, 0, 0),
}));

const ProductComponent: React.FC = () => {
    const product: Product = {
        name: "Urban Explorer",
        type: "Enduro",
        originalPrice: 21599.0,
        discountedPrice: 14599.0,
        imageUrl:
            "https://create.microsoft.com/_next/image?url=https%3A%2F%2Fcdn.create.microsoft.com%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90",
    };

    return (
        <ProductCard>
            <BikeImage
                src={product.imageUrl}
                alt={`${product.name} ${product.type} Bike`}
            />
            <CardContent sx={{ paddingY: 2, paddingX: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {product.type}
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ paddingTop: 1 }}
                >
                    <PriceStack>
                        <OriginalPrice variant="body1">
                            $ {product.originalPrice.toFixed(2)} USD
                        </OriginalPrice>
                        <DiscountPrice variant="h6">
                            $ {product.discountedPrice.toFixed(2)} USD
                        </DiscountPrice>
                    </PriceStack>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#ffffff",
                            color: "black",
                            border: "1px solid black",
                            "&:hover": {
                                backgroundColor: "#EF675F",
                                color: "white",
                                borderColor: "#EF675F",
                            },
                            padding: "14px 16px",
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
