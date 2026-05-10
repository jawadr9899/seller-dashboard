'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { setPeriod } from '@/store/slices/earningsSlice';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { GradientHero } from '@/components/layout/GradientHero';
import { StatCard } from '@/components/cards/StatCard';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Badge } from '@/components/custom-ui/Badge';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { navigationItems, bottomTabs } from '@/config/navigation';





export const Earnings: React.FC = () => {
  const dispatch = useAppDispatch();
  const earnings = useAppSelector((state) => state.earnings);

  const formatCurrency = (value: number) => `Rs. ${value.toLocaleString()}`;

  return (
    <div className="flex bg-gray-50">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* Hero */}
          <GradientHero
            label="TOTAL BALANCE"
            value={formatCurrency(earnings.totalBalance)}
            trend={`+12.5% VS LAST MONTH`}
            from="from-blue-600"
            to="to-purple-700"
          />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StatCard
              label="NET PROFIT"
              value={formatCurrency(earnings.netProfit)}
              trend={earnings.profitTrend}
              
              featured
            />
            <StatCard
              label="AVG ORDER VALUE"
              value={formatCurrency(earnings.avgOrder)}
              trend={earnings.avgOrderTrend}
              
            />
          </div>

          {/* Revenue Chart */}
          <Card className="mb-6">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
                <div className="flex gap-1">
                  {(['daily', 'weekly', 'monthly'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => dispatch(setPeriod(p))}
                      className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                        earnings.period === p
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earnings.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00BCD4"
                    strokeWidth={2}
                    dot={{ fill: '#00BCD4', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <SectionHeader title="Recent Transactions" action="VIEW ALL" />
          <div className="space-y-2 mb-6">
            {earnings.transactions.map((txn) => (
              <div key={txn.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                    {txn.status === 'SETTLED' ? '✓' : '⏳'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{txn.orderId}</p>
                    <p className="text-xs text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-900">Rs. {txn.amount}</p>
                  <Badge color={txn.status === 'SETTLED' ? 'success' : 'warning'}>
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Last Payout */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Last Payout</p>
                <p className="text-sm text-gray-600">{earnings.lastPayout.bank}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(earnings.lastPayout.amount)}</p>
                <p className="text-xs text-gray-500">{earnings.lastPayout.date}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
