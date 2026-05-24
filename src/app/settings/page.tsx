"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { navigationItems, bottomTabs } from "@/config/navigation";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("jazzcash");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathSection = pathname.startsWith("/settings/")
      ? pathname.split("/")[2]
      : null;
    const querySection = searchParams.get("section");

    const rawSection = pathSection || querySection || "account";

    const normalizedSection =
      rawSection === "payments"
        ? "payouts"
        : rawSection === "privacy"
          ? "security"
          : rawSection;

    const allowedSections = [
      "account",
      "store",
      "notifications",
      "payouts",
      "security",
    ];

    if (allowedSections.includes(normalizedSection)) {
      setActiveSection(normalizedSection);
    }
  }, [pathname, searchParams]);

  return (
    <div className="relative flex min-h-screen bg-gray-50 font-sans">
      <Sidebar items={navigationItems} />

      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
          <div className="rounded-2xl border border-ok-border-brand bg-linear-to-r from-white via-ok-brand-subtle to-white p-6 shadow-sm backdrop-blur-xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Settings
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account, store, notifications, payouts, and security.
            </p>
          </div>

          <section className="mt-6 space-y-8">
            {activeSection === "account" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <SettingsSection
                  title="Profile Photo"
                  description="Upload a clear profile photo for your account."
                >
                  <div className="flex items-center gap-6">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm"
                    />
                    <div className="flex gap-3">
                      <button className="rounded-lg bg-ok-brand px-4 py-2 text-sm font-semibold text-white hover:bg-ok-brand-hover transition-colors">
                        Change Photo
                      </button>
                      <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Personal Information"
                  description="Keep your personal details up to date."
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField label="First Name" defaultValue="Ahmed" />
                      <FormField label="Last Name" defaultValue="Khan" />
                    </div>
                    <FormField label="Display Name" defaultValue="Ahmed Ali" />
                    <FormField
                      label="Email Address"
                      type="email"
                      defaultValue="ahmed@example.com"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        label="Phone Number"
                        type="tel"
                        defaultValue="+92 300 1234567"
                      />
                      <FormField
                        label="WhatsApp Number"
                        type="tel"
                        defaultValue="+92 300 9876543"
                      />
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Location & Preferences"
                  description="Set regional and language preferences."
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField label="City" defaultValue="Lahore" />
                      <FormField label="Country" defaultValue="Pakistan" />
                    </div>
                    <FormField
                      label="Address"
                      type="textarea"
                      defaultValue="Block A, Gulberg, Lahore, Punjab"
                      rows={3}
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormSelect
                        label="Time Zone"
                        defaultValue="PKT"
                        options={[
                          {
                            value: "PKT",
                            label: "Pakistan Standard Time (PKT)",
                          },
                          { value: "GST", label: "Gulf Standard Time (GST)" },
                          { value: "GMT", label: "GMT (UTC +0)" },
                        ]}
                      />
                      <FormSelect
                        label="Language"
                        defaultValue="en"
                        options={[
                          { value: "en", label: "English" },
                          { value: "ur", label: "Urdu" },
                        ]}
                      />
                    </div>
                  </div>
                </SettingsSection>

                <ActionBar buttonText="Save Changes" />
              </div>
            )}

            {activeSection === "store" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <SettingsSection
                  title="Store Information"
                  description="Manage your storefront details and public profile."
                >
                  <div className="space-y-5">
                    <FormField
                      label="Store Name"
                      defaultValue="Green Pantry Organic"
                    />
                    <FormField
                      label="Store Description"
                      type="textarea"
                      defaultValue="An online store offering fresh, organic essentials delivered across Pakistan."
                      rows={4}
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormSelect
                        label="Store Platform"
                        defaultValue="shopify"
                        options={[
                          { value: "shopify", label: "Shopify" },
                          { value: "woocommerce", label: "WooCommerce" },
                          { value: "magento", label: "Magento" },
                          { value: "bigcommerce", label: "BigCommerce" },
                          { value: "daraz", label: "Daraz" },
                          { value: "custom", label: "Custom Storefront" },
                        ]}
                      />
                      <FormField
                        label="Storefront URL"
                        type="url"
                        defaultValue="https://greenpantry.pk"
                      />
                    </div>
                    <FormField
                      label="Primary Category"
                      defaultValue="Organic Groceries"
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Business Details"
                  description="Store identifier, currency, and registered address."
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        label="Store ID"
                        defaultValue="GP-2024-001"
                        disabled
                        helpText="This is your unique store identifier."
                      />
                      <FormSelect
                        label="Base Currency"
                        defaultValue="PKR"
                        options={[
                          { value: "PKR", label: "PKR (Rs)" },
                          { value: "USD", label: "USD ($)" },
                          { value: "EUR", label: "EUR (€)" },
                          { value: "GBP", label: "GBP (£)" },
                        ]}
                      />
                    </div>
                    <FormField
                      label="Store Address"
                      type="textarea"
                      defaultValue="15-A, Main Boulevard, Gulberg, Lahore"
                      rows={3}
                    />
                  </div>
                </SettingsSection>

                <ActionBar buttonText="Save Changes" />
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <SettingsSection
                  title="Email Notifications"
                  description="Control which email updates you receive."
                >
                  <div className="space-y-4">
                    <ToggleSetting
                      title="Order Updates"
                      description="Receive emails for every new order."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Payment Confirmations"
                      description="Get confirmations when payouts are processed."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Weekly Reports"
                      description="Receive a weekly performance summary."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Marketing & Promotions"
                      description="Get product tips, updates, and offers."
                      defaultChecked={false}
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Push Notifications"
                  description="Manage in-app and mobile push alerts."
                >
                  <div className="space-y-4">
                    <ToggleSetting
                      title="Real-time Order Alerts"
                      description="Instant push for incoming orders."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Customer Messages"
                      description="Notify when customers send chat messages."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Inventory Alerts"
                      description="Notify when stock runs low."
                      defaultChecked
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="SMS Notifications"
                  description="Use SMS only for urgent operational updates."
                >
                  <div className="space-y-4">
                    <ToggleSetting
                      title="Critical Alerts"
                      description="SMS for urgent issues like payment failures."
                      defaultChecked
                    />
                    <ToggleSetting
                      title="Daily Summary"
                      description="Receive a daily SMS order recap."
                      defaultChecked={false}
                    />
                  </div>
                </SettingsSection>

                <ActionBar buttonText="Save Preferences" />
              </div>
            )}

            {activeSection === "payouts" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <SettingsSection
                  title="Active Payout Method"
                  description="Your currently connected payout account."
                >
                  <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-purple-600 to-purple-500 p-6 text-white">
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                          Primary Payout Account
                        </p>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                          Verified
                        </span>
                      </div>
                      <h4 className="mb-6 text-2xl font-bold">
                        JazzCash Wallet
                      </h4>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-white/70">Linked Mobile</p>
                          <p className="font-mono text-lg tracking-wide">
                            +92 300 1234567
                          </p>
                        </div>
                        <button className="text-sm font-semibold text-white underline">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Select a Payment Method"
                  description="Choose where you want to receive payouts."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        id: "jazzcash",
                        title: "JazzCash",
                        subtitle: "Pay via JazzCash",
                        logo: <JazzCashLogo />,
                      },
                      {
                        id: "easypaisa",
                        title: "EasyPaisa",
                        subtitle: "Pay via EasyPaisa",
                        logo: <EasyPaisaLogo />,
                      },
                      {
                        id: "nayapay",
                        title: "NayaPay",
                        subtitle: "Pay via NayaPay",
                        logo: <NayaPayLogo />,
                      },
                      {
                        id: "bank",
                        title: "Banks",
                        subtitle: "Pay via Bank Transfer",
                        logo: <RealBankLogo />,
                      },
                    ].map((method) => {
                      const active = selectedPaymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`rounded-xl border px-4 py-5 text-left transition-all ${
                            active
                              ? "border-ok-brand bg-ok-brand-subtle shadow-sm"
                              : "border-ok-border bg-white hover:border-ok-border-brand hover:bg-ok-brand-ghost/50"
                          }`}
                        >
                          <div className="mb-4">{method.logo}</div>
                          <p className="text-sm font-bold text-ok-heading">
                            {method.title}
                          </p>
                          <p className="mt-1 text-xs text-ok-text-muted">
                            {method.subtitle}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Bank Account Details"
                  description="Add or update your payout account details."
                >
                  <div className="space-y-5">
                    <FormField
                      label="Account Holder Name"
                      defaultValue="Ahmed Khan"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormSelect
                        label="Bank / Wallet Provider"
                        defaultValue="jazzcash"
                        options={[
                          { value: "jazzcash", label: "JazzCash (Mobilink)" },
                          {
                            value: "easypaisa",
                            label: "Easypaisa (Telenor)",
                          },
                          { value: "nayapay", label: "NayaPay" },
                          { value: "sadapay", label: "SadaPay" },
                          { value: "zindigi", label: "Zindigi (JS Bank)" },
                          { value: "ublomni", label: "UBL Omni" },
                          { value: "hblkonnect", label: "HBL Konnect" },
                        ]}
                      />
                      <FormField
                        label="Linked Mobile Number"
                        type="tel"
                        defaultValue="+92 300 1234567"
                      />
                    </div>
                    <FormField
                      label="IBAN / Account Number"
                      placeholder="PK00 ABPA 0000 0000 0000 0000"
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Card Details (Optional)"
                  description="Link a VISA, Mastercard, or UnionPay card."
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormSelect
                      label="Card Network"
                      defaultValue=""
                      options={[
                        { value: "", label: "Select card type" },
                        { value: "visa", label: "VISA" },
                        { value: "mastercard", label: "Mastercard" },
                        { value: "unionpay", label: "UnionPay" },
                      ]}
                    />
                    <FormField
                      label="Card Number"
                      placeholder="•••• •••• •••• ••••"
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Payout Schedule"
                  description="Choose when funds are transferred to you."
                >
                  <FormSelect
                    label="Payout Frequency"
                    defaultValue="daily"
                    options={[
                      { value: "daily", label: "Every day" },
                      { value: "weekly", label: "Every week (Monday)" },
                      { value: "biweekly", label: "Every 2 weeks" },
                      { value: "monthly", label: "Every month" },
                    ]}
                  />
                </SettingsSection>

                <ActionBar buttonText="Save Payment Details" />
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <SettingsSection
                  title="Change Password"
                  description="Update your login password regularly."
                >
                  <div className="space-y-5">
                    <FormField
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                      />
                      <FormField
                        label="Confirm New Password"
                        type="password"
                        placeholder="Re-enter new password"
                      />
                    </div>
                    <button className="rounded-lg bg-ok-brand px-5 py-2 text-sm font-semibold text-white hover:bg-ok-brand-hover transition-colors">
                      Update Password
                    </button>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Two-Factor Authentication"
                  description="Add a verification step for better security."
                >
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ok-brand-subtle text-ok-brand shrink-0">
                        <ShieldIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Protect Your Account
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          Require a one-time code at sign-in to prevent
                          unauthorized access.
                        </p>
                        <button className="mt-4 rounded-lg bg-ok-brand px-5 py-2 text-sm font-semibold text-white hover:bg-ok-brand-hover transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Identity Verification"
                  description="CNIC details are required for compliance and payouts."
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField
                        label="Full Name (as per CNIC)"
                        defaultValue="Ahmed Khan"
                      />
                      <FormField
                        label="CNIC Number"
                        placeholder="12345-1234567-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <FormField label="Date of Birth" type="date" />
                      <FormField label="CNIC Expiry Date" type="date" />
                    </div>
                    <FormField
                      label="CNIC Address"
                      type="textarea"
                      placeholder="Address as per CNIC"
                      rows={3}
                    />
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Active Sessions"
                  description="Review devices currently logged into your account."
                >
                  <div className="space-y-3">
                    <SessionItem
                      device="Windows PC • Chrome"
                      location="Lahore, Pakistan"
                      lastActive="Active now"
                      current
                    />
                    <SessionItem
                      device="iPhone 14 • Safari"
                      location="Lahore, Pakistan"
                      lastActive="2 hours ago"
                    />
                    <SessionItem
                      device="iPad • Safari"
                      location="Karachi, Pakistan"
                      lastActive="1 day ago"
                    />
                  </div>
                  <button className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700">
                    Log out of all other sessions
                  </button>
                </SettingsSection>

                <ActionBar buttonText="Save Security Settings" />
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="relative z-50">
        <BottomTabBar items={bottomTabs} />
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ActionBar({ buttonText }: { buttonText: string }) {
  return (
    <div className="flex justify-end border-t border-gray-200 pt-4">
      <button className="rounded-lg bg-ok-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ok-brand-hover">
        {buttonText}
      </button>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  defaultValue = "",
  placeholder = "",
  disabled = false,
  rows,
  helpText,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  helpText?: string;
}) {
  const baseClasses = `w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-ok-brand ${
    disabled
      ? "cursor-not-allowed bg-gray-50 text-gray-500"
      : "bg-white text-gray-900"
  }`;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={rows || 3}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />
      )}
      {helpText ? (
        <p className="mt-1.5 text-xs text-gray-500">{helpText}</p>
      ) : null}
    </div>
  );
}

