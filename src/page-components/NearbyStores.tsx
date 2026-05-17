"use client";

import React, { useState, useMemo } from "react";
import { dummyProducts } from "@/dummy/nearby-stores";

export default function NearbyStores() {
  const [activeTab, setActiveTab] = useState("nearby");
  const [currentPage, setCurrentPage] = useState(1);

  // New Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = 6;

  // Extract unique categories from dummy data
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

  // Filter products based on search, category, distance, and tab
  const filteredProducts = useMemo(() => {
    return dummyProducts.filter((product) => {
      // Search Filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category Filter
      if (
        !selectedCategories.includes("All") &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Distance Slider Filter
      const productDist = parseFloat(product.distance);
      if (productDist > maxDistance) {
        return false;
      }

      // Tab Filter (Nearby visually restricts to <= 2.5km as an extra fast-filter)
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col font-sans min-h-screen">
      {/* Gradient Header Background (Absolute) */}
      <div className="hidden md:block absolute top-0 left-0 right-0 h-[280px] gradient-cyan-purple z-0 rounded-b-[60px] opacity-10 pointer-events-none"></div>

      {/* ---------------- MOBILE VIEW ---------------- */}
      <div className="md:hidden flex flex-col min-h-screen bg-[#f0f3f6] relative z-10">
        {/* Mobile Search Bar */}
        <div className="px-4 pt-6 pb-2">
          <div className="relative w-full">
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-3.5"
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-transparent focus:border-[#00a3b4] focus:ring-2 focus:ring-[#00a3b4]/20 shadow-sm text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Mobile Top Tabs Toggle */}
        <div className="pb-6 px-4 flex justify-center shrink-0 mt-4 relative z-0">
          <div className="w-full max-w-[360px] flex items-center gap-3">
            <div className="bg-white rounded-full p-1 flex flex-1 shadow-sm border border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("nearby");
                  setCurrentPage(1);
                }}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "nearby"
                    ? "bg-[#00a3b4] text-white shadow-md"
                    : "text-[#7da2a9] hover:text-[#00a3b4]"
                }`}
              >
                {activeTab === "nearby" && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                Nearby Products
              </button>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setCurrentPage(1);
                }}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-[#00a3b4] text-white shadow-md"
                    : "text-[#7da2a9] hover:text-[#00a3b4]"
                }`}
              >
                All Products
              </button>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#00a3b4] hover:text-[#007489] transition-colors"
              aria-label="Open filters"
            >
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

        {/* Mobile Filters Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:hidden">
            <button
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            />
            <div className="relative w-full bg-white rounded-t-[28px] p-6 shadow-[0_-12px_30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[#002b3d]">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-3">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryToggle(cat)}
                      className={`px-3 py-2 rounded-full text-xs font-semibold border transition-colors ${
                        selectedCategories.includes(cat)
                          ? "bg-[#00a3b4] text-white border-[#00a3b4]"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                    Distance
                  </h4>
                  <span className="text-[12px] text-[#00a3b4] font-bold">
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
                  className="w-full accent-[#00a3b4]"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full gradient-cyan-purple text-white px-6 py-3 rounded-full font-bold shadow-[0_4px_15px_rgba(0,163,180,0.3)]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Mobile Main Content Area */}
        <div className="bg-[#fcfdfd] rounded-t-[32px] pt-8 px-6 pb-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] flex-1 flex flex-col relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-[5px] h-[20px] bg-[#00a3b4] rounded-full"></div>
              <h3 className="text-[19px] font-bold text-[#002b3d]">
                {activeTab === "nearby" ? "Trending Nearby" : "All Products"}
              </h3>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-3">
            {currentProducts.slice(0, 4).map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_rgba(0,163,180,0.3)] border border-transparent hover:border-[#00a3b4] transition-all duration-300 shrink-0 group"
              >
                {/* Image */}
                <div className="relative shrink-0">
                  <div className="w-[72px] h-[72px] rounded-full p-[2px] bg-gradient-to-tr from-[#00a3b4] to-[#007489]">
                    <img
                      src={product.image}
                      alt={product.mobileName}
                      className="w-full h-full rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute -bottom-1 -right-2 bg-[#ff5298] text-white text-[10px] font-bold px-2 py-[2px] rounded-md uppercase tracking-wider border-2 border-white">
                      NEW
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#002b3d] text-[17px] truncate group-hover:text-[#00a3b4] transition-colors">
                      {product.mobileName}
                    </h4>
                    <span className="flex items-center text-[#ff5298] text-[13px] font-bold shrink-0">
                      <svg
                        className="w-3.5 h-3.5 mr-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-500 text-[12px] font-medium truncate">
                      {product.shopName}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#00a3b4] text-[13px] font-bold tracking-wide uppercase">
                        {product.price}
                      </span>
                      <span className="text-gray-400 text-[12px] font-medium">
                        {product.mobileDistance} away
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow Button */}
                <button className="w-11 h-11 shrink-0 bg-[#f4f7f8] rounded-xl flex items-center justify-center text-[#002b3d] group-hover:bg-[#00a3b4] group-hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {currentProducts.length === 0 && (
              <div className="flex items-center justify-center h-32 text-[#7da2a9] font-medium">
                No products found. Try adjusting filters.
              </div>
            )}
          </div>

          {/* Mobile Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-8 shrink-0">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f7f8] text-[#cbd5db] disabled:opacity-50 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-[15px] ${
                      isActive
                        ? "gradient-blue-pink text-white"
                        : "text-[#007489]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f4f7f8] text-[#002b3d] disabled:opacity-50 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- DESKTOP VIEW ---------------- */}
      <div className="hidden md:flex flex-col max-w-[1400px] w-full mx-auto p-8 min-h-screen relative z-10">
        {/* Centered Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-8 relative z-20">
          <svg
            className="w-6 h-6 text-[#7da2a9] absolute left-5 top-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for products by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-white/90 backdrop-blur-md focus:border-[#00a3b4] focus:outline-none focus:ring-4 focus:ring-[#00a3b4]/20 text-[#002b3d] font-medium text-lg transition-all"
          />
        </div>

        <div className="flex items-start gap-8 w-full">
          {/* Mini Sidebar Filters */}
          <aside className="w-72 shrink-0 bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-8 z-10 flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#002b3d] mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#00a3b4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">
                  Category
                </h4>
                <div className="space-y-3">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[6px] checked:bg-[#00a3b4] checked:border-[#00a3b4] hover:border-[#00a3b4] transition-colors cursor-pointer"
                        />
                        <svg
                          className="w-3 h-3 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-[15px] font-medium transition-colors ${selectedCategories.includes(cat) ? "text-[#002b3d]" : "text-gray-500 group-hover:text-[#00a3b4]"}`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest">
                    Distance
                  </h4>
                  <span className="text-[13px] text-[#00a3b4] font-bold bg-[#e4ebed] px-2 py-0.5 rounded-md">
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
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00a3b4]"
                />
                <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                  <span>0km</span>
                  <span>20km</span>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories(["All"]);
                setMaxDistance(10);
                setCurrentPage(1);
              }}
              className="w-full py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-sm hover:bg-gray-100 hover:text-[#002b3d] transition-colors mt-auto"
            >
              Reset Filters
            </button>
          </aside>

          {/* Desktop Main Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col relative z-10 flex-1 min-h-[600px]">
            {/* Top Bar inside card - CENTERED TABS */}
            <div className="relative flex items-center justify-center border-b border-gray-100 pb-4 mb-6 shrink-0">
              {/* Centered Tabs */}
              <div className="flex gap-8">
                <button
                  onClick={() => {
                    setActiveTab("nearby");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 pb-4 -mb-[17px] text-[15px] font-bold transition-colors ${
                    activeTab === "nearby"
                      ? "text-[#00a3b4] border-b-2 border-[#00a3b4]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Nearby Products
                </button>
                <button
                  onClick={() => {
                    setActiveTab("all");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 pb-4 -mb-[17px] text-[15px] font-bold transition-colors ${
                    activeTab === "all"
                      ? "text-[#00a3b4] border-b-2 border-[#00a3b4]"
                      : "text-[#7da2a9] hover:text-[#007489]"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  All Products
                </button>
              </div>

              {/* Sort Action absolute right */}
              <div className="absolute right-0 flex items-center gap-6">
                <button className="flex items-center gap-2 text-[#7da2a9] text-[14px] font-bold hover:text-[#007489]">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                  Sort
                </button>
              </div>
            </div>

            {/* Desktop Card Grid */}
            <div className="pb-2 flex-1">
              {currentProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-[#7da2a9]">
                  <svg
                    className="w-12 h-12 mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-bold text-[#002b3d]">
                    No products found
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {currentProducts.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[24px] p-6 border-2 border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_rgba(0,163,180,0.3)] hover:border-[#00a3b4] transition-all duration-300 flex flex-col gap-5 group cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-[16px] bg-[#f4f7f8] overflow-hidden shrink-0 border border-gray-100 group-hover:border-[#00a3b4]/30 transition-colors">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#002b3d] text-[18px] group-hover:text-[#00a3b4] transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-[13px] text-[#7da2a9] font-medium mt-0.5 mb-2">
                              {product.shopName} • {product.price}
                            </p>
                            <span className="inline-block px-3 py-1 rounded-full bg-[#f4f7f8] text-[#00a3b4] text-[11px] font-bold uppercase tracking-wider group-hover:bg-[#00a3b4]/10 transition-colors">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        {/* Status */}
                        <div
                          className={`flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full transition-colors ${product.status === "In Stock" ? "bg-green-50" : "bg-gray-50"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${product.status === "In Stock" ? "bg-[#00c853]" : "bg-[#b0bec5]"}`}
                          ></div>
                          <span
                            className={`text-[12px] font-bold ${product.status === "In Stock" ? "text-[#00c853]" : "text-[#8fa7af]"}`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-gray-100 group-hover:bg-[#00a3b4]/20 transition-colors"></div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-[#00a3b4]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-bold text-[#002b3d] text-[15px]">
                              {product.rating}
                            </span>
                            <span className="text-[#8fa7af] text-[13px]">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="text-[#002b3d] text-[14px] font-medium flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-[#7da2a9] group-hover:text-[#00a3b4] transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {product.distance} away
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="w-9 h-9 rounded-xl bg-[#f4f7f8] text-[#00a3b4] flex items-center justify-center hover:bg-[#00a3b4] hover:text-white transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </button>
                          <button className="w-9 h-9 rounded-xl bg-[#f4f7f8] text-[#00a3b4] flex items-center justify-center hover:bg-[#00a3b4] hover:text-white transition-colors group-hover:bg-[#00a3b4] group-hover:text-white">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 shrink-0 border-t border-gray-100">
                <div className="text-[#00a3b4] text-[14px] font-bold">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredProducts.length,
                  )}{" "}
                  of {filteredProducts.length} products
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8fa7af] hover:bg-[#f4f7f8] transition-colors disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isActive = currentPage === page;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-xl font-bold text-[14px] transition-colors ${
                          isActive
                            ? "gradient-blue-pink text-white"
                            : "text-[#8fa7af] hover:bg-[#f4f7f8]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#00a3b4] hover:bg-[#f4f7f8] transition-colors disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
