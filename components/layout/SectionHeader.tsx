'use client';

import React from 'react';

interface SectionHeaderProps {
  title: string;
  dot?: 'red' | 'green' | 'blue';
  action?: React.ReactNode | string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, dot, action }) => {
  const dotColors = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {dot && <div className={`w-2 h-2 rounded-full ${dotColors[dot]}`} />}
        <h2 className="text-base md:text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {action && (
        <button className="text-cyan-600 text-sm font-semibold hover:underline">
          {typeof action === 'string' ? action : action}
        </button>
      )}
    </div>
  );
};
