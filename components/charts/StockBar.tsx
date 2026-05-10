'use client';

import React from 'react';

interface StockBarProps {
  qty: number;
  max: number;
  status: 'good' | 'low' | 'critical';
}

const statusColors = {
  good: 'bg-green-500',
  low: 'bg-yellow-500',
  critical: 'bg-red-500',
};

export const StockBar: React.FC<StockBarProps> = ({ qty, max, status }) => {
  const percentage = Math.min((qty / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">{qty}/{max}</span>
        <span className="text-xs font-semibold text-gray-900">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${statusColors[status]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
