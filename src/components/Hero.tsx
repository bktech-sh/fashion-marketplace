import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[70dvh] flex-col overflow-hidden bg-background sm:min-h-dvh">
      {/* Full-bleed photograph */}
      <Image
        src="/hero.png"
        alt="Rangkaian busana mewah wanita di atelier yang cerah"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Soft gradient — only where the text sits, so the image stays clean */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35)_0%,rgba(12,10,9,0.1)_22%,rgba(12,10,9,0.35)_45%,rgba(12,10,9,0.72)_68%,rgba(12,10,9,0.94)_100%)]"
      />

      {/* Content — calm cluster, bottom-anchored on tall viewports,
          naturally flows below the fixed navbar when content needs more room */}
      <div className="relative z-10 mt-auto pt-24 sm:pt-0">
        <div className="mx-auto max-w-3xl px-6 pb-10 text-center md:pb-16">
          <Reveal delay={80}>
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="h-px w-8 bg-white/60" />
              <span className="text-[10px] uppercase tracking-luxe">
                Edisi Musim Gugur · Koleksi N°01
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
            <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/90 md:text-base">
              Sebuah maison eksklusif dengan keahlian tinggi sejak 1926. Setiap
              busana dibentuk dengan tangan di atelier kami di Florence,
              dirilis dalam edisi tak lebih dari dua belas, dan diperuntukkan
              bagi mereka yang menghargai keistimewaan di atas kelimpahan.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#collections"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[11px] font-medium uppercase tracking-luxe-tight text-primary transition-all duration-300 hover:bg-accent hover:text-white"
              >
                Jelajahi Koleksi
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
                  Keahlian Kami
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-white/40 transition-colors duration-500 group-hover:bg-accent-soft" />
                </span>
              </a>
            </div>
          </Reveal>

          {/* Compact trust line */}
          <Reveal delay={460}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-luxe-tight text-white/80">
              <span>Dibuat Tangan di Florence</span>
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span>Edisi Dua Belas</span>
              <span className="h-1 w-1 rounded-full bg-white/50" />
              <span>Restorasi Seumur Hidup</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
