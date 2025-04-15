import React from 'react';
import { Box, Typography, Grid, Paper, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPIGroupContainer from '../realtime-kpis/KPIGroupContainer';
import StatTile from '../realtime-kpis/StatTile';

const FreightReconciliationKPI = ({ data, onKPIClick }) => {
  if (!data) return null;

  // Get individual KPIs
  const invoices = data.kpis.find(k => k.name === 'Invoices');
  const reconciliation = data.kpis.find(k => k.name === 'Reconciliation');

  // Prepare chart data for invoices
  const invoiceChartData = invoices?.breakdown ? [
    {
      name: 'Generated',
      value: invoices.breakdown['Generated'] || 0,
      fill: '#2196f3'
    },
    {
      name: 'Approved',
      value: invoices.breakdown['Approved'] || 0,
      fill: '#4caf50'
    },
    {
      name: 'Rejected',
      value: invoices.breakdown['Rejected'] || 0,
      fill: '#f44336'
    },
    {
      name: 'Debit Revised',
      value: invoices.breakdown['Debit Revised'] || 0,
      fill: '#ff9800'
    }
  ] : [];

  // Prepare chart data for reconciliation
  const reconciliationChartData = reconciliation?.breakdown ? [
    {
      name: 'Pending',
      value: reconciliation.breakdown['Pending'] || 0,
      fill: '#ff9800'
    },
    {
      name: 'Approved',
      value: reconciliation.breakdown['Approved'] || 0,
      fill: '#4caf50'
    },
    {
      name: 'Disputed',
      value: reconciliation.breakdown['Disputed'] || 0,
      fill: '#f44336'
    }
  ] : [];

  // Combined chart data for grouped bar chart
  const combinedChartData = [
    {
      name: 'Generated',
      Invoices: invoices?.breakdown?.['Generated'] || 0,
      Reconciliation: 0
    },
    {
      name: 'Approved',
      Invoices: invoices?.breakdown?.['Approved'] || 0,
      Reconciliation: reconciliation?.breakdown?.['Approved'] || 0
    },
    {
      name: 'Pending/Rejected',
      Invoices: (invoices?.breakdown?.['Rejected'] || 0) + (invoices?.breakdown?.['Debit Revised'] || 0),
      Reconciliation: reconciliation?.breakdown?.['Pending'] || 0
    },
    {
      name: 'Disputed',
      Invoices: 0,
      Reconciliation: reconciliation?.breakdown?.['Disputed'] || 0
    }
  ];

  return (
    <KPIGroupContainer title={data.title}>
      <Grid container spacing={2}>
        {/* KPI Stats */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StatTile
              title="Invoices"
              value={invoices?.count || 0}
              status={invoices?.status || 'normal'}
              subtitle={invoices?.breakdown ? 
                `${invoices.breakdown['Generated'] || 0} Generated, ${invoices.breakdown['Approved'] || 0} Approved` : ''}
              onClick={() => onKPIClick('invoices', invoices)}
            />
            <StatTile
              title="Reconciliation"
              value={reconciliation?.count || 0}
              status={reconciliation?.status || 'normal'}
              subtitle={reconciliation?.breakdown ? 
                `${reconciliation.breakdown['Pending'] || 0} Pending, ${reconciliation.breakdown['Disputed'] || 0} Disputed` : ''}
              onClick={() => onKPIClick('reconciliation', reconciliation)}
            />
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Financial Health</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: '#e8f5e9',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" color="textSecondary">Approval Rate</Typography>
                    <Typography variant="h6">
                      {invoices && invoices.count > 0 ? 
                        `${Math.round((invoices.breakdown?.['Approved'] || 0) / invoices.count * 100)}%` : 
                        '0%'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    bgcolor: '#fff3e0',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" color="textSecondary">Dispute Rate</Typography>
                    <Typography variant="h6">
                      {reconciliation && reconciliation.count > 0 ? 
                        `${Math.round((reconciliation.breakdown?.['Disputed'] || 0) / reconciliation.count * 100)}%` : 
                        '0%'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%', minHeight: 300 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Billing & Reconciliation Status</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={combinedChartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Invoices" fill="#2196f3" />
                <Bar dataKey="Reconciliation" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Region Distribution */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
              <Chip size="small" label="North" color="primary" variant="outlined" />
              <Chip size="small" label="South" color="secondary" variant="outlined" />
              <Chip size="small" label="East" color="success" variant="outlined" />
              <Chip size="small" label="West" color="warning" variant="outlined" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </KPIGroupContainer>
  );
};

export default FreightReconciliationKPI;
