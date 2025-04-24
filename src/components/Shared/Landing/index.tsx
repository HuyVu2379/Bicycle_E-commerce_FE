import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  padding: '32px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const SplitSection = styled(Box)({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
});

const ImageSection = styled(Box)({
  flex: 1,
  backgroundColor: '#e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
});

const TextSection = styled(Box)({
  flex: 1,
  padding: '16px',
});

const FeatureCard = styled(Box)({
  backgroundColor: '#d4ed91',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const MarqueeContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '8px 0',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'relative',
  marginTop: 'auto',
});

const Marquee = styled(Box)({
  display: 'inline-block',
  animation: 'marquee 15s linear infinite',
  '& span': {
    margin: '0 32px',
    fontSize: '16px',
    fontWeight: 'bold',
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

const LandingSection = () => {
  return (
    <Container>
      <SplitSection>
        <ImageSection>
          <Typography variant="body1">[Placeholder for Cyclist Image]</Typography>
        </ImageSection>
        <TextSection>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#424242' }}>
            Advancing Electric Biking with Innovation, Performance, and Sustainability.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            At Eura, we revolutionized electric scooters, and now we’re doing the same for electric bikes. Our innovative designs combine cutting-edge technology with unmatched performance, offering a seamless and exhilarating ride for every cyclist. Join us on the electrifying journey.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StyledButton variant="contained">Shop Bikes</StyledButton>
            <Button variant="text" sx={{ color: '#666' }}>Learn More</Button>
          </Box>
        </TextSection>
      </SplitSection>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography variant="body1" sx={{ fontSize: '24px' }}>
              🚲
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Lifetime warranty on all bikes.
            </Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography variant="body1" sx={{ fontSize: '24px' }}>
              🚚
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Free ground shipping and easy returns.
            </Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography variant="body1" sx={{ fontSize: '24px' }}>
              🖥️
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Designed, engineered & assembled in the USA
            </Typography>
          </FeatureCard>
        </Grid>
      </Grid>
      <MarqueeContainer>
        <Marquee>
          <span>ICEBERG</span>
          <span>SITEMARK</span>
          <span>LEAFE</span>
          <span>UMBRELLA</span>
          <span>SNAPSHOT</span>
          <span>UNSPLASH</span>
        </Marquee>
      </MarqueeContainer>
    </Container>
  );
};

export default LandingSection;