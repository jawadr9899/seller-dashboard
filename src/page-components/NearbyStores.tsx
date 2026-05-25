"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { useIsMobile } from "@/hooks/use-mobile";

type ProductCard = {
  name: string;
  price: string;
  rating: number;
  reviews: string;
  image: string;
};

type MobileCard = {
  name: string;
  price: string;
  rating: number;
  image: string;
};

type InventoryProduct = {
  sku: string;
  image: string;
  name: string;
  category: string;
  stockQty: number;
  stockMax: number;
  stockStatus: "good" | "low" | "critical";
  price: number;
};

type ProductTab = "All" | "Nearby";

const desktopTabs: ProductTab[] = ["All", "Nearby"];

const mobileTabs: ProductTab[] = ["All", "Nearby"];

const formatPrice = (value: number) => `Rs. ${value.toLocaleString("en-US")}`;

const getRating = (product: InventoryProduct) => {
  const ratio = product.stockMax ? product.stockQty / product.stockMax : 0.7;
  return Math.max(3.8, Math.min(5, ratio * 5));
};

const toProductCard = (product: InventoryProduct): ProductCard => ({
  name: product.name,
  price: formatPrice(product.price),
  rating: getRating(product),
  reviews: `${product.stockQty} in stock`,
  image: product.image,
});

const toMobileCard = (product: InventoryProduct): MobileCard => ({
  name: product.name,
  price: formatPrice(product.price),
  rating: getRating(product),
  image: product.image,
});

const filterByTab = (items: InventoryProduct[], tab: ProductTab) => {
  if (tab === "Nearby") {
    return items.filter((product) => product.stockStatus !== "good");
  }
  return items;
};

const buildCategorySections = (items: InventoryProduct[]) => {
  const sections = new Map<string, InventoryProduct[]>();
  items.forEach((product) => {
    const category = product.category || "Other";
    if (!sections.has(category)) {
      sections.set(category, []);
    }
    sections.get(category)?.push(product);
  });
  return Array.from(sections.entries());
};

const mobileNavItems = [
  { label: "Explore", icon: CompassIcon, active: true },
  { label: "Saved", icon: BookmarkIcon },
  { label: "Nearby", icon: PinIcon },
  { label: "Profile", icon: UserIcon },
];

