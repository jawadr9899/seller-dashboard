"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <aside className="hidden lg:flex flex-col w-64 bg-ok-surface-alt border-r border-ok-border sticky top-0 h-screen">
      <div className="px-4 pt-6 pb-4 ml-5">
        <Image src="/logo.png" alt="Logo" width={140} height={100} />
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
                    ? "bg-ok-brand-subtle text-ok-chart-bar border-ok-border-brand"
                    : "text-ok-text border-transparent hover:bg-white hover:border-ok-border",
                )}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-ok-border">
        <button className="w-full px-4 py-2.5 text-sm font-semibold text-ok-danger border border-ok-danger-border bg-white hover:bg-ok-danger-ghost rounded-sm transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
};
