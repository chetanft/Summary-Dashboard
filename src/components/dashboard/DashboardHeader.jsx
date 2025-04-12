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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
        {/* Search Box */}
        <Paper
          component="form"
          sx={{
            p: '2px 12px',
            display: 'flex',
            alignItems: 'center',
            width: '233px',
            height: '40px',
            border: '1px solid #CED1D7',
            borderRadius: '8px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box
              component="svg"
              sx={{ width: 16, height: 16 }}
              viewBox="0 0 24 24"
              fill="#838C9D"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </Box>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#838C9D',
              }}
            >
              Search...
            </Typography>
          </Box>
        </Paper>

        {/* Toggle Button Group */}
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '8px 9px',
            gap: '4px',
            width: '301px',
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
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
