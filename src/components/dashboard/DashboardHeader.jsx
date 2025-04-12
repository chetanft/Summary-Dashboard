import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';

const DashboardHeader = ({ title, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    onTabChange(tab);
    if (tab === 'summary') {
      navigate('/dashboard');
    } else if (tab === 'orderData') {
      navigate('/orders');
    } else if (tab === 'alerts') {
      navigate('/alerts');
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        width: '100%',
        height: '48px',
      }}
    >
      {/* Title with Icon */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
        <Box sx={{ width: '28px', height: '28px', position: 'relative' }}>
          <DashboardIcon sx={{ color: '#434F64', fontSize: '28px' }} />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '140%',
            color: '#434F64',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Toggle Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        {/* Toggle Button Group */}
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '8px 9px',
            gap: '4px',
            width: '450px',
            height: '48px',
            backgroundColor: '#F8F8F9',
            borderRadius: '8px',
          }}
        >
          <Box
            onClick={() => handleTabChange('summary')}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 12px',
              gap: '4px',
              height: '32px',
              flex: 1,
              backgroundColor: activeTab === 'summary' ? '#FFFFFF' : '#F8F8F9',
              boxShadow: activeTab === 'summary' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeTab === 'summary' ? 600 : 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: activeTab === 'summary' ? '#434F64' : '#5F697B',
              }}
            >
              Summary
            </Typography>
          </Box>
          <Box
            onClick={() => handleTabChange('orderData')}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 12px',
              gap: '4px',
              height: '32px',
              flex: 1,
              backgroundColor: activeTab === 'orderData' ? '#FFFFFF' : '#F8F8F9',
              boxShadow: activeTab === 'orderData' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeTab === 'orderData' ? 600 : 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: activeTab === 'orderData' ? '#434F64' : '#5F697B',
              }}
            >
              Order Data
            </Typography>
          </Box>
          <Box
            onClick={() => handleTabChange('alerts')}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 12px',
              gap: '4px',
              height: '32px',
              flex: 1,
              backgroundColor: activeTab === 'alerts' ? '#FFFFFF' : '#F8F8F9',
              boxShadow: activeTab === 'alerts' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeTab === 'alerts' ? 600 : 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: activeTab === 'alerts' ? '#434F64' : '#5F697B',
              }}
            >
              Alerts
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
