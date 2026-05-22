'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { searchProducts, filterByCategory, clearFilters } from '@/store/slices/inventorySlice';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/custom-ui/Button';
import { Input } from '@/components/custom-ui/Input';
import { ProductRow } from '@/components/cards/ProductRow';

import { navigationItems, bottomTabs } from '@/config/navigation';





const categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery'];

import Link from 'next/link';

export const Inventory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts, selectedCategory, searchQuery } = useAppSelector((state) => state.inventory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  const handleSearch = (value: string) => {
    dispatch(searchProducts(value));
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      dispatch(clearFilters());
    } else {
      dispatch(filterByCategory(category));
    }
    setCurrentPage(1);
  };

  return (
    <div className="flex bg-[#f4f5f8]">
      <Sidebar items={navigationItems} />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <PageHeader
            title="Product Inventory"
            label="STORE MANAGEMENT"
            action={<Link href="/inventory/create"><Button size="md">+ Add Product</Button></Link>}
          />

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Search by product name, SKU or category..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#eeeaff]0 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={() => {
                      dispatch(clearFilters());
                      setCurrentPage(1);
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            {displayedProducts.length > 0 ? (
              <>
                <table className="w-full">
                  <thead className="border-b border-[#d9d4e8] bg-[#f4f5f8]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Product Details</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Stock Level</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.map((product) => (
                      <ProductRow key={product.sku} {...product} />
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="px-4 py-4 border-t border-[#d9d4e8] flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredProducts.length)} of{' '}
                    {filteredProducts.length}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            page === currentPage ? 'bg-[#eeeaff]0 text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomTabBar items={bottomTabs} />
    </div>
  );
};
