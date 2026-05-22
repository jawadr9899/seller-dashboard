"use client";

import React from "react";
import { LogOut } from "lucide-react";

interface PageHeaderProps {
  title: string;
  label?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  label,
  subtitle,
  action,
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-4">
      <div className="flex-1">
        {label && (
          <p className="text-xs font-semibold text-[#3b35d6] uppercase mb-1">
            {label}
          </p>
        )}
        <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-[#111827]">
          {title}
        </h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {action}
        <button className="lg:hidden text-gray-500 hover:text-red-600 transition-colors p-2 rounded-sm hover:bg-[#fbf7ff]">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);
