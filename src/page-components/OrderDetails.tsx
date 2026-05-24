'use client';

import React, { Suspense } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/custom-ui/Badge';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Button } from '@/components/custom-ui/Button';
import { Clock, MapPin, Package, ArrowLeft, CheckCircle2, User, Phone, Store } from 'lucide-react';
import Link from 'next/link';
import { navigationItems, bottomTabs } from '@/config/navigation';

export const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
  const { orders } = useAppSelector((state) => state.dashboard);
  const order = orders.find((o) => o.id === id) || orders[0];

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex bg-ok-surface-alt min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar items={navigationItems} />
      </Suspense>

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
          <Link href="/orders" className="inline-flex items-center text-gray-500 hover:text-ok-brand text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Orders
          </Link>

          <PageHeader
            title={`Order ${order.id}`}
            label="ORDER DETAILS"
            action={
              <Badge color={order.status === 'COMPLETED' ? 'success' : 'primary'} className="px-3 py-1 uppercase shadow-sm">
                {order.status}
              </Badge>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Items List */}
              <Card className="bg-white border-ok-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-ok-border">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                       <Package className="w-5 h-5 text-ok-brand" /> Order Items
                    </h3>
                    <span className="text-sm text-gray-500 font-semibold">{order.itemCount} Units Total</span>
                  </div>
                  <div className="space-y-4">
                    {/* Dummy items representation */}
                    {[...Array(order.itemCount)].map((_, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-ok-surface-alt p-3 rounded-xl border border-ok-border">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white border shadow-sm flex items-center justify-center text-xl">
                            🍔
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Product Item {idx + 1}</p>
                            <p className="text-xs text-gray-500 font-medium">Quantity: 1</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-900 text-sm">Rs. {(order.amount / order.itemCount).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-ok-border flex justify-between items-center">
                    <p className="font-bold text-gray-500 uppercase tracking-widest text-xs">Total Amount</p>
                    <p className="text-2xl font-bold text-ok-brand">Rs. {order.amount}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              {/* Customer Info */}
              <Card className="bg-white border-ok-border">
                <CardContent className="p-6 space-y-5">
                   <h3 className="font-bold text-cyan-700 text-sm uppercase tracking-wide flex items-center gap-2">
                      <User className="w-4 h-4" /> Customer Info
                   </h3>
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-100 to-blue-50 flex items-center justify-center text-cyan-700 font-bold shadow-sm shadow-cyan-100/50 text-xl">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-gray-900 leading-none mb-1">{order.customerName}</p>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <Phone className="w-3 h-3" /> +1 (555) 000-0000
                        </p>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card className="bg-white border-ok-border border-t-4 border-t-cyan-500">
                <CardContent className="p-6 space-y-4">
                   <h3 className="font-bold text-cyan-700 text-sm uppercase tracking-wide flex items-center gap-2">
                      <Store className="w-4 h-4" /> Delivery Logistics
                   </h3>
                   <div className="bg-ok-brand-subtle/50 rounded-xl p-4 border border-cyan-100 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium flex items-center gap-1.5"><MapPin className="w-4 h-4 text-ok-brand" /> Distance</span>
                        <span className="font-bold text-gray-900">{order.distanceKm} km</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium flex items-center gap-1.5"><Clock className="w-4 h-4 text-ok-brand" /> Time Elapsed</span>
                        <span className="font-bold text-gray-900">{order.receivedMinsAgo} mins ago</span>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-center shadow-lg shadow-cyan-500/20 py-6">
                  Mark as Prepared
                </Button>
                <Button variant="outline" className="w-full justify-center">
                  Contact Customer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
