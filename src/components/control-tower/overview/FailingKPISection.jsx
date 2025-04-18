import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Tooltip
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

const FailingKPISection = ({ title, kpis }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion 
      expanded={expanded} 
      onChange={handleChange}
      sx={{ 
        mb: 3, 
        boxShadow: 'none',
        border: '1px solid #E0E0E0',
        borderRadius: '8px !important',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          backgroundColor: '#F8F9FA',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#FF4D4F' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {kpis.map((kpi, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  height: '100%',
                  border: '1px solid #E0E0E0',
                  backgroundColor: '#FFF9F9',
                }}
              >
                <Tooltip title={kpi.title} arrow>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500, 
                      mb: 1, 
                      color: '#5F697B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {kpi.title}
                  </Typography>
                </Tooltip>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: kpi.value > 10 ? '#FF4D4F' : '#434F64',
                      mr: 1 
                    }}
                  >
                    {kpi.value}%
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {kpi.trend >= 0 ? (
                      <ArrowUpwardIcon sx={{ fontSize: 16, color: '#FF4D4F' }} />
                    ) : (
                      <ArrowDownwardIcon sx={{ fontSize: 16, color: '#52C41A' }} />
                    )}
                    <Typography variant="body2" sx={{ color: kpi.trend >= 0 ? '#FF4D4F' : '#52C41A' }}>
                      {Math.abs(kpi.trend)}%
                    </Typography>
                  </Box>
                </Box>
                
                <Tooltip title={kpi.description} arrow>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#5F697B',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {kpi.description}
                  </Typography>
                </Tooltip>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FailingKPISection;
