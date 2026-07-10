import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

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
    category: "Tailored Outerwear",
    price: "Rp 385.000",
    edition: "Edition of 12",
    image: "/catalog-1.png",
    alt: "A model wearing the Éclat Noir black tailored coat beside a rail of the collection",
  },
  {
    name: "Lumière d'Or",
    category: "Evening Couture",
    price: "Rp 349.000",
    edition: "Edition of 8",
    image: "/catalog-2.jpg",
    alt: "A model wearing the Lumière d'Or champagne-gold satin gown from the collection",
  },
  {
    name: "Voile de Soie",
    category: "Atelier Couture",
    price: "Rp 219.000",
    edition: "Made to order",
    image: "/catalog-3.jpg",
    alt: "A model draped in the Voile de Soie ivory silk-chiffon gown from the collection",
  },
];

function PieceCard({ piece, index }: { piece: Piece; index: number }) {
  return (
    <Reveal as="div" delay={index * 120}>
      <Link
        href="/catalog"
        className="group relative block overflow-hidden rounded-[2rem] border border-border/60"
      >
        {/* Object surface — collection photograph */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
          <Image
            src={piece.image}
            alt={piece.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />

          {/* Scrim — top + bottom, so chip and hover pill stay legible */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,transparent_28%,transparent_60%,rgba(12,10,9,0.55)_100%)]"
          />

          {/* Liquid sheen sweep on hover */}
          <div
            aria-hidden
            className="absolute -inset-x-10 -top-1/3 h-2/3 rotate-12 bg-white/15 blur-2xl transition-transform duration-[1400ms] ease-out group-hover:translate-y-[180%]"
          />

          {/* Edition chip */}
          <span className="absolute left-5 top-5 rounded-full glass-dark px-4 py-1.5 text-[9px] font-medium uppercase tracking-luxe-tight text-white/90">
            {piece.edition}
          </span>

          {/* Hover reveal — view piece */}
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-2xl glass-dark px-5 py-3.5">
              <span className="text-[11px] font-medium uppercase tracking-luxe-tight text-white">
                View the Piece
              </span>
              <svg
                width="16"
                height="16"
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
        <div className="flex items-end justify-between bg-background px-6 py-6">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-accent">
              {piece.category}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium text-primary">
              {piece.name}
            </h3>
          </div>
          <p className="text-sm font-light tracking-wide text-secondary tabular-nums">
            {piece.price}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Collection() {
  return (
    <section id="collections" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[10px] uppercase tracking-luxe text-accent">
              The Signature Collection
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-light leading-tight text-primary md:text-6xl">
              Garments conceived to
              <span className="italic"> outlive trend</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-luxe-tight text-primary transition-colors hover:text-accent"
            >
              Shop all pieces
              <span className="h-px w-8 bg-accent transition-all duration-300 group-hover:w-12" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PIECES.map((piece, i) => (
            <PieceCard key={piece.name} piece={piece} index={i} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex justify-center">
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-luxe-tight text-on-primary shadow-[0_8px_30px_-8px_rgba(12,10,9,0.4)] transition-all duration-300 hover:bg-accent hover:shadow-[0_12px_36px_-8px_rgba(161,98,7,0.5)]"
            >
              Explore the Full Catalog
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
