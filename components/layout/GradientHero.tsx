'use client';

import React from 'react';
import { Badge } from '@/components/custom-ui/Badge';

interface GradientHeroProps {
  label: string;
  value: string | number;
  trend?: string;
  from?: string;
  to?: string;
}

export const GradientHero: React.FC<GradientHeroProps> = ({
  label,
  value,
  trend,
  from,
  to,
}) => (
  <div className={`gradient-cyan-purple text-white rounded-2xl p-6 mb-6`}>
    <p className="text-white/80 text-xs font-semibold uppercase mb-2">{label}</p>
    <div className="flex items-baseline justify-between">
      <h2 className="text-3xl md:text-4xl font-bold">{value}</h2>
      {trend && (
        <Badge color="success" className="bg-white/20 text-white border border-white/30">
          {trend}
        </Badge>
      )}
    </div>
  </div>
);
