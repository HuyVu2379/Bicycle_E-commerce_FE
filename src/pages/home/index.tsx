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
      "https://create.microsoft.com/_next/image?url=https%3A%2F%2Fcdn.create.microsoft.com%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90",
  },
  {
    name: "Mountain Blazer",
    type: "Trail",
    originalPrice: 18999.0,
    discountedPrice: 12999.0,
    imageUrl:
      "https://create.microsoft.com/_next/image?url=https%3A%2F%2Fcdn.create.microsoft.com%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90",
  },
  {
    name: "City Sprinter",
    type: "Urban",
    originalPrice: 15999.0,
    discountedPrice: 9999.0,
    imageUrl:
      "https://create.microsoft.com/_next/image?url=https%3A%2F%2Fcdn.create.microsoft.com%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90",
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
