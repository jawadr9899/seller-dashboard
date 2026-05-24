"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { navigationItems, bottomTabs } from "@/config/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyOrders = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 280 },
  { day: "Wed", value: 340 },
  { day: "Thu", value: 260 },
  { day: "Fri", value: 240 },
  { day: "Sat", value: 190 },
  { day: "Sun", value: 250 },
];

const revenueTrend = [
  { month: "Jan", revenue: 260 },
  { month: "Feb", revenue: 220 },
  { month: "Mar", revenue: 410 },
  { month: "Apr", revenue: 295 },
  { month: "May", revenue: 360 },
  { month: "Jun", revenue: 250 },
  { month: "Jul", revenue: 470 },
  { month: "Aug", revenue: 330 },
  { month: "Sep", revenue: 280 },
  { month: "Oct", revenue: 440 },
  { month: "Nov", revenue: 210 },
  { month: "Dec", revenue: 390 },
];

const channelData = [
  { name: "Organic", value: 38, color: "var(--ok-chart-bar)" },
  { name: "Referral", value: 24, color: "#8B5CF6" },
  { name: "Direct", value: 20, color: "#A78BFA" },
  { name: "Social", value: 18, color: "#C4B5FD" },
];

export const Dashboard: React.FC = () => {
  const dashboard = useAppSelector((state) => state.dashboard);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const tableRows = useMemo(
    () =>
      dashboard.orders.map((order, index) => ({
        product: [
          "iPhone 14 Pro Max",
          "Mac Book Pro",
          "Apple Watch",
          "AirPods Max",
        ][index % 4],
        customer: order.customerName,
        id: order.id,
        price: `$${order.amount.toFixed(2)}`,
        payment: ["Card", "Fast QR", "Bank Transfer", "Wallet"][index % 4],
        status:
          order.status === "NEW"
            ? "Delivery"
            : order.status === "URGENT"
              ? "Pending"
              : "Complete",
      })),
    [dashboard.orders],
  );

  const totalPages = Math.max(1, Math.ceil(tableRows.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleRows = tableRows.slice(startIdx, startIdx + itemsPerPage);

  const statusStyles: Record<string, string> = {
    Delivery:
      "bg-ok-success-bg text-ok-success border border-ok-success-border",
    Pending: "bg-ok-gray-badge text-ok-text-muted border border-ok-border",
    Complete:
      "bg-ok-brand-ghost text-ok-chart-bar border border-ok-border-brand",
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      change: "+12%",
      changeLabel: "vs last month",
      trendUp: true,
      iconBg: "bg-ok-icon-blue-bg",
      iconColor: "text-ok-icon-blue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Total Orders",
      value: "1,205",
      change: "+8%",
      changeLabel: "vs last month",
      trendUp: true,
      iconBg: "bg-ok-icon-green-bg",
      iconColor: "text-ok-success",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      title: "Revenue",
      value: "$24,400",
      change: "-2%",
      changeLabel: "vs last month",
      trendUp: false,
      iconBg: "bg-ok-icon-green-bg",
      iconColor: "text-ok-success",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Active Vendors",
      value: "842",
      change: "+15%",
      changeLabel: "vs last month",
      trendUp: true,
      iconBg: "bg-ok-icon-pink-bg",
      iconColor: "text-ok-icon-pink",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-ok-surface-page">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar items={navigationItems} />
      </Suspense>

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ok-heading">
              Dashboard
            </h1>
            <p className="text-sm text-ok-text-muted mt-2">
              Track orders, revenue, traffic, and product activity from one
              clean overview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item, index) => (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border border-ok-border-light gradient-border-hover transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-ok-text-faint tracking-wide">
                      {item.title}
                    </span>
                    <p className="text-2xl font-bold text-ok-heading mt-1.5 leading-tight">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0`}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  {item.trendUp ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-ok-success"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-ok-danger"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="7" x2="17" y2="17" />
                      <polyline points="17 7 17 17 7 17" />
                    </svg>
                  )}
                  <span
                    className={`text-[11px] font-semibold ${item.trendUp ? "text-ok-success" : "text-ok-danger"}`}
                  >
                    {item.change}
                  </span>
                  <span className="text-[11px] text-ok-text-faint">
                    {item.changeLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
            <div className="bg-ok-surface border border-ok-border rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-ok-heading">
                  Expenses Activity
                </h3>
                <button className="px-3 py-1.5 rounded-sm border border-ok-border bg-white text-sm font-semibold text-ok-text-muted">
                  Week
                </button>
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyOrders}>
                    <CartesianGrid stroke="var(--ok-border)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "var(--ok-text-muted)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "var(--ok-text-muted)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(79,70,229,0.06)" }}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #d9d4e8",
                        background: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--ok-chart-bar)"
                      radius={[6, 6, 0, 0]}
                      barSize={22}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-ok-surface border border-ok-border rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-bold text-ok-heading mb-5">
                Traffic Channel
              </h3>
              <div className="h-[260px] flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-[55%] h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {channelData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid #d9d4e8",
                          background: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {channelData.map((channel) => (
                    <div
                      key={channel.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: channel.color }}
                        />
                        <span className="text-sm font-medium text-ok-text">
                          {channel.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-ok-heading">
                        {channel.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ok-surface border border-ok-border rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-ok-heading">
                Revenue Trend
              </h3>
              <button className="px-3 py-1.5 rounded-sm border border-ok-border bg-white text-sm font-semibold text-ok-text-muted">
                Monthly
              </button>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient
                      id="revenueFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--ok-chart-bar)"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--ok-chart-bar)"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--ok-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "var(--ok-text-muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--ok-text-muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #d9d4e8",
                      background: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--ok-chart-bar)"
                    strokeWidth={3}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-ok-surface border border-ok-border rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-ok-border flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ok-heading">
                  Recent Orders
                </h3>
                <p className="text-sm text-ok-text-muted mt-1">
                  Latest customer purchases and payment status.
                </p>
              </div>
              <button className="text-ok-text-muted hover:text-ok-chart-bar">
                •••
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead className="bg-ok-surface-alt border-b border-ok-border">
                  <tr>
                    {[
                      "Product Name",
                      "ID Order",
                      "Customer",
                      "Price",
                      "Payment Method",
                      "Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-ok-text-muted"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ok-border">
                  {visibleRows.map((row, index) => (
                    <tr
                      key={`${row.id}-${index}`}
                      className="transition-colors hover:bg-ok-brand/5"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-ok-heading">
                        {row.product}
                      </td>
                      <td className="px-6 py-4 text-sm text-ok-text-muted">
                        #{row.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-ok-text">
                        {row.customer}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-ok-heading">
                        {row.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-ok-text-muted">
                        {row.payment}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-ok-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-ok-text-muted">
                Showing {tableRows.length === 0 ? 0 : startIdx + 1} to{" "}
                {Math.min(startIdx + itemsPerPage, tableRows.length)} of{" "}
                {tableRows.length} orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-sm border border-ok-border bg-white text-sm font-semibold text-ok-text-muted disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-sm border border-ok-border bg-white text-sm font-semibold text-ok-text-muted disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
