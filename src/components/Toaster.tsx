"use client";

import { useEffect, useState } from "react";
import { useToast, type Toast } from "@/context/ToastContext";

const EXIT_DURATION_MS = 250;
const AUTO_DISMISS_MS = 3200;

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(handleDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDismiss() {
    setVisible(false);
    window.setTimeout(() => onDismiss(toast.id), EXIT_DURATION_MS);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 rounded-2xl border border-primary/20 bg-accent px-4 py-3.5 shadow-[0_12px_40px_-8px_rgba(12,10,9,0.45)] transition-all duration-250 ease-out ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-6 opacity-0"
      }`}
    >
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden
        >
          <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 truncate text-xs font-light text-white/60">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Tutup notifikasi"
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 hover:text-primary"
      >
        <svg
          width="12"
          height="12"
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
  );
}

export default function Toaster() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-20 z-80 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5 sm:right-6 sm:top-24">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
