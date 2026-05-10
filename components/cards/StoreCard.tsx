'use client';

import React from 'react';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Badge } from '@/components/custom-ui/Badge';

interface StoreCardProps {
  id: string;
  logo: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'PAUSED';
  monthlyEarnings: number;
  activeOrders: number;
  trendPct: number;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  logo,
  name,
  type,
  status,
  monthlyEarnings,
  activeOrders,
  trendPct,
}) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <img src={logo} alt={name} className="w-12 h-12 rounded object-cover" />
        <Badge color={status === 'ACTIVE' ? 'success' : 'gray'}>
          {status}
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{type}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Monthly</p>
          <p className="font-bold text-gray-900">Rs. {monthlyEarnings.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs mb-1">Orders</p>
          <p className="font-bold text-gray-900">{activeOrders}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className={trendPct > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
          {trendPct > 0 ? '+' : ''}{trendPct}%
        </span>
        <div className="flex gap-2">
          <button className="text-cyan-600 text-xs font-semibold hover:underline">View Analytics</button>
          <button className="text-cyan-600 text-xs font-semibold hover:underline">Assign Items</button>
        </div>
      </div>
    </CardContent>
  </Card>
);
