'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/custom-ui/Badge';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Input } from '@/components/custom-ui/Input';
import { Button } from '@/components/custom-ui/Button';
import { MapPin, Search, Filter, Clock, ChevronRight, Package } from 'lucide-react';
import Link from 'next/link';
import { navigationItems, bottomTabs } from '@/config/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const statusConfig = {
  NEW: { color: 'primary', label: 'New Order' },
  URGENT: { color: 'danger', label: 'Urgent' },
  PREPARING: { color: 'warning', label: 'Preparing' },
  COMPLETED: { color: 'success', label: 'Completed' },
} as const;

export const Orders: React.FC = () => {
  const { orders } = useAppSelector((state) => state.dashboard);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(
    (order) => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="All Orders"
            label="ORDER MANAGEMENT"
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 w-full md:w-96 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              <Input 
                placeholder="Search by Order ID or Customer..." 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Orders Table */}
          <Card className="overflow-hidden border-gray-100 shadow-sm bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="font-semibold text-gray-500 py-4 pl-6">Order Details</TableHead>
                    <TableHead className="font-semibold text-gray-500 py-4">Status</TableHead>
                    <TableHead className="font-semibold text-gray-500 py-4">Items</TableHead>
                    <TableHead className="font-semibold text-gray-500 py-4">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-500 py-4">Timeline / Dist</TableHead>
                    <TableHead className="font-semibold text-gray-500 py-4 text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.NEW;
                      
                      return (
                        <TableRow key={order.id} className="group hover:bg-cyan-50/30 transition-colors border-gray-100">
                          {/* Order Details */}
                          <TableCell className="pl-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-cyan-100 to-blue-50 flex items-center justify-center text-cyan-700 font-bold shadow-sm">
                                {order.customerName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900 leading-none mb-1">{order.customerName}</p>
                                <p className="text-xs text-gray-500 font-mono tracking-tight">{order.id}</p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell className="py-4">
                            <Badge color={config.color as any} className="text-[10px] px-2.5 py-0.5 uppercase tracking-wider font-bold shadow-sm">
                              {config.label}
                            </Badge>
                          </TableCell>

                          {/* Items */}
                          <TableCell className="py-4">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                              <Package className="w-4 h-4 text-gray-400" />
                              {order.itemCount} unit{order.itemCount > 1 ? 's' : ''}
                            </div>
                          </TableCell>

                          {/* Amount */}
                          <TableCell className="py-4">
                            <span className="text-sm font-bold text-gray-900">Rs. {order.amount.toLocaleString()}</span>
                          </TableCell>

                          {/* Timeline / Distance */}
                          <TableCell className="py-4">
                            <div className="flex flex-col gap-1 text-xs">
                              <span className="font-semibold text-gray-600 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                {order.receivedMinsAgo}m ago
                              </span>
                              <span className="text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {order.distanceKm} km away
                              </span>
                            </div>
                          </TableCell>

                          {/* Action */}
                          <TableCell className="text-right pr-6 py-4">
                            <Link href={`/orders/${order.id}`}>
                              <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 font-bold text-xs">
                                View <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                        No orders found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
