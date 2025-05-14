import React, { useEffect, useState } from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import Service from "@/components/Shared/Service/index";
import { Box, Grid } from "@mui/material";
import FilterSidebar from "@/components/Shared/SideBar/index";
import useProduct from "@/hook/api/useProduct";

const sampleProducts = [
  {
    productId: "68231292a0de5b7faf90f0a0",
    name: "Urban Explorer",
    type: "Enduro",
    originalPrice: 21599.0,
    discountedPrice: 14599.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "TREK",
    frameMaterial: "Carbon",
    weight: 12.5,
  },
  {
    name: "Mountain Blazer",
    type: "Trail",
    originalPrice: 18999.0,
    discountedPrice: 12999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "HUFFY",
    frameMaterial: "Aluminum",
    weight: 14.2,
  },
  {
    name: "City Sprinter",
    type: "Urban",
    originalPrice: 15999.0,
    discountedPrice: 9999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "TERN",
    frameMaterial: "Steel",
    weight: 15.8,
  },
  {
    name: "Desert Cruiser",
    type: "Cross Country",
    originalPrice: 22999.0,
    discountedPrice: 18999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "CANNONDALE",
    frameMaterial: "Carbon",
    weight: 11.7,
  },
  {
    name: "Snow Runner",
    type: "Fatbike",
    originalPrice: 24999.0,
    discountedPrice: 20999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "SALSA",
    frameMaterial: "Aluminum",
    weight: 17.3,
  },
  {
    name: "Speedster",
    type: "Road",
    originalPrice: 27999.0,
    discountedPrice: 23999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "SPECIALIZED",
    frameMaterial: "Carbon",
    weight: 8.9,
  },
  {
    name: "Trail Breaker",
    type: "Trail",
    originalPrice: 19999.0,
    discountedPrice: 14999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "SCOTT",
    frameMaterial: "Aluminum",
    weight: 13.5,
  },
  {
    name: "Metro Commuter",
    type: "Urban",
    originalPrice: 13999.0,
    discountedPrice: 9999.0,
    imageUrl: "/public/assets/images/hero-swiper-3.png",
    brand: "GIANT",
    frameMaterial: "Steel",
    weight: 16.2,
  },
];

export default function ShopTemplate() {
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const {
    handleFetchProducts,
    products
  } = useProduct();
  console.log(products);
  useEffect(()=>{
    handleFetchProducts();
  },[handleFetchProducts]);
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Grid container spacing={4} sx={{ maxWidth: '1400px' }}>
        {/* Sidebar Filter */}
        <Grid item xs={12} md={3}>
          <FilterSidebar
            products={sampleProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </Grid>

        {/* Product List */}
        <Grid item xs={12} md={9}>
          <ProductList products={filteredProducts} />
        </Grid>
      </Grid>
    </Box>
  );
}
