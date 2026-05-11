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
    <div className="fixed z-50 bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 flex overflow-x-auto overflow-y-hidden hide-scrollbar pb-safe">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 min-w-[64px] flex flex-col items-center justify-center py-3 px-2 text-center transition-colors relative',
              isActive
                ? 'text-cyan-600'
                : 'text-gray-500 hover:text-cyan-500'
            )}
          >
            {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-cyan-500" />}
            <span className={cn("transition-transform duration-200", isActive ? "scale-110" : "scale-100")}>{item.icon}</span>
          </Link>
        );
      })}
    </div>
  );
};