function FormSelect({
  label,
  defaultValue,
  options,
}: {
  label: string;
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 transition-all focus:border-transparent focus:ring-2 focus:ring-ok-brand"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleSetting({
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
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4">
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => setChecked((prev) => !prev)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-ok-brand" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SessionItem({
  device,
  location,
  lastActive,
  current = false,
}: {
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <p className="text-sm font-semibold text-gray-900">{device}</p>
        <p className="mt-1 text-sm text-gray-600">{location}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-700">{lastActive}</p>
        {current ? (
          <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            This device
          </span>
        ) : null}
      </div>
    </div>
  );
}

function JazzCashLogo() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-600 text-xs font-bold">
        J
      </span>
      <span className="text-lg font-extrabold tracking-tight text-pink-600">
        JazzCash
      </span>
    </div>
  );
}

function EasyPaisaLogo() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
        E
      </span>
      <span className="text-lg font-extrabold tracking-tight text-green-700">
        EasyPaisa
      </span>
    </div>
  );
}

function NayaPayLogo() {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
        N
      </span>
      <span className="text-lg font-extrabold tracking-tight text-sky-700">
        NayaPay
      </span>
    </div>
  );
}

function RealBankLogo() {
  return (
    <div className="inline-flex items-center gap-2 text-ok-brand">
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10h18" />
        <path d="M5 10v8" />
        <path d="M9 10v8" />
        <path d="M15 10v8" />
        <path d="M19 10v8" />
        <path d="M2 20h20" />
        <path d="M12 4l9 4H3l9-4z" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight">Bank</span>
    </div>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.6-4A12 12 0 0112 3a12 12 0 01-8.6 3A12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3z"
      />
    </svg>
  );
}
