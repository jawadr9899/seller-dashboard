'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TabItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomTabBarProps {
  items: TabItem[];
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 flex">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-2 text-center text-xs font-medium transition-colors border-t-2',
              isActive
                ? 'text-cyan-600 border-cyan-500'
                : 'text-gray-500 border-transparent hover:bg-gray-50'
            )}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
