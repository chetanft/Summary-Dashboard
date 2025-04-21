import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';

/**
 * Placeholder page component for routes that don't have dedicated components yet
 * This component displays the current route and provides a back button
 */
const PlaceholderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  
  // Convert path to title (e.g., "/my-indents" -> "My Indents")
  const getPageTitle = (path) => {
    const pathWithoutSlash = path.startsWith('/') ? path.substring(1) : path;
    return pathWithoutSlash
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            border: '1px solid #E0E4E8',
            borderRadius: '8px',
            maxWidth: '800px',
            mx: 'auto',
            mt: 4
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: '#434F64' }}>
            {getPageTitle(path)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#5F697B' }}>
            This page is under development. The functionality for {getPageTitle(path)} will be available soon.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate(-1)}
            sx={{ 
              backgroundColor: '#434F64',
              '&:hover': {
                backgroundColor: '#323C4D',
              }
            }}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default PlaceholderPage;
