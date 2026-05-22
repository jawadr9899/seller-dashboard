"use client";

import React from "react";
import { Card, CardContent } from "@/components/custom-ui/Card";
import { Badge } from "@/components/custom-ui/Badge";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface StoreCardProps {
  id: string;
  logo: string;
  name: string;
  type: string;
  status: "ACTIVE" | "PAUSED";
  monthlyEarnings: number;
  activeOrders: number;
  trendPct: number;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  logo,
  name,
  type,
  status,
  monthlyEarnings,
  activeOrders,
  trendPct,
}) => (
  <Link href={`/stores/${id}`} className="block">
    <Card className="group hover:shadow-[0_8px_18px_rgba(59,53,214,0.14)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col">
      <CardContent className="flex flex-col gap-5 flex-1 pt-5 pb-5 px-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt={name}
                className="w-14 h-14 rounded-lg border border-[#d9d4e8] shadow-sm object-cover"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${status === "ACTIVE" ? "bg-green-500" : "bg-gray-400"}`}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1b1f2a] leading-tight mb-0.5 group-hover:text-[#3b35d6] transition-colors">
                {name}
              </h3>
              <p className="text-xs text-[#6b668f] font-medium">{type}</p>
            </div>
          </div>
          <Badge
            color={status === "ACTIVE" ? "success" : "gray"}
            className="text-[10px] px-2 py-0.5 rounded-full shadow-none font-bold tracking-wider"
          >
            {status}
          </Badge>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4 bg-white rounded-lg p-3 border border-[#d9d4e8]">
          <div>
            <p className="text-[#6b668f] text-[10px] uppercase tracking-wider font-semibold mb-1">
              Monthly
            </p>
            <p className="font-bold text-[#1b1f2a] text-sm">
              Rs. {monthlyEarnings.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#6b668f] text-[10px] uppercase tracking-wider font-semibold mb-1">
              Orders
            </p>
            <p className="font-bold text-[#1b1f2a] text-sm flex items-center justify-end gap-1">
              <span>{activeOrders}</span>
              {activeOrders > 0 && (
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b75f0] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b35d6]"></span>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mt-1">
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${trendPct > 0 ? "bg-[#dcf7e9] text-[#1b8f5a]" : "bg-[#fde4e4] text-[#cf3c3c]"}`}
          >
            {trendPct > 0 ? "↗" : "↘"} {Math.abs(trendPct)}%
          </div>
          <div className="flex items-center text-[#3b35d6] text-xs font-bold gap-0.5 group-hover:gap-1.5 transition-all">
            View details
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);
