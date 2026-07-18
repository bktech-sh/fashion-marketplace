"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useCart } from "@/context/CartContext";
import {
  AVAILABILITY_LABELS,
  CATEGORY_LABELS,
  PRODUCTS,
  formatIDR,
  getDiscountPercent,
  type Product,
} from "@/data/products";

export default function Collection() {
  const products = PRODUCTS.slice(0, 10);
  const { addItem } = useCart();

  return (
    <section id="collections" className="relative py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
          Pilihan Terkurasi
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-6xl">
          Koleksi <span className="italic">Andalan</span>
        </h2>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 flex w-screen touch-pan-x gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide px-5 pb-4 sm:mt-14 sm:gap-5 sm:px-[50px]">
        {products.map((product, index) => (
          <Reveal
            key={product.slug}
            delay={(index % 3) * 80}
            className="flex w-40 shrink-0 sm:w-52 lg:w-60"
          >
            <CollectionCard product={product} onQuickAdd={addItem} />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 flex justify-center sm:mt-10">
        <Link
          href="/catalog"
          className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[10px] font-medium uppercase tracking-luxe-tight text-on-primary shadow-[0_8px_30px_-8px_rgba(12,10,9,0.4)] hover:bg-accent sm:px-8 sm:py-4 sm:text-[12px]"
        >
          Jelajahi Katalog Lengkap
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function CollectionCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: (product: Product, size: string | null) => void;
}) {
  const discountPercent = getDiscountPercent(product);

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background">
      <Link
        href="/catalog"
        aria-label={`Lihat ${product.name}`}
        className="relative block aspect-3/4 shrink-0 overflow-hidden bg-muted"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 208px, 160px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,transparent_28%,transparent_60%,rgba(12,10,9,0.55)_100%)]"
        />

        <div className="absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3">
          {product.edition !== "Dibuat sesuai pesanan" && (
            <span className="rounded-full glass-dark px-2 py-0.5 text-[7px] font-medium uppercase tracking-luxe-tight text-white/90 sm:px-3 sm:py-1 sm:text-[8px]">
              {product.edition}
            </span>
          )}
          {product.availability !== "In Stock" && (
            <span className="rounded-full glass-dark px-2 py-0.5 text-[7px] font-medium uppercase tracking-luxe-tight text-white/90 sm:px-3 sm:py-1 sm:text-[8px]">
              {AVAILABILITY_LABELS[product.availability]}
            </span>
          )}
          {discountPercent && (
            <span className="rounded-full bg-red-700 px-2 py-0.5 text-[7px] font-semibold uppercase text-white sm:px-3 sm:py-1 sm:text-[8px]">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd(product, product.sizes?.[0] ?? null);
            }}
            className="w-full cursor-pointer rounded-full glass-dark px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-luxe-tight text-white transition-transform duration-150 hover:scale-[1.02] sm:text-[10px]"
          >
            + Keranjang
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4">
        <p className="truncate text-[8px] uppercase tracking-luxe text-accent sm:text-[9px]">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1 truncate font-serif text-sm font-medium text-primary sm:text-base">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
          <p className="text-[11px] font-light tracking-wide text-secondary tabular-nums sm:text-xs">
            {formatIDR(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-[9px] text-secondary/60 line-through sm:text-[10px]">
              {formatIDR(product.originalPrice)}
            </p>
          )}
        </div>

        {product.sizes && (
          <div className="mt-auto flex flex-wrap gap-1 pt-2">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="rounded-full border border-border px-1.5 py-0.5 text-[8px] text-secondary sm:px-2 sm:text-[9px]"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
