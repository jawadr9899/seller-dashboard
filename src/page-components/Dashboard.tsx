'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { acceptOrder, declineOrder } from '@/store/slices/dashboardSlice';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { GradientHero } from '@/components/layout/GradientHero';
import { StatCard } from '@/components/cards/StatCard';
import { OrderCard } from '@/components/cards/OrderCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { navigationItems, bottomTabs } from '@/config/navigation';

const chartData = [
  { day: 'Mon', sales: 2400 },
  { day: 'Tue', sales: 3200 },
  { day: 'Wed', sales: 2890 },
  { day: 'Thu', sales: 3900 },
  { day: 'Fri', sales: 4200 },
  { day: 'Sat', sales: 4800 },
  { day: 'Sun', sales: 4200 },
];





export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector((state) => state.dashboard);

  return (
    <div className="flex bg-gray-50">
      <Sidebar items={navigationItems} shopName={dashboard.shopName} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <PageHeader
            title={`Good morning, ${dashboard.shopName}!`}
            label="Today's Overview"
            subtitle="Keep track of your orders and earnings"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Today's Orders"
              value={dashboard.todayOrders}
              trend={dashboard.todayOrdersChange}
              
            />
            <StatCard
              label="Revenue"
              value={dashboard.revenue}
              trend={dashboard.revenueChange}
              
              trendUp
            />
            <StatCard
              label="Weekly Revenue"
              value={dashboard.weeklyRevenue}
              trend={dashboard.weeklyRevenueChange}
              
              featured
              trendUp
            />
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value) => `Rs. ${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#00BCD4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Incoming Orders */}
          <SectionHeader title="Incoming Orders" dot="red" action="View All" />
          <div className="space-y-3 mb-6">
            {dashboard.orders.map((order) => (
              <OrderCard
                key={order.id}
                {...order}
                onAccept={() => dispatch(acceptOrder(order.id))}
                onDecline={() => dispatch(declineOrder(order.id))}
                onUpdate={() => {}}
              />
            ))}
          </div>

          {dashboard.orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No incoming orders</p>
            </div>
          )}
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
