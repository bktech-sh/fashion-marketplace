"use client";

import { useCart } from "@/context/CartContext";

export default function CartFab() {
  const { itemCount, openCart, isOpen } = useCart();

  if (itemCount === 0 || isOpen) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${itemCount} items`}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_8px_30px_-6px_rgba(12,10,9,0.45)] transition-all duration-300 hover:bg-accent hover:-translate-y-0.5 md:bottom-8 md:right-8"
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
  );
}
