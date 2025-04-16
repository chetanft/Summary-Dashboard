import React, { useState } from 'react';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import RealtimeKPIDashboard from '../realtime-kpis/RealtimeKPIDashboard';
import { useSearch } from '../../context/SearchContext';

const AlertsWithLayout = () => {
  const [activeTab, setActiveTab] = useState('operations');
  const { recentSearches } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <Layout>
      {/* Dashboard Header with search and branch selector */}
      <DashboardHeader
        title="Operations Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchBar={true}
        branchSelector={true}
        searchData={[
          { type: 'Alert', value: 'Delayed Delivery', tripId: null },
          { type: 'Alert', value: 'Vehicle Breakdown', tripId: null },
          { type: 'Alert', value: 'Route Deviation', tripId: null },
          { type: 'Alert', value: 'Weather Alert', tripId: null },
          { type: 'Alert', value: 'Traffic Congestion', tripId: null },
          { type: 'Region', value: 'North', tripId: null },
          { type: 'Region', value: 'South', tripId: null },
          { type: 'Region', value: 'East', tripId: null },
          { type: 'Region', value: 'West', tripId: null },
          { type: 'Region', value: 'Central', tripId: null }
        ]}
        onSearch={handleSearch}
      />

      {/* Real-Time KPIs Dashboard */}
      <RealtimeKPIDashboard />
    </Layout>
  );
};

export default AlertsWithLayout;
