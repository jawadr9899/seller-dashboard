'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Button } from '@/components/custom-ui/Button';

import { navigationItems, bottomTabs } from '@/config/navigation';





export default function SettingsPage() {
  return (
    <div className="flex bg-gray-50">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-3xl mx-auto">
          <PageHeader title="Settings" label="ACCOUNT & PREFERENCES" />

          {/* Account Settings */}
          <div className="space-y-6">
            {/* Profile Section */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-600">Update your shop details</p>
                </div>
                <Button variant="outline">Edit</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Manage your notification preferences</p>
                </div>
                <Button variant="outline">Manage</Button>
              </CardContent>
            </Card>

            {/* Bank & Payouts */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Bank & Payouts</h3>
                  <p className="text-sm text-gray-600">Update your payout account details</p>
                </div>
                <Button variant="outline">Update</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Security</h3>
                  <p className="text-sm text-gray-600">Change password and two-factor authentication</p>
                </div>
                <Button variant="outline">Update</Button>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card className="bg-red-50 border border-red-200">
              <CardContent className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-red-600">Sign Out</h3>
                  <p className="text-sm text-red-600/70">Exit your account</p>
                </div>
                <Button variant="danger">Logout</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
}