export default function NearbyStores() {
  const [activeTab, setActiveTab] = useState<ProductTab>("All");
  const [mobileTab, setMobileTab] = useState<ProductTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [minRating, setMinRating] = useState<number | null>(null);
  const [availability, setAvailability] = useState({
    inStock: false,
    onSale: false,
  });
  const [sortOption, setSortOption] = useState<
    "newest" | "price-asc" | "price-desc"
  >("newest");

  const { products } = useAppSelector((state) => state.inventory);
  const isMobile = useIsMobile();

  const priceBounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  useEffect(() => {
    if (priceRange.max === 0 && priceBounds.max > 0) {
      setPriceRange(priceBounds);
    }
  }, [priceBounds, priceRange.max]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange(priceBounds);
    setMinRating(null);
    setAvailability({ inStock: false, onSale: false });
    setSortOption("newest");
  };

  const applyFilters = (items: InventoryProduct[], tab: ProductTab) => {
    let next = filterByTab(items, tab);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      next = next.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    if (selectedCategories.length) {
      next = next.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    if (priceRange.max > 0) {
      next = next.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max,
      );
    }

    if (minRating) {
      next = next.filter((product) => getRating(product) >= minRating);
    }

    if (availability.inStock) {
      next = next.filter((product) => product.stockQty > 0);
    }

    if (availability.onSale) {
      next = next.filter((product) => product.stockStatus === "low");
    }

    if (sortOption === "price-asc") {
      next = [...next].sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-desc") {
      next = [...next].sort((a, b) => b.price - a.price);
    }

    return next;
  };

  const desktopProducts = useMemo(
    () => applyFilters(products, activeTab),
    [
      products,
      activeTab,
      searchQuery,
      selectedCategories,
      priceRange,
      minRating,
      availability,
      sortOption,
    ],
  );

  const mobileProducts = useMemo(
    () => applyFilters(products, mobileTab),
    [
      products,
      mobileTab,
      searchQuery,
      selectedCategories,
      priceRange,
      minRating,
      availability,
      sortOption,
    ],
  );

  const categorySections = useMemo(
    () => buildCategorySections(desktopProducts),
    [desktopProducts],
  );

  const mobileCategorySections = useMemo(
    () => buildCategorySections(mobileProducts),
    [mobileProducts],
  );

  const filterCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );

  const filteredCount = isMobile
    ? mobileProducts.length
    : desktopProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-ok-surface-page to-ok-surface-page text-ok-text">
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 lg:pb-12">
        {/* Desktop layout */}
        <div className="hidden lg:block">
          <header className="flex flex-col items-center gap-4 text-center">
            <div className="text-2xl font-semibold text-ok-heading">
              Products
            </div>
            <div className="flex w-full items-center justify-center gap-4">
              <div className="w-full max-w-xl">
                <div className="relative">
                  <SearchIcon className="h-4 w-4 text-ok-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search premium products..."
                    className="w-full rounded-full border border-ok-border bg-white py-3 pl-11 pr-4 text-sm text-ok-text placeholder:text-ok-text-muted shadow-sm focus:outline-none focus:border-ok-brand"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="group flex items-center gap-2 rounded-full border border-ok-border bg-white px-4 py-2 text-sm font-semibold text-ok-text shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ok-brand hover:text-white hover:shadow-md"
                >
                  <FilterIcon className="h-4 w-4 text-current" />
                  Filters
                </button>
              </div>
            </div>
          </header>

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-4 rounded-full bg-white/80 p-1.5 shadow-[0_10px_30px_rgba(59,53,214,0.12)]">
              {desktopTabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`min-w-[180px] rounded-full px-8 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-ok-brand text-white shadow"
                        : "text-ok-text-muted hover:bg-ok-brand-ghost"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {categorySections.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-ok-border-light bg-white p-6 text-center text-sm text-ok-text-muted">
              No products match your search.
            </div>
          ) : (
            categorySections.map(([category, items], index) => (
              <section
                key={category}
                className={index === 0 ? "mt-8" : "mt-10"}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-ok-heading">
                    {category}
                  </h2>
                  <button className="flex items-center gap-2 text-sm font-semibold text-ok-brand">
                    See More
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((product) => {
                    const item = toProductCard(product);
                    return (
                      <div
                        key={product.sku}
                        className="flex h-full flex-col overflow-hidden rounded-3xl border border-indigo-200/70 bg-white shadow-[0_12px_28px_rgba(76,70,229,0.15)] gradient-border-hover transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="h-44 w-full bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center gap-2 text-xs text-ok-text-muted">
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                              {product.category}
                            </span>
                            <span>{product.sku}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-xs">
                            <StarIcon className="h-4 w-4 text-indigo-600" />
                            <span className="font-semibold text-indigo-600">
                              {item.rating.toFixed(1)}
                            </span>
                            <span className="text-ok-text-muted">
                              ({product.stockQty} in stock)
                            </span>
                          </div>
                          <h3 className="mt-2 text-base font-semibold text-ok-heading">
                            {item.name}
                          </h3>
                          <div className="mt-auto flex items-center justify-between pt-5">
                            <span className="text-lg font-bold text-ok-brand">
                              {item.price}
                            </span>
                            <button className="inline-flex items-center gap-2 rounded-full bg-ok-brand px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-ok-brand-hover">
                              <CartIcon className="h-4 w-4" />
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden mx-auto max-w-md space-y-6">
          <div className="relative">
            <SearchIcon className="h-4 w-4 text-ok-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-ok-border bg-white py-3 pl-11 pr-4 text-sm text-ok-text placeholder:text-ok-text-muted shadow-sm focus:outline-none focus:border-ok-brand"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/80 p-1.5 shadow-[0_10px_30px_rgba(59,53,214,0.12)]">
                {mobileTabs.map((tab) => {
                  const isActive = mobileTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setMobileTab(tab)}
                      className={`min-w-[110px] rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-ok-brand text-white shadow"
                          : "text-ok-text-muted hover:bg-ok-brand-ghost"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="h-11 w-11 rounded-2xl bg-ok-brand-ghost text-ok-brand flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-ok-brand hover:text-white"
            >
              <FilterIcon className="h-5 w-5" />
            </button>
          </div>

          {mobileCategorySections.length === 0 ? (
            <div className="rounded-2xl border border-ok-border-light bg-white p-6 text-center text-sm text-ok-text-muted">
              No products match your search.
            </div>
          ) : (
            mobileCategorySections.map(([category, items]) => (
              <section key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ok-heading">
                    {category}
                  </h2>
                  <button className="text-sm font-semibold text-ok-brand">
                    See all
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((product) => {
                    const item = toMobileCard(product);
                    return (
                      <div
                        key={product.sku}
                        className="flex h-full flex-col overflow-hidden rounded-3xl border border-indigo-200/70 bg-white shadow-[0_12px_24px_rgba(76,70,229,0.12)] gradient-border-hover transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="h-28 w-full bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-center gap-2 text-[10px] text-ok-text-muted">
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-semibold text-indigo-600">
                              {product.category}
                            </span>
                            <span>{product.sku}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-xs">
                            <StarIcon className="h-3.5 w-3.5 text-indigo-600" />
                            <span className="font-semibold text-indigo-600">
                              {item.rating.toFixed(1)}
                            </span>
                            <span className="text-ok-text-muted">
                              ({product.stockQty} in stock)
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-ok-heading">
                            {item.name}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-4">
                            <span className="text-sm font-bold text-ok-brand">
                              {item.price}
                            </span>
                            <button className="rounded-full bg-ok-brand px-3 py-1.5 text-[10px] font-semibold text-white">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-ok-heading">
              Curated Sets
            </h2>
            <div className="group relative h-40 overflow-hidden rounded-2xl shadow-[0_10px_24px_rgba(59,53,214,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80"
                alt="The Creator Pack"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative h-full p-4 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                  Limited Edition
                </span>
                <h3 className="mt-1 text-lg font-semibold">The Creator Pack</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative h-24 overflow-hidden rounded-2xl shadow-[0_8px_18px_rgba(59,53,214,0.16)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=900&q=80"
                  alt="Glassware"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative h-full p-3 text-white flex items-end text-sm font-semibold">
                  Glassware
                </div>
              </div>
              <div className="group relative h-24 overflow-hidden rounded-2xl shadow-[0_8px_18px_rgba(59,53,214,0.16)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
                  alt="Smart Devices"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative h-full p-3 text-white flex items-end text-sm font-semibold">
                  Smart Devices
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ok-border">
        <div className="mx-auto grid max-w-md grid-cols-4 px-6 py-2 text-xs">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 ${
                  item.active ? "text-ok-brand" : "text-ok-text-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isFilterOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close filters"
        />

        {/* Desktop sidebar */}
        <aside
          className={`hidden lg:flex absolute right-0 top-0 h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
            <div className="flex items-center justify-between border-b border-ok-border px-6 py-5">
              <div>
                <h3 className="text-xl font-semibold text-ok-heading">
                  Filters
                </h3>
                <p className="text-sm text-ok-text-muted">
                  Customize your view
                </p>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl text-ok-text-muted"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <section>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ok-heading">
                    Categories
                  </h4>
                  <span className="text-xs text-ok-text-muted">
                    {selectedCategories.length || "All"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {filterCategories.map((category) => {
                    const active = selectedCategories.includes(category);
                    return (
                      <button
                        type="button"
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                          active
                            ? "bg-ok-brand-subtle text-ok-brand"
                            : "bg-ok-border-light text-ok-text hover:bg-ok-brand-ghost"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ok-heading">
                    Price Range
                  </h4>
                  <span className="text-xs text-ok-text-muted">^</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={55}
                  className="w-full accent-ok-brand"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-ok-border bg-white px-3 py-2">
                    <p className="text-xs text-ok-text-muted">Min</p>
                    <p className="text-sm font-semibold">Rs. 50</p>
                  </div>
                  <div className="rounded-xl border border-ok-border bg-white px-3 py-2">
                    <p className="text-xs text-ok-text-muted">Max</p>
                    <p className="text-sm font-semibold">Rs. 1500</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ok-heading">
                    Rating
                  </h4>
                  <span className="text-xs text-ok-text-muted">^</span>
                </div>
                {[4, 3].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-3 text-sm text-ok-text"
                  >
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <StarIcon
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < rating ? "text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </label>
                ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ok-heading">
                    Availability
                  </h4>
                  <span className="text-xs text-ok-text-muted">^</span>
                </div>
                {["In Stock", "On Sale"].map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-ok-text">{label}</span>
                    <div className="h-6 w-10 rounded-full bg-ok-border-light" />
                  </div>
                ))}
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-ok-heading">
                    Sort By
                  </h4>
                  <span className="text-xs text-ok-text-muted">^</span>
                </div>
                {[
                  "Newest Arrivals",
                  "Price: Low to High",
                  "Price: High to Low",
                ].map((label, index) => (
                  <label
                    key={label}
                    className="flex items-center gap-3 text-sm text-ok-text"
                  >
                    <input
                      type="radio"
                      name="sort"
                      defaultChecked={index === 0}
                      className="h-4 w-4"
                    />
                    {label}
                  </label>
                ))}
              </section>
            </div>

            <div className="border-t border-ok-border px-6 py-4 flex items-center gap-3">
              <button className="flex-1 rounded-full bg-ok-border-light px-4 py-2 text-sm font-semibold text-ok-text">
                Reset
              </button>
              <button className="flex-1 rounded-full bg-ok-brand px-4 py-2 text-sm font-semibold text-white shadow">
                Apply
              </button>
            </div>
          </aside>

          {/* Mobile bottom sheet */}
          <aside className="lg:hidden absolute bottom-0 left-0 right-0 max-h-[88vh] rounded-t-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-center pt-3">
              <span className="h-1.5 w-12 rounded-full bg-ok-border" />
            </div>
            <div className="flex items-center justify-between border-b border-ok-border px-5 py-4">
              <h3 className="text-lg font-semibold text-ok-heading">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl text-ok-text-muted"
              >
                ×
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-5 py-5 space-y-6">
              <section className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-ok-text-muted">
                  <span>CATEGORIES</span>
                  <span className="text-ok-brand">2 Selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map((category, index) => {
                    const active = index < 2;
                    return (
                      <span
                        key={category}
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${
                          active
                            ? "bg-ok-brand text-white"
                            : "border border-ok-border text-ok-text"
                        }`}
                      >
                        {category}
                      </span>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-ok-text-muted">
                  <span>PRICE RANGE</span>
                  <span className="text-ok-brand">PKR 1,000 – 15,000</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={65}
                  className="w-full accent-ok-brand"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-ok-border bg-white px-3 py-3">
                    <p className="text-xs text-ok-text-muted">Min</p>
                    <p className="text-sm font-semibold">PKR 1,000</p>
                  </div>
                  <div className="rounded-2xl border border-ok-border bg-white px-3 py-3">
                    <p className="text-xs text-ok-text-muted">Max</p>
                    <p className="text-sm font-semibold">PKR 15,000</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <div className="text-xs font-semibold text-ok-text-muted">
                  CUSTOMER RATING
                </div>
                {[4, 3].map((rating, index) => (
                  <label
                    key={rating}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold ${
                      index === 0
                        ? "border-ok-brand bg-ok-brand-ghost text-ok-brand"
                        : "border-ok-border text-ok-text"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <StarIcon
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < rating ? "text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span>{rating}.0 & Up</span>
                    </div>
                    <div className="h-4 w-4 rounded-full border border-ok-brand bg-white" />
                  </label>
                ))}
              </section>
            </div>
            <div className="border-t border-ok-border px-5 py-4 flex items-center gap-3">
              <button className="flex-1 rounded-full border border-ok-border px-4 py-2 text-sm font-semibold text-ok-text">
                Reset
              </button>
              <button className="flex-[1.2] rounded-full bg-ok-brand px-4 py-2 text-sm font-semibold text-white shadow">
                Apply Filters (Show 142 Products)
              </button>
            </div>
          </aside>
        </div>
      )
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m1.35-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h10M4 12h16M4 18h7"
      />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0"
      />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14m-6-6l6 6-6 6"
      />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 6h15l-1.5 9h-12L6 6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 6l-2-3"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.5 9.5l-4 1.5-1.5 4 4-1.5 1.5-4z"
      />
    </svg>
  );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 4h12v16l-6-4-6 4V4z"
      />
    </svg>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}
