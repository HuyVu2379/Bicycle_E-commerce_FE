import React, { useState, useEffect } from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import LandingSection from "@/components/Shared/Landing/index";
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { getAllProduct } from "@/services/Product.service";
import { ProductResponse } from "@/types/product";

// Optional: Remove this if not needed
// const sampleProducts = [
//   {
//     name: "Urban Explorer",
//     type: "Enduro",
//     originalPrice: 21599.0,
//     discountedPrice: 14599.0,
//     imageUrl:
//       "/public/assets/images/hero-swiper-3.png",
//   },
//   {
//     name: "Mountain Blazer",
//     type: "Trail",
//     originalPrice: 18999.0,
//     discountedPrice: 12999.0,
//     imageUrl:
//       "/public/assets/images/hero-swiper-3.png",
//   },
//   {
//     name: "City Sprinter",
//     type: "Urban",
//     originalPrice: 15999.0,
//     discountedPrice: 9999.0,
//     imageUrl:
//       "/public/assets/images/hero-swiper-3.png",
//   },
// ];


export default function HomeTemplate() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeDate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProduct();
      if (response && response.success && Array.isArray(response.data)) {
        setFeaturedProducts(response.data);
      }
      console.log(response.data);

    } catch (error: any) {
      console.error("Error fetching home data:", error);
      setError(error.message || "An unexpected error occurred while loading data.");
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeDate();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '50px', color: 'error.main' }}>
        <Typography variant="h5">Oops! Something went wrong.</Typography>
        <Typography>{error}</Typography>
        <Button variant="contained" onClick={fetchHomeDate} sx={{ mt: 2 }}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <AdvertisementSection />
      <ProductList products={featuredProducts} />
      <LandingSection />
    </Box>
  );
}
