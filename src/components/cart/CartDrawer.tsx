"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatIDR, WHATSAPP_NUMBER } from "@/data/products";

type CheckoutForm = {
  name: string;
  address: string;
  notes: string;
};

const EMPTY_FORM: CheckoutForm = {
  name: "",
  address: "",
  notes: "",
};

export default function CartDrawer() {
  const {
    lines,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>(
    {},
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) {
      setStep("cart");
      setErrors({});
    }
  }, [isOpen]);

  function handleFieldChange(field: keyof CheckoutForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.name.trim()) next.name = "Masukkan nama lengkap Anda";
    if (!form.address.trim()) next.address = "Masukkan alamat pengiriman";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const orderDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const itemLines = lines
      .map((l, i) => {
        const label = `${i + 1}. *${l.name}*${l.size ? ` — Ukuran ${l.size}` : ""}`;
        const detail = `    ${l.quantity} × ${formatIDR(l.price)} = ${formatIDR(l.price * l.quantity)}`;
        return `${label}\n${detail}`;
      })
      .join("\n\n");

    const message = [
      `*Pesanan Baru — Atelier N1oire*`,
      `_${orderDate}_`,
      "",
      `Halo, saya ingin memesan produk berikut:`,
      "",
      `———————————————`,
      itemLines,
      `———————————————`,
      "",
      `*Subtotal:* ${formatIDR(subtotal)}`,
      "",
      `*Detail Pengiriman*`,
      `Nama: ${form.name}`,
      `Alamat: ${form.address}`,
      form.notes ? `Catatan: ${form.notes}` : null,
      "",
      `Terima kasih.`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    setForm(EMPTY_FORM);
    setStep("cart");
    closeCart();
  }

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-60 ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Scrim */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-[rgba(12,10,9,0.55)] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={step === "cart" ? "Keranjang belanja" : "Detail checkout"}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <button
                type="button"
                onClick={() => setStep("cart")}
                aria-label="Kembali ke keranjang"
                className="flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <h2 className="font-serif text-2xl font-medium text-primary">
              {step === "cart" ? "Pilihan Anda" : "Detail Pengiriman"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:text-accent"
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

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-serif text-xl font-light text-primary">
              Pilihan Anda masih kosong
            </p>
            <p className="max-w-xs text-sm font-light text-secondary">
              Jelajahi koleksi kami dan tambahkan produk yang ingin Anda
              miliki.
            </p>
            <Link
              href="/catalog"
              onClick={closeCart}
              className="mt-2 inline-block min-h-11 rounded-full bg-primary px-6 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight leading-[1.65] text-on-primary transition-colors hover:bg-accent"
            >
              Belanja Katalog
            </Link>
          </div>
        ) : step === "cart" ? (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {lines.map((line) => (
                <li
                  key={`${line.slug}::${line.size ?? ""}`}
                  className="flex gap-4 border-b border-border py-5 first:pt-0"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-base font-medium text-primary">
                          {line.name}
                        </h3>
                        {line.size && (
                          <p className="mt-0.5 text-[11px] uppercase tracking-luxe-tight text-secondary">
                            Ukuran {line.size}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug, line.size)}
                        aria-label={`Hapus ${line.name} dari keranjang`}
                        className="flex min-h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-secondary transition-colors hover:text-accent"
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
                          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              line.slug,
                              line.size,
                              line.quantity - 1,
                            )
                          }
                          aria-label={`Kurangi jumlah ${line.name}`}
                          className="flex min-h-9 min-w-9 cursor-pointer items-center justify-center text-primary transition-colors hover:text-accent"
                        >
                          −
                        </button>
                        <span className="min-w-5 text-center text-sm tabular-nums text-primary">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              line.slug,
                              line.size,
                              line.quantity + 1,
                            )
                          }
                          aria-label={`Tambah jumlah ${line.name}`}
                          className="flex min-h-9 min-w-9 cursor-pointer items-center justify-center text-primary transition-colors hover:text-accent"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-light tabular-nums text-secondary">
                        {formatIDR(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-luxe-tight text-secondary">
                  Subtotal
                </span>
                <span className="font-serif text-xl font-medium tabular-nums text-primary">
                  {formatIDR(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-light text-secondary">
                Ongkos kirim dan pajak dihitung saat checkout.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep("checkout")}
                  className="min-h-11 w-full cursor-pointer rounded-full bg-primary text-[11px] font-medium uppercase tracking-luxe-tight text-on-primary transition-colors hover:bg-accent"
                >
                  Lanjut ke Checkout
                </button>
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full border border-border text-[11px] font-medium uppercase tracking-luxe-tight text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Kembali ke Katalog
                </Link>
              </div>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmitOrder}
            noValidate
            className="flex flex-1 flex-col overflow-y-auto"
          >
            <div className="flex-1 space-y-5 px-6 py-6">
              <p className="text-sm font-light leading-relaxed text-secondary">
                Lengkapi detail pengiriman Anda dan kami akan membuka
                WhatsApp dengan pesanan siap dikirim ke tim atelier kami.
              </p>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-[10px] uppercase tracking-luxe text-accent"
                >
                  Nama Lengkap
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "checkout-name-error" : undefined}
                  className={`mt-2 min-h-11 w-full rounded-xl border bg-background px-4 py-2.5 text-base text-primary outline-none transition-colors focus:border-accent sm:text-sm ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p id="checkout-name-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-[10px] uppercase tracking-luxe text-accent"
                >
                  Alamat Pengiriman
                </label>
                <textarea
                  id="checkout-address"
                  autoComplete="street-address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "checkout-address-error" : undefined}
                  placeholder="Jalan, kota, kode pos, provinsi"
                  className={`mt-2 w-full resize-none rounded-xl border bg-background px-4 py-2.5 text-base text-primary outline-none transition-colors focus:border-accent sm:text-sm ${
                    errors.address ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.address && (
                  <p id="checkout-address-error" role="alert" className="mt-1.5 text-xs text-red-600">
                    {errors.address}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-notes"
                  className="block text-[10px] uppercase tracking-luxe text-accent"
                >
                  Catatan <span className="normal-case tracking-normal text-secondary">(opsional)</span>
                </label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  placeholder="Bungkus kado, instruksi pengiriman, dll."
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-base text-primary outline-none transition-colors focus:border-accent sm:text-sm"
                />
              </div>
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-luxe-tight text-secondary">
                  Subtotal
                </span>
                <span className="font-serif text-xl font-medium tabular-nums text-primary">
                  {formatIDR(subtotal)}
                </span>
              </div>
              <button
                type="submit"
                className="mt-5 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25D366] text-[11px] font-medium uppercase tracking-luxe-tight text-white transition-colors hover:brightness-95"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.87 9.87 0 0 0 4.91 1.3h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.86 14.03c-.25.7-1.24 1.28-2.03 1.45-.55.12-1.26.21-3.65-.78-3.05-1.26-5.02-4.35-5.17-4.55-.15-.2-1.23-1.63-1.23-3.11 0-1.48.77-2.2 1.05-2.5.28-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.07.13.07.72-.18 1.42z" />
                </svg>
                Kirim Pesanan via WhatsApp
              </button>
              <p className="mt-3 text-center text-[10px] font-light text-secondary">
                Anda akan diarahkan ke WhatsApp untuk mengonfirmasi pesanan
                dengan tim kami.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
