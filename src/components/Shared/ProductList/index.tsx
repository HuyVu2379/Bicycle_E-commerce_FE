import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductComponent from "../Product/index";

interface Product {
  name: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
        Danh Sách Sản Phẩm
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductComponent {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;