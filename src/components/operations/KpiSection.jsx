import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * KPI Section component with sticky header
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {React.ReactNode} props.children - Section content
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element}
 */
const KpiSection = ({ title, children, sx = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #E0E0E0',
        ...sx
      }}
    >
      {/* Sticky Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: '#F8F8F9',
          borderBottom: '1px solid #E0E0E0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#434F64',
            fontSize: '18px',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default KpiSection;
