"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatIDR, type Product } from "@/data/products";

const AVAILABILITY_LABEL: Record<Product["availability"], string> = {
  "In Stock": "In Stock",
  "Made to Order": "Made to Order",
  Waitlist: "Waitlist",
};

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const hasSizes = !!product.sizes?.length;
  const { addItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleAddToCart() {
    if (hasSizes && !selectedSize) return;
    addItem(product, selectedSize, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(12,10,9,0.6)]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative flex max-h-[92dvh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-background shadow-2xl sm:h-[85dvh] sm:max-w-3xl sm:flex-row sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-full glass-dark text-white sm:right-5 sm:top-5 sm:min-h-11 sm:min-w-11"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
            className="sm:hidden"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
            className="hidden sm:block"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative h-[40dvh] w-full shrink-0 bg-muted sm:h-auto sm:w-1/2">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain object-center sm:object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:w-1/2 sm:px-8 sm:py-8">
          <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
            {product.category}
          </p>
          <h2 className="mt-1 font-serif text-lg font-medium text-primary sm:mt-2 sm:text-3xl">
            {product.name}
          </h2>
          <p className="mt-1 text-base font-light tracking-wide text-primary tabular-nums sm:mt-3 sm:text-xl">
            {formatIDR(product.price)}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-luxe-tight text-secondary sm:px-3 sm:py-1 sm:text-[10px]">
              {product.edition}
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-luxe-tight text-secondary sm:px-3 sm:py-1 sm:text-[10px]">
              {AVAILABILITY_LABEL[product.availability]}
            </span>
          </div>

          <p className="mt-2 hidden text-sm font-light leading-relaxed text-secondary sm:mt-5 sm:block">
            {product.description}
          </p>
          <p className="mt-2 line-clamp-2 text-[11px] font-light leading-snug text-secondary sm:hidden">
            {product.description}
          </p>

          {hasSizes && (
            <div className="mt-3 sm:mt-6">
              <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
                Size
              </p>
              <div
                role="group"
                aria-label="Select size"
                className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2"
              >
                {product.sizes?.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={active}
                      className={`flex min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border px-2 text-[10px] font-light sm:min-h-11 sm:min-w-11 sm:px-3 sm:text-[12px] ${
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
            </div>
          )}

          <div className="mt-3 sm:mt-6">
            <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
              Quantity
            </p>
            <div className="mt-1.5 flex w-fit items-center gap-0.5 rounded-full border border-border sm:mt-3 sm:gap-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex min-h-8 min-w-8 cursor-pointer items-center justify-center text-primary hover:text-accent sm:min-h-11 sm:min-w-11"
              >
                −
              </button>
              <span className="min-w-5 text-center text-xs tabular-nums text-primary sm:min-w-6 sm:text-sm">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex min-h-8 min-w-8 cursor-pointer items-center justify-center text-primary hover:text-accent sm:min-h-11 sm:min-w-11"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-auto pt-3 sm:pt-8">
            <p className="mb-1.5 min-h-3.5 text-[10px] text-secondary sm:mb-2 sm:min-h-4 sm:text-[11px]">
              {hasSizes && !selectedSize ? "Select a size to continue." : ""}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={hasSizes && !selectedSize}
              className={`flex min-h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[10px] font-medium uppercase tracking-luxe-tight disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-12 sm:text-[11px] ${
                justAdded
                  ? "bg-accent text-white"
                  : "bg-primary text-on-primary hover:bg-accent"
              }`}
            >
              {justAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
