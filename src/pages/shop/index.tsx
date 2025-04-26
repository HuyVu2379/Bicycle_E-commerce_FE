import React from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import Service from "@/components/Shared/Service/index";
import { Box } from "@mui/material";

const sampleProducts = [
  {
    name: "Urban Explorer",
    type: "Enduro",
    originalPrice: 21599.0,
    discountedPrice: 14599.0,
    imageUrl:
      "/public/assets/images/hero-swiper-3.png",
  },
  {
    name: "Mountain Blazer",
    type: "Trail",
    originalPrice: 18999.0,
    discountedPrice: 12999.0,
    imageUrl:
      "/public/assets/images/hero-swiper-3.png",
  },
  {
    name: "City Sprinter",
    type: "Urban",
    originalPrice: 15999.0,
    discountedPrice: 9999.0,
    imageUrl:
      "/public/assets/images/hero-swiper-3.png",
  },
];
export default function ShopTemplate() {
  return (
    <Box sx={{ width:'100%',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <ProductList  products={sampleProducts} />
    </Box>
  );
}
