"use client";

import React from "react";
import { Card, CardContent } from "@/components/custom-ui/Card";
import { Badge } from "@/components/custom-ui/Badge";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
  featured?: boolean;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon,
  featured,
  trendUp = true,
}) => (
  <Card
    className={
      featured ? "bg-ok-brand text-white border border-ok-brand" : ""
    }
  >
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className={
            featured
              ? "text-white/80 text-xs font-semibold uppercase"
              : "text-ok-text-muted text-xs font-semibold uppercase"
          }
        >
          {label}
        </span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <p
          className={
            featured
              ? "text-2xl font-bold"
              : "text-2xl font-bold text-ok-heading"
          }
        >
          {value}
        </p>
        {trend && (
          <Badge
            color={trendUp ? "success" : "danger"}
            className={featured ? "bg-white/20 text-white" : ""}
          >
            {trend}
          </Badge>
        )}
      </div>
    </CardContent>
  </Card>
);
