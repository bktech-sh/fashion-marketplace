import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The House — DELÉ Mode",
  description:
    "The story of DELÉ Mode — a maison of high craftsmanship founded in Florence in 1926, where every garment still passes through a single pair of hands.",
};

const PRINCIPLES = [
  {
    title: "Singular Craftsmanship",
    copy: "One artisan, one garment, from first cut to final stitch. No assembly line ever touches our work.",
  },
  {
    title: "Deliberate Scarcity",
    copy: "Editions are capped and never reissued. Once a series closes, it belongs only to those who held it.",
  },
  {
    title: "Enduring Materials",
    copy: "We source only what improves with age — natural silks, noble wools, and cloth cut to last generations.",
  },
  {
    title: "Discreet Service",
    copy: "A private advisor accompanies every acquisition — attentively and confidentially, for as long as you own the piece.",
  },
];

const TIMELINE = [
  {
    year: "1926",
    copy: "Aurelio Vance opens a single-room atelier in Florence, refusing to make more than he can perfect by hand.",
  },
  {
    year: "1962",
    copy: "The house presents its first full evening collection — pieces from that season are now held in our private archive.",
  },
  {
    year: "1990",
    copy: "A third generation of artisans joins the atelier, trained by the same hands that trained their teachers.",
  },
  {
    year: "Today",
    copy: "Every garment still passes through one pair of hands, released in editions deliberately too small to scale.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex h-[56vh] min-h-[460px] items-end overflow-hidden bg-primary sm:h-[62vh]">
          <Image
            src="/hero.png"
            alt="A tailor's hands at work in the DELÉ Mode atelier in Florence"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.55)_0%,rgba(12,10,9,0.25)_30%,rgba(12,10,9,0.35)_55%,rgba(12,10,9,0.88)_100%)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-28 sm:pb-14 sm:pt-32 md:px-10">
            <Reveal>
              <div className="flex items-center gap-4 text-white">
                <span className="h-px w-8 bg-white/60" />
                <span className="text-[10px] uppercase tracking-luxe">
                  The House
                </span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl">
                A maison built on <span className="italic">refusal</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-lg text-sm font-light leading-relaxed text-white/75 sm:text-base">
                Since 1926, DELÉ Mode has made one refusal its founding
                principle: to never make more than can be perfected by a
                single pair of hands.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Founder narrative */}
        <section className="relative py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16 md:px-10">
            <Reveal className="order-2 md:order-1">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl">
                <Image
                  src="/catalog-rack-outerwear.jpg"
                  alt="Finished coats hanging on a rail in the DELÉ Mode atelier"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <div className="order-1 md:order-2">
              <Reveal>
                <p className="text-[10px] uppercase tracking-luxe text-accent">
                  Our Story
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-primary md:text-5xl">
                  Born of patience, in a quiet atelier in{" "}
                  <span className="italic">Florence</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 text-base font-light leading-relaxed text-secondary">
                  In 1926, a single craftsman refused to make more than he
                  could perfect. That refusal became our founding principle.
                  Today, every DELÉ Mode garment still passes through one
                  pair of hands — from raw material to final stitch — never
                  rushed, never repeated.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="mt-5 text-base font-light leading-relaxed text-secondary">
                  We do not scale. We deepen. What we release each season is
                  deliberately scarce, because true rarity cannot be
                  manufactured — only earned through time.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-10 flex items-center gap-6">
                  <span className="font-serif text-2xl italic text-primary">
                    Aurelio Vance
                  </span>
                  <span className="h-px w-16 gold-hairline" />
                  <span className="text-[10px] uppercase tracking-luxe-tight text-secondary">
                    Founder &amp; Maître d&apos;Art
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal>
              <p className="text-[10px] uppercase tracking-luxe text-accent">
                A Century, Nearly
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 max-w-xl font-serif text-3xl font-light leading-tight text-primary md:text-5xl">
                Ninety-eight years of unbroken craftsmanship
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TIMELINE.map((entry, i) => (
                <Reveal
                  key={entry.year}
                  as="article"
                  delay={i * 100}
                  className="border-t border-accent/40 pt-6"
                >
                  <p className="font-serif text-3xl font-light text-primary">
                    {entry.year}
                  </p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-secondary">
                    {entry.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section id="values" className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-16 max-w-2xl">
              <Reveal>
                <p className="text-[10px] uppercase tracking-luxe text-accent">
                  What We Hold Sacred
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-primary md:text-6xl">
                  Four principles, never compromised
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((value, i) => (
                <Reveal
                  key={value.title}
                  as="article"
                  delay={i * 100}
                  className="rounded-[1.75rem] glass p-8 md:p-10"
                >
                  <h3 className="font-serif text-2xl font-medium text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-secondary">
                    {value.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Atelier gallery */}
        <section className="relative border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <Reveal>
                <p className="text-[10px] uppercase tracking-luxe text-accent">
                  Inside the Atelier
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-primary md:text-5xl">
                  Where every piece begins
                </h2>
              </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  src: "/catalog-jacket-flatlay.jpg",
                  alt: "A finished jacket laid out for final inspection in the atelier",
                },
                {
                  src: "/catalog-flatlay-accessories.jpg",
                  alt: "Leather goods and accessories arranged on the cutting table",
                },
                {
                  src: "/catalog-rack-neutral.jpg",
                  alt: "A rail of garments awaiting their final fitting",
                },
              ].map((photo, i) => (
                <Reveal
                  key={photo.src}
                  as="div"
                  delay={i * 100}
                  className="relative aspect-4/5 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative border-t border-border py-24 text-center md:py-32">
          <div className="mx-auto max-w-2xl px-6 md:px-10">
            <Reveal>
              <h2 className="font-serif text-3xl font-light leading-tight text-primary md:text-5xl">
                Discover the pieces we&rsquo;ve made
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 text-base font-light leading-relaxed text-secondary">
                Every piece in the catalog carries the same hand that shaped
                our first garment in 1926.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9">
                <Link
                  href="/catalog"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[12px] font-medium uppercase tracking-luxe-tight text-on-primary shadow-[0_8px_30px_-8px_rgba(12,10,9,0.4)] transition-all duration-300 hover:bg-accent hover:shadow-[0_12px_36px_-8px_rgba(161,98,7,0.5)]"
                >
                  Explore the Catalog
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
      </main>
      <Footer />
    </>
  );
}
