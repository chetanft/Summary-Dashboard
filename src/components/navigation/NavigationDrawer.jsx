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
  Grid,
} from '@mui/material';
import Icon from '../common/Icon';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const NavigationDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Main navigation items with icons and paths
  const mainNavigationItems = [
    {
      title: 'Summary Page',
      icon: 'Circle',
      path: '/dashboard',
      active: location.pathname === '/dashboard' || location.pathname === '/',
    },
    {
      title: 'Planning',
      icon: 'Calendar',
      path: '/planning',
      active: location.pathname === '/planning',
    },
    {
      title: 'Full Truck Load',
      icon: 'Truck',
      path: '/ftl',
      active: location.pathname === '/ftl',
    },
    {
      title: 'Part Truck Load',
      icon: 'PackageOpen',
      path: '/ptl',
      active: location.pathname === '/ptl',
    },
    {
      title: 'Control Tower',
      icon: 'LayoutGrid',
      path: '/control-tower',
      active: location.pathname === '/control-tower',
    },
    {
      title: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard-view',
      active: location.pathname === '/dashboard-view',
    },
    {
      title: 'Reporting',
      icon: 'FileText',
      path: '/reporting',
      active: location.pathname === '/reporting',
    },
    {
      title: 'Support',
      icon: 'LifeBuoy',
      path: '/support',
      active: location.pathname === '/support',
    },
    {
      title: 'Color System',
      icon: 'Palette',
      path: '/color-system',
      active: location.pathname === '/color-system',
    },
  ];

  // Indent section items
  const indentItems = [
    {
      title: 'My Indents',
      icon: 'Circle',
      path: '/my-indents',
      active: location.pathname === '/my-indents',
    },
    {
      title: 'Assigned Vehicles',
      icon: 'Car',
      path: '/assigned-vehicles',
      active: location.pathname === '/assigned-vehicles',
    },
  ];

  // Tracking section items
  const trackingItems = [
    {
      title: 'My Journeys',
      icon: 'Circle',
      path: '/my-journeys',
      active: location.pathname === '/my-journeys',
    },
    {
      title: 'Live View',
      icon: 'Eye',
      path: '/live-view',
      active: location.pathname === '/live-view',
    },
    {
      title: 'Yard Management',
      icon: 'Store',
      path: '/yard-management',
      active: location.pathname === '/yard-management',
    },
    {
      title: 'ePOD',
      icon: 'Receipt',
      path: '/epod',
      active: location.pathname === '/epod',
    },
    {
      title: 'Dedicated Vehicles',
      icon: 'Car',
      path: '/dedicated-vehicles',
      active: location.pathname === '/dedicated-vehicles',
    },
    {
      title: 'History',
      icon: 'History',
      path: '/history',
      active: location.pathname === '/history',
    },
  ];

  // Freight Audit section items
  const freightAuditItems = [
    {
      title: 'Freight Bill',
      icon: 'Circle',
      path: '/freight-bill',
      active: location.pathname === '/freight-bill',
    },
    {
      title: 'Reconciliation',
      icon: 'DollarSign',
      path: '/reconciliation',
      active: location.pathname === '/reconciliation',
    },
    {
      title: 'Dispute Management',
      icon: 'Scale',
      path: '/dispute-management',
      active: location.pathname === '/dispute-management',
    },
    {
      title: 'Contracts',
      icon: 'FileText',
      path: '/contracts',
      active: location.pathname === '/contracts',
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
          width: 1000,
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
            alt="FREIGHT TIGER"
            sx={{ height: 28 }}
          />
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#000' }}>
          <Icon name="X" size={20} />
        </IconButton>
      </Box>

      {/* Navigation Content */}
      <Box sx={{ display: 'flex', height: 'calc(100% - 60px)' }}>
        {/* Left sidebar with main navigation */}
        <Box
          sx={{
            width: 270,
            borderRight: '1px solid #E0E0E0',
            pt: 2,
            px: 2,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <List sx={{ pt: 0 }}>
            {mainNavigationItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={item.active}
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: '8px',
                    '&.Mui-selected': {
                      backgroundColor: '#F1F3F5',
                    },
                    '&:hover': {
                      backgroundColor: '#F5F5F5',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: item.active ? '#434F64' : '#8A94A6',
                      minWidth: 32,
                    }}
                  >
                    <Icon name={item.icon} size={18} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: item.active ? 600 : 400,
                          color: item.active ? '#434F64' : '#5F697B',
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
        </Box>

        {/* Right content with categorized navigation */}
        <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Grid container spacing={4}>
            {/* Indent Section */}
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#434F64',
                  mb: 2,
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                INDENT
              </Typography>
              <List sx={{ pt: 0 }}>
                {indentItems.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      selected={item.active}
                      sx={{
                        py: 1,
                        px: 0,
                        '&.Mui-selected': {
                          backgroundColor: 'transparent',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: item.active ? '#434F64' : '#8A94A6',
                          minWidth: 32,
                        }}
                      >
                        <Icon name={item.icon} size={18} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: item.active ? 600 : 400,
                              color: item.active ? '#434F64' : '#5F697B',
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
            </Grid>

            {/* Tracking Section */}
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#434F64',
                  mb: 2,
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                TRACKING
              </Typography>
              <List sx={{ pt: 0 }}>
                {trackingItems.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      selected={item.active}
                      sx={{
                        py: 1,
                        px: 0,
                        '&.Mui-selected': {
                          backgroundColor: 'transparent',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: item.active ? '#434F64' : '#8A94A6',
                          minWidth: 32,
                        }}
                      >
                        <Icon name={item.icon} size={18} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: item.active ? 600 : 400,
                              color: item.active ? '#434F64' : '#5F697B',
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
            </Grid>

            {/* Freight Audit Section */}
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#434F64',
                  mb: 2,
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                FREIGHT AUDIT
              </Typography>
              <List sx={{ pt: 0 }}>
                {freightAuditItems.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      selected={item.active}
                      sx={{
                        py: 1,
                        px: 0,
                        '&.Mui-selected': {
                          backgroundColor: 'transparent',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: item.active ? '#434F64' : '#8A94A6',
                          minWidth: 32,
                        }}
                      >
                        <Icon name={item.icon} size={18} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: item.active ? 600 : 400,
                              color: item.active ? '#434F64' : '#5F697B',
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
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Get Started Button */}
      <Box sx={{ p: 2, borderTop: '1px solid #E0E0E0', textAlign: 'right' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 1,
            cursor: 'pointer',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#434F64', mr: 1 }}>
            Get Started
          </Typography>
          <Icon name="ArrowRight" color="#434F64" size={18} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
