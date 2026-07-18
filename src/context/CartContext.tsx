"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";
import { useToast } from "@/context/ToastContext";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string | null;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string | null, quantity?: number) => void;
  removeItem: (slug: string, size: string | null) => void;
  updateQuantity: (slug: string, size: string | null, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "atelier-noire-cart";

function lineKey(slug: string, size: string | null) {
  return `${slug}::${size ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback(
    (product: Product, size: string | null, quantity = 1) => {
      setLines((prev) => {
        const key = lineKey(product.slug, size);
        const existing = prev.find((l) => lineKey(l.slug, l.size) === key);
        if (existing) {
          return prev.map((l) =>
            lineKey(l.slug, l.size) === key
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [
          ...prev,
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            quantity,
          },
        ];
      });
      showToast({
        title: "Berhasil dimasukkan ke keranjang",
        description: size ? `${product.name} — Ukuran ${size}` : product.name,
      });
    },
    [showToast],
  );

  const removeItem = useCallback((slug: string, size: string | null) => {
    const key = lineKey(slug, size);
    setLines((prev) => prev.filter((l) => lineKey(l.slug, l.size) !== key));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, size: string | null, quantity: number) => {
      const key = lineKey(slug, size);
      setLines((prev) => {
        if (quantity <= 0) {
          return prev.filter((l) => lineKey(l.slug, l.size) !== key);
        }
        return prev.map((l) =>
          lineKey(l.slug, l.size) === key ? { ...l, quantity } : l,
        );
      });
    },
    [],
  );

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [
      lines,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
