import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogGrid from "@/components/catalog/CatalogGrid";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "The Catalog — DELÉ Mode",
  description:
    "Browse the full DELÉ Mode collection — tailored coats, evening couture, and atelier pieces, handmade in Florence.",
};

const STATS = [
  { value: `${PRODUCTS.length}`, label: "Pieces in Collection" },
  { value: "5", label: "Categories" },
  { value: "1926", label: "Founded in Florence" },
];

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Rich hero banner */}
        <section className="relative flex h-[56vh] min-h-[460px] items-end overflow-hidden bg-primary sm:h-[46vh] md:h-[52vh]">
          <Image
            src="/catalog-1.png"
            alt="A curated rack of DELÉ Mode garments in the Florentine atelier"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-80"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.65)_0%,rgba(12,10,9,0.3)_22%,rgba(12,10,9,0.3)_50%,rgba(12,10,9,0.7)_78%,rgba(12,10,9,0.94)_100%)] sm:bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,rgba(12,10,9,0.25)_35%,rgba(12,10,9,0.65)_75%,rgba(12,10,9,0.92)_100%)]"
          />

          <div
            aria-hidden
            className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(200,150,46,0.25),transparent_70%)] blur-3xl"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8 pt-24 sm:pb-10 sm:pt-28 md:px-10 md:pb-12 md:pt-32">
            <div className="flex items-center gap-4 text-white">
              <span className="h-px w-8 bg-white/60" />
              <span className="text-[10px] uppercase tracking-luxe">
                The Full Collection
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl font-serif text-3xl font-light leading-[1.1] text-white sm:text-4xl md:text-6xl">
              Every piece, <span className="italic">made to endure</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-white/75">
              Tailored coats, evening couture, and atelier pieces — shaped
              by hand in Florence, released in strictly limited editions.
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5 sm:mt-8 sm:gap-x-10 sm:gap-y-4 sm:pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[9px] uppercase tracking-luxe-tight text-white/55">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-light text-white sm:text-2xl md:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 pb-28 pt-8 md:px-10 md:pb-36 md:pt-10">
          <CatalogGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}
