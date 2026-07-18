export type Category =
  | "Outerwear"
  | "Evening"
  | "Couture"
  | "Accessories"
  | "Archive";

export type Availability = "In Stock" | "Made to Order" | "Waitlist";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // IDR
  originalPrice?: number; // IDR — set when the piece is on a limited-time discount
  edition: string;
  availability: Availability;
  image: string;
  alt: string;
  description: string;
  /** Omitted for pieces with no size variants (e.g. bags, scarves) */
  sizes?: string[];
};

export function getDiscountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price) {
    return null;
  }
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const BELT_SIZES = ["80cm", "85cm", "90cm", "95cm", "100cm"];
const GLOVE_SIZES = ["6", "6.5", "7", "7.5", "8"];

const IMAGES = {
  flatlayAccessories: "/catalog-flatlay-accessories.jpg",
  rackOuterwear: "/catalog-rack-outerwear.jpg",
  streetCoatBlue: "/catalog-street-coat-blue.jpg",
  coatBurgundy: "/catalog-coat-burgundy.jpg",
  rackNeutral: "/catalog-rack-neutral.jpg",
  dressWhite: "/catalog-dress-white.jpg",
  streetTrousers: "/catalog-street-trousers.jpg",
  coatPinkArchway: "/catalog-coat-pink-archway.jpg",
  jacketFlatlay: "/catalog-jacket-flatlay.jpg",
};

export const CATEGORIES: Category[] = [
  "Outerwear",
  "Evening",
  "Couture",
  "Accessories",
  "Archive",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  Outerwear: "Outerwear",
  Evening: "Malam",
  Couture: "Couture",
  Accessories: "Aksesoris",
  Archive: "Arsip",
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  "In Stock": "Tersedia",
  "Made to Order": "Pesanan Khusus",
  Waitlist: "Daftar Tunggu",
};

