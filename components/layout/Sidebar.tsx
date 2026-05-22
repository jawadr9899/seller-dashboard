"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  logo?: string;
  shopName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#f8f8fa] border-r border-[#d9d4e8] sticky top-0 h-screen">
      <div className="px-4 pt-6 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#777681] px-3">
          Navigation
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-1.5">
          {items.map((item) => {
            const isActive =
              mounted &&
              (pathname === item.href || pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all border",
                  isActive
                    ? "bg-[#ece8ff] text-[#4f46e5] border-[#cfc7f5]"
                    : "text-[#4b5563] border-transparent hover:bg-white hover:border-[#d9d4e8]",
                )}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#d9d4e8]">
        <button className="w-full px-4 py-2.5 text-sm font-semibold text-[#d64545] border border-[#f0c6c6] bg-white hover:bg-[#fff5f5] rounded-sm transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
};
