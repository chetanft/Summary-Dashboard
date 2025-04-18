import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const NavigationDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items with icons and paths
  const navigationItems = [
    {
      title: 'Summary Page',
      icon: <CircleIcon fontSize="small" />,
      path: '/dashboard',
      active: location.pathname === '/dashboard' || location.pathname === '/',
    },
    {
      title: 'Planning',
      icon: <CircleIcon fontSize="small" />,
      path: '/planning',
      active: location.pathname === '/planning',
    },
    {
      title: 'Full Truck Load',
      icon: <CircleIcon fontSize="small" />,
      path: '/ftl',
      active: location.pathname === '/ftl',
    },
    {
      title: 'Part Truck Load',
      icon: <CircleIcon fontSize="small" />,
      path: '/ptl',
      active: location.pathname === '/ptl',
    },
    {
      title: 'Control Tower',
      icon: <CircleIcon fontSize="small" />,
      path: '/control-tower',
      active: location.pathname === '/control-tower',
    },
    {
      title: 'Dashboard',
      icon: <CircleIcon fontSize="small" />,
      path: '/dashboard-view',
      active: location.pathname === '/dashboard-view',
    },
    {
      title: 'Reporting',
      icon: <CircleIcon fontSize="small" />,
      path: '/reporting',
      active: location.pathname === '/reporting',
    },
    {
      title: 'Support',
      icon: <CircleIcon fontSize="small" />,
      path: '/support',
      active: location.pathname === '/support',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Header with logo and close button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={freightTigerLogo}
            alt="Freight Tiger Logo"
            sx={{ height: 28 }}
          />
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#000' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 1, px: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={item.active}
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: '#EBF2FF',
                },
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? '#0066FF' : '#8A94A6',
                  minWidth: 32,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: item.active ? 600 : 400,
                      color: item.active ? '#0066FF' : '#434F64',
                      fontSize: '14px',
                    }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>



      {/* Get Started Button */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid #E0E0E0' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#434F64' }}>
            Get Started
          </Typography>
          <ArrowForwardIcon sx={{ color: '#434F64', fontSize: 18 }} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
