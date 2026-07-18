import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  AVAILABILITY_LABELS,
  CATEGORY_LABELS,
  PRODUCTS,
  formatIDR,
  getDiscountPercent,
  type Product,
} from "@/data/products";

export default function ProductBento() {
  const [large, small1, small2] = PRODUCTS;
  if (!large || !small1 || !small2) return null;

  return (
    <section className="relative py-4 md:py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
          Pilihan Kurator
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-6xl">
          Tampil <span className="italic">Beda</span>
        </h2>
        <p className="mt-3 max-w-md text-sm font-light text-secondary sm:mt-4 sm:text-base">
          Tiga rancangan yang paling banyak dicari musim ini.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4">
          <Reveal className="h-[22rem] sm:h-[28rem] lg:h-[32rem]">
            <BentoTile product={large} />
          </Reveal>
          <div className="flex h-[22rem] flex-col gap-3 sm:h-[28rem] sm:gap-4 lg:h-[32rem]">
            <Reveal delay={80} className="flex-1">
              <BentoTile product={small1} />
            </Reveal>
            <Reveal delay={160} className="flex-1">
              <BentoTile product={small2} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoTile({ product }: { product: Product }) {
  const discountPercent = getDiscountPercent(product);

  return (
    <Link
      href="/catalog"
      aria-label={`Lihat ${product.name}`}
      className="group relative block h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-muted"
    >
      <Image
        src={product.image}
        alt={product.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 50vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.25)_0%,transparent_35%,transparent_55%,rgba(12,10,9,0.65)_100%)]"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4">
        {product.edition !== "Dibuat sesuai pesanan" && (
          <span className="rounded-full glass-dark px-2.5 py-1 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90 sm:text-[9px]">
            {product.edition}
          </span>
        )}
        {product.availability !== "In Stock" && (
          <span className="rounded-full glass-dark px-2.5 py-1 text-[8px] font-medium uppercase tracking-luxe-tight text-white/90 sm:text-[9px]">
            {AVAILABILITY_LABELS[product.availability]}
          </span>
        )}
        {discountPercent && (
          <span className="rounded-full bg-red-700 px-2.5 py-1 text-[8px] font-semibold uppercase text-white sm:text-[9px]">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
        <p className="text-[8px] uppercase tracking-luxe text-accent-soft sm:text-[9px]">
          {CATEGORY_LABELS[product.category]}
        </p>
        <h3 className="mt-1 font-serif text-base font-medium text-white sm:text-2xl">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
          <p className="text-xs font-light tracking-wide text-white/90 tabular-nums sm:text-lg">
            {formatIDR(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-[10px] text-white/60 line-through sm:text-sm">
              {formatIDR(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
