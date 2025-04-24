import React from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Avatar,
  Select,
  MenuItem,
  LinearProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ReviewType {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content?: string;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

const ReviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
}));

const RatingBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: "#e0e0e0",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#000",
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  flex: 1,
}));

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000",
  },
});

const ReviewsComponent: React.FC = () => {
  const averageRating = 4.5;
  const totalReviews = 15;

  const ratingDistribution: RatingDistribution[] = [
    { rating: 5, count: 3, percentage: 60 },
    { rating: 4, count: 1, percentage: 20 },
    { rating: 3, count: 0, percentage: 0 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 1, percentage: 20 },
  ];

  const reviews: ReviewType[] = [
    {
      id: 1,
      author: "Angelina Jolie",
      avatar: "/path-to-avatar.jpg",
      rating: 5,
      date: "1 day ago",
    },
  ];

  return (
    <ReviewContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          Customer Reviews
        </Typography>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Customer Reviews
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mb: 4,
          "& > *": {
            flex: 1,
            px: 3,
          },
        }}
      >
        <Box
          sx={{
            borderRight: "1px solid #eee",
            textAlign: "center",
            padding: "20px",
            flex: "0 0 250px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <StyledRating value={averageRating} precision={0.5} readOnly />
            <Typography component="div" sx={{ fontSize: "0.875rem" }}>
              {averageRating} out of 5
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Based on {totalReviews} reviews
          </Typography>
        </Box>

        <Box sx={{ flex: "0 0 400px", borderRight: "1px solid #eee" }}>
          {ratingDistribution.map((item) => (
            <Box
              key={item.rating}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <StyledRating value={item.rating} size="small" readOnly />
              <RatingBar variant="determinate" value={item.percentage} />
              <Typography variant="body2" sx={{ minWidth: 30 }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #eee",
            flex: "0 0 200px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "20px",
              borderColor: "#000",
              color: "#000",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            ADD REVIEW
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "50px",
            padding: "8px 16px",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: 1,
              color: "#666",
            }}
          >
            Sort by:
          </Typography>
          <Select
            size="small"
            defaultValue="newest"
            sx={{
              minWidth: 100,
              "& .MuiSelect-select": {
                padding: "0",
                paddingRight: "24px",
                border: "none",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "10px",
                  mt: 1,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                },
              },
            }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="highest">Highest Rating</MenuItem>
            <MenuItem value="lowest">Lowest Rating</MenuItem>
          </Select>
        </Box>
      </Box>

      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{ mb: 3, pb: 3, borderBottom: "1px solid #eee" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', mb: 1 }}>
            <StyledRating value={review.rating} size="small" readOnly />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              {review.date}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar src={review.avatar} alt={review.author} />
            <Typography variant="subtitle2" fontWeight="bold" sx={{ ml: 2 }}>
              {review.author}
            </Typography>
          </Box>
        </Box>
      ))}
    </ReviewContainer>
  );
};

export default ReviewsComponent;
