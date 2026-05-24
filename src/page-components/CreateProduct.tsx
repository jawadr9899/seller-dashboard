'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageHeader } from '@/components/layout/PageHeader';
import { navigationItems } from '@/config/navigation';
import { Card, CardContent } from '@/components/custom-ui/Card';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';

export const CreateProduct: React.FC = () => {
  return (
    <div className="flex bg-ok-surface-alt min-h-screen">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/inventory" className="text-gray-500 hover:text-gray-900 text-sm font-medium">&larr; Back to Inventory</Link>
          </div>
          
          <PageHeader
            title="Add Product"
            label="INVENTORY MANAGEMENT"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* Lhs Col */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input placeholder="Short sleeve t-shirt" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      className="w-full h-32 p-3 border border-ok-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ok-brand text-sm"
                      placeholder="Describe your product in detail..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Media</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-ok-surface-alt">
                    <UploadCloud size={48} className="text-gray-400 mb-4" />
                    <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Pricing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Price (Rs.)</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Compare at price</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="tax" className="rounded text-ok-brand" />
                    <label htmlFor="tax" className="text-sm text-gray-600">Charge tax on this product</label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Inventory</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">SKU (Stock Keeping Unit)</label>
                      <Input placeholder="e.g. TSHIRT-WHITE-M" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Barcode</label>
                      <Input placeholder="ISBN, UPC, GTIN" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-700">Quantity</label>
                    <Input type="number" placeholder="0" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rhs Col */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Status</h3>
                  <select className="w-full p-2 border border-ok-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ok-brand">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Publishing Channels</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" defaultChecked className="rounded text-ok-brand" />
                        Online Store
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" defaultChecked className="rounded text-ok-brand" />
                        Point of Sale
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-ok-brand" />
                        Shop App
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Product Organization</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Product category</label>
                      <Input placeholder="e.g. Clothing" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Vendor</label>
                      <Input placeholder="e.g. My Brand" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tags</label>
                      <Input placeholder="Press enter to add" />
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

          </div>

          <div className="mt-8 flex justify-end gap-3 border-t pt-6 border-ok-border">
            <Link href="/inventory">
              <Button variant="outline">Discard</Button>
            </Link>
            <Button variant="primary">Save Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
