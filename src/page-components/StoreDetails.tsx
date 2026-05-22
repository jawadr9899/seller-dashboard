"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/cards/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { navigationItems, bottomTabs } from "@/config/navigation";
import { Badge } from "@/components/custom-ui/Badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/custom-ui/Button";
import { Input } from "@/components/custom-ui/Input";

export const StoreDetails: React.FC<{ id: string }> = ({ id }) => {
  const { stores } = useAppSelector((state) => state.stores);
  const store = stores.find((s) => s.id === id) || stores[0]; // fallback to first if not found

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: store?.name || "",
    type: store?.type || "",
    logo: store?.logo || "",
  });

  if (!store) {
    return <div>Store not found</div>;
  }

  const handleUpdate = () => {
    // In a real app we would dispatch an update here:
    // dispatch(updateStore({ id: store.id, ...formData }));

    // For visual purposes, we'll just close it
    setIsEditModalOpen(false);
    // show success toast maybe
  };

  // Generate some realistic dummy chart data based on the store's trend data or monthly earnings
  const chartData = store.trendData || [
    { date: "Week 1", value: store.monthlyEarnings * 0.22 },
    { date: "Week 2", value: store.monthlyEarnings * 0.25 },
    { date: "Week 3", value: store.monthlyEarnings * 0.24 },
    { date: "Week 4", value: store.monthlyEarnings * 0.29 },
  ];

  return (
    <div className="flex bg-[#f4f5f8]">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Link
            href="/stores"
            className="inline-flex items-center text-gray-500 hover:text-[#3b35d6] text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Stores
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-6 rounded-lg border border-[#d9d4e8] shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={store.logo}
                alt={store.name}
                className="w-20 h-20 rounded-xl border border-[#d9d4e8] shadow-sm object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {store.name}
                </h1>
                <p className="text-gray-500 font-medium mb-2">{store.type}</p>
                <div className="flex items-center gap-2">
                  <Badge
                    color={store.status === "ACTIVE" ? "primary" : "gray"}
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold shadow-none"
                  >
                    {store.status}
                  </Badge>
                  <span
                    className={`text-sm font-semibold ${store.trendPct > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {store.trendPct > 0 ? "↗" : "↘"} {Math.abs(store.trendPct)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Store
              </Button>
              <Button variant="primary">Manage Items</Button>
            </div>
          </div>

          <PageHeader title="Store Analytics" label="PERFORMANCE OVERVIEW" />

          {isEditModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                className="absolute inset-0 bg-[#1f2430]/40"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close edit store modal"
              />
              <div className="relative w-full max-w-md bg-[#fbf7ff] border border-[#d9d4e8] rounded-lg shadow-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827]">
                      Edit Store Details
                    </h3>
                    <p className="text-sm text-[#7a7890] mt-1">
                      Update your store information and branding.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="w-9 h-9 rounded-sm border border-[#d9d4e8] bg-white text-[#6b668f] hover:text-[#3b35d6]"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid gap-4 py-2">
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-semibold">
                      Store Logo Image
                    </label>
                    <div className="flex items-center gap-4">
                      <img
                        src={formData.logo}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover border border-[#d9d4e8]"
                      />
                      <Input
                        value={formData.logo}
                        onChange={(e) =>
                          setFormData({ ...formData, logo: e.target.value })
                        }
                        placeholder="Image URL"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Store Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Store Category
                    </label>
                    <Input
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleUpdate}>
                    Update Details
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Monthly Earnings"
              value={`Rs. ${store.monthlyEarnings.toLocaleString()}`}
              trend={`${store.trendPct}%`}
              trendUp={store.trendPct > 0}
            />
            <StatCard
              label="Active Orders"
              value={store.activeOrders}
              trend="+2 today"
              trendUp={true}
            />
            <StatCard
              label="Conversion Rate"
              value="4.8%"
              trend="+0.3%"
              featured
              trendUp={true}
            />
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg shadow-sm border border-[#d9d4e8] p-4 md:p-6 mb-6 transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `Rs. ${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: any) => [`Rs. ${value}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00BCD4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
