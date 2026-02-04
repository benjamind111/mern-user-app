import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
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

// ============================================
// STATSCARD COMPONENT (Inline Definition)
// ============================================
const StatsCard = ({ title, value, icon, subtitle, trend, showPulse }) => {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-sm p-6 hover:border-slate-600 transition-colors duration-200">
      <div className="flex items-start justify-between">
        {/* Left Side - Text Content */}
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
          {subtitle && (
            <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
          )}
          
          {/* Trend Indicator */}
          {trend !== undefined && trend !== null && (
            <div className={`flex items-center gap-1 mt-3 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>

        {/* Right Side - Icon */}
        <div className="relative">
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <div className="text-slate-300">
              {icon}
            </div>
          </div>
          
          {/* Pulse Animation */}
          {showPulse && (
            <div className="absolute -top-1 -right-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD COMPONENT
// ============================================
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
      const response = await fetch('https://mern-user-app-ir5o.onrender.com/api/users');
      
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
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 text-sm font-medium">
            {payload[0].name || payload[0].payload.city}
          </p>
          <p className="text-white text-lg font-bold mt-1">
            {payload[0].value} users
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="text-slate-400 mt-4">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statusData = getStatusData();
  const topCities = getTopCities();

  return (
    <div className="w-full min-w-full pl-6 pt-6 pb-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of your user management system</p>
      </div>

      {/* Stats Cards - 3 Column Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <StatsCard
          title="Total Users"
          value={stats.total}
          icon={<Users size={24} />}
          subtitle="All registered users"
          trend={null}
        />

        <StatsCard
          title="Active Users"
          value={stats.active}
          icon={<CheckCircle size={24} />}
          subtitle={`${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of total`}
          trend={stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}
          showPulse={stats.active > 0}
        />

        <StatsCard
          title="Pending Users"
          value={stats.pending}
          icon={<Clock size={24} />}
          subtitle="Awaiting activation"
          trend={null}
        />
      </div>

      {/* Charts Section - 2 Column Grid - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Pie Chart - Status Distribution */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 h-[450px] flex flex-col w-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">User Status Distribution</h3>
            <p className="text-slate-400 text-sm mt-1">Breakdown by current status</p>
          </div>
          <div className="flex-1 min-h-0 w-full h-full">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">No user data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart - Top Cities */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 h-[450px] flex flex-col w-full">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Top Cities</h3>
            <p className="text-slate-400 text-sm mt-1">Users by location (Top 5)</p>
          </div>
          <div className="flex-1 min-h-0 w-full h-full">
            {topCities.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCities} margin={{ bottom: 70 }}>
                  <XAxis 
                    dataKey="city" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval={0}
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
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">No city data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
