"use client";

import React, { useMemo, useState } from "react";
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
  { name: "Organic", value: 38, color: "#4F46E5" },
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
    Delivery: "bg-[#dcf7e9] text-[#1b8f5a] border border-[#a8e8c8]",
    Pending: "bg-[#f2f0ff] text-[#6b668f] border border-[#d9d4e8]",
    Complete: "bg-[#e4e1ff] text-[#4f46e5] border border-[#cfc7f5]",
  };

  const stats = [
    {
      title: "Total Orders",
      value: "459,215",
      change: "+0.02%",
      accent: "bg-[#eef22a]",
    },
    {
      title: "Total Products",
      value: "56,751",
      change: "+0.02%",
      accent: "bg-[#ffb4a2]",
    },
    {
      title: "Store Visitors",
      value: "1,356,751",
      change: "-0.02%",
      accent: "bg-[#d9d4e8]",
    },
    {
      title: "Revenue",
      value: "$2,356,751",
      change: "+0.02%",
      accent: "bg-[#9be7ff]",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f4ff]">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1f2430]">
              Dashboard
            </h1>
            <p className="text-sm text-[#777681] mt-2">
              Track orders, revenue, traffic, and product activity from one
              clean overview.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.accent}`} />
                  <span
                    className={`text-xs font-semibold ${item.change.startsWith("-") ? "text-[#cf3c3c]" : "text-[#1b8f5a]"}`}
                  >
                    {item.change}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#777681] mt-4">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-[#111827] mt-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
            <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[#1f2430]">
                  Expenses Activity
                </h3>
                <button className="px-3 py-1.5 rounded-sm border border-[#d9d4e8] bg-white text-sm font-semibold text-[#6b668f]">
                  Week
                </button>
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyOrders}>
                    <CartesianGrid stroke="#e7e2f3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#777681", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#777681", fontSize: 12 }}
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
                      fill="#4F46E5"
                      radius={[6, 6, 0, 0]}
                      barSize={22}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#1f2430] mb-5">
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
                        <span className="text-sm font-medium text-[#4b5563]">
                          {channel.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#111827]">
                        {channel.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#1f2430]">
                Revenue Trend
              </h3>
              <button className="px-3 py-1.5 rounded-sm border border-[#d9d4e8] bg-white text-sm font-semibold text-[#6b668f]">
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
                        stopColor="#4F46E5"
                        stopOpacity={0.28}
                      />
                      <stop
                        offset="95%"
                        stopColor="#4F46E5"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e7e2f3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#777681", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#777681", fontSize: 12 }}
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
                    stroke="#4F46E5"
                    strokeWidth={3}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#d9d4e8] flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1f2430]">
                  Recent Orders
                </h3>
                <p className="text-sm text-[#777681] mt-1">
                  Latest customer purchases and payment status.
                </p>
              </div>
              <button className="text-[#777681] hover:text-[#4f46e5]">
                •••
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead className="bg-[#f8f8fa] border-b border-[#d9d4e8]">
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
                        className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d9d4e8]">
                  {visibleRows.map((row, index) => (
                    <tr key={`${row.id}-${index}`}>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">
                        {row.product}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#777681]">
                        #{row.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">
                        {row.customer}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#111827]">
                        {row.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#777681]">
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

            <div className="px-6 py-4 border-t border-[#d9d4e8] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-[#777681]">
                Showing {tableRows.length === 0 ? 0 : startIdx + 1} to{" "}
                {Math.min(startIdx + itemsPerPage, tableRows.length)} of{" "}
                {tableRows.length} orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-sm border border-[#d9d4e8] bg-white text-sm font-semibold text-[#6b668f] disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-sm border border-[#d9d4e8] bg-white text-sm font-semibold text-[#6b668f] disabled:opacity-50"
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
