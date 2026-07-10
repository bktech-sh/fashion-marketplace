import Image from "next/image";
import Link from "next/link";

type Piece = {
  name: string;
  category: string;
  price: string;
  edition: string;
  image: string;
  alt: string;
};

const PIECES: Piece[] = [
  {
    name: "Éclat Noir",
    category: "Mantel Rancangan Khusus",
    price: "Rp 385.000",
    edition: "Edisi 12",
    image: "/catalog-coat-burgundy.jpg",
    alt: "Model mengenakan mantel hitam Éclat Noir di samping rak koleksi",
  },
  {
    name: "Lumière d'Or",
    category: "Couture Malam",
    price: "Rp 349.000",
    edition: "Edisi 8",
    image: "/catalog-dress-white.jpg",
    alt: "Model mengenakan gaun satin emas-sampanye Lumière d'Or dari koleksi",
  },
  {
    name: "Voile de Soie",
    category: "Couture Atelier",
    price: "Rp 219.000",
    edition: "Dibuat sesuai pesanan",
    image: "/catalog-rack-neutral.jpg",
    alt: "Model berbalut gaun sifon sutra gading Voile de Soie dari koleksi",
  },
  {
    name: "Manteau de Nuit",
    category: "Mantel Rancangan Khusus",
    price: "Rp 375.000",
    edition: "Edisi 15",
    image: "/catalog-street-coat-blue.jpg",
    alt: "Model mengenakan mantel wol arang Manteau de Nuit",
  },
  {
    name: "Robe Cristalline",
    category: "Couture Malam",
    price: "Rp 359.000",
    edition: "Edisi 6",
    image: "/catalog-coat-pink-archway.jpg",
    alt: "Model mengenakan gaun malam bersulam kristal Robe Cristalline",
  },
  {
    name: "Cape Hivernale",
    category: "Mantel Rancangan Khusus",
    price: "Rp 379.000",
    edition: "Edisi 10",
    image: "/catalog-rack-outerwear.jpg",
    alt: "Model mengenakan cape wol dan kasmir Cape Hivernale",
  },
];

function PieceCard({ piece }: { piece: Piece }) {
  return (
    <Link
      href="/catalog"
      className="group relative block overflow-hidden rounded-3xl border border-border/60"
    >
      {/* Object surface — collection photograph */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
        <Image
          src={piece.image}
          alt={piece.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center"
        />

        {/* Scrim — top + bottom, so chip and hover pill stay legible */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,transparent_28%,transparent_60%,rgba(12,10,9,0.55)_100%)]"
        />

        {/* Edition chip */}
        <span className="absolute left-3 top-3 rounded-full glass-dark px-3 py-1 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90">
          {piece.edition}
        </span>

        {/* Hover reveal — view piece */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100">
          <div className="flex items-center justify-between rounded-xl glass-dark px-4 py-2.5">
            <span className="text-[10px] font-medium uppercase tracking-luxe-tight text-white">
              Lihat Detail
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent-soft"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="bg-background px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <div className="min-w-0">
            <p className="truncate text-[9px] uppercase tracking-luxe text-accent">
              {piece.category}
            </p>
            <h3 className="mt-1 truncate font-serif text-base font-medium text-primary sm:mt-1.5 sm:text-lg">
              {piece.name}
            </h3>
          </div>
          <p className="shrink-0 text-xs font-light tracking-wide text-secondary tabular-nums">
            {piece.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Collection() {
  return (
    <section id="collections" className="relative py-14 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-16 sm:gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
              Koleksi Andalan
            </p>
            <h2 className="mt-2 max-w-xl font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-6xl">
              Busana yang dirancang untuk
              <span className="italic"> melampaui tren</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-luxe-tight text-primary hover:text-accent sm:text-[11px]"
          >
            Lihat semua busana
            <span className="h-px w-8 bg-accent" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
          {PIECES.map((piece) => (
            <PieceCard key={piece.name} piece={piece} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-luxe-tight text-on-primary shadow-[0_8px_30px_-8px_rgba(12,10,9,0.4)] hover:bg-accent"
          >
            Jelajahi Katalog Lengkap
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
