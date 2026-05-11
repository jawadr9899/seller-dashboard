import { BarChart3, Package, DollarSign, MessageSquare, Store, Settings } from 'lucide-react';
import React from 'react';

export const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: React.createElement(BarChart3, { size: 20 }) },
  { label: 'Inventory', href: '/inventory', icon: React.createElement(Package, { size: 20 }) },
  { label: 'Earnings', href: '/earnings', icon: React.createElement(DollarSign, { size: 20 }) },
  { label: 'Chat', href: '/chat', icon: React.createElement(MessageSquare, { size: 20 }) },
  { label: 'Stores', href: '/stores', icon: React.createElement(Store, { size: 20 }) },
  { label: 'Settings', href: '/settings', icon: React.createElement(Settings, { size: 20 }) },
];

export const bottomTabs = navigationItems;
