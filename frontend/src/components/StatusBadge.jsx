import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Active: {
      icon: <CheckCircle size={14} />,
      className: 'status-active'
    },
    Pending: {
      icon: <Clock size={14} />,
      className: 'status-pending'
    },
    Inactive: {
      icon: <XCircle size={14} />,
      className: 'status-inactive'
    }
  };

  const config = statusConfig[status] || statusConfig.Inactive;

  return (
    <div className={`status-badge ${config.className}`}>
      {config.icon}
      <span>{status}</span>
    </div>
  );
};

export default StatusBadge;
