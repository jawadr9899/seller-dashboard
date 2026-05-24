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
} from "recharts";

const revenueGrowthData = [
  { month: "Jan", thisYear: 160, lastYear: 130 },
  { month: "Feb", thisYear: 240, lastYear: 180 },
  { month: "Mar", thisYear: 200, lastYear: 170 },
  { month: "Apr", thisYear: 320, lastYear: 240 },
  { month: "May", thisYear: 360, lastYear: 290 },
  { month: "Jun", thisYear: 280, lastYear: 220 },
  { month: "Jul", thisYear: 400, lastYear: 310 },
  { month: "Aug", thisYear: 320, lastYear: 260 },
  { month: "Sep", thisYear: 200, lastYear: 180 },
  { month: "Oct", thisYear: 160, lastYear: 140 },
  { month: "Nov", thisYear: 240, lastYear: 190 },
  { month: "Dec", thisYear: 280, lastYear: 230 },
];

const entityNames = [
  "FreshMart Lahore",
  "Usman Raza",
  "Daily Basket",
  "GreenLeaf Organics",
  "Metro Mart",
];

const typeBadges = [
  ["Order", "Payout"],
  ["Deposit"],
  ["Order", "Payout"],
  ["Refund"],
  ["Order"],
];

export const Earnings: React.FC = () => {
  const earnings = useAppSelector((state) => state.earnings);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString("en-US")}`;

  const statCards = [
    {
      title: "Total Balance",
      value: formatCurrency(earnings.totalBalance),
      change: "+12.5%",
      changeTone: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-ok-brand-subtle",
      icon: (
        <svg
          className="w-5 h-5 text-ok-brand"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M2 11h20" />
        </svg>
      ),
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(earnings.netProfit),
      change: "+8.2%",
      changeTone: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-orange-100",
      icon: (
        <svg
          className="w-5 h-5 text-orange-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 20h18" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-3" />
        </svg>
      ),
    },
    {
      title: "Avg. Order Value",
      value: formatCurrency(earnings.avgOrder),
      change: "-1.4%",
      changeTone: "bg-rose-100 text-rose-600",
      iconBg: "bg-purple-100",
      icon: (
        <svg
          className="w-5 h-5 text-purple-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7h18" />
          <path d="M7 7V5h10v2" />
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
    {
      title: "Total Withdrawals",
      value: formatCurrency(earnings.lastPayout.amount),
      change: "+3.2%",
      changeTone: "bg-emerald-100 text-emerald-700",
      iconBg: "bg-gray-100",
      icon: (
        <svg
          className="w-5 h-5 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v12" />
          <path d="m8 11 4 4 4-4" />
          <rect x="4" y="17" width="16" height="4" rx="1" />
        </svg>
      ),
    },
  ];

  const filteredTransactions = useMemo(() => {
    return earnings.transactions.filter((txn) =>
      `${txn.id} ${txn.orderId}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [earnings.transactions, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage),
  );
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedTransactions = filteredTransactions.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  return (
    <div className="flex min-h-screen bg-ok-earnings-bg">
      <Sidebar items={navigationItems} />
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-ok-heading">
                Earnings Overview
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor platform revenue, withdrawals, and marketplace
                performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ok-border bg-white text-sm font-semibold text-gray-700">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                  />
                </svg>
                Last 30 Days
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ok-brand hover:bg-ok-brand-hover text-white text-sm font-semibold shadow-sm transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                  />
                </svg>
                Export Report
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {statCards.map((card) => {
              const trendUp = !card.change.trim().startsWith("-");
              return (
                <div
                  key={card.title}
                  className="group relative bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] border border-ok-border-light gradient-border-hover transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-ok-text-faint tracking-wide">
                        {card.title}
                      </span>
                      <p className="text-2xl font-bold text-ok-heading mt-1.5 leading-tight">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    {trendUp ? (
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
                      className={`text-[11px] font-semibold ${trendUp ? "text-ok-success" : "text-ok-danger"}`}
                    >
                      {card.change}
                    </span>
                    <span className="text-[11px] text-ok-text-faint">
                      vs last month
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-ok-surface rounded-lg border border-ok-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-ok-heading">
                  Revenue Growth
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-ok-brand" />
                    This Year
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-ok-brand-muted" />
                    Last Year
                  </span>
                </div>
              </div>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueGrowthData} barGap={8}>
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
                      cursor={{ fill: "rgba(79,70,229,0.06)" }}
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #d9d4e8",
                        background: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="lastYear"
                      fill="var(--ok-brand-muted)"
                      radius={[6, 6, 0, 0]}
                      barSize={14}
                    />
                    <Bar
                      dataKey="thisYear"
                      fill="var(--ok-chart-bar)"
                      radius={[6, 6, 0, 0]}
                      barSize={14}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-ok-surface rounded-lg border border-ok-border shadow-sm p-6">
              <h3 className="text-lg font-bold text-ok-heading mb-6">
                Source Breakdown
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-[6px] border-blue-100 border-t-ok-brand flex items-center justify-center text-sm font-bold text-ok-brand">
                    64%
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ok-heading">
                      Platform Sales
                    </p>
                    <p className="text-sm text-gray-500">Rs. 82,195.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-[6px] border-emerald-100 border-t-emerald-600 flex items-center justify-center text-sm font-bold text-emerald-700">
                    22%
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ok-heading">
                      Vendor Fees
                    </p>
                    <p className="text-sm text-gray-500">Rs. 28,254.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-[6px] border-amber-100 border-t-amber-600 flex items-center justify-center text-sm font-bold text-amber-700">
                    14%
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ok-heading">
                      Ad Revenue
                    </p>
                    <p className="text-sm text-gray-500">Rs. 17,981.50</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-ok-border mt-6 pt-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Platform Performance
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                      <span>Target Reached</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[92%] bg-ok-brand rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                      <span>Market Share</span>
                      <span>48%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full w-[48%] bg-emerald-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-ok-surface rounded-lg border border-ok-border shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-ok-border">
              <h3 className="text-lg font-bold text-ok-heading">
                Recent Transactions
              </h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Filter transactions..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-ok-border text-sm text-gray-700 focus:outline-none focus:border-ok-brand"
                  />
                </div>
                <button className="w-10 h-10 rounded-lg border border-ok-border flex items-center justify-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6h18M6 12h12M10 18h4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full">
                <thead className="bg-ok-surface-alt">
                  <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-4 text-left">Transaction ID</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Entity</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayedTransactions.length > 0 ? (
                    displayedTransactions.map((txn, index) => {
                      const entity = entityNames[index % entityNames.length];
                      const typeList = typeBadges[index % typeBadges.length];
                      const statusTone =
                        txn.status === "SETTLED"
                          ? "bg-emerald-100 text-emerald-700"
                          : txn.status === "FAILED"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-gray-100 text-gray-500";
                      const amountTone =
                        txn.status === "FAILED"
                          ? "text-rose-600"
                          : "text-emerald-600";

                      return (
                        <tr
                          key={txn.id}
                          className="text-sm text-gray-700 transition-colors hover:bg-ok-brand/5"
                        >
                          <td className="px-6 py-4 font-semibold text-ok-heading">
                            #{txn.id}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {txn.date}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200" />
                              <span className="font-semibold text-ok-heading">
                                {entity}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {typeList.map((type) => (
                                <span
                                  key={type}
                                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-ok-brand-subtle text-ok-brand"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td
                            className={`px-6 py-4 font-semibold ${amountTone}`}
                          >
                            {txn.status === "FAILED" ? "-" : "+"}
                            {formatCurrency(txn.amount)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusTone}`}
                            >
                              {txn.status === "SETTLED"
                                ? "Completed"
                                : txn.status === "FAILED"
                                  ? "Failed"
                                  : "Pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="w-9 h-9 rounded-full border border-ok-border text-gray-500 hover:text-ok-brand">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-ok-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-gray-600">
                Showing {filteredTransactions.length === 0 ? 0 : startIdx + 1}{" "}
                to{" "}
                {Math.min(startIdx + itemsPerPage, filteredTransactions.length)}{" "}
                of {filteredTransactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-ok-border text-sm font-semibold text-gray-600 disabled:opacity-50"
                >
                  Prev
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                          page === currentPage
                            ? "bg-ok-brand text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-ok-border text-sm font-semibold text-gray-600 disabled:opacity-50"
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
