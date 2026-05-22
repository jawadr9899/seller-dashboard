"use client";

import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { navigationItems, bottomTabs } from "@/config/navigation";

const chartBars = [
  { month: "Jan", height: "h-16", tone: "bg-[#c8c7ff]" },
  { month: "Feb", height: "h-24", tone: "bg-[#c8c7ff]" },
  { month: "Mar", height: "h-20", tone: "bg-[#c8c7ff]" },
  { month: "Apr", height: "h-32", tone: "bg-[#c8c7ff]" },
  { month: "May", height: "h-36", tone: "bg-[#3b35d6]" },
  { month: "Jun", height: "h-28", tone: "bg-[#3b35d6]" },
  { month: "Jul", height: "h-40", tone: "bg-[#3b35d6]" },
  { month: "Aug", height: "h-32", tone: "bg-[#3b35d6]" },
  { month: "Sep", height: "h-20", tone: "bg-[#3b35d6]" },
  { month: "Oct", height: "h-16", tone: "bg-[#c8c7ff]" },
  { month: "Nov", height: "h-24", tone: "bg-[#c8c7ff]" },
  { month: "Dec", height: "h-28", tone: "bg-[#c8c7ff]" },
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
      iconBg: "bg-indigo-100",
      icon: (
        <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 10h18v2H3zm2 4h14v7H5zM7 4h10v3H7z" />
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
        <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 6h16v12H4zM6 8h12v2H6zm0 4h6v2H6z" />
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
        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 3l9 6-9 6-9-6 9-6zm-7 9h14v8H5z" />
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
        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5 4h14v16H5zM7 7h10v2H7zm0 4h10v2H7z" />
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
    <div className="flex min-h-screen bg-[#f4f6fb]">
      <Sidebar items={navigationItems} />
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1b1f2a]">
                Earnings Overview
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitor platform revenue, withdrawals, and marketplace
                performance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#d9d4e8] bg-white text-sm font-semibold text-gray-700">
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
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3b35d6] text-white text-sm font-semibold shadow-sm">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#fbf7ff] rounded-lg border border-[#d9d4e8] p-5 shadow-sm relative"
              >
                <span
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold ${card.changeTone}`}
                >
                  {card.change}
                </span>
                <div
                  className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center`}
                >
                  {card.icon}
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mt-4">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-[#1b1f2a] mt-2">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-[#fbf7ff] rounded-lg border border-[#d9d4e8] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#1b1f2a]">
                  Revenue Growth
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b35d6]" />
                    This Year
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c8c7ff]" />
                    Last Year
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-48">
                {chartBars.map((bar) => (
                  <div
                    key={bar.month}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-full rounded-lg ${bar.tone} ${bar.height}`}
                    />
                    <span className="text-xs text-gray-400 mt-3">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#fbf7ff] rounded-lg border border-[#d9d4e8] shadow-sm p-6">
              <h3 className="text-lg font-bold text-[#1b1f2a] mb-6">
                Source Breakdown
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-[6px] border-blue-100 border-t-[#3b35d6] flex items-center justify-center text-sm font-bold text-[#3b35d6]">
                    64%
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1b1f2a]">
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
                    <p className="text-sm font-semibold text-[#1b1f2a]">
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
                    <p className="text-sm font-semibold text-[#1b1f2a]">
                      Ad Revenue
                    </p>
                    <p className="text-sm text-gray-500">Rs. 17,981.50</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#d9d4e8] mt-6 pt-6">
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
                      <div className="h-full w-[92%] bg-[#3b35d6] rounded-full" />
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
          <div className="bg-[#fbf7ff] rounded-lg border border-[#d9d4e8] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-[#d9d4e8]">
              <h3 className="text-lg font-bold text-[#1b1f2a]">
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#d9d4e8] text-sm text-gray-700 focus:outline-none focus:border-[#3b35d6]"
                  />
                </div>
                <button className="w-10 h-10 rounded-lg border border-[#d9d4e8] flex items-center justify-center text-gray-500">
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
                <thead className="bg-[#f4f5f8]">
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
                        <tr key={txn.id} className="text-sm text-gray-700">
                          <td className="px-6 py-4 font-semibold text-[#1b1f2a]">
                            #{txn.id}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {txn.date}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200" />
                              <span className="font-semibold text-[#1b1f2a]">
                                {entity}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {typeList.map((type) => (
                                <span
                                  key={type}
                                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700"
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
                            <button className="w-9 h-9 rounded-full border border-[#d9d4e8] text-gray-500 hover:text-[#3b35d6]">
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
            <div className="px-6 py-4 border-t border-[#d9d4e8] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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
                  className="px-3 py-1.5 rounded-lg border border-[#d9d4e8] text-sm font-semibold text-gray-600 disabled:opacity-50"
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
                            ? "bg-[#3b35d6] text-white"
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
                  className="px-3 py-1.5 rounded-lg border border-[#d9d4e8] text-sm font-semibold text-gray-600 disabled:opacity-50"
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
