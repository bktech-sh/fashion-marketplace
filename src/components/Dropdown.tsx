"use client";

import { useEffect, useId, useRef, useState } from "react";

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type DropdownProps<T extends string> = {
  label: string;
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  /** Visually hide the label (still read by screen readers) */
  hideLabel?: boolean;
};

export default function Dropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
  hideLabel = false,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectOption(next: T) {
    onChange(next);
    setOpen(false);
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = options[Math.min(index + 1, options.length - 1)];
      document.getElementById(`${listboxId}-${next.value}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = options[Math.max(index - 1, 0)];
      document.getElementById(`${listboxId}-${prev.value}`)?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {hideLabel ? (
        <span id={`${listboxId}-label`} className="sr-only">
          {label}
        </span>
      ) : (
        <span
          id={`${listboxId}-label`}
          className="block text-[10px] uppercase tracking-luxe text-accent"
        >
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${listboxId}-label ${listboxId}-value`}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-border bg-background px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight text-primary outline-none focus:border-accent ${
          hideLabel ? "" : "mt-3"
        }`}
      >
        <span id={`${listboxId}-value`} className="truncate">
          {selected.label}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 text-secondary ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${listboxId}-label`}
          tabIndex={-1}
          className="absolute right-0 top-full z-20 mt-2 w-full min-w-[200px] overflow-hidden rounded-2xl border border-border bg-background py-1.5 shadow-[0_12px_40px_-8px_rgba(12,10,9,0.25)]"
        >
          {options.map((option, index) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="none">
                <button
                  id={`${listboxId}-${option.value}`}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  className={`flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 px-4 text-left text-[12px] font-light ${
                    active
                      ? "bg-muted text-primary"
                      : "text-secondary hover:bg-muted hover:text-primary"
                  }`}
                >
                  {option.label}
                  {active && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-accent"
                      aria-hidden
                    >
                      <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
