import React from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import LandingSection from "@/components/Shared/Landing/index";
import { Box } from "@mui/material";

// Optional: Remove this if not needed
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

export default function HomeTemplate() {
  return (
    <Box sx={{ display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <AdvertisementSection />
      <ProductList products={sampleProducts} />
      <LandingSection />
    </Box>
  );
}
