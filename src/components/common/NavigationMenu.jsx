// src/components/common/NavigationMenu.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Popover,
  Divider,
  Button as MuiButton,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  LocalShipping as LocalShippingIcon,
  Warehouse as WarehouseIcon,
  Support as SupportIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  ListAlt as ListAltIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import FreightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const NAV_ITEMS = [
  {
    label: 'Summary Page',
    icon: <DashboardIcon />, path: '/dashboard',
    popover: {
      columns: [
        { title: 'Indent', items: [ {label: 'My Indents', path: '/indents'}, {label: 'Assigned Vehicles', path: '/assigned-vehicles'} ] },
        { title: 'Tracking', items: [ {label: 'My Journeys', path: '/journeys'}, {label: 'Live View', path: '/live-view'}, {label: 'Yard Management', path: '/yard-management'}, {label: 'ePOD', path: '/epod'}, {label: 'Dedicated Vehicles', path: '/dedicated-vehicles'}, {label: 'History', path: '/history'} ] },
        { title: 'Freight Audit', items: [ {label: 'Freight Bill', path: '/freight-bill'}, {label: 'Reconciliation', path: '/reconciliation'}, {label: 'Dispute Management', path: '/dispute-management'}, {label: 'Contracts', path: '/contracts'} ] }
      ]
    }
  },
  { label: 'Planning', icon: <AssignmentIcon />, path: '/planning', popover: { columns: [ { title: 'Planning', items: [ {label: 'Plan A', path: '/planning/a'}, {label: 'Plan B', path: '/planning/b'} ] }, { title: 'Resources', items: [ {label: 'Resource 1', path: '/planning/resource1'} ] }, { title: 'More', items: [ {label: 'Extra', path: '/planning/extra'} ] } ] } },
  { label: 'Full Truck Load', icon: <LocalShippingIcon />, path: '/full-truck-load', popover: { columns: [ { title: 'FTL', items: [ {label: 'My Indents', path: '/ftl/indents'}, {label: 'Assigned Vehicles', path: '/ftl/assigned-vehicles'} ] }, { title: 'Tracking', items: [ {label: 'My Journeys', path: '/ftl/journeys'}, {label: 'Live View', path: '/ftl/live-view'} ] }, { title: 'Audit', items: [ {label: 'Freight Bill', path: '/ftl/freight-bill'} ] } ] } },
  { label: 'Part Truck Load', icon: <ListAltIcon />, path: '/part-truck-load', popover: { columns: [ { title: 'PTL', items: [ {label: 'My Indents', path: '/ptl/indents'} ] }, { title: 'Tracking', items: [ {label: 'My Journeys', path: '/ptl/journeys'} ] }, { title: 'Audit', items: [ {label: 'Freight Bill', path: '/ptl/freight-bill'} ] } ] } },
  { label: 'Control Tower', icon: <WarehouseIcon />, path: '/control-tower', popover: { columns: [ { title: 'Tower', items: [ {label: 'Overview', path: '/tower/overview'} ] }, { title: 'Tracking', items: [ {label: 'Live', path: '/tower/live'} ] }, { title: 'Audit', items: [ {label: 'Reports', path: '/tower/reports'} ] } ] } },
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', popover: { columns: [ { title: 'Main', items: [ {label: 'Overview', path: '/dashboard/overview'} ] }, { title: 'KPIs', items: [ {label: 'KPI 1', path: '/dashboard/kpi1'} ] }, { title: 'Reports', items: [ {label: 'Monthly', path: '/dashboard/monthly'} ] } ] } },
  { label: 'Reporting', icon: <AssessmentIcon />, path: '/reporting', popover: { columns: [ { title: 'Reports', items: [ {label: 'Report 1', path: '/reporting/1'} ] }, { title: 'Exports', items: [ {label: 'Export 1', path: '/reporting/export1'} ] }, { title: 'Archive', items: [ {label: 'Old Reports', path: '/reporting/archive'} ] } ] } },
  { label: 'Support', icon: <SupportIcon />, path: '/support', popover: { columns: [ { title: 'Help', items: [ {label: 'FAQ', path: '/support/faq'} ] }, { title: 'Contact', items: [ {label: 'Contact Us', path: '/support/contact'} ] }, { title: 'Docs', items: [ {label: 'Documentation', path: '/support/docs'} ] } ] } },
];

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [activePopoverIndex, setActivePopoverIndex] = useState(null);

  const handleMenuItemEnter = (event, idx) => {
    setPopoverAnchor(event.currentTarget);
    setActivePopoverIndex(idx);
  };
  const handleMenuItemLeave = () => {
    setPopoverAnchor(null);
    setActivePopoverIndex(null);
  };
  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setActivePopoverIndex(null);
  };
  const handleNavigation = (path) => {
    navigate(path);
    handlePopoverClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#fff', borderRight: '1px solid #E0E0E0', minWidth: 260 }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3, py: 3, mb: 2 }}>
        <img src={FreightTigerLogo} alt="Freight Tiger" style={{ height: 32, marginRight: 10 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#222' }}>FREIGHT TIGER</Typography>
      </Box>
      <Divider />
      {/* Main Navigation List */}
      <List sx={{ flexGrow: 1, py: 2 }}>
        {NAV_ITEMS.map((item, idx) => (
          <ListItem
            button
            key={item.label}
            selected={location.pathname.startsWith(item.path)}
            onMouseEnter={(e) => handleMenuItemEnter(e, idx)}
            onMouseLeave={handleMenuItemLeave}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mb: 0.5,
              borderRadius: 2,
              bgcolor: location.pathname.startsWith(item.path) ? '#F5F7FA' : 'transparent',
              '&:hover': { bgcolor: '#F5F7FA' },
              px: 3
            }}
          >
            <ListItemIcon sx={{ color: '#434F64', minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={<Typography sx={{ fontWeight: 500, color: '#222' }}>{item.label}</Typography>} />
          </ListItem>
        ))}
      </List>
      {/* Popover for sub-navigation */}
      <Popover
        open={Boolean(popoverAnchor) && activePopoverIndex !== null}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        PaperProps={{ sx: { minWidth: 700, borderRadius: 3, p: 4, boxShadow: 3 } }}
        disableRestoreFocus
      >
        {activePopoverIndex !== null && (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
            {NAV_ITEMS[activePopoverIndex].popover.columns.map((col, colIdx) => (
              <Box key={col.title + colIdx} sx={{ minWidth: 180 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#5F697B', mb: 2 }}>{col.title}</Typography>
                {col.items.map((sub, subIdx) => (
                  <MuiButton
                    key={sub.label + subIdx}
                    onClick={() => handleNavigation(sub.path)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      color: '#222',
                      textTransform: 'none',
                      mb: 1.5,
                      fontWeight: 400,
                      fontSize: 15
                    }}
                  >
                    {sub.label}
                  </MuiButton>
                ))}
              </Box>
            ))}
            {/* Get Started Button at bottom right */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', flexGrow: 1, alignItems: 'flex-end' }}>
              <MuiButton
                variant="text"
                endIcon={<MenuIcon />}
                sx={{ mt: 'auto', color: '#434F64', fontWeight: 600, fontSize: 16 }}
                onClick={() => handleNavigation('/get-started')}
              >
                Get Started
              </MuiButton>
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
};
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
