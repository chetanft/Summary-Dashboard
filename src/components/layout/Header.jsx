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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Rocket as RocketIcon,
  AccountCircle,
} from '@mui/icons-material';
import NavigationMenu from '../common/NavigationMenu';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const Header = ({ onRefresh }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <Box
      sx={{
        width: '100%',
        height: '78px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 20px',
        backgroundColor: '#F8F8F9',
        borderBottom: '1px solid #CED1D7',
      }}
    >
      {/* Left side - Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Box
          sx={{
            width: '53px',
            height: '53px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '100px',
          }}
        >
          <MenuIcon sx={{ color: '#434F64' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            component="img"
            src={freightTigerLogo}
            alt="Freight Tiger Logo"
            sx={{ height: '28px' }}
          />
        </Box>
      </Box>

      {/* Center - Navigation */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <NavigationMenu />
      </Box>

      {/* Right side - Notifications and User */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <IconButton aria-label="quick actions">
            <RocketIcon sx={{ color: '#434F64' }} />
          </IconButton>
          <IconButton aria-label="notifications">
            <NotificationsIcon sx={{ color: '#434F64' }} />
          </IconButton>
        </Box>

        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            padding: '5px 20px',
            height: '51px',
            width: '229px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#434F64' }}>
              {currentUser?.name || 'TATA MOTORS'}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ color: '#434F64' }} />
          </IconButton>
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
          >
            <MenuItem disabled>{currentUser?.name}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Paper>
      </Box>
    </Box>
  );
};

export default Header;
