import React from 'react';
import { Box, Skeleton, Paper, Divider } from '@mui/material';

/**
 * Skeleton Journey Details component
 * Displays a loading skeleton for the journey details page
 * 
 * @returns {JSX.Element}
 */
const SkeletonJourneyDetails = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header Skeleton */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, height: '64px' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={180} height={32} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
      </Box>
      
      {/* Overview Panel Skeleton */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.light',
          mb: 3
        }}
      >
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 3, md: 4, lg: 6 }
          }}
        >
          {/* Shipper Skeleton */}
          <Box>
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="rectangular" width={60} height={24} />
            </Box>
          </Box>
          
          {/* Trip Start Skeleton */}
          <Box>
            <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={150} height={24} />
          </Box>
          
          {/* Transit Time Skeleton */}
          <Box>
            <Skeleton variant="text" width={140} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={180} height={24} />
          </Box>
          
          {/* Total Distance Skeleton */}
          <Box>
            <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={80} height={24} />
          </Box>
        </Box>
      </Paper>
      
      {/* Route Details Skeleton */}
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Skeleton variant="text" width={120} height={32} sx={{ mb: 2 }} />
        
        {/* Tabs Skeleton */}
        <Box 
          sx={{ 
            display: 'flex',
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb: 3
          }}
        >
          <Skeleton variant="rectangular" width={100} height={48} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width={100} height={48} sx={{ mr: 2 }} />
          <Skeleton variant="rectangular" width={120} height={48} />
        </Box>
        
        {/* Table Skeleton */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: '8px',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            mb: 3
          }}
        >
          {/* Table Header */}
          <Box 
            sx={{ 
              display: 'flex',
              p: 2,
              backgroundColor: 'background.light'
            }}
          >
            <Skeleton variant="text" width={100} height={24} sx={{ mr: 4 }} />
            <Skeleton variant="text" width={120} height={24} sx={{ mr: 4 }} />
            <Skeleton variant="text" width={80} height={24} />
          </Box>
          
          <Divider />
          
          {/* Table Rows */}
          {[1, 2, 3].map((item) => (
            <React.Fragment key={item}>
              <Box 
                sx={{ 
                  display: 'flex',
                  p: 2,
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Skeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
                  <Box>
                    <Skeleton variant="text" width={150} height={24} />
                    <Skeleton variant="text" width={100} height={20} />
                  </Box>
                </Box>
                
                <Box sx={{ width: '150px', mx: 2 }}>
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={80} height={20} />
                </Box>
                
                <Box sx={{ width: '100px' }}>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={60} height={20} />
                </Box>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </Paper>
      </Box>
      
      {/* Map Skeleton */}
      <Box sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 3, md: 4 } }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={320}
          sx={{ borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
};

export default SkeletonJourneyDetails;
