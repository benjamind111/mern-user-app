import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

export default StatsCard;
