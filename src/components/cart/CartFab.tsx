"use client";

import { useCart } from "@/context/CartContext";
import { formatIDR } from "@/data/products";

export default function CartFab() {
  const { itemCount, subtotal, openCart, isOpen } = useCart();

  if (itemCount === 0 || isOpen) return null;

  return (
    <>
      {/* Mobile — full-width sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:hidden">
        <button
          type="button"
          onClick={openCart}
          className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-3 text-on-primary shadow-[0_8px_30px_-6px_rgba(12,10,9,0.45)] transition-colors hover:bg-accent"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-medium text-white">
              {itemCount}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-luxe-tight">
              Lihat Keranjang
            </span>
          </span>
          <span className="text-sm font-light tabular-nums">
            {formatIDR(subtotal)}
          </span>
        </button>
      </div>

      {/* Desktop — circular button */}
      <button
        type="button"
        onClick={openCart}
        aria-label={`Open cart, ${itemCount} items`}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_8px_30px_-6px_rgba(12,10,9,0.45)] transition-all duration-300 hover:bg-accent hover:-translate-y-0.5 sm:flex sm:bottom-8 sm:right-8"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="M6 8h12l-1.2 11.5a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8zM9 8V6a3 3 0 0 1 6 0v2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white ring-2 ring-background">
          {itemCount}
        </span>
      </button>
    </>
  );
}
