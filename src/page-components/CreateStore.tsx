'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { navigationItems } from '@/config/navigation';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';
import { UploadCloud } from 'lucide-react';

export const CreateStore: React.FC = () => {
  return (
    <div className="flex bg-ok-surface-alt min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar items={navigationItems} />
      </Suspense>

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/stores" className="text-gray-500 hover:text-gray-900 text-sm font-medium">&larr; Back to Stores</Link>
          </div>
          
          <PageHeader
            title="Create New Store"
            label="STORE MANAGEMENT"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2">Store Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Store Name</label>
                      <Input placeholder="e.g. Acme Clothing" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Store Handle/URL</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-ok-surface-alt text-gray-500 text-sm">
                          shop.com/
                        </span>
                        <input type="text" className="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-ok-brand focus:border-cyan-500" placeholder="acme-clothing" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea 
                        className="w-full h-32 p-3 border border-ok-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ok-brand text-sm"
                        placeholder="Tell your customers about this store..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2">Branding</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo (1:1 aspect ratio recommended)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 bg-ok-surface-alt">
                        <UploadCloud size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-900">Upload logo</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image (16:9 aspect ratio recommended)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-ok-surface-alt h-32">
                        <UploadCloud size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-900">Upload cover image</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900 mb-2">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Contact Email</label>
                      <Input type="email" placeholder="store@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <Input placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Store Status</h3>
                  <select className="w-full p-2 border border-ok-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ok-brand">
                    <option value="active">Active (Visible to public)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                    <option value="setup">Maintenance Mode / Setup</option>
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Store Managers</h3>
                  <p className="text-xs text-gray-500 mb-2">Assign staff members to manage this store's inventory and orders.</p>
                  <Button variant="outline" className="w-full text-sm">+ Add Staff</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Location Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Country/Region</label>
                      <Input defaultValue="United States" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Currency</label>
                      <Input defaultValue="PKR (Rs.)" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>
          
          <div className="mt-8 flex justify-end gap-3 border-t pt-6 border-ok-border">
            <Link href="/stores">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button variant="primary">Create Store Channel</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
