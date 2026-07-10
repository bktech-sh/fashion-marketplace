import Reveal from "./Reveal";

type Value = {
  title: string;
  copy: string;
  icon: React.ReactNode;
};

const VALUES: Value[] = [
  {
    title: "Keahlian Tunggal",
    copy: "Satu perajin, satu busana, dari potongan pertama hingga jahitan akhir. Tak pernah ada lini produksi yang menyentuh karya kami.",
    icon: (
      <path
        d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16.5 7.1 18.1 8 12.6 4 8.8 9.5 8 12 3z"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Kelangkaan yang Disengaja",
    copy: "Edisi dibatasi dan tak pernah diterbitkan ulang. Setelah satu seri ditutup, ia hanya menjadi milik mereka yang telah memilikinya.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8M8 12h8" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Material yang Tahan Lama",
    copy: "Kami hanya memilih bahan yang semakin baik seiring waktu — sutra alami, wol pilihan, dan kain yang dipotong untuk bertahan lintas generasi.",
    icon: (
      <path
        d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zM12 2v18M4 6.5l8 4.5 8-4.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Layanan Personal",
    copy: "Penasihat pribadi mendampingi setiap pembelian — penuh perhatian dan rahasia, selama Anda memiliki busana tersebut.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Values() {
  return (
    <section id="values" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-luxe text-accent">
              Yang Kami Junjung Tinggi
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-primary md:text-6xl">
              Empat prinsip, tanpa kompromi
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal
              key={value.title}
              as="article"
              delay={i * 100}
              className="group relative overflow-hidden rounded-[1.75rem] glass p-8 transition-all duration-500 hover:-translate-y-1 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(161,98,7,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 text-accent">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-hidden
                >
                  {value.icon}
                </svg>
              </div>
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
  );
}
