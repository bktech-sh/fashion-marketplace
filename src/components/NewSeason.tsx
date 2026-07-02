import Reveal from "./Reveal";

const PERKS = [
  {
    label: "Complimentary Shipping",
    detail: "On every order, worldwide",
    icon: (
      <>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="1.6" />
        <circle cx="17.5" cy="17" r="1.6" />
      </>
    ),
  },
  {
    label: "Easy 30-Day Returns",
    detail: "Free returns, no questions asked",
    icon: (
      <>
        <path d="M4 9h11a5 5 0 010 10H9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 6L4 9l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Secure Checkout",
    detail: "Encrypted, trusted payments",
    icon: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
      </>
    ),
  },
];

export default function NewSeason() {
  return (
    <section
      id="shop"
      className="relative overflow-hidden bg-primary py-28 text-on-primary md:py-40"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 animate-liquid bg-[radial-gradient(circle,rgba(200,150,46,0.28),transparent_60%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        <Reveal delay={120}>
          <h2 className="mt-8 font-serif text-5xl font-light leading-[1.08] text-white md:text-7xl">
            Discover the
            <span className="italic shimmer-text"> New Season</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p className="mx-auto mt-7 max-w-xl text-base font-light leading-relaxed text-white/70">
            Explore this season&apos;s handcrafted pieces — tailored coats,
            evening gowns, and atelier couture, each made in limited number.
            Shipped to your door with complimentary delivery and easy returns.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-[11px] font-medium uppercase tracking-luxe-tight text-primary transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Shop Now
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
            </a>
            <a
              href="#story"
              className="group inline-flex items-center text-[11px] font-medium uppercase tracking-luxe-tight text-white/90 transition-colors duration-300 hover:text-accent-soft"
            >
              <span className="relative">
                Our Craftsmanship
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-white/40 transition-colors duration-500 group-hover:bg-accent-soft" />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Marketplace perks */}
        <Reveal delay={420}>
          <ul className="mx-auto mt-14 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {PERKS.map((perk) => (
              <li
                key={perk.label}
                className="flex items-start gap-4 rounded-2xl glass-dark px-5 py-5"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  className="mt-0.5 shrink-0 text-accent-soft"
                  aria-hidden
                >
                  {perk.icon}
                </svg>
                <span className="flex flex-col">
                  <span className="text-[12px] font-medium uppercase tracking-luxe-tight text-white">
                    {perk.label}
                  </span>
                  <span className="mt-1 text-[11px] font-light leading-snug text-white/60">
                    {perk.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
