'use client';

import React from 'react';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Badge } from '@/components/custom-ui/Badge';
import { Button } from '@/components/custom-ui/Button';

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

const statusColors = {
  NEW: 'primary',
  URGENT: 'danger',
  PREPARING: 'warning',
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
}) => (
  <Card className="mb-4">
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">{customerName}</p>
          <p className="text-xs text-gray-500">{id}</p>
        </div>
        <Badge color={statusColors[status]} className="text-xs">
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Items</p>
          <p className="font-semibold text-gray-900">{itemCount}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Amount</p>
          <p className="font-semibold text-gray-900">Rs. {amount}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs">{distanceKm} km away</p>
          <p className="font-semibold text-gray-900">{receivedMinsAgo}m ago</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(status === 'NEW' || status === 'URGENT') && (
          <>
            <Button size="sm" variant="primary" onClick={onAccept} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="danger" onClick={onDecline} className="flex-1">
              Decline
            </Button>
          </>
        )}
        {status === 'PREPARING' && (
          <Button size="sm" variant="outline" onClick={onUpdate} className="w-full">
            Update
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);
