"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  ChevronRight,
  X,
  Package,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useRedux";

type InventoryProduct = {
  sku: string;
  image: string;
  name: string;
  category: string;
  description?: string;
  stockQty: number;
  stockMax: number;
  stockStatus: "good" | "low" | "critical";
  price: number;
};
type SortOption = "featured" | "price-asc" | "price-desc" | "stock-desc";

const fmt = (v: number) => `Rs. ${v.toLocaleString("en-US")}`;
const clip = (t: string, n: number) => {
  const w = t.trim().split(/\s+/);
  return w.length <= n ? t : `${w.slice(0, n).join(" ")}…`;
};
const desc = (p: InventoryProduct) => (p.description ?? "").trim();

const STATUS = {
  good: { label: "In Stock", color: "#16a34a", bg: "#f0fdf4" },
  low: { label: "Low Stock", color: "#d97706", bg: "#fffbeb" },
  critical: { label: "Critical", color: "#dc2626", bg: "#fef2f2" },
};

/* ─── Category accent colours — one per position ─── */
const ACCENTS = [
  "#e85d2f",
  "#0e7490",
  "#7c3aed",
  "#be185d",
  "#065f46",
  "#b45309",
  "#1d4ed8",
  "#9a3412",
];

export default function ProductCatalog() {
  const { products } = useAppSelector((s) => s.inventory);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selCats, setSelCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [onlyInStock, setOnlyInStock] = useState(false);

  const bounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const p = products.map((x) => x.price);
    return { min: Math.min(...p), max: Math.max(...p) };
  }, [products]);

  const er = priceRange.max === 0 ? bounds : priceRange;
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products],
  );
  const toggleCat = (c: string) =>
    setSelCats((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const reset = () => {
    setSelCats([]);
    setPriceRange({ min: 0, max: 0 });
    setOnlyInStock(false);
    setSort("featured");
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sorters: Record<
      SortOption,
      (a: InventoryProduct, b: InventoryProduct) => number
    > = {
      featured: (a, b) => b.stockQty - a.stockQty,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "stock-desc": (a, b) => b.stockQty - a.stockQty,
    };
    const seen = new Set<string>();
    return products
      .filter((p) => {
        if (
          q &&
          ![p.name, p.sku, p.category].some((s) => s.toLowerCase().includes(q))
        )
          return false;
        if (selCats.length && !selCats.includes(p.category)) return false;
        if (bounds.max > 0 && (p.price < er.min || p.price > er.max))
          return false;
        if (onlyInStock && p.stockQty === 0) return false;
        return true;
      })
      .sort(sorters[sort])
      .filter((p) => (seen.has(p.sku) ? false : (seen.add(p.sku), true)));
  }, [products, search, selCats, er, onlyInStock, sort, bounds.max]);

  const byCategory = useMemo(() => {
    const map: Record<string, InventoryProduct[]> = {};
    for (const p of filtered) {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    }
    return map;
  }, [filtered]);

  const activeFilters = selCats.length + (onlyInStock ? 1 : 0);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#f5f4f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 bg-white shadow-[0_1px_0_#e5e5e5]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, SKU, category…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#fafaf9] text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
            <Package className="h-4 w-4" />
            <span className="font-semibold text-gray-900">
              {filtered.length}
            </span>{" "}
            products
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="hidden md:block text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-[#fafaf9] text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="stock-desc">Most Stock</option>
          </select>

          {/* Filter button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-[#fafaf9] text-sm font-semibold text-gray-700 hover:border-gray-400 transition-all"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#e85d2f] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Category strip */}
        <div className="max-w-7xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
          <CatPill active={selCats.length === 0} onClick={() => setSelCats([])}>
            All products
          </CatPill>
          {categories.map((c, i) => (
            <CatPill
              key={c}
              active={selCats.includes(c)}
              onClick={() => toggleCat(c)}
              accent={ACCENTS[i % ACCENTS.length]}
            >
              {c}
            </CatPill>
          ))}
        </div>
      </div>

      {/* ── Catalog ── */}
      <div className="max-w-7xl mx-auto px-5 py-8 space-y-10">
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl font-bold text-gray-800">No products found</p>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={reset}
              className="mt-4 px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          Object.entries(byCategory).map(([cat, items], catIdx) => {
            const accent = ACCENTS[catIdx % ACCENTS.length];
            return (
              <section key={cat}>
                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-1 h-6 rounded-full"
                      style={{ background: accent }}
                    />
                    <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                      {cat}
                    </h2>
                    <span className="text-sm text-gray-400 font-medium">
                      {items.length} items
                    </span>
                  </div>
                  <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                    View all <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <CategoryGrid items={items} accent={accent} />
              </section>
            );
          })
        )}
      </div>

      {/* ── Filter drawer ── */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <button
            onClick={() => setFilterOpen(false)}
            className="flex-1 bg-black/30 backdrop-blur-[2px]"
          />
          <aside className="w-80 bg-white h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Filters
                </h3>
                {activeFilters > 0 && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeFilters} active
                  </p>
                )}
              </div>
              <button
                onClick={() => setFilterOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c, i) => (
                    <CatPill
                      key={c}
                      active={selCats.includes(c)}
                      onClick={() => toggleCat(c)}
                      accent={ACCENTS[i % ACCENTS.length]}
                    >
                      {c}
                    </CatPill>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Price Range
                  </p>
                  <p className="text-xs font-semibold text-gray-600">
                    {fmt(er.min)} – {fmt(er.max)}
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Min: {fmt(er.min)}
                    </p>
                    <input
                      type="range"
                      min={bounds.min}
                      max={bounds.max}
                      value={er.min}
                      onChange={(e) =>
                        setPriceRange((p) => ({
                          ...p,
                          min: Math.min(+e.target.value, p.max || bounds.max),
                        }))
                      }
                      className="w-full accent-gray-900"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Max: {fmt(er.max)}
                    </p>
                    <input
                      type="range"
                      min={bounds.min}
                      max={bounds.max}
                      value={er.max}
                      onChange={(e) =>
                        setPriceRange((p) => ({
                          ...p,
                          max: Math.max(+e.target.value, p.min || bounds.min),
                        }))
                      }
                      className="w-full accent-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Sort By
                </p>
                <div className="space-y-1">
                  {(
                    [
                      ["featured", "Featured"],
                      ["price-asc", "Price: Low → High"],
                      ["price-desc", "Price: High → Low"],
                      ["stock-desc", "Most in Stock"],
                    ] as [SortOption, string][]
                  ).map(([val, label]) => (
                    <label
                      key={val}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${sort === val ? "bg-gray-900 text-white" : "hover:bg-gray-50 text-gray-700"}`}
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={sort === val}
                        onChange={() => setSort(val)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-none ${sort === val ? "border-white" : "border-gray-300"}`}
                      >
                        {sort === val && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Availability
                </p>
                <label
                  className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-colors ${onlyInStock ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
                >
                  <span className="text-sm font-medium">In Stock Only</span>
                  <div
                    className={`w-10 h-6 rounded-full relative transition-colors ${onlyInStock ? "bg-white/30" : "bg-gray-300"}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${onlyInStock ? "left-5" : "left-1"}`}
                    />
                  </div>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-gray-100 flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-400 transition-all"
              >
                Reset all
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-[1.5] py-3 rounded-xl bg-gray-900 text-sm font-bold text-white hover:bg-gray-800 transition-all"
              >
                Show {filtered.length} results
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Category grid — intelligent layout per count
   ────────────────────────────────────────────── */
function CategoryGrid({
  items,
  accent,
}: {
  items: InventoryProduct[];
  accent: string;
}) {
  const [first, ...rest] = items;

  if (items.length === 1) {
    return <SpotlightCard product={first} accent={accent} />;
  }

  return (
    <div className="space-y-3">
      {/* Spotlight — always first, full width, side by side */}
      <SpotlightCard product={first} accent={accent} />

      {/* Rest — responsive grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {rest.map((p) => (
            <ProductTile key={p.sku} product={p} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   SpotlightCard — wide card, image right, content left
   ────────────────────────────────────────────── */
function SpotlightCard({
  product,
  accent,
}: {
  product: InventoryProduct;
  accent: string;
}) {
  const st = STATUS[product.stockStatus];
  const description = desc(product);
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-5 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm group"
      style={{ minHeight: 200 }}
    >
      {/* Content — left 3/5 */}
      <div className="sm:col-span-3 flex flex-col justify-between p-6 sm:p-7">
        {/* Top row */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${accent}18`, color: accent }}
            >
              {product.category}
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: st.bg, color: st.color }}
            >
              {product.stockStatus}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h3>
          {description ? (
            <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm">
              {clip(description, 18)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm">
              SKU: {product.sku}
            </p>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between mt-6 gap-4 flex-wrap">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Price</p>
            <p className="text-3xl font-extrabold text-gray-900">
              {fmt(product.price)}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">
                {product.stockQty} in stock
              </span>
              <span>SKU {product.sku}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="p-2.5 rounded-xl border-2 border-gray-200 text-gray-400 hover:border-gray-400 hover:text-red-400 transition-all"
            >
              <Heart
                className="h-4 w-4"
                fill={saved ? "#f87171" : "none"}
                style={{ color: saved ? "#f87171" : undefined }}
              />
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all"
              style={{ background: accent }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Image — right 2/5 */}
      <div className="sm:col-span-2 relative overflow-hidden bg-gray-50 min-h-[180px]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {/* subtle colour tint overlay matching accent */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: accent }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ProductTile — compact grid card
   ────────────────────────────────────────────── */
function ProductTile({
  product,
  accent,
}: {
  product: InventoryProduct;
  accent: string;
}) {
  const st = STATUS[product.stockStatus];
  const description = desc(product);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-gray-200 overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all opacity-0 group-hover:opacity-100"
          style={{ color: saved ? "#f87171" : "#9ca3af" }}
        >
          <Heart className="h-3.5 w-3.5" fill={saved ? "#f87171" : "none"} />
        </button>

        {/* Stock badge — only if not good */}
        {product.stockStatus !== "good" && (
          <span
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: st.bg, color: st.color }}
          >
            {product.stockStatus}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3.5 gap-1.5">
        <p
          className="text-[11px] font-bold uppercase tracking-widest"
          style={{ color: accent }}
        >
          {product.category}
        </p>
        <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </p>
        {description ? (
          <p className="text-xs text-gray-500 line-clamp-2">
            {clip(description, 12)}
          </p>
        ) : (
          <p className="text-xs text-gray-400">SKU: {product.sku}</p>
        )}
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <span>{product.stockQty} in stock</span>
          <span>Status: {product.stockStatus}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <p className="text-base font-extrabold text-gray-900">
            {fmt(product.price)}
          </p>
          <button
            className="px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
            style={{ background: accent }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Category pill ── */
function CatPill({
  children,
  active,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all"
      style={
        active
          ? { background: accent || "#111827", color: "#fff" }
          : { background: "#f3f4f6", color: "#6b7280" }
      }
    >
      {children}
    </button>
  );
}
