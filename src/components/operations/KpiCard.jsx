import React from 'react';
import { Box, Paper } from '@mui/material';

/**
 * KPI Card component for displaying KPI data in a card format
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.title - Card title
 * @param {React.ReactNode} props.action - Action component (e.g., drill-down button)
 * @param {React.ReactNode} props.children - Card content
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element}
 */
const KpiCard = ({ title, action, children, sx = {} }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {title}
        {action}
      </Box>
      
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default KpiCard;
