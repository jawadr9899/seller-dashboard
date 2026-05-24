"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { dummyProducts } from "@/dummy/nearby-stores";

export default function NearbyStores() {
  const [activeTab, setActiveTab] = useState("nearby");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [selectedProductId, setSelectedProductId] = useState(
    dummyProducts[0]?.id ?? "",
  );

  const itemsPerPage = 8;
  const listRef = useRef<HTMLDivElement>(null);

  const allCategories = useMemo(() => {
    const cats = Array.from(
      new Set(dummyProducts.map((product) => product.category)),
    );
    return ["All", ...cats];
  }, []);

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newCats = selectedCategories.filter((c) => c !== "All");
      if (newCats.includes(category)) {
        newCats = newCats.filter((c) => c !== category);
        if (newCats.length === 0) newCats = ["All"];
      } else {
        newCats.push(category);
      }
      setSelectedCategories(newCats);
    }
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return dummyProducts.filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (
        !selectedCategories.includes("All") &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      const productDist = parseFloat(product.distance);
      if (productDist > maxDistance) {
        return false;
      }

      if (activeTab === "nearby" && productDist > 2.5) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, maxDistance, activeTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!currentProducts.length) {
      setSelectedProductId("");
      return;
    }

    if (!currentProducts.some((product) => product.id === selectedProductId)) {
      setSelectedProductId(currentProducts[0].id);
    }
  }, [currentProducts, selectedProductId]);

  const selectedProduct =
    currentProducts.find((product) => product.id === selectedProductId) ||
    filteredProducts[0];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ok-bg-alt px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-ok-border bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] min-h-[calc(100vh-3rem)]">
          {/* Left Filters */}
          <aside className="border-r border-ok-border bg-white p-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-ok-heading font-semibold">
                <span className="h-7 w-7 rounded-full bg-ok-brand-subtle text-ok-brand flex items-center justify-center text-xs font-bold">
                  OK
                </span>
                <span>Nearby Stores</span>
              </div>
              <div className="relative">
                <svg
                  className="w-4 h-4 text-ok-text-muted absolute left-3 top-3"
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
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-ok-border bg-white pl-9 pr-3 py-2 text-sm text-ok-text focus:outline-none focus:border-ok-brand"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-ok-heading mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {allCategories.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryToggle(cat)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "bg-ok-brand-subtle text-ok-brand"
                          : "text-ok-text-muted hover:bg-ok-brand-ghost hover:text-ok-brand"
                      }`}
                    >
                      <span>{cat}</span>
                      {active && <span className="text-xs">●</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-ok-border pt-4">
              <h3 className="text-sm font-semibold text-ok-heading mb-3">
                Filter by
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-ok-text-muted">
                  <span>Distance</span>
                  <span className="font-semibold text-ok-brand">
                    {maxDistance} km
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={maxDistance}
                  onChange={(e) => {
                    setMaxDistance(parseFloat(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-ok-brand"
                />
              </div>
            </div>
          </aside>

          {/* Middle List */}
          <section className="flex flex-col min-h-[70vh] bg-white border-r border-ok-border">
            <div className="px-6 py-4 border-b border-ok-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab("nearby");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeTab === "nearby"
                      ? "bg-ok-brand text-white"
                      : "bg-ok-brand-ghost text-ok-text-muted hover:text-ok-brand"
                  }`}
                >
                  Nearby
                </button>
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeTab === "all"
                      ? "bg-ok-brand text-white"
                      : "bg-ok-brand-ghost text-ok-text-muted hover:text-ok-brand"
                  }`}
                >
                  All Products
                </button>
              </div>
              <span className="text-xs text-ok-text-muted">
                {filteredProducts.length} results
              </span>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-5">
              {currentProducts.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-ok-text-muted">
                  No products found. Try adjusting filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentProducts.map((product) => {
                    const active = product.id === selectedProductId;
                    const roundedRating = Math.round(product.rating);
                    return (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProductId(product.id)}
                        className={`rounded-2xl border bg-white p-4 text-left transition-all ${
                          active
                            ? "border-ok-brand shadow-[0_10px_20px_rgba(79,70,229,0.12)]"
                            : "border-ok-border hover:border-ok-border-brand"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-ok-text-muted mb-3">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-3 w-3 ${
                                  i < roundedRating
                                    ? "text-ok-brand"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span>({product.reviews})</span>
                        </div>

                        <div className="flex items-center justify-center rounded-xl border border-ok-border bg-white p-6 mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-28 w-28 object-contain"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-ok-heading">
                              {product.name}
                            </p>
                            <p className="text-xs text-ok-text-muted mt-1">
                              {product.shopName}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-ok-brand">
                            {product.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="px-6 py-4 border-t border-ok-border flex items-center justify-between">
                <span className="text-xs text-ok-text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-ok-border text-xs font-semibold text-ok-text-muted disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-ok-border text-xs font-semibold text-ok-text-muted disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Right Details */}
          <aside className="bg-white p-6 flex flex-col gap-5">
            {selectedProduct ? (
              <>
                <div className="flex items-center justify-center rounded-2xl border border-ok-border bg-white p-6">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-40 w-40 object-contain"
                  />
                </div>

                <div className="flex items-center gap-3">
                  {[
                    selectedProduct.image,
                    selectedProduct.image,
                    selectedProduct.image,
                    selectedProduct.image,
                  ].map((img, index) => (
                    <div
                      key={index}
                      className={`h-14 w-14 rounded-lg border bg-white p-2 ${
                        index === 0 ? "border-ok-brand" : "border-ok-border"
                      }`}
                    >
                      <img
                        src={img}
                        alt={selectedProduct.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ok-heading">
                      {selectedProduct.name}
                    </h3>
                    <span className="text-lg font-bold text-ok-brand">
                      {selectedProduct.price}
                    </span>
                  </div>
                  <p className="text-xs text-ok-text-muted mt-1">
                    {selectedProduct.shopName} • {selectedProduct.distance} away
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1 text-ok-brand">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.round(selectedProduct.rating)
                              ? "text-ok-brand"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-ok-text-muted">
                      {selectedProduct.rating} • {selectedProduct.reviews}{" "}
                      reviews
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      selectedProduct.category,
                      selectedProduct.mobileCategory,
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-ok-brand-ghost text-ok-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-ok-border pt-4 space-y-2 text-xs text-ok-text-muted">
                  <p>
                    Status:{" "}
                    <span className="font-semibold text-ok-heading">
                      {selectedProduct.status}
                    </span>
                  </p>
                  <p>
                    Distance:{" "}
                    <span className="font-semibold text-ok-heading">
                      {selectedProduct.distance}
                    </span>
                  </p>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <button className="rounded-lg border border-ok-border bg-white px-4 py-2 text-xs font-semibold text-ok-text hover:bg-ok-brand-ghost">
                    View Store
                  </button>
                  <button className="rounded-lg bg-ok-brand px-4 py-2 text-xs font-semibold text-white hover:bg-ok-brand-hover">
                    Buy Now
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-ok-text-muted">
                No product selected.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
