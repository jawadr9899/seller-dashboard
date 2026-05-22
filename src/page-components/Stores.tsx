"use client";

import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { navigationItems, bottomTabs } from "@/config/navigation";

export const Stores: React.FC = () => {
  const { stores } = useAppSelector((state) => state.stores);
  const store = stores[0];
  const [activeTab, setActiveTab] = useState<"orders" | "commission">("orders");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const orderHistory = useMemo(
    () => [
      {
        id: "#ORD-0921",
        date: "Oct 24, 2023",
        customer: "Sarah Jenkins",
        amount: "$124.50",
        status: "Delivered",
      },
      {
        id: "#ORD-0920",
        date: "Oct 23, 2023",
        customer: "Michael Chen",
        amount: "$45.00",
        status: "Delivered",
      },
      {
        id: "#ORD-0919",
        date: "Oct 23, 2023",
        customer: "Emma Thompson",
        amount: "$89.99",
        status: "Processing",
      },
      {
        id: "#ORD-0918",
        date: "Oct 22, 2023",
        customer: "David Wilson",
        amount: "$210.00",
        status: "Cancelled",
      },
      {
        id: "#ORD-0917",
        date: "Oct 21, 2023",
        customer: "Noah Khan",
        amount: "$58.25",
        status: "Delivered",
      },
    ],
    [],
  );

  const commissionHistory = useMemo(
    () => [
      {
        id: "#COM-3201",
        date: "Oct 24, 2023",
        customer: "Platform Fee",
        amount: "$12.50",
        status: "Settled",
      },
      {
        id: "#COM-3200",
        date: "Oct 23, 2023",
        customer: "Delivery Fee",
        amount: "$8.00",
        status: "Settled",
      },
      {
        id: "#COM-3199",
        date: "Oct 22, 2023",
        customer: "Refund Adjustment",
        amount: "$4.25",
        status: "Pending",
      },
      {
        id: "#COM-3198",
        date: "Oct 21, 2023",
        customer: "Campaign Fee",
        amount: "$10.00",
        status: "Settled",
      },
    ],
    [],
  );

  const rows = activeTab === "orders" ? orderHistory : commissionHistory;
  const totalPages = Math.max(1, Math.ceil(rows.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleRows = rows.slice(startIdx, startIdx + itemsPerPage);

  if (!store) return null;

  const statusStyles: Record<string, string> = {
    Delivered: "bg-[#dcf7e9] text-[#1b8f5a] border border-[#a8e8c8]",
    Processing: "bg-[#fff1d6] text-[#b9821c] border border-[#ffdca3]",
    Cancelled: "bg-[#fde4e4] text-[#cf3c3c] border border-[#f5b5b5]",
    Settled: "bg-[#dcf7e9] text-[#1b8f5a] border border-[#a8e8c8]",
    Pending: "bg-[#f2f0ff] text-[#6b668f] border border-[#d9d4e8]",
  };

  return (
    <div className="flex min-h-screen bg-[#f6f4ff]">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1f2430]">
              Store Management
            </h1>
            <p className="text-sm text-[#777681] mt-2">
              Monitor your main storefront, inventory footprint, category mix,
              and order activity.
            </p>
          </div>

          <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={store.logo}
                alt={store.name}
                className="w-16 h-16 rounded-lg border border-[#d9d4e8] object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-[#1f2430]">
                  {store.name}
                </h2>
                <p className="text-sm text-[#777681] mt-1">
                  organic.valley@example.com · +1 (555) 019-8234
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dcf7e9] text-[#1b8f5a] border border-[#a8e8c8] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b8f5a]" />
                  Active Store
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              ["Total Products", "342"],
              ["Categories", "18"],
              ["Total Orders", store.activeOrders.toString()],
              ["Total Revenue", `$${store.monthlyEarnings.toLocaleString()}`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg p-5 shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-widest text-[#777681] font-semibold">
                  {label}
                </p>
                <p className="text-2xl font-bold mt-3 text-[#111827]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 md:px-6 pt-4 border-b border-[#d9d4e8] flex items-center gap-6">
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setCurrentPage(1);
                }}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "orders"
                    ? "text-[#4f46e5] border-[#4f46e5]"
                    : "text-[#777681] border-transparent"
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => {
                  setActiveTab("commission");
                  setCurrentPage(1);
                }}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "commission"
                    ? "text-[#4f46e5] border-[#4f46e5]"
                    : "text-[#777681] border-transparent"
                }`}
              >
                Commission History
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px]">
                <thead className="bg-[#f8f8fa] border-b border-[#d9d4e8]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]">
                      {activeTab === "orders" ? "Order ID" : "Record ID"}
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]">
                      {activeTab === "orders" ? "Customer" : "Entity"}
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-widest text-[#777681]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d9d4e8]">
                  {visibleRows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4 text-sm font-semibold text-[#4f46e5]">
                        {row.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#4b5563]">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#111827]">
                        {row.customer}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#111827] font-medium">
                        {row.amount}
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
                Showing {rows.length === 0 ? 0 : startIdx + 1} to{" "}
                {Math.min(startIdx + itemsPerPage, rows.length)} of{" "}
                {rows.length} entries
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
