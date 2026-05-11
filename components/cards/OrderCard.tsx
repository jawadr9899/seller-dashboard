'use client';

import React from 'react';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Badge } from '@/components/custom-ui/Badge';
import { Button } from '@/components/custom-ui/Button';
import { Clock, MapPin, Package, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface OrderCardProps {
  id: string;
  customerName: string;
  itemCount: number;
  amount: number;
  status: 'NEW' | 'URGENT' | 'PREPARING';
  receivedMinsAgo: number;
  distanceKm: number;
  onAccept?: () => void;
  onDecline?: () => void;
  onUpdate?: () => void;
}

const statusConfig = {
  NEW: { color: 'primary', label: 'New Order' },
  URGENT: { color: 'danger', label: 'Urgent' },
  PREPARING: { color: 'warning', label: 'Preparing' },
} as const;

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  customerName,
  itemCount,
  amount,
  status,
  receivedMinsAgo,
  distanceKm,
  onAccept,
  onDecline,
  onUpdate,
}) => {
  const config = statusConfig[status] || statusConfig.NEW;

  return (
    <Card className="mb-4 group hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-cyan-500 overflow-hidden relative">
      <CardContent className="flex flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-100 to-blue-50 flex items-center justify-center text-cyan-700 font-bold shadow-sm shadow-cyan-100/50">
              {customerName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none mb-1">{customerName}</p>
              <p className="text-xs text-gray-500 font-mono tracking-tight cursor-pointer hover:text-cyan-600 transition-colors">
                <Link href={`/orders/${id}`}>{id}</Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge color={config.color as any} className="text-[10px] px-2.5 py-0.5 uppercase tracking-wider font-bold shadow-sm">
              {config.label}
            </Badge>
            <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              {receivedMinsAgo}m ago
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-100/80">
          <div className="space-y-1">
            <p className="text-gray-400 text-[10px] uppercase font-semibold flex items-center gap-1">
              <Package className="w-3 h-3" /> Items
            </p>
            <p className="font-bold text-gray-900 text-sm">{itemCount} <span className="font-normal text-xs text-gray-500">units</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-[10px] uppercase font-semibold">Total</p>
            <p className="font-bold text-gray-900 text-sm">Rs. {amount.toLocaleString()}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-gray-400 text-[10px] uppercase font-semibold flex items-center justify-end gap-1">
               Distance <MapPin className="w-3 h-3" />
            </p>
            <p className="font-bold text-gray-900 text-sm">{distanceKm} <span className="font-normal text-xs text-gray-500">km</span></p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2 pt-1 items-center justify-between">
          <Link href={`/orders/${id}`} className="text-[11px] font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5 group-hover:gap-1 transition-all uppercase tracking-wide">
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          
          <div className="flex gap-2">
            {(status === 'NEW' || status === 'URGENT') && (
              <>
                <Button size="sm" variant="danger" onClick={onDecline} className="px-4 py-1.5 h-8 text-xs font-semibold bg-red-50 text-red-600 border-none hover:bg-red-100 active:bg-red-200">
                  Decline
                </Button>
                <Button size="sm" variant="primary" onClick={onAccept} className="px-5 py-1.5 h-8 text-xs font-bold shadow-sm shadow-pink-500/20">
                  Accept
                </Button>
              </>
            )}
            {status === 'PREPARING' && (
              <Button size="sm" variant="outline" onClick={onUpdate} className="px-5 h-8 text-xs font-semibold border-cyan-200 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-300">
                Update Status
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
