import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';

const RoleSelector = ({ currentRole, onRoleChange, availableRoles }) => {
  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      onRoleChange(newRole);
    }
  };

  // Role icons
  const roleIcons = {
    CXO: <SupervisorAccountIcon />,
    Company: <BusinessIcon />,
    Branch: <StoreIcon />
  };

  // Role descriptions
  const roleDescriptions = {
    CXO: 'Pan-India view (macro ops status)',
    Company: 'All branches under the company',
    Branch: 'Only assigned branch operations'
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        View As:
      </Typography>
      <ToggleButtonGroup
        value={currentRole}
        exclusive
        onChange={handleRoleChange}
        aria-label="user role"
        sx={{ mb: 1 }}
      >
        {availableRoles.map(role => (
          <ToggleButton 
            key={role} 
            value={role}
            aria-label={role}
            sx={{ 
              px: 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: '#E3F2FD',
                color: '#1976d2',
                '&:hover': {
                  backgroundColor: '#BBDEFB'
                }
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>
                {roleIcons[role]}
              </Box>
              {role}
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      
      <Typography variant="caption" color="textSecondary">
        {roleDescriptions[currentRole]}
      </Typography>
    </Box>
  );
};

export default RoleSelector;
