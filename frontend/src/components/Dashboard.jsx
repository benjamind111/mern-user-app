import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import { Users, TrendingUp, Activity, Loader } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newThisMonth: 0,
    growthPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://mern-user-app-ir5o.onrender.com/api/dashboard/stats');
      
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalUsers: data.totalUsers,
          activeUsers: data.activeUsers,
          newThisMonth: data.newThisMonth,
          growthPercentage: data.growthPercentage
        });
      } else {
        console.error('Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening.</p>
        </div>

        <div className="stats-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="stats-card skeleton-stats">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-value"></div>
              <div className="skeleton-line skeleton-subtitle"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's what's happening.</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={24} />}
          trend={75}
          subtitle="All registered users"
        />

        <StatsCard
          title="New This Month"
          value={stats.newThisMonth}
          icon={<TrendingUp size={24} />}
          trend={stats.growthPercentage}
          subtitle={`${stats.growthPercentage >= 0 ? '+' : ''}${stats.growthPercentage}% from last month`}
        />

        <StatsCard
          title="Active Now"
          value={stats.activeUsers}
          icon={<Activity size={24} />}
          showPulse={true}
          subtitle="Currently active"
        />
      </div>
    </div>
  );
};

export default Dashboard;
