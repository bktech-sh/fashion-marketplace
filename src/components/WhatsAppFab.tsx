"use client";

import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/data/products";

const MESSAGE = "Halo DELÉ Mode, saya ingin bertanya tentang koleksi Anda.";

export default function WhatsAppFab() {
  const { itemCount, isOpen } = useCart();
  const cartFabVisible = itemCount > 0 && !isOpen;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(12,10,9,0.45)] transition-all duration-300 hover:brightness-95 hover:-translate-y-0.5 sm:right-8 ${
        cartFabVisible
          ? "bottom-22 sm:bottom-26"
          : "bottom-6 sm:bottom-8"
      }`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.87 9.87 0 0 0 4.91 1.3h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.86 14.03c-.25.7-1.24 1.28-2.03 1.45-.55.12-1.26.21-3.65-.78-3.05-1.26-5.02-4.35-5.17-4.55-.15-.2-1.23-1.63-1.23-3.11 0-1.48.77-2.2 1.05-2.5.28-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.12.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.07.13.07.72-.18 1.42z" />
      </svg>
    </a>
  );
}
