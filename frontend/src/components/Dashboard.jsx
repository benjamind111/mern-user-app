import React from 'react';
import StatsCard from './StatsCard';
import { Users, TrendingUp, Activity } from 'lucide-react';

const Dashboard = ({ totalUsers }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening.</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={totalUsers || 0}
          icon={<Users size={24} />}
          trend={75}
          subtitle="All registered users"
        />

        <StatsCard
          title="New This Month"
          value="+12"
          icon={<TrendingUp size={24} />}
          trend={60}
          subtitle="Growth this period"
        />

        <StatsCard
          title="Active Now"
          value="8"
          icon={<Activity size={24} />}
          showPulse={true}
          subtitle="Currently online"
        />
      </div>
    </div>
  );
};

export default Dashboard;
