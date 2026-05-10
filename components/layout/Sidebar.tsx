'use client';

import React from 'react';
import Link from 'next/link';
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

export const Sidebar: React.FC<SidebarProps> = ({ items, logo, shopName }) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 sticky top-0 h-screen">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {logo && <img src={logo} alt="Logo" className="w-8 h-8 rounded" />}
          <div>
            <h1 className="text-sm font-bold text-gray-900">{shopName || 'OrderKro'}</h1>
            <p className="text-xs text-gray-400">Seller Hub</p>
          </div>
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
