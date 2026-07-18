import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  AVAILABILITY_LABELS,
  CATEGORY_LABELS,
  PRODUCTS,
  formatIDR,
  getDiscountPercent,
} from "@/data/products";

export default function ProductSplitHero() {
  const product = PRODUCTS[0];
  if (!product) return null;

  const discountPercent = getDiscountPercent(product);

  return (
    <section className="relative py-4 md:py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border/60 bg-muted">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute left-4 top-4 flex items-start gap-1.5">
              {product.edition !== "Dibuat sesuai pesanan" && (
                <span className="rounded-full glass-dark px-3 py-1 text-[9px] font-medium uppercase tracking-luxe-tight text-white/90">
                  {product.edition}
                </span>
              )}
              {discountPercent && (
                <span className="rounded-full bg-red-700 px-3 py-1 text-[9px] font-semibold uppercase text-white">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
                {CATEGORY_LABELS[product.category]} &middot; {AVAILABILITY_LABELS[product.availability]}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-5xl">
                {product.name}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-3 text-sm font-light leading-relaxed text-secondary sm:mt-4 sm:text-base">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-5 flex flex-wrap items-baseline gap-3 sm:mt-6">
                <p className="font-serif text-2xl font-light text-primary tabular-nums sm:text-3xl">
                  {formatIDR(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="text-base text-secondary/60 line-through sm:text-lg">
                    {formatIDR(product.originalPrice)}
                  </p>
                )}
              </div>
            </Reveal>

            {product.sizes && (
              <Reveal delay={260}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-border px-3 py-1 text-xs font-light text-secondary"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-8">
                <Link
                  href="/catalog"
                  className="rounded-full bg-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-luxe-tight text-on-primary hover:bg-accent"
                >
                  Lihat Rancangan
                </Link>
                <Link
                  href="/catalog"
                  className="rounded-full border border-border px-7 py-3.5 text-[11px] font-medium uppercase tracking-luxe-tight text-primary hover:border-accent hover:text-accent"
                >
                  Jelajahi Katalog
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
