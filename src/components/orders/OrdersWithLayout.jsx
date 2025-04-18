import React, { useState } from 'react';
import Layout from '../layout/Layout';
import DashboardHeader from '../dashboard/DashboardHeader';
import Orders from './Orders';
import TestOrderPane from './TestOrderPane';

const OrdersWithLayout = () => {
  const [activeTab, setActiveTab] = useState('orderData');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      {/* Dashboard Header */}
      <DashboardHeader
        title="Summary Dashboard"
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <Orders />
    </Layout>
  );
};

export default OrdersWithLayout;
