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
  Avatar,
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
      icon: 'LayoutDashboard',
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
      path: '/my-journeys',
      active: location.pathname === '/my-journeys' || location.pathname === '/journeys' || location.pathname.includes('/ftl'),
    },
    {
      title: 'Part Truck Load',
      icon: 'PackageOpen',
      path: '/orders',
      active: location.pathname === '/orders' || location.pathname.includes('/ptl'),
    },
    {
      title: 'Control Tower',
      icon: 'LayoutGrid',
      path: '/control-tower',
      active: location.pathname === '/control-tower',
    },
    {
      title: 'Dashboards',
      icon: 'BarChart2',
      path: '/dashboards',
      active: location.pathname === '/dashboards',
    },
    {
      title: 'Reports',
      icon: 'FileText',
      path: '/reports',
      active: location.pathname === '/reports',
    },
    {
      title: 'Support',
      icon: 'LifeBuoy',
      path: '/support',
      active: location.pathname === '/support',
    },
    {
      title: 'Components',
      icon: 'Palette',
      path: '/core-components',
      active: location.pathname === '/core-components' || location.pathname === '/icons',
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
      title: 'Add Indents',
      icon: 'Plus',
      path: '/add-indents',
      active: location.pathname === '/add-indents',
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
      path: '/journeys',
      active: location.pathname === '/journeys',
    },
    {
      title: 'Yard Management',
      icon: 'Store',
      path: '/plant-yard',
      active: location.pathname === '/plant-yard' || location.pathname === '/operations/plant-yard',
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

  // Freight Invoicing section items for FTL
  const ftlFreightInvoicingItems = [
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

  // PTL Order Booking items
  const ptlOrderBookingItems = [
    {
      title: 'Order Booking',
      icon: 'Circle',
      path: '/order-booking',
      active: location.pathname === '/order-booking',
    },
  ];

  // PTL Tracking items
  const ptlTrackingItems = [
    {
      title: 'My Shipments',
      icon: 'Circle',
      path: '/my-shipments',
      active: location.pathname === '/my-shipments',
    },
  ];

  // Freight Invoicing section items for PTL
  const ptlFreightInvoicingItems = [
    {
      title: 'Contracted Bill',
      icon: 'Circle',
      path: '/contracted-bill',
      active: location.pathname === '/contracted-bill',
    },
    {
      title: 'Reconciliation',
      icon: 'DollarSign',
      path: '/ptl-reconciliation',
      active: location.pathname === '/ptl-reconciliation',
    },
    {
      title: 'Dispute Management',
      icon: 'Scale',
      path: '/ptl-dispute-management',
      active: location.pathname === '/ptl-dispute-management',
    },
    {
      title: 'Contracts',
      icon: 'FileText',
      path: '/ptl-contracts',
      active: location.pathname === '/ptl-contracts',
    },
  ];

  // Control Tower section items
  const controlTowerItems = [
    {
      title: 'Control Tower',
      icon: 'Circle',
      path: '/control-tower',
      active: location.pathname === '/control-tower',
    },
    {
      title: 'Bidding Analytics',
      icon: 'TrendingUp',
      path: '/bidding-analytics',
      active: location.pathname === '/bidding-analytics',
    },
    {
      title: 'Indent Analytics',
      icon: 'BarChart',
      path: '/indent-analytics',
      active: location.pathname === '/indent-analytics',
    },
  ];

  // Dashboard Analytics items
  const dashboardItems = [
    {
      title: 'Journey Analytics',
      icon: 'Circle',
      path: '/journey-analytics',
      active: location.pathname === '/journey-analytics',
    },
    {
      title: 'ePOD Analytics',
      icon: 'FileCheck',
      path: '/epod-analytics',
      active: location.pathname === '/epod-analytics',
    },
    {
      title: 'PTL Analytics',
      icon: 'PackageOpen',
      path: '/ptl-analytics',
      active: location.pathname === '/ptl-analytics',
    },
    {
      title: 'Freight Invoicng Analytics',
      icon: 'DollarSign',
      path: '/freight-invoicing-analytics',
      active: location.pathname === '/freight-invoicing-analytics',
    },
  ];

  // Reports items
  const reportItems = [
    {
      title: 'Report 1',
      icon: 'Circle',
      path: '/report-1',
      active: location.pathname === '/report-1',
    },
    {
      title: 'Report 2',
      icon: 'Circle',
      path: '/report-2',
      active: location.pathname === '/report-2',
    },
    {
      title: 'Report 3',
      icon: 'Circle',
      path: '/report-3',
      active: location.pathname === '/report-3',
    },
    {
      title: 'Report 4',
      icon: 'Circle',
      path: '/report-4',
      active: location.pathname === '/report-4',
    },
    {
      title: 'Report 5',
      icon: 'Circle',
      path: '/report-5',
      active: location.pathname === '/report-5',
    },
    {
      title: 'Report 6',
      icon: 'Circle',
      path: '/report-6',
      active: location.pathname === '/report-6',
    },
  ];

  // Support items
  const supportItems = [
    {
      title: 'Masters',
      icon: 'Circle',
      path: '/masters',
      active: location.pathname === '/masters',
    },
  ];

  // Component items
  const componentItems = [
    {
      title: 'Colors',
      icon: 'Circle',
      path: '/colors',
      active: location.pathname === '/colors',
    },
    {
      title: 'Typography',
      icon: 'Type',
      path: '/typography',
      active: location.pathname === '/typography',
    },
    {
      title: 'Button',
      icon: 'MousePointer',
      path: '/button',
      active: location.pathname === '/button',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  // Reusable function to render menu items
  const renderMenuItems = (items) => {
    return items.map((item, index) => (
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
    ));
  };

  // Reusable function to render section headers
  const renderSectionHeader = (title) => (
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
      {title}
    </Typography>
  );

  // Function to determine which submenu to show based on selected main item
  const getSubmenuContent = () => {
    // Find the active main navigation item
    const activeMainItem = mainNavigationItems.find(item => item.active);

    if (!activeMainItem) return null;

    switch (activeMainItem.title) {
      case 'Summary Page':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('SUMMARY PAGE')}
              <List sx={{ pt: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation('/dashboard')}
                    selected={location.pathname === '/dashboard'}
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
                        color: location.pathname === '/dashboard' ? '#434F64' : '#8A94A6',
                        minWidth: 32,
                      }}
                    >
                      <Icon name="Circle" size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: location.pathname === '/dashboard' ? 600 : 400,
                            color: location.pathname === '/dashboard' ? '#434F64' : '#5F697B',
                            fontSize: '14px',
                          }}
                        >
                          Summary Page
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        );
      case 'Planning':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('PLANNING')}
              <List sx={{ pt: 0 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation('/planning')}
                    selected={location.pathname === '/planning'}
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
                        color: location.pathname === '/planning' ? '#434F64' : '#8A94A6',
                        minWidth: 32,
                      }}
                    >
                      <Icon name="Circle" size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: location.pathname === '/planning' ? 600 : 400,
                            color: location.pathname === '/planning' ? '#434F64' : '#5F697B',
                            fontSize: '14px',
                          }}
                        >
                          Planning
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        );
      case 'Full Truck Load':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('INDENT')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(indentItems)}
              </List>
            </Grid>
            <Grid item xs={3}>
              {renderSectionHeader('TRACKING')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(trackingItems)}
              </List>
            </Grid>
            <Grid item xs={3}>
              {renderSectionHeader('FREIGHT INVOICING')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(ftlFreightInvoicingItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Part Truck Load':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('ORDER BOOKING')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(ptlOrderBookingItems)}
              </List>
            </Grid>
            <Grid item xs={3}>
              {renderSectionHeader('TRACKING')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(ptlTrackingItems)}
              </List>
            </Grid>
            <Grid item xs={3}>
              {renderSectionHeader('FREIGHT INVOICING')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(ptlFreightInvoicingItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Control Tower':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('CONTROL TOWER')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(controlTowerItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Dashboards':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('DASHBOARDS')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(dashboardItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Reports':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('REPORTS')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(reportItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Support':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('SUPPORT')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(supportItems)}
              </List>
            </Grid>
          </Grid>
        );
      case 'Components':
        return (
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {renderSectionHeader('COMPONENTS')}
              <List sx={{ pt: 0 }}>
                {renderMenuItems(componentItems)}
              </List>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
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
          {getSubmenuContent()}
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
