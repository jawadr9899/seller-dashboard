"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { navigationItems, bottomTabs } from "@/config/navigation";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const settingsCards = [
    {
      id: "profile",
      title: "Profile",
      description: "Personal info, contact details, and preferences.",
      icon: <UserIcon />,
    },
    {
      id: "store",
      title: "Store Details",
      description: "Platform, storefront, address, and store metadata.",
      icon: <StoreIcon />,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Email, SMS, and marketing alerts preferences.",
      icon: <BellIcon />,
    },
    {
      id: "payouts",
      title: "Bank & Payouts",
      description: "Link wallets, cards, and payout schedules.",
      icon: <BankIcon />,
    },
    {
      id: "security",
      title: "Security",
      description: "Passwords, 2FA, and identity verification.",
      icon: <ShieldIcon />,
    },
  ];

  const digitalBanks = [
    "JazzCash (Mobilink Microfinance Bank)",
    "Easypaisa (Telenor Microfinance Bank)",
    "NayaPay",
    "SadaPay",
    "Zindigi (JS Bank)",
    "UBL Omni",
    "HBL Konnect",
    "Upaisa (U Microfinance Bank)",
    "Keenu",
    "FINJA",
  ];

  const walletProviders = [
    "JazzCash",
    "Easypaisa",
    "NayaPay",
    "SadaPay",
    "Zindigi",
    "UBL Omni",
    "HBL Konnect",
    "Upaisa",
    "Keenu",
    "FINJA",
  ];

  return (
    <div className="flex bg-white min-h-screen font-sans relative">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0 overflow-y-auto relative z-10">
        <div className="w-full relative z-10">
          <div className="w-full">
            <div className="w-full p-6 md:p-10">
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#002b3d]">
                      Settings Overview
                    </h3>
                    <p className="text-[#7da2a9] text-sm font-medium mt-2">
                      Choose a category to manage your account and store.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {settingsCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => setActiveTab(card.id)}
                        className="group text-left bg-[#fcfdfd] border border-gray-100 rounded-[24px] p-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,163,180,0.2)] hover:border-[#00a3b4]/40 transition-all"
                      >
                        <div className="w-12 h-12 rounded-[14px] bg-[#e9f6f8] text-[#00a3b4] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                          {card.icon}
                        </div>
                        <h4 className="text-lg font-bold text-[#002b3d] mb-2">
                          {card.title}
                        </h4>
                        <p className="text-sm text-[#7da2a9] font-medium">
                          {card.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="flex items-center gap-2 text-sm font-bold text-[#00a3b4] hover:text-[#007489] transition-colors"
                    >
                      <span className="text-lg">←</span>
                      Back to Settings
                    </button>
                    <button className="gradient-cyan-purple text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,163,180,0.3)] hover:shadow-[0_6px_25px_rgba(0,163,180,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#002b3d] mb-6">
                    Profile Information
                  </h3>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-10">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-[20px] bg-gradient-to-tr from-[#00a3b4] to-[#007489] p-[2px]">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="Profile"
                          className="w-full h-full rounded-[18px] border-2 border-white object-cover"
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-[#00a3b4] hover:bg-gray-50 transition-colors">
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002b3d] text-lg">
                        Jawad
                      </h4>
                      <p className="text-[#7da2a9] text-sm font-medium mb-3">
                        Owner & Admin
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 rounded-full bg-[#f4f7f8] text-[#00a3b4] text-xs font-bold hover:bg-[#e4ebed] transition-colors">
                          Change Picture
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold text-[#002b3d] mb-4">
                        Basic Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            First Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Jawad"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Last Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Khan"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Display Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Jawad Khan"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Designation
                          </label>
                          <input
                            type="text"
                            defaultValue="Owner & Admin"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#002b3d] mb-4">
                        Contact & Preferences
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue="jawad@example.com"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            defaultValue="+92 300 1234567"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            defaultValue="+92 300 9876543"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Time Zone
                          </label>
                          <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                            <option>Pakistan Standard Time (PKT)</option>
                            <option>Gulf Standard Time (GST)</option>
                            <option>GMT (UTC +0)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Preferred Language
                          </label>
                          <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                            <option>English</option>
                            <option>Urdu</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            City
                          </label>
                          <input
                            type="text"
                            defaultValue="Lahore"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                            Country
                          </label>
                          <input
                            type="text"
                            defaultValue="Pakistan"
                            className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Block A, Gulberg, Lahore, Punjab"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* STORE DETAILS TAB */}
              {activeTab === "store" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="flex items-center gap-2 text-sm font-bold text-[#00a3b4] hover:text-[#007489] transition-colors"
                    >
                      <span className="text-lg">←</span>
                      Back to Settings
                    </button>
                    <button className="gradient-cyan-purple text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,163,180,0.3)] hover:shadow-[0_6px_25px_rgba(0,163,180,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#002b3d] mb-2">
                    Store Details
                  </h3>
                  <p className="text-[#7da2a9] text-sm font-medium mb-6">
                    Keep your storefront info up to date, including your
                    platform (Shopify, WooCommerce, etc.) and public URL.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Store Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Green Pantry Organic"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Store Platform
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          <option>Shopify</option>
                          <option>WooCommerce</option>
                          <option>Magento</option>
                          <option>BigCommerce</option>
                          <option>Daraz</option>
                          <option>Custom Storefront</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Storefront URL
                        </label>
                        <input
                          type="url"
                          defaultValue="https://greenpantry.pk"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Store ID
                        </label>
                        <input
                          type="text"
                          defaultValue="GP-2024-001"
                          disabled
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 font-medium cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Base Currency
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          <option>PKR (Rs)</option>
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Primary Category
                      </label>
                      <input
                        type="text"
                        defaultValue="Organic Groceries"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Store Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="An online store offering fresh, organic essentials delivered across Pakistan."
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all resize-none"
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Store Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="15-A, Main Boulevard, Gulberg, Lahore"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="flex items-center gap-2 text-sm font-bold text-[#00a3b4] hover:text-[#007489] transition-colors"
                    >
                      <span className="text-lg">←</span>
                      Back to Settings
                    </button>
                    <button className="gradient-cyan-purple text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,163,180,0.3)] hover:shadow-[0_6px_25px_rgba(0,163,180,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#002b3d] mb-6">
                    Notification Preferences
                  </h3>

                  <div className="space-y-6">
                    <ToggleItem
                      title="Order Updates"
                      description="Receive notifications when a new order is placed."
                      defaultChecked={true}
                    />
                    <div className="h-px w-full bg-gray-100"></div>
                    <ToggleItem
                      title="Inventory Alerts"
                      description="Get notified when products are running low on stock."
                      defaultChecked={true}
                    />
                    <div className="h-px w-full bg-gray-100"></div>
                    <ToggleItem
                      title="Marketing & Promos"
                      description="Receive tips, feature updates, and offers."
                      defaultChecked={false}
                    />
                    <div className="h-px w-full bg-gray-100"></div>
                    <ToggleItem
                      title="SMS Notifications"
                      description="Receive urgent alerts directly to your phone."
                      defaultChecked={true}
                    />
                  </div>
                </div>
              )}

              {/* PAYOUTS TAB */}
              {activeTab === "payouts" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="flex items-center gap-2 text-sm font-bold text-[#00a3b4] hover:text-[#007489] transition-colors"
                    >
                      <span className="text-lg">←</span>
                      Back to Settings
                    </button>
                    <button className="gradient-cyan-purple text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,163,180,0.3)] hover:shadow-[0_6px_25px_rgba(0,163,180,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#002b3d] mb-2">
                    Bank & Payouts
                  </h3>
                  <p className="text-[#7da2a9] text-sm font-medium mb-6">
                    Add a Pakistani digital bank or wallet for payouts, or link
                    a VISA/Mastercard/UnionPay card.
                  </p>

                  {/* Current Active Bank Card */}
                  <div className="gradient-cyan-purple rounded-[24px] p-6 text-white mb-8 relative overflow-hidden shadow-lg">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <BankIcon width={100} height={100} />
                    </div>
                    <div className="relative z-10">
                      <p className="text-white/60 text-sm font-bold tracking-wider uppercase mb-1">
                        Active Payout Account
                      </p>
                      <h4 className="text-2xl font-bold mb-6">
                        JazzCash (Mobile Wallet)
                      </h4>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/60 text-xs font-medium mb-1">
                            Linked Mobile
                          </p>
                          <p className="font-mono text-lg tracking-widest">
                            +92 300 1234567
                          </p>
                        </div>
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[#002b3d] text-sm mb-3">
                        Supported Digital Banks & Wallets
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {digitalBanks.map((bank) => (
                          <span
                            key={bank}
                            className="px-3 py-1 rounded-full bg-[#f4f7f8] text-[#002b3d] text-xs font-semibold"
                          >
                            {bank}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Jawad Khan"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Bank / Wallet Provider
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          {digitalBanks.map((bank) => (
                            <option key={bank}>{bank}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Card Network
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          <option>VISA</option>
                          <option>Mastercard</option>
                          <option>UnionPay</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Wallet Provider
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          {walletProviders.map((provider) => (
                            <option key={provider}>{provider}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Linked Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+92 3xx xxxxxxx"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          IBAN / Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="PK00 ABPA 0000 0000 0000 0000"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Payout Schedule
                        </label>
                        <select className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all appearance-none">
                          <option>Every day</option>
                          <option>Every week (Monday)</option>
                          <option>Every month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="flex items-center gap-2 text-sm font-bold text-[#00a3b4] hover:text-[#007489] transition-colors"
                    >
                      <span className="text-lg">←</span>
                      Back to Settings
                    </button>
                    <button className="gradient-cyan-purple text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_15px_rgba(0,163,180,0.3)] hover:shadow-[0_6px_25px_rgba(0,163,180,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#002b3d] mb-6">
                    Security & Login
                  </h3>

                  <div className="grid grid-cols-1 gap-6 mb-10">
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <button className="bg-gray-100 text-[#002b3d] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div>
                      <h4 className="font-bold text-[#002b3d] text-lg">
                        CNIC & Identity Details
                      </h4>
                      <p className="text-sm text-[#7da2a9] font-medium mt-1">
                        Add your CNIC information for compliance and payouts.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Full Name (as per CNIC)
                        </label>
                        <input
                          type="text"
                          defaultValue="Jawad Khan"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          CNIC Number
                        </label>
                        <input
                          type="text"
                          placeholder="12345-1234567-1"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                          CNIC Expiry Date
                        </label>
                        <input
                          type="date"
                          className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                        CNIC Address
                      </label>
                      <textarea
                        rows={3}
                        placeholder="As per CNIC"
                        className="w-full bg-[#fcfdfd] border border-gray-200 rounded-xl px-4 py-3 text-[#002b3d] font-medium focus:outline-none focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-100 mb-8"></div>

                  <h4 className="font-bold text-[#002b3d] text-lg mb-4">
                    Two-Factor Authentication
                  </h4>
                  <div className="flex items-center justify-between p-5 rounded-[20px] border border-[#00a3b4]/30 bg-[#00a3b4]/5">
                    <div>
                      <p className="font-bold text-[#002b3d]">
                        Protect your account
                      </p>
                      <p className="text-sm text-[#7da2a9] font-medium mt-1">
                        Add an extra layer of security requiring a code at
                        login.
                      </p>
                    </div>
                    <button className="gradient-cyan-purple text-white px-5 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all shrink-0">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Action Button Fixed Bottom */}
          <div className="md:hidden fixed bottom-[80px] left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <button className="w-full gradient-cyan-purple text-white px-6 py-3.5 rounded-full font-bold shadow-[0_4px_15px_rgba(0,163,180,0.3)]">
              Save Changes
            </button>
          </div>
        </div>
      </main>

      <div className="z-50 relative">
        <BottomTabBar items={bottomTabs} />
      </div>
    </div>
  );
}

// ---------------- UI Components ----------------

function ToggleItem({
  title,
  description,
  defaultChecked,
}: {
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h4 className="font-bold text-[#002b3d]">{title}</h4>
        <p className="text-sm text-[#7da2a9] font-medium mt-1">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 shrink-0 ${checked ? "bg-[#00a3b4]" : "bg-gray-300"}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-300 ${checked ? "left-7" : "left-1"}`}
        ></div>
      </button>
    </div>
  );
}

// ---------------- Icons ----------------

const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const StoreIcon = () => (
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
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const BellIcon = () => (
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
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const BankIcon = ({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    width={width}
    height={height}
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const ShieldIcon = () => (
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
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);
