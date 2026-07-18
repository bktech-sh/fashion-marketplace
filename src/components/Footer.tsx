import Link from "next/link";

const COLUMNS = [
  {
    heading: "Maison",
    links: [
      { label: "Atelier Kami", href: "/about" },
      { label: "Keahlian", href: "/about" },
      { label: "Keberlanjutan", href: "#" },
      { label: "Karier", href: "#" },
    ],
  },
  {
    heading: "Koleksi",
    links: [
      { label: "Mantel Rancangan Khusus", href: "/catalog" },
      { label: "Malam", href: "/catalog" },
      { label: "Couture", href: "/catalog" },
      { label: "Arsip", href: "/catalog" },
    ],
  },
  {
    heading: "Layanan Pelanggan",
    links: [
      { label: "Layanan Pelanggan", href: "#" },
      { label: "Pengiriman & Retur", href: "#" },
      { label: "Panduan Ukuran", href: "#" },
      { label: "Kontak", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold tracking-luxe-tight text-primary">
              Atelier&nbsp;Noire
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-secondary">
              Busana dengan keistimewaan langka, dibuat dengan tangan di
              Florence sejak 1926.
            </p>
            <div className="mt-6 h-px w-24 gold-hairline" />
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-medium uppercase tracking-luxe text-accent">
                {col.heading}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-secondary transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-[11px] uppercase tracking-luxe-tight text-secondary/70">
            © 2026 Atelier N1oire · Hak cipta dilindungi
          </p>
          <div className="flex items-center gap-8">
            {["Ketentuan", "Privasi", "Cookie"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] uppercase tracking-luxe-tight text-secondary/70 transition-colors hover:text-accent"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
