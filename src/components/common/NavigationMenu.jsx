// src/components/common/NavigationMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Warehouse as WarehouseIcon
} from '@mui/icons-material';

const NavigationMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        id="operations-button"
        aria-controls={open ? 'operations-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<WarehouseIcon />}
        sx={{ color: '#434F64' }}
      >
        Operations
      </Button>
      <Menu
        id="operations-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'operations-button',
        }}
      >
        <MenuItem onClick={() => handleNavigation('/operations/plant-yard')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShippingIcon fontSize="small" />
            <Typography>Plant & Yard Operations</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/dashboard')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DashboardIcon fontSize="small" />
            <Typography>Dashboard</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/orders')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon fontSize="small" />
            <Typography>Orders</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavigationMenu;
