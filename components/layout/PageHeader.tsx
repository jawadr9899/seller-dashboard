'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  label?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, label, subtitle, action }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        {label && <p className="text-xs font-semibold text-cyan-600 uppercase mb-1">{label}</p>}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  </div>
);
