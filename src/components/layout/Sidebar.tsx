"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type SidebarProps = {
  items: NavItem[];
};

const settingsSubItems = [
  { id: "account", label: "Account", href: "/settings?section=account" },
  { id: "store", label: "Store Settings", href: "/settings?section=store" },
  {
    id: "notifications",
    label: "Notifications",
    href: "/settings?section=notifications",
  },
  {
    id: "payouts",
    label: "Payments & Payouts",
    href: "/settings?section=payouts",
  },
  {
    id: "security",
    label: "Security & Privacy",
    href: "/settings?section=security",
  },
];

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [settingsOpen, setSettingsOpen] = useState(
    pathname.startsWith("/settings"),
  );

  useEffect(() => {
    if (pathname.startsWith("/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  const activeSettingsSection = searchParams.get("section") || "account";

  return (
    <aside className="hidden lg:flex w-[250px] shrink-0 border-r border-ok-border bg-white min-h-screen sticky top-0">
      <div className="w-full p-4">
        <div className="mb-4 px-2 pt-1">
          <h2 className="text-lg font-bold text-ok-heading">OrderKro</h2>
          <p className="text-xs text-ok-text-muted mt-0.5">Dashboard</p>
        </div>

        <nav className="space-y-1.5">
          {items.map((item) => {
            const isSettings = item.label.toLowerCase() === "settings";
            const isActive = isSettings
              ? pathname.startsWith("/settings")
              : pathname === item.href;

            if (!isSettings) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-ok-brand text-white"
                      : "text-ok-text hover:bg-ok-brand-ghost hover:text-ok-brand"
                  }`}
                >
                  <span
                    className={isActive ? "text-white" : "text-ok-text-muted"}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <div key={item.label}>
                <button
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-ok-brand/10 text-ok-brand"
                      : "text-ok-text hover:bg-ok-brand-ghost hover:text-ok-brand"
                  }`}
                  aria-expanded={settingsOpen}
                  aria-controls="settings-submenu"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={
                        isActive ? "text-ok-brand" : "text-ok-text-muted"
                      }
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <svg
                    className={`h-4 w-4 text-ok-text-muted transition-transform ${settingsOpen ? "rotate-90" : "rotate-0"}`}
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
                    className="ml-8 mt-1 space-y-1 border-l border-ok-border/40 pl-3"
                  >
                    {settingsSubItems.map((subItem) => {
                      const subActive =
                        pathname.startsWith("/settings") &&
                        activeSettingsSection === subItem.id;

                      return (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          className={`block rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                            subActive
                              ? "bg-ok-brand text-white"
                              : "text-ok-text-muted hover:bg-ok-brand-ghost hover:text-ok-brand"
                          }`}
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
        </nav>
      </div>
    </aside>
  );
}
