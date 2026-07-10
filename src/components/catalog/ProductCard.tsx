"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  formatIDR,
  CATEGORY_LABELS,
  AVAILABILITY_LABELS,
  type Product,
} from "@/data/products";
import ProductModal from "./ProductModal";

const AVAILABILITY_STYLES: Record<Product["availability"], string> = {
  "In Stock": "text-white/90",
  "Made to Order": "text-white/90",
  Waitlist: "text-white/90",
};

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [sizesOpen, setSizesOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sizesPanelId = useId();
  const hasSizes = !!product.sizes?.length;
  const { addItem } = useCart();

  function handleAddToCart() {
    if (hasSizes && !selectedSize) {
      setSizesOpen(true);
      return;
    }
    addItem(product, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border/60">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label={`Lihat detail ${product.name}`}
        className="relative block aspect-3/4 w-full cursor-pointer overflow-hidden bg-muted"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading={index < 4 ? undefined : "lazy"}
          className="object-cover object-center"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,transparent_28%,transparent_60%,rgba(12,10,9,0.55)_100%)]"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.edition !== "Dibuat sesuai pesanan" && (
            <span className="rounded-full glass-dark px-3 py-1 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90">
              {product.edition}
            </span>
          )}
          {product.availability !== "In Stock" && (
            <span
              className={`rounded-full glass-dark px-3 py-1 text-[8px] font-medium uppercase tracking-luxe-tight ${AVAILABILITY_STYLES[product.availability]}`}
            >
              {AVAILABILITY_LABELS[product.availability]}
            </span>
          )}
        </div>

        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100">
          <div className="flex items-center justify-between rounded-xl glass-dark px-4 py-2.5">
            <span className="text-[10px] font-medium uppercase tracking-luxe-tight text-white">
              Lihat Detail
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent-soft"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </button>

      <div className="bg-background px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="min-w-0 cursor-pointer text-left"
          >
            <p className="truncate text-[9px] uppercase tracking-luxe text-accent">
              {CATEGORY_LABELS[product.category]}
            </p>
            <h3 className="mt-1 truncate font-serif text-base font-medium text-primary hover:text-accent sm:mt-1.5 sm:text-lg">
              {product.name}
            </h3>
          </button>
          <p className="shrink-0 text-xs font-light tracking-wide text-secondary tabular-nums">
            {formatIDR(product.price)}
          </p>
        </div>

        {hasSizes && (
          <div className="mt-2 sm:mt-3">
            <button
              type="button"
              onClick={() => setSizesOpen((v) => !v)}
              aria-expanded={sizesOpen}
              aria-controls={sizesPanelId}
              className="flex min-h-7 cursor-pointer items-center gap-1 text-[9px] font-medium uppercase tracking-luxe-tight text-secondary hover:text-accent sm:min-h-9 sm:gap-1.5 sm:text-[10px]"
            >
              {selectedSize ? `Ukuran: ${selectedSize}` : "Pilih Ukuran"}
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`sm:hidden ${sizesOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`hidden sm:block ${sizesOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {sizesOpen && (
              <div
                id={sizesPanelId}
                role="group"
                aria-label="Pilih ukuran"
                className="mt-1.5 flex flex-wrap gap-1 sm:mt-2 sm:gap-1.5"
              >
                {product.sizes?.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={active}
                      className={`flex min-h-7 min-w-7 cursor-pointer items-center justify-center rounded-full border px-2 text-[10px] font-light sm:min-h-9 sm:min-w-9 sm:px-2.5 sm:text-[11px] ${
                        active
                          ? "border-primary bg-primary text-on-primary"
                          : "border-border text-primary hover:border-accent hover:text-accent"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-2 flex min-h-8 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[10px] font-medium uppercase tracking-luxe-tight sm:mt-3 sm:min-h-11 sm:text-[11px] ${
            justAdded
              ? "bg-accent text-white"
              : "bg-primary text-on-primary hover:bg-accent"
          }`}
        >
          {justAdded ? "Berhasil Ditambahkan" : "+ Keranjang"}
        </button>
      </div>

      {modalOpen && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </article>
  );
}
