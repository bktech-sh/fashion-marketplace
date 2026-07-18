import Reveal from "./Reveal";

export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-primary py-28 text-on-primary md:py-40"
    >
      {/* Dark ambient glass field */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-0 h-[40rem] w-[40rem] -translate-x-1/2 animate-liquid bg-[radial-gradient(circle,rgba(161,98,7,0.22),transparent_60%)] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10">
        {/* Visual — layered liquid glass panels */}
        <Reveal className="order-2 md:order-1">
          <div className="relative aspect-square w-full">
            <div className="absolute inset-6 animate-liquid bg-[conic-gradient(from_180deg_at_50%_50%,#a97e2f,#2b2622,#d8b56a,#14110f,#a97e2f)] opacity-90 blur-[2px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-dark flex h-3/4 w-3/4 flex-col items-center justify-center rounded-[2.5rem] text-center">
                <p className="font-serif text-6xl font-light text-white md:text-7xl">
                  98
                </p>
                <p className="mt-2 max-w-[10rem] text-[10px] uppercase tracking-luxe text-white/70">
                  Tahun keahlian tanpa henti
                </p>
              </div>
            </div>
            {/* Floating detail chips */}
            <span className="absolute -right-2 top-8 animate-float rounded-2xl glass-dark px-4 py-2 text-[9px] uppercase tracking-luxe-tight text-white/85">
              Sentuhan Akhir Tangan
            </span>
            <span
              className="absolute -left-2 bottom-10 animate-float rounded-2xl glass-dark px-4 py-2 text-[9px] uppercase tracking-luxe-tight text-white/85"
              style={{ animationDelay: "-3s" }}
            >
              Satu Perajin
            </span>
          </div>
        </Reveal>

        {/* Narrative */}
        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-[10px] uppercase tracking-luxe text-accent-soft">
              Kisah Kami
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.15] text-white md:text-6xl">
              Lahir dari kesabaran, di atelier yang tenang di
              <span className="italic text-accent-soft"> Florence</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-white/70">
              Pada 1926, seorang perajin menolak membuat lebih banyak daripada
              yang bisa ia sempurnakan. Penolakan itu menjadi prinsip pendiri
              kami. Kini, setiap busana Atelier N1oire masih melewati satu pasang
              tangan — dari bahan mentah hingga jahitan akhir — tanpa terburu-
              buru, tanpa pengulangan.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-white/70">
              Kami tidak memperbesar skala. Kami memperdalam. Apa yang kami
              rilis setiap musim sengaja dibuat langka, karena kelangkaan
              sejati tidak bisa diproduksi — hanya bisa diraih melalui waktu.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex items-center gap-6">
              <span className="font-serif text-2xl italic text-white/90">
                Aurelio Vance
              </span>
              <span className="h-px w-16 gold-hairline" />
              <span className="text-[10px] uppercase tracking-luxe-tight text-white/50">
                Pendiri &amp; Maître d&apos;Art
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
