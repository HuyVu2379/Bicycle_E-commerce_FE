import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SalesChart from './SalesChart';
import MonthlyStatistics from './MonthlyStatistics';
import StatCard from './StatCard';
import { salesData, monthlyStats } from './data';

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
}));

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('monthly');

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* Total Sales Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">Total sales</Typography>
              <ToggleButtonGroup
                size="small"
                value={timeRange}
                exclusive
                onChange={handleTimeRangeChange}
                aria-label="time range"
              >
                <ToggleButton value="7days" aria-label="7 days">
                  7 Days
                </ToggleButton>
                <ToggleButton 
                  value="monthly" 
                  aria-label="monthly"
                  sx={{ 
                    bgcolor: timeRange === 'monthly' ? 'warning.main' : 'inherit',
                    color: timeRange === 'monthly' ? 'white' : 'inherit',
                    '&.Mui-selected': {
                      bgcolor: 'warning.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'warning.dark',
                      }
                    }
                  }}
                >
                  Monthly
                </ToggleButton>
                <ToggleButton value="yearly" aria-label="yearly">
                  Yearly
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <SalesChart data={salesData} />
          </StyledPaper>
        </Grid>

        {/* Monthly Statistics */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">Monthly Statistics</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'warning.main', mr: 1 }}></Box>
                  <Typography variant="body2">Profit</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', mr: 1 }}></Box>
                  <Typography variant="body2">Revenue</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main', mr: 1 }}></Box>
                  <Typography variant="body2">Expenses</Typography>
                </Box>
              </Box>
            </Box>
            <MonthlyStatistics data={monthlyStats} />
          </StyledPaper>
        </Grid>

        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard 
              title="Online Orders" 
              value="116,490,340" 
              progress={60} 
              color="#FFD700" 
              trend="up" 
              trendValue="8.5%"
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard 
              title="Revenue Order" 
              value="1,195,345,345" 
              progress={60} 
              color="#4CAF50" 
              trend="up" 
              trendValue="12.3%"
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard 
              title="Share" 
              value="share.vn" 
              progress={60} 
              color="#2196F3" 
              showProgress={false}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledPaper>
            <StatCard 
              title="Another Stat" 
              value="60/100" 
              progress={60} 
              color="#9C27B0" 
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
