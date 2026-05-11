'use client';

import React from 'react';
import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  dot?: 'red' | 'green' | 'blue';
  action?: React.ReactNode | string;
  href?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, dot, action, href }) => {
  const dotColors = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {dot && (
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[dot]}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[dot]}`}></span>
          </span>
        )}
        <h2 className="text-base md:text-lg font-bold text-gray-900">{title}</h2>
      </div>
      {action && href ? (
        <Link href={href} className="text-cyan-600 text-sm font-semibold hover:underline">
          {action}
        </Link>
      ) : action && (
        <button className="text-cyan-600 text-sm font-semibold hover:underline">
          {typeof action === 'string' ? action : action}
        </button>
      )}
    </div>
  );
};
