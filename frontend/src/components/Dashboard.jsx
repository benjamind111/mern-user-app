import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Activity, CheckCircle, Clock, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

// --- 1. INTERNAL STATS CARD COMPONENT (With Inline Styles) ---
const StatsCard = ({ title, value, icon, subtitle, trend }) => {
  return (
    <div style={{
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '30px', fontWeight: '700', color: 'white' }}>{value}</span>
          </div>
        </div>
        <div style={{ padding: '12px', backgroundColor: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px', color: '#818cf8', border: '1px solid #475569' }}>
          {icon}
        </div>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ color: '#64748b', fontSize: '12px' }}>{subtitle}</p>
        {trend !== undefined && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '500', padding: '4px 8px', borderRadius: '9999px',
            backgroundColor: trend >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            color: trend >= 0 ? '#34d399' : '#fb7185'
          }}>
            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

// --- 2. MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, pendingUsers: 0, inactiveUsers: 0 });
  const [cityData, setCityData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#10b981', '#f59e0b', '#64748b'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://mern-user-app-ir5o.onrender.com/api/users');
      if (response.ok) {
        const users = await response.json();
        
        const total = users.length;
        const active = users.filter(u => u.status === 'Active').length;
        const pending = users.filter(u => u.status === 'Pending').length;
        const inactive = users.filter(u => u.status === 'Inactive').length;

        const statusChartData = [
          { name: 'Active', value: active },
          { name: 'Pending', value: pending },
          { name: 'Inactive', value: inactive },
        ];

        const cityCounts = users.reduce((acc, user) => {
          const city = user.city ? user.city.trim() : 'Unknown';
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {});
        
        const cityChartData = Object.keys(cityCounts)
          .map(city => ({ name: city, users: cityCounts[city] }))
          .sort((a, b) => b.users - a.users)
          .slice(0, 5);

        setStats({ totalUsers: total, activeUsers: active, pendingUsers: pending, inactiveUsers: inactive });
        setStatusData(statusChartData);
        setCityData(cityChartData);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '32px', color: 'white', textAlign: 'center' }}>Loading Analytics...</div>;

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#0f172a', padding: '32px', color: '#f1f5f9' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}>Dashboard Overview</h1>
        <p style={{ color: '#94a3b8' }}>Real-time metrics from your User Management System.</p>
      </div>

      {/* --- TOP ROW: STATS CARDS (GRID) --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        <StatsCard title="Total Users" value={stats.totalUsers} icon={<Users color="#60a5fa" />} subtitle="All registered accounts" trend={12} />
        <StatsCard title="Active Users" value={stats.activeUsers} icon={<CheckCircle color="#34d399" />} subtitle="Currently active sessions" trend={5} />
        <StatsCard title="Pending Actions" value={stats.pendingUsers} icon={<Clock color="#fbbf24" />} subtitle="Users awaiting approval" trend={-2} />
      </div>

      {/* --- BOTTOM ROW: CHARTS (GRID) --- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '32px', 
        paddingBottom: '40px' 
      }}>
        
        {/* CHART 1 */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'white' }}>User Status Distribution</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2 */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'white' }}>Top Cities</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#334155' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;