import React from 'react';

const StatsCard = ({ title, value, icon, trend, showPulse, subtitle }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <div className="stats-icon">{icon}</div>
        {showPulse && <div className="pulse-dot"></div>}
      </div>
      
      <div className="stats-content">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-title">{title}</p>
        {subtitle && <p className="stats-subtitle">{subtitle}</p>}
      </div>

      {trend && (
        <div className="stats-trend">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${trend}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
