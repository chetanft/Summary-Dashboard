import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import OverviewTab from './overview/OverviewTab';
import TransactionsTab from './transactions/TransactionsTab';
import { ControlTowerProvider } from '../../context/ControlTowerContext';

const ControlTowerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ControlTowerProvider>
      <Layout>
        <DashboardHeader
          title="Control Tower"
          activeTab="controlTower"
          searchBar={true}
          branchSelector={true}
        />
        
        <Box sx={{ width: '100%', mt: 2 }}>
          <Paper sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: '1px solid #E0E0E0',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#0066FF',
                  height: 3,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#5F697B',
                  '&.Mui-selected': {
                    color: '#0066FF',
                    fontWeight: 600,
                  },
                },
                px: 2,
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Overview</Typography>
                  </Box>
                } 
                value="overview" 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Transactions</Typography>
                  </Box>
                } 
                value="transactions" 
              />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'transactions' && <TransactionsTab />}
            </Box>
          </Paper>
        </Box>
      </Layout>
    </ControlTowerProvider>
  );
};

export default ControlTowerPage;
