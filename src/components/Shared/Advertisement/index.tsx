import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  gap: '16px',
  width: '95%',
  paddingTop: '3vw',
  height: 'calc(100vh - 60px)',
});

const MainSection = styled(Box)({
  flex: 2,
  backgroundColor: '#fff3e0',
  padding: '24px',
  borderRadius: '8px',
  position: 'relative',
});

const SideSection = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Card = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
});

const CardHelmet = styled(Card)({
  backgroundColor: '#f5f5f5',
});

const CardGloves = styled(Card)({
  backgroundColor: '#424242',
  color: '#fff',
});

const MarqueeContainer = styled(Box)({
  backgroundColor: '#d4ed91',
  width: '100vw', // Use viewport width to span the full width of the screen
  position: 'relative', // Ensure it breaks out of any parent constraints
  marginLeft: '-50vw',
  marginRight: '-50vw',
  padding: '15px 0',
  marginTop: '3vw',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const Marquee = styled(Box)({
  display: 'inline-block',
  animation: 'marquee 20s linear infinite',
  '& span': {
    margin: '0 32px',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  '@keyframes marquee': {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#ff5722 !important',
  color: '#fff !important',
});

const AdvertisementSection = () => {
  return (
    <>
      <Container>
        <MainSection>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            FREEDOM RIDE
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your personal electric bike with insurance from €88/month.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StyledButton variant="contained">Shop Bikes</StyledButton>
            <Button variant="text">Learn More</Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2">[Placeholder for Bike Image]</Typography>
          </Box>
        </MainSection>
        <SideSection>
          <CardHelmet>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              PRO CYCLIST HELMET
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enjoy 40% off everything!
            </Typography>
            <StyledButton variant="contained">Shop Now</StyledButton>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">[Placeholder for Helmet Image]</Typography>
            </Box>
          </CardHelmet>
          <CardGloves>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              CITY SPRINT GRIPWEAR
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Experience ultimate comfort and control
            </Typography>
            <StyledButton variant="contained">Shop Now</StyledButton>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">[Placeholder for Gloves Image]</Typography>
            </Box>
          </CardGloves>
        </SideSection>
      </Container>
      <MarqueeContainer>
        <Marquee>
          <span>SPECIAL DISCOUNT </span>
          <span>SHIPPING THROUGH ALL EUROPE</span>
          <span>EXPERT ADVICE</span>
          <span>RETURNS EXTEND OVER A PERIOD OF 14 DAYS</span>
          <span>CHECK OUT TRENDY E-BIKES</span>
          <span>EXPLORE OUR LATEST MOUNTAIN BIKES</span>
        </Marquee>
      </MarqueeContainer>
    </>
  );
};

export default AdvertisementSection;