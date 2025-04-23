import React from 'react';
import { Grid, Box, Typography, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KpiCard from './KpiCard';
import DonutChartComponent from '../charts/DonutChartComponent';
import LineChartComponent from '../charts/LineChartComponent';
import BarChartComponent from '../charts/BarChartComponent';

/**
 * In Transit Section component
 *
 * @param {Object} props - Component props
 * @param {Object} props.data - In Transit KPI data
 * @param {Function} props.onKPIClick - Function to handle KPI click
 * @returns {JSX.Element}
 */
const InTransitSection = ({ data, onKPIClick }) => {
  if (!data) return null;

  const { ftl, ptl } = data;
  const activeData = ftl; // Use FTL data by default, can be changed based on toggle

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F8F9', borderRadius: '12px', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#434F64' }}>
          In Transit
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Delivered vs In-Transit Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.deliveredVsInTransit.name}
                </Typography>
                <Tooltip title="Split of delivered vs in-transit trips">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.deliveredVsInTransit.id, activeData.deliveredVsInTransit)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ height: '250px' }}>
              <DonutChartComponent
                data={activeData.deliveredVsInTransit.chartData}
                innerRadius={60}
                outerRadius={80}
                showLabel={true}
                height="100%"
                centerLabel={{
                  title: "Delivered",
                  value: `${activeData.deliveredVsInTransit.breakdown.delivered.percentage}%`,
                  subtitle: ""
                }}
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* Trip Delay Flag Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.tripDelayFlag.name}
                </Typography>
                <Tooltip title="Percentage of trips with SLA breach">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.tripDelayFlag.id, activeData.tripDelayFlag)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {activeData.tripDelayFlag.value}{activeData.tripDelayFlag.unit}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#4CAF50' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    -{activeData.tripDelayFlag.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              DELAY BREAKDOWN
            </Typography>

            <Box sx={{ height: '150px' }}>
              <BarChartComponent
                data={activeData.tripDelayFlag.delayBreakdown}
                dataKey="value"
                xAxisKey="category"
                color="#FF3533"
                showGrid={false}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>

        {/* ETA Accuracy Card */}
        <Grid item xs={12} md={4}>
          <KpiCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {activeData.etaAccuracy.name}
                </Typography>
                <Tooltip title="Accuracy of estimated time of arrival">
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            action={
              <IconButton size="small" onClick={() => onKPIClick && onKPIClick(activeData.etaAccuracy.id, activeData.etaAccuracy)}>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            }
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {activeData.etaAccuracy.value}{activeData.etaAccuracy.unit}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#4CAF50' }}>
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    +{activeData.etaAccuracy.trendValue}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              ACCURACY TREND
            </Typography>

            <Box sx={{ height: '150px' }}>
              <LineChartComponent
                data={activeData.etaAccuracy.accuracyTrend}
                lines={[{ dataKey: 'value', color: '#4CAF50', strokeWidth: 2 }]}
                xAxisKey="date"
                showGrid={true}
                height="100%"
              />
            </Box>
          </KpiCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InTransitSection;
