import React, { useEffect, useState } from 'react';
import ProductInformation from "@/components/Shared/ProductInfomation";
import SpecificationsComponent from "@/components/Shared/Specification";
import ReviewsComponent from "@/components/Shared/Review/customerReview";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ProductList from '@/components/Shared/ProductList';
import { useParams } from "react-router-dom";
import useProductDetail from '@/hook/api/useProductDetail';

const product = {
  name: 'GIANT DEFY ADVANCED',
  rating: 4.5,
  reviews: 129,
  price: 2990.00,
  description: 'Experience unmatched comfort and performance with the GIANT Defy Advanced. This endurance road bike features a lightweight carbon frame, advanced compliance technology.',
  colors: ['Green', 'Red', 'Yellow'],
  images: [
    '/assets/images/product-1.png',
    '/assets/images/product-3.png',
    '/assets/images/product-3.png',
    '/assets/images/product-3.png',
    '/assets/images/product-3.png',
    '/assets/images/product-3.png',
  ],
};
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

const ProductDetailTemplate = () => {
  const [value, setValue] = useState(0);
  const { productId } = useParams<{ productId: string }>();
  const { fetchProduct, fetchSpecifications, fetchReviews,
    productInfo, specifications, reviews
  } = useProductDetail();

  // Gọi hàm fetchProduct khi component được mount
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
      fetchSpecifications(productId);
      fetchReviews(productId);
    }
  }, [productId]);
  console.log('productInfo', productInfo);
  console.log('specifications', specifications);
  console.log('reviews', reviews);

  // Xử lý thay đổi tab
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  // Component TabPanel để hiển thị nội dung tương ứng với tab
  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2} bgcolor="#f3f8f3">
      <ProductInformation productData={product} />
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              marginRight: '8px',
            },
            '& .Mui-selected': {
              backgroundColor: '#000',
              color: '#fff !important',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="Description" id="tab-0" />
          <Tab label="Specifications" id="tab-1" />
          <Tab label="Video" id="tab-2" />
          <Tab label="Customer Reviews" id="tab-3" />
        </Tabs>

        {/* Nội dung của từng tab */}
        <TabPanel value={value} index={0}>
          <div>
            The Giant Defy Advanced is designed to redefine long-distance cycling with its exceptional blend of comfort and performance. Crafted from advanced-grade carbon fiber, this endurance road bike features a lightweight and responsive frame that absorbs road vibrations, allowing for a smoother ride over varied terrain. The Defy Advanced is equipped with a precise and reliable drivetrain, ensuring effortless shifting and optimal power transfer.
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SpecificationsComponent specifications={specifications}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            Video content goes here. (e.g., Embed a YouTube video or a video player.)
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewsComponent reviews={reviews}/>
        </TabPanel>
      </Box>
      {/* <Box sx={{ width: '100%' }}>
        <ProductList products={sampleProducts} />
      </Box> */}
    </Box>
  );
};

export default ProductDetailTemplate;