'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: string;
  shopName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, logo = '/logo.png' }) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 sticky top-0 h-screen">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="OrderKaro"
            width={150}
            height={50}
            className="rounded"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-cyan-50 text-cyan-600 border-l-2 border-cyan-500'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
};
