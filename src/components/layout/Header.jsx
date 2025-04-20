import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Divider,
  Avatar,
  Chip,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Icon from '../common/Icon';
import NavigationDrawer from '../navigation/NavigationDrawer';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const Header = ({ onRefresh }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Placeholder handlers for new menu items
  const handleViewProfile = () => {
    console.log('View Profile clicked');
    handleClose();
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    handleClose();
  };

  const handleChangeDesk = () => {
    console.log('Change Desk clicked');
    handleClose();
  };

  const handleChangePassword = () => {
    console.log('Change Password clicked');
    handleClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
    <Box
      sx={{
        width: '100%',
        height: '56px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E4E8',
      }}
    >
      {/* Left side - Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <IconButton
          sx={{
            padding: '8px',
          }}
          onClick={handleDrawerOpen}
        >
          <Icon name="Menu" color="#434F64" size={20} />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box
            component="img"
            src={freightTigerLogo}
            alt="Freight Tiger Logo"
            sx={{ height: '24px' }}
          />
        </Box>
      </Box>

      {/* Center - Empty space */}
      <Box sx={{ flex: 1 }} />

      {/* Right side - Notifications and User */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <IconButton aria-label="quick actions" size="small">
          <Icon name="Rocket" color="#434F64" size={20} />
        </IconButton>
        <IconButton aria-label="notifications" size="small">
          <Icon name="Bell" color="#434F64" size={20} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box
            component="img"
            src="/tata-motors-logo.png"
            alt="Tata Motors Logo"
            sx={{ height: '24px' }}
          />
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Icon name="UserCircle" color="#434F64" size={20} />
          </IconButton>
        </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                width: 320,
                overflow: 'visible',
                mt: 1.5,
                borderRadius: '12px',
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                },
              },
            }}
          >
            {/* User Profile Header */}
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {/* User Avatar */}
                <Avatar
                  src={currentUser?.avatar || '/static/images/avatar/1.jpg'}
                  alt={currentUser?.name || 'User'}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />

                {/* User Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: '#434F64' }}>
                      {currentUser?.name || 'Santosh Kumar'}
                    </Typography>
                    <Chip
                      label={currentUser?.role || 'Admin'}
                      size="small"
                      sx={{
                        bgcolor: '#F0F0F0',
                        color: '#434F64',
                        fontWeight: 500,
                        fontSize: '12px',
                        height: '24px',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#5F697B', mb: 0.5 }}>
                    {currentUser?.jobTitle || 'User'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5F697B' }}>
                    {currentUser?.company || 'Company'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Menu Items */}
            <MenuItem onClick={handleViewProfile}>
              <ListItemIcon>
                <Icon name="User" size={18} />
              </ListItemIcon>
              <ListItemText primary="View Profile" />
            </MenuItem>

            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <Icon name="Settings" size={18} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>

            <MenuItem onClick={handleChangeDesk}>
              <ListItemIcon>
                <Icon name="SwitchHorizontal" size={18} />
              </ListItemIcon>
              <ListItemText primary="Change Desk" />
            </MenuItem>

            <MenuItem onClick={handleChangePassword}>
              <ListItemIcon>
                <Icon name="Key" size={18} />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            {/* Logout Button */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: '#FF4D4F',
              }}
            >
              <ListItemIcon>
                <Icon name="LogOut" size={18} color="#FF4D4F" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Paper>
      </Box>
    </Box>

      {/* Navigation Drawer */}
      <NavigationDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

export default Header;
