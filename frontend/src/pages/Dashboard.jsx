import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { API_URL } from '../config/api';

const Dashboard = ({ showToast }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users`);
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        calculateStats(data);
      } else {
        showToast?.('Failed to fetch dashboard data', 'error');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast?.('Network error loading dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (userData) => {
    const total = userData.length;
    const active = userData.filter(u => u.status === 'Active').length;
    const pending = userData.filter(u => u.status === 'Pending').length;
    const inactive = userData.filter(u => u.status === 'Inactive').length;

    setStats({ total, active, pending, inactive });
  };

  // Prepare data for Pie Chart (Status Distribution)
  const getStatusData = () => {
    return [
      { name: 'Active', value: stats.active, color: '#10b981' },
      { name: 'Pending', value: stats.pending, color: '#f59e0b' },
      { name: 'Inactive', value: stats.inactive, color: '#6b7280' }
    ].filter(item => item.value > 0); // Only show categories with data
  };

  // Prepare data for Bar Chart (Top Cities)
  const getTopCities = () => {
    const cityCounts = {};
    users.forEach(user => {
      const city = user.city || 'Unknown';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    return Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name || payload[0].payload.city}</p>
          <p className="tooltip-value">{payload[0].value} users</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statusData = getStatusData();
  const topCities = getTopCities();

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your user management system</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {/* Total Users */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
            <Users size={24} style={{ color: '#4f46e5' }} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <h3 className="stat-value">{stats.total}</h3>
            <p className="stat-change">All registered users</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <CheckCircle size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Users</p>
            <h3 className="stat-value">{stats.active}</h3>
            <p className="stat-change">
              {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of total
            </p>
          </div>
        </div>

        {/* Pending Users */}
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            <Clock size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Users</p>
            <h3 className="stat-value">{stats.pending}</h3>
            <p className="stat-change">Awaiting activation</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Pie Chart - Status Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">User Status Distribution</h3>
            <p className="chart-subtitle">Breakdown by current status</p>
          </div>
          <div className="chart-container">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                <p>No user data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart - Top Cities */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Top Cities</h3>
            <p className="chart-subtitle">Users by location (Top 5)</p>
          </div>
          <div className="chart-container">
            {topCities.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topCities}>
                  <XAxis 
                    dataKey="city" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="count" 
                    fill="#4f46e5"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                <p>No city data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