export const PRODUCTS: Product[] = [
  {
    slug: "eclat-noir",
    name: "Éclat Noir",
    category: "Outerwear",
    price: 385_000,
    originalPrice: 460_000,
    edition: "Edisi 12",
    availability: "In Stock",
    image: IMAGES.coatBurgundy,
    alt: "A model wearing the Éclat Noir black tailored coat beside a rail of the collection",
    description:
      "A sculpted black wool coat, cut for a silhouette that carries itself. Hand-finished lapels and horn buttons anchor a piece built for decades, not seasons.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "lumiere-dor",
    name: "Lumière d'Or",
    category: "Evening",
    price: 349_000,
    originalPrice: 410_000,
    edition: "Edisi 8",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Lumière d'Or champagne-gold satin gown from the collection",
    description:
      "Liquid champagne-gold satin, bias-cut to fall with the body rather than against it. A quiet evening statement, made for candlelight.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "voile-de-soie",
    name: "Voile de Soie",
    category: "Couture",
    price: 219_000,
    edition: "Dibuat sesuai pesanan",
    availability: "Made to Order",
    image: IMAGES.rackNeutral,
    alt: "A model draped in the Voile de Soie ivory silk-chiffon gown from the collection",
    description:
      "Ivory silk chiffon, layered by hand into a gown that moves like breath. Made to order in our Florence atelier, fitted to you alone.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "manteau-de-nuit",
    name: "Manteau de Nuit",
    category: "Outerwear",
    price: 375_000,
    originalPrice: 445_000,
    edition: "Edisi 15",
    availability: "In Stock",
    image: IMAGES.streetCoatBlue,
    alt: "A model wearing the Manteau de Nuit charcoal wool coat",
    description:
      "Charcoal wool with a full, protective drape. A coat built for city nights — structured shoulders, a deep collar, and a lining that outlasts the trend cycle.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-cristalline",
    name: "Robe Cristalline",
    category: "Evening",
    price: 359_000,
    originalPrice: 420_000,
    edition: "Edisi 6",
    availability: "Waitlist",
    image: IMAGES.coatPinkArchway,
    alt: "A model wearing the Robe Cristalline crystal-embroidered evening gown",
    description:
      "Hand-embroidered crystal work traces the neckline and hem of this evening gown. Each stone is set by a single artisan, edition capped at six.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "dentelle-eternelle",
    name: "Dentelle Éternelle",
    category: "Couture",
    price: 259_000,
    edition: "Dibuat sesuai pesanan",
    availability: "Made to Order",
    image: IMAGES.streetTrousers,
    alt: "A model wearing the Dentelle Éternelle hand-appliquéd lace gown",
    description:
      "Hand-appliquéd lace over a silk foundation, built up in layers by our atelier's lace masters. Made to order, no two pieces identical.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "ceinture-doree",
    name: "Ceinture Dorée",
    category: "Accessories",
    price: 229_000,
    edition: "Edisi 40",
    availability: "In Stock",
    image: IMAGES.flatlayAccessories,
    alt: "The Ceinture Dorée hand-gilded leather belt",
    description:
      "Full-grain leather with a hand-gilded buckle, burnished to a soft antique gold. Ages into a patina that's entirely your own.",
    sizes: BELT_SIZES,
  },
  {
    slug: "foulard-de-soie",
    name: "Foulard de Soie",
    category: "Accessories",
    price: 209_000,
    edition: "Edisi 60",
    availability: "In Stock",
    image: IMAGES.jacketFlatlay,
    alt: "The Foulard de Soie hand-rolled silk scarf",
    description:
      "Pure silk twill with hand-rolled edges, printed in small batches. Light enough to fold into a pocket, substantial enough to anchor an outfit.",
  },
  {
    slug: "cape-hivernale",
    name: "Cape Hivernale",
    category: "Outerwear",
    price: 379_000,
    edition: "Edisi 10",
    availability: "Waitlist",
    image: IMAGES.rackOuterwear,
    alt: "A model wearing the Cape Hivernale wool and cashmere cape",
    description:
      "A wool and cashmere cape cut for full coverage without weight. Clean lines, an oversized collar, and a fastening built to last winters, not one.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "jupe-plissee",
    name: "Jupe Plissée",
    category: "Couture",
    price: 239_000,
    edition: "Edisi 20",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Jupe Plissée hand-pleated silk skirt",
    description:
      "Hundreds of hand-set pleats in fine silk, holding their shape with every movement. A skirt that catches light the way water does.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-de-minuit",
    name: "Robe de Minuit",
    category: "Evening",
    price: 369_000,
    edition: "Edisi 9",
    availability: "In Stock",
    image: IMAGES.streetCoatBlue,
    alt: "A model wearing the Robe de Minuit midnight-blue velvet gown",
    description:
      "Deep midnight-blue velvet with a fluid, floor-length cut. A gown built for one entrance and remembered long after.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "gants-de-chevreau",
    name: "Gants de Chevreau",
    category: "Accessories",
    price: 205_000,
    edition: "Edisi 80",
    availability: "In Stock",
    image: IMAGES.rackNeutral,
    alt: "The Gants de Chevreau kidskin leather gloves",
    description:
      "Kidskin leather, cut and stitched by hand for a second-skin fit. Lined in fine wool for warmth that doesn't sacrifice dexterity.",
    sizes: GLOVE_SIZES,
  },
  {
    slug: "veste-heritage",
    name: "Veste Héritage",
    category: "Archive",
    price: 335_000,
    edition: "Koleksi arsip",
    availability: "Waitlist",
    image: IMAGES.coatPinkArchway,
    alt: "A model wearing the archival Veste Héritage tweed jacket",
    description:
      "A tweed jacket drawn from our house archive, rewoven on the original looms. A rare piece for collectors of the maison's early years.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-de-collection-1962",
    name: "Robe de Collection 1962",
    category: "Archive",
    price: 399_000,
    edition: "Koleksi arsip",
    availability: "Waitlist",
    image: IMAGES.rackOuterwear,
    alt: "The archival Robe de Collection 1962 evening dress",
    description:
      "An exact reproduction of a house gown first shown in 1962, remade to the original pattern. Archive pieces are released individually, never reissued.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "manteau-leger",
    name: "Manteau Léger",
    category: "Outerwear",
    price: 319_000,
    edition: "Edisi 25",
    availability: "In Stock",
    image: IMAGES.coatBurgundy,
    alt: "A model wearing the Manteau Léger lightweight trench",
    description:
      "A trench in featherweight cotton twill, cut for transitional weather. Storm flap, horn buttons, and a belt that ties or buckles.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "corset-de-soie",
    name: "Corset de Soie",
    category: "Couture",
    price: 249_000,
    edition: "Dibuat sesuai pesanan",
    availability: "Made to Order",
    image: IMAGES.jacketFlatlay,
    alt: "A model wearing the Corset de Soie silk corset bodice",
    description:
      "A structured silk corset bodice, boned by hand and finished with a hidden lace closure. Made to order to your exact measurements.",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "sac-atelier",
    name: "Sac Atelier",
    category: "Accessories",
    price: 269_000,
    edition: "Edisi 30",
    availability: "In Stock",
    image: IMAGES.flatlayAccessories,
    alt: "The Sac Atelier hand-stitched leather bag",
    description:
      "A structured leather bag, hand-stitched with saddle thread and finished with brushed hardware. Sized for the day, built for years.",
  },
  {
    slug: "robe-emeraude",
    name: "Robe Émeraude",
    category: "Evening",
    price: 355_000,
    edition: "Edisi 11",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Robe Émeraude emerald silk gown",
    description:
      "Emerald silk with a fluid drape and a low, draped back. A gown built for the room to go quiet when you enter it.",
    sizes: APPAREL_SIZES,
  },
];

export function formatIDR(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// TODO: replace with the maison's real WhatsApp Business number (country code, no leading 0/+)
export const WHATSAPP_NUMBER = "6281268529556";
