import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden bg-background">
      {/* Full-bleed photograph */}
      <Image
        src="/hero.png"
        alt="A curated rack of luxury women's garments in a sunlit atelier"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Soft gradient — only where the text sits, so the image stays clean */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.28)_0%,transparent_20%,transparent_38%,rgba(12,10,9,0.55)_62%,rgba(12,10,9,0.82)_100%)]"
      />

      {/* Content — calm cluster, bottom-anchored */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-3xl px-6 pb-14 text-center md:pb-16">
          <Reveal delay={80}>
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="h-px w-8 bg-white/60" />
              <span className="text-[10px] uppercase tracking-luxe">
                The Autumn Edit · Collection N°01
              </span>
              <span className="h-px w-8 bg-white/60" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h1 className="mt-5 font-serif text-4xl font-light leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
              Timeless Pieces,
              <br />
              <span className="italic">Crafted to Endure</span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/75 md:text-base">
              An exclusive maison of high craftsmanship since 1926. Each garment
              is shaped by hand in our Florentine atelier, released in editions
              of no more than twelve, and reserved for those who value the
              extraordinary over the abundant.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#collections"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-luxe-tight text-primary transition-all duration-300 hover:bg-accent hover:text-white"
              >
                Discover the Collection
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#story"
                className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-luxe-tight text-white/90 transition-colors duration-300 hover:text-accent-soft"
              >
                <span className="relative">
                  Our Craftsmanship
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-white/40 transition-colors duration-500 group-hover:bg-accent-soft" />
                </span>
              </a>
            </div>
          </Reveal>

          {/* Compact trust line */}
          <Reveal delay={460}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-luxe-tight text-white/55">
              <span>Handmade in Florence</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Editions of Twelve</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Lifetime Restoration</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
