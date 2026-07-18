import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  AVAILABILITY_LABELS,
  CATEGORY_LABELS,
  PRODUCTS,
  formatIDR,
  type Product,
} from "@/data/products";

export default function ProductBentoV2() {
  const banner = PRODUCTS[3];
  const tiles = [PRODUCTS[4], PRODUCTS[5], PRODUCTS[6]];

  if (!banner || tiles.some((p) => !p)) return null;

  return (
    <section className="relative py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-[9px] uppercase tracking-luxe text-accent sm:text-[10px]">
          Edisi Musim Ini
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-2xl font-light leading-tight text-primary sm:mt-4 sm:text-4xl md:text-6xl">
          Sorotan <span className="italic">Utama</span>
        </h2>
        <p className="mt-3 max-w-md text-sm font-light text-secondary sm:mt-4 sm:text-base">
          Empat pilihan yang mewakili setiap sisi gaya Anda.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-14 sm:gap-4">
          <Reveal className="h-56 sm:h-72 lg:h-80">
            <BentoTile product={banner} variant="banner" />
          </Reveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {tiles.map((product, index) => (
              <Reveal key={product!.slug} delay={80 + index * 60} className="aspect-square">
                <BentoTile product={product!} variant="square" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  product,
  variant,
}: {
  product: Product;
  variant: "banner" | "square";
}) {
  const isBanner = variant === "banner";

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
        sizes={isBanner ? "(min-width: 1024px) 1152px, 100vw" : "(min-width: 1024px) 33vw, 33vw"}
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.25)_0%,transparent_35%,transparent_55%,rgba(12,10,9,0.65)_100%)]"
      />

      {isBanner && product.edition !== "Dibuat sesuai pesanan" && (
        <span className="absolute left-3 top-3 rounded-full glass-dark px-2.5 py-1 text-[9px] font-medium uppercase tracking-luxe-tight text-white/90 sm:left-4 sm:top-4 sm:text-[10px]">
          {product.edition}
        </span>
      )}

      {!isBanner && (
        <span className="absolute right-1.5 top-1.5 rounded-full glass-dark px-1.5 py-0.5 text-[7px] font-medium uppercase tracking-luxe-tight text-white/90 sm:right-2 sm:top-2 sm:text-[8px]">
          {AVAILABILITY_LABELS[product.availability]}
        </span>
      )}

      <div className={isBanner ? "absolute inset-x-0 bottom-0 p-4 sm:p-6" : "absolute inset-x-0 bottom-0 p-2 sm:p-3"}>
        {isBanner && (
          <p className="text-[8px] uppercase tracking-luxe text-accent-soft sm:text-[9px]">
            {CATEGORY_LABELS[product.category]}
          </p>
        )}
        <h3
          className={
            isBanner
              ? "mt-1 font-serif text-xl font-medium text-white sm:text-3xl"
              : "font-serif text-[11px] font-medium text-white sm:text-sm"
          }
        >
          {product.name}
        </h3>
        <p
          className={
            isBanner
              ? "mt-2 text-base font-light tracking-wide text-white/90 tabular-nums sm:text-xl"
              : "mt-0.5 text-[10px] font-light tracking-wide text-white/90 tabular-nums sm:text-xs"
          }
        >
          {formatIDR(product.price)}
        </p>
      </div>
    </Link>
  );
}
