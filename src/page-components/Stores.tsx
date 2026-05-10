'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';
import { StoreCard } from '@/components/cards/StoreCard';
import { Card, CardContent } from '@/components/custom-ui/Card';

import { navigationItems, bottomTabs } from '@/config/navigation';





import Link from 'next/link';

export const Stores: React.FC = () => {
  const { stores, totalRevenue, totalEarnings, pendingDeliveries } = useAppSelector((state) => state.stores);

  return (
    <div className="flex bg-gray-50">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <PageHeader
            title="Store Management"
            label="ENTERPRISE OVERVIEW"
            action={<Link href="/stores/create"><Button size="md">+ Add Store</Button></Link>}
          />

          {/* Search */}
          <div className="mb-6">
            <Input placeholder="Search stores..."  />
          </div>

          {/* Store Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stores.map((store) => (
              <StoreCard key={store.id} {...store} />
            ))}
            {/* New Store Card */}
            <Card className="flex items-center justify-center min-h-60 border-2 border-dashed border-gray-300 hover:border-cyan-500 hover:bg-cyan-50 cursor-pointer transition-colors">
              <CardContent className="text-center">
                <p className="text-4xl mb-2">+</p>
                <p className="text-sm font-semibold text-gray-600">Add New Store</p>
              </CardContent>
            </Card>
          </div>

          {/* Network Summary */}
          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Network Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Total Revenue</p>
                    <p className="font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Total Earnings</p>
                    <p className="font-bold text-gray-900">Rs. {totalEarnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Pending Deliveries</p>
                    <p className="font-bold text-gray-900">{pendingDeliveries}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" size="md">
                  Generate Report
                </Button>
                <Button variant="primary" size="md">
                  Export Merchant Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
