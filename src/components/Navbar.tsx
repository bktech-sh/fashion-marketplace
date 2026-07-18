"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const LINKS = [
  { label: "Terbaru", href: "#collections" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Nilai Kami", href: "/about#values" },
  { label: "Belanja", href: "/catalog" },
];

/** Sections that only exist on the homepage — clicking these elsewhere
 *  navigates home first, then smooth-scrolls once the section mounts. */
const HOME_ONLY_HASHES = new Set(["#collections", "#story", "#values"]);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const forceScrolled = pathname === "/about";
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  function handleNavClick(e: React.MouseEvent, href: string) {
    if (pathname === "/" || !HOME_ONLY_HASHES.has(href)) return;
    e.preventDefault();
    router.push(`/${href}`);
    const id = href.slice(1);
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        attempts += 1;
        window.setTimeout(tryScroll, 50);
      }
    };
    window.setTimeout(tryScroll, 50);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 sm:px-8 md:px-10 ${forceScrolled || scrolled
          ? "my-2 rounded-full glass py-2 sm:my-3 sm:py-3"
          : "my-0 border-b border-white/10 bg-transparent py-3.5 sm:py-6"
          }`}
      >
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-luxe-tight text-primary sm:text-xl md:text-2xl"
        >
          Atelier&nbsp;Noire
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => {
            const isHomeOnlyHash = HOME_ONLY_HASHES.has(link.href);
            const href =
              isHomeOnlyHash && pathname !== "/" ? `/${link.href}` : link.href;
            return (
              <li key={link.href}>
                <Link
                  href={href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[11px] font-medium uppercase tracking-luxe-tight text-secondary transition-colors duration-300 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/catalog"
            className="hidden rounded-full bg-primary px-6 py-2.5 text-[11px] font-medium uppercase tracking-luxe-tight text-on-primary transition-all duration-300 hover:bg-accent md:inline-block"
          >
            Belanja Sekarang
          </Link>
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
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
            {LINKS.map((link) => {
              const isHomeOnlyHash = HOME_ONLY_HASHES.has(link.href);
              const href =
                isHomeOnlyHash && pathname !== "/"
                  ? `/${link.href}`
                  : link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={href}
                    onClick={(e) => {
                      setOpen(false);
                      handleNavClick(e, link.href);
                    }}
                    className="text-sm font-medium uppercase tracking-luxe-tight text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/catalog"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-luxe-tight text-on-primary"
              >
                Belanja Sekarang
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
