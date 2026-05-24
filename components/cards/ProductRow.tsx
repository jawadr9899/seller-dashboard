'use client';

import React from 'react';
import { StockBar } from '@/components/charts/StockBar';
import { Badge } from '@/components/custom-ui/Badge';

interface ProductRowProps {
  sku: string;
  image: string;
  name: string;
  category: string;
  stockQty: number;
  stockMax: number;
  stockStatus: 'good' | 'low' | 'critical';
  price: number;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  sku,
  image,
  name,
  category,
  stockQty,
  stockMax,
  stockStatus,
  price,
}) => (
  <tr className="border-b border-gray-200 transition-colors hover:bg-ok-brand/5">
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-10 h-10 rounded object-cover" />
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{sku}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-4">
      <Badge color="gray" className="w-fit">
        {category}
      </Badge>
    </td>
    <td className="px-4 py-4">
      <StockBar qty={stockQty} max={stockMax} status={stockStatus} />
    </td>
    <td className="px-4 py-4">
      <p className="text-sm font-semibold text-gray-900">Rs. {price}</p>
    </td>
    <td className="px-4 py-4">
      <div className="flex gap-3">
        <button className="text-cyan-600 text-sm font-semibold hover:underline">Edit</button>
        <button className="text-red-500 text-sm font-semibold hover:underline">Delete</button>
      </div>
    </td>
  </tr>
);
