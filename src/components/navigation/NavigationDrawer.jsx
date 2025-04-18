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
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  LocalShipping as LocalShippingIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Inventory as InventoryIcon,
  ViewQuilt as ViewQuiltIcon,
  Apartment as ApartmentIcon,
  Speed as SpeedIcon,
  SupportAgent as SupportAgentIcon,
} from '@mui/icons-material';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const NavigationDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items with icons and paths
  const navigationItems = [
    {
      title: 'Summary Page',
      icon: <DashboardIcon />,
      path: '/dashboard',
      active: location.pathname === '/dashboard',
    },
    {
      title: 'Planning',
      icon: <AssignmentIcon />,
      path: '/planning',
      active: location.pathname === '/planning',
    },
    {
      title: 'Full Truck Load',
      icon: <LocalShippingIcon />,
      path: '/ftl',
      active: location.pathname === '/ftl',
    },
    {
      title: 'Part Truck Load',
      icon: <InventoryIcon />,
      path: '/ptl',
      active: location.pathname === '/ptl',
    },
    {
      title: 'Control Tower',
      icon: <ApartmentIcon />,
      path: '/control-tower',
      active: location.pathname === '/control-tower',
    },
    {
      title: 'Dashboard',
      icon: <ViewQuiltIcon />,
      path: '/dashboard',
      active: location.pathname === '/dashboard',
    },
    {
      title: 'Reporting',
      icon: <BarChartIcon />,
      path: '/reporting',
      active: location.pathname === '/reporting',
    },
    {
      title: 'Support',
      icon: <SupportAgentIcon />,
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
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
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
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 1 }}>
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={item.active}
              sx={{
                py: 1.5,
                pl: 3,
                '&.Mui-selected': {
                  backgroundColor: '#F0F7FF',
                  borderLeft: '4px solid #1976d2',
                  pl: 2.5,
                },
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? '#1976d2' : '#5F697B',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: item.active ? 600 : 500,
                      color: item.active ? '#1976d2' : '#434F64',
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

      <Divider sx={{ my: 2 }} />

      {/* Footer Items */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/settings')}
            sx={{ py: 1.5, pl: 3 }}
          >
            <ListItemIcon sx={{ color: '#5F697B', minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#434F64' }}>
                  Settings
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/help')}
            sx={{ py: 1.5, pl: 3 }}
          >
            <ListItemIcon sx={{ color: '#5F697B', minWidth: 40 }}>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#434F64' }}>
                  Help & Support
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Get Started Button */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 2,
            backgroundColor: '#F8F9FA',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2' }}>
            Get Started
          </Typography>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              ml: 1,
              color: '#1976d2',
            }}
          >
            →
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
