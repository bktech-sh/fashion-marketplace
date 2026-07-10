"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { label: "New In", href: "#collections" },
  { label: "The House", href: "#story" },
  { label: "Values", href: "#values" },
  { label: "Shop", href: "/catalog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 sm:px-8 md:px-10 ${scrolled
          ? "my-2 rounded-full glass py-2 sm:my-3 sm:py-3"
          : "my-0 border-b border-white/10 bg-transparent py-3.5 sm:py-6"
          }`}
      >
        <a
          href="#top"
          className="font-serif text-lg font-semibold tracking-luxe-tight text-primary sm:text-xl md:text-2xl"
        >
          DELÉ&nbsp;Mode
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-luxe-tight text-secondary transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-4">
          <a
            href="/catalog"
            className="hidden rounded-full bg-primary px-6 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight text-on-primary transition-all duration-300 hover:bg-accent md:inline-block"
          >
            Shop Now
          </a>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
          >
            <svg
              width="20"
              height="20"
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
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:text-accent md:hidden"
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
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-6 mt-2 rounded-3xl glass px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-luxe-tight text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/catalog"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-luxe-tight text-on-primary"
              >
                Shop Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
