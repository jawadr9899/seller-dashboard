"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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

const settingsSubItems = [
  { id: "account", label: "Account", href: "/settings/account" },
  { id: "store", label: "Store", href: "/settings/store" },
  {
    id: "notifications",
    label: "Notifications",
    href: "/settings/notifications",
  },
  {
    id: "payments",
    label: "Payments",
    href: "/settings/payments",
  },
  {
    id: "privacy",
    label: "Privacy",
    href: "/settings/privacy",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(
    pathname.startsWith("/settings"),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-ok-surface-alt border-r border-ok-border sticky top-0 h-screen">
      <div className="px-4 pt-6 pb-4 ml-5">
        <Image src="/logo.png" alt="Logo" width={140} height={100} />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-1.5">
          {items.map((item) => {
            const isSettings = item.label.toLowerCase() === "settings";
            const isActive =
              mounted &&
              (isSettings
                ? pathname.startsWith("/settings")
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/"));

            if (!isSettings) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all border",
                    isActive
                      ? "bg-ok-brand-subtle text-ok-chart-bar border-ok-border-brand"
                      : "text-ok-text border-transparent hover:bg-white hover:border-ok-border",
                  )}
                >
                  {item.icon && (
                    <span className="text-base [&_svg]:h-4 [&_svg]:w-4">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            }

            const activeSettingsSection = pathname.startsWith("/settings/")
              ? pathname.split("/")[2] || "account"
              : searchParams.get("section") || "account";

            return (
              <div key={item.href}>
                <button
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all border",
                    isActive
                      ? "bg-ok-brand-subtle text-ok-chart-bar border-ok-border-brand"
                      : "text-ok-text border-transparent hover:bg-white hover:border-ok-border",
                  )}
                  aria-expanded={settingsOpen}
                  aria-controls="settings-submenu"
                >
                  <span className="flex items-center gap-3">
                    {item.icon && (
                      <span className="text-base [&_svg]:h-4 [&_svg]:w-4">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </span>
                  <svg
                    className={cn(
                      "h-4 w-4 text-ok-text-muted transition-transform",
                      settingsOpen ? "rotate-90" : "rotate-0",
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6l6 6-6 6"
                    />
                  </svg>
                </button>

                {settingsOpen && (
                  <div
                    id="settings-submenu"
                    className="ml-8 mt-1 space-y-1 border-l border-ok-brand/25 pl-3"
                  >
                    {settingsSubItems.map((subItem) => {
                      const subActive =
                        pathname.startsWith("/settings") &&
                        activeSettingsSection === subItem.id;

                      return (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={cn(
                            "block rounded-xl px-3 py-2 text-base font-semibold transition-colors",
                            subActive
                              ? "bg-ok-brand-subtle text-ok-brand"
                              : "text-ok-text-muted hover:bg-ok-brand-ghost hover:text-ok-brand",
                          )}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
