"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Dropdown from "@/components/Dropdown";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  AVAILABILITY_LABELS,
  PRODUCTS,
  formatIDR,
  type Availability,
  type Category,
} from "@/data/products";

const AVAILABILITY_OPTIONS: Availability[] = [
  "In Stock",
  "Made to Order",
  "Waitlist",
];

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortKey, string> = {
  featured: "Unggulan",
  "price-asc": "Harga: Rendah ke Tinggi",
  "price-desc": "Harga: Tinggi ke Rendah",
  "name-asc": "Nama: A ke Z",
};

const MIN_PRICE = 0;
const MAX_PRICE = 400_000;

export default function CatalogGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">(
    "All",
  );
  const [activeAvailability, setActiveAvailability] = useState<
    Availability | "All"
  >("All");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => p.price <= maxPrice);

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeAvailability !== "All") {
      result = result.filter((p) => p.availability === activeAvailability);
    }

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeAvailability, maxPrice, sort]);

  const hasActiveFilters =
    activeCategory !== "All" ||
    activeAvailability !== "All" ||
    maxPrice < MAX_PRICE;

  function resetFilters() {
    setActiveCategory("All");
    setActiveAvailability("All");
    setMaxPrice(MAX_PRICE);
  }

  function renderFilterPanel(compact: boolean) {
    const pillHeight = compact ? "min-h-9 py-1.5" : "min-h-11 py-2.5";
    const gap = compact ? "gap-6" : "gap-10";
    const pillGap = compact ? "gap-1.5" : "gap-2";

    return (
      <div className={`flex flex-col ${gap}`}>
        {/* Category */}
        <div>
          <h2 className="text-[10px] uppercase tracking-luxe text-accent">
            Kategori
          </h2>
          <div
            role="group"
            aria-label="Filter berdasarkan kategori"
            className={`mt-3 flex flex-wrap ${pillGap}`}
          >
            {(["All", ...CATEGORIES] as const).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={`${pillHeight} cursor-pointer rounded-full border px-3.5 text-[12px] font-light ${
                    active
                      ? "border-primary bg-primary text-on-primary"
                      : "border-border text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat === "All" ? "Semua" : CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h2 className="text-[10px] uppercase tracking-luxe text-accent">
            Ketersediaan
          </h2>
          <div
            role="group"
            aria-label="Filter berdasarkan ketersediaan"
            className={`mt-3 flex flex-wrap ${pillGap}`}
          >
            {(["All", ...AVAILABILITY_OPTIONS] as const).map((a) => {
              const active = activeAvailability === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setActiveAvailability(a)}
                  aria-pressed={active}
                  className={`${pillHeight} cursor-pointer rounded-full border px-3.5 text-[12px] font-light ${
                    active
                      ? "border-primary bg-primary text-on-primary"
                      : "border-border text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {a === "All" ? "Semua" : AVAILABILITY_LABELS[a]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor={compact ? "price-filter-desktop" : "price-filter"}
            className="flex justify-between text-[10px] uppercase tracking-luxe text-accent"
          >
            <span>Harga Maksimal</span>
          </label>
          <p className="mt-2 text-[12px] font-light tabular-nums text-secondary">
            {formatIDR(maxPrice)}
          </p>
          <input
            id={compact ? "price-filter-desktop" : "price-filter"}
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={5_000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={`${compact ? "mt-3" : "mt-4"} h-11 w-full cursor-pointer accent-accent`}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex min-h-9 w-fit cursor-pointer items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 text-[11px] font-medium uppercase tracking-luxe-tight text-accent hover:border-accent hover:bg-accent hover:text-white"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
            Atur Ulang Filter
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-12">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={filtersOpen}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight text-primary"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M4 7h16M8 12h8M11 17h2" strokeLinecap="round" />
          </svg>
          Filter
          {hasActiveFilters && (
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          )}
        </button>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              aria-label="Atur ulang filter"
              className="flex min-h-9 cursor-pointer items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 text-[11px] font-medium uppercase tracking-luxe-tight text-accent hover:border-accent hover:bg-accent hover:text-white"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
              Atur Ulang
            </button>
          )}
          <p className="text-[11px] uppercase tracking-luxe-tight text-secondary">
            {filtered.length} produk
          </p>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-[rgba(12,10,9,0.55)]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter"
            className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-3xl bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-xl font-medium text-primary">
                Filter
              </h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Tutup filter"
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-primary hover:text-accent"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {renderFilterPanel(false)}
            </div>

            <div className="border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-primary text-[11px] font-medium uppercase tracking-luxe-tight text-on-primary hover:bg-accent"
              >
                Tampilkan {filtered.length} Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar — sticky under fixed navbar, compact so it fits one screen */}
      <aside className="hidden shrink-0 basis-56 lg:sticky lg:top-32 lg:block lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto">
        {renderFilterPanel(true)}
      </aside>

      {/* Results */}
      <div className="min-w-0 flex-1">
        <div className="mb-5 hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-4">
            <p className="text-[11px] uppercase tracking-luxe-tight text-secondary">
              {filtered.length} produk
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 text-[11px] font-medium uppercase tracking-luxe-tight text-accent hover:border-accent hover:bg-accent hover:text-white"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
                Atur Ulang Filter
              </button>
            )}
          </div>
          <Dropdown
            label="Urutkan"
            hideLabel
            value={sort}
            onChange={setSort}
            options={(Object.keys(SORT_LABELS) as SortKey[]).map((key) => ({
              value: key,
              label: SORT_LABELS[key],
            }))}
            className="w-56"
          />
        </div>

        {/* Sort on mobile */}
        <div className="mb-4 lg:hidden">
          <Dropdown
            label="Urutkan"
            hideLabel
            value={sort}
            onChange={setSort}
            options={(Object.keys(SORT_LABELS) as SortKey[]).map((key) => ({
              value: key,
              label: SORT_LABELS[key],
            }))}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-4xl border border-border/60 py-24 text-center">
            <p className="font-serif text-2xl font-light text-primary">
              Tidak ada produk yang sesuai
            </p>
            <p className="max-w-sm text-sm font-light text-secondary">
              Coba perluas rentang harga atau hapus salah satu filter untuk
              melihat lebih banyak koleksi.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight text-white hover:bg-primary"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
              Atur Ulang Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
