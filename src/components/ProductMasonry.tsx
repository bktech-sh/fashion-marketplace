"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  AVAILABILITY_LABELS,
  CATEGORY_LABELS,
  PRODUCTS,
  formatIDR,
  getDiscountPercent,
  type Product,
} from "@/data/products";

const TILE_HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60"];
const MOBILE_COLLAPSED_COUNT = 4;

export default function ProductMasonry() {
  const products = PRODUCTS;
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = products.length > MOBILE_COLLAPSED_COUNT;
  const mobileProducts = isExpanded
    ? products
    : products.slice(0, MOBILE_COLLAPSED_COUNT);

  return (
    <section className="relative py-4 md:py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
          Semua Rancangan
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-6xl">
          Galeri <span className="italic">Terpilih</span>
        </h2>

        {/* Mobile: grid 2-kolom, dibatasi 4 item sampai di-expand */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:hidden">
          {mobileProducts.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 60}>
              <MasonryTile
                product={product}
                heightClass={TILE_HEIGHTS[index % TILE_HEIGHTS.length]}
              />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <div className="mt-5 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="cursor-pointer rounded-full border border-border px-6 py-2.5 text-[10px] font-medium uppercase tracking-luxe-tight text-primary hover:border-accent hover:text-accent"
            >
              {isExpanded ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
            </button>
          </div>
        )}

        {/* Desktop: masonry columns penuh, selalu tampil semua.
            Tanpa Reveal di sini — transform pada child CSS `columns` merusak
            perhitungan tinggi kolom, membuat kartu collapse jadi garis tipis. */}
        <div className="mt-14 hidden gap-4 sm:columns-3 sm:block lg:columns-4">
          {products.map((product, index) => (
            <div key={product.slug} className="mb-4 block break-inside-avoid">
              <MasonryTile
                product={product}
                heightClass={TILE_HEIGHTS[index % TILE_HEIGHTS.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MasonryTile({
  product,
  heightClass,
}: {
  product: Product;
  heightClass?: string;
}) {
  const discountPercent = getDiscountPercent(product);

  return (
    <Link
      href="/catalog"
      aria-label={`Lihat ${product.name}`}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-muted sm:rounded-3xl ${heightClass ?? "h-64"}`}
    >
      <Image
        src={product.image}
        alt={product.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.15)_0%,transparent_40%,transparent_55%,rgba(12,10,9,0.65)_100%)]"
      />

      <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3">
        {product.edition !== "Dibuat sesuai pesanan" && (
          <span className="rounded-full glass-dark px-2 py-0.5 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90 sm:text-[9px]">
            {product.edition}
          </span>
        )}
        {discountPercent && (
          <span className="rounded-full bg-red-700 px-2 py-0.5 text-[8px] font-semibold uppercase text-white sm:text-[9px]">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <p className="text-[8px] uppercase tracking-luxe text-accent-soft sm:text-[9px]">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1 font-serif text-sm font-medium text-white sm:text-base">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
          <p className="text-[11px] font-light tracking-wide text-white/90 tabular-nums sm:text-sm">
            {formatIDR(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-[9px] text-white/60 line-through sm:text-[10px]">
              {formatIDR(product.originalPrice)}
            </p>
          )}
        </div>
      </div>

      {product.availability !== "In Stock" && (
        <span className="absolute right-2 top-2 rounded-full glass-dark px-2 py-0.5 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90 sm:right-3 sm:top-3 sm:text-[9px]">
          {AVAILABILITY_LABELS[product.availability]}
        </span>
      )}
    </Link>
  );
}
