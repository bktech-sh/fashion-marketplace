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
  edition: string;
  availability: Availability;
  image: string;
  alt: string;
  /** Omitted for pieces with no size variants (e.g. bags, scarves) */
  sizes?: string[];
};

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

export const PRODUCTS: Product[] = [
  {
    slug: "eclat-noir",
    name: "Éclat Noir",
    category: "Outerwear",
    price: 385_000,
    edition: "Edition of 12",
    availability: "In Stock",
    image: IMAGES.coatBurgundy,
    alt: "A model wearing the Éclat Noir black tailored coat beside a rail of the collection",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "lumiere-dor",
    name: "Lumière d'Or",
    category: "Evening",
    price: 349_000,
    edition: "Edition of 8",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Lumière d'Or champagne-gold satin gown from the collection",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "voile-de-soie",
    name: "Voile de Soie",
    category: "Couture",
    price: 219_000,
    edition: "Made to order",
    availability: "Made to Order",
    image: IMAGES.rackNeutral,
    alt: "A model draped in the Voile de Soie ivory silk-chiffon gown from the collection",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "manteau-de-nuit",
    name: "Manteau de Nuit",
    category: "Outerwear",
    price: 375_000,
    edition: "Edition of 15",
    availability: "In Stock",
    image: IMAGES.streetCoatBlue,
    alt: "A model wearing the Manteau de Nuit charcoal wool coat",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-cristalline",
    name: "Robe Cristalline",
    category: "Evening",
    price: 359_000,
    edition: "Edition of 6",
    availability: "Waitlist",
    image: IMAGES.coatPinkArchway,
    alt: "A model wearing the Robe Cristalline crystal-embroidered evening gown",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "dentelle-eternelle",
    name: "Dentelle Éternelle",
    category: "Couture",
    price: 259_000,
    edition: "Made to order",
    availability: "Made to Order",
    image: IMAGES.streetTrousers,
    alt: "A model wearing the Dentelle Éternelle hand-appliquéd lace gown",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "ceinture-doree",
    name: "Ceinture Dorée",
    category: "Accessories",
    price: 229_000,
    edition: "Edition of 40",
    availability: "In Stock",
    image: IMAGES.flatlayAccessories,
    alt: "The Ceinture Dorée hand-gilded leather belt",
    sizes: BELT_SIZES,
  },
  {
    slug: "foulard-de-soie",
    name: "Foulard de Soie",
    category: "Accessories",
    price: 209_000,
    edition: "Edition of 60",
    availability: "In Stock",
    image: IMAGES.jacketFlatlay,
    alt: "The Foulard de Soie hand-rolled silk scarf",
  },
  {
    slug: "cape-hivernale",
    name: "Cape Hivernale",
    category: "Outerwear",
    price: 379_000,
    edition: "Edition of 10",
    availability: "Waitlist",
    image: IMAGES.rackOuterwear,
    alt: "A model wearing the Cape Hivernale wool and cashmere cape",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "jupe-plissee",
    name: "Jupe Plissée",
    category: "Couture",
    price: 239_000,
    edition: "Edition of 20",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Jupe Plissée hand-pleated silk skirt",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-de-minuit",
    name: "Robe de Minuit",
    category: "Evening",
    price: 369_000,
    edition: "Edition of 9",
    availability: "In Stock",
    image: IMAGES.streetCoatBlue,
    alt: "A model wearing the Robe de Minuit midnight-blue velvet gown",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "gants-de-chevreau",
    name: "Gants de Chevreau",
    category: "Accessories",
    price: 205_000,
    edition: "Edition of 80",
    availability: "In Stock",
    image: IMAGES.rackNeutral,
    alt: "The Gants de Chevreau kidskin leather gloves",
    sizes: GLOVE_SIZES,
  },
  {
    slug: "veste-heritage",
    name: "Veste Héritage",
    category: "Archive",
    price: 335_000,
    edition: "Archive piece",
    availability: "Waitlist",
    image: IMAGES.coatPinkArchway,
    alt: "A model wearing the archival Veste Héritage tweed jacket",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "robe-de-collection-1962",
    name: "Robe de Collection 1962",
    category: "Archive",
    price: 399_000,
    edition: "Archive piece",
    availability: "Waitlist",
    image: IMAGES.rackOuterwear,
    alt: "The archival Robe de Collection 1962 evening dress",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "manteau-leger",
    name: "Manteau Léger",
    category: "Outerwear",
    price: 319_000,
    edition: "Edition of 25",
    availability: "In Stock",
    image: IMAGES.coatBurgundy,
    alt: "A model wearing the Manteau Léger lightweight trench",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "corset-de-soie",
    name: "Corset de Soie",
    category: "Couture",
    price: 249_000,
    edition: "Made to order",
    availability: "Made to Order",
    image: IMAGES.jacketFlatlay,
    alt: "A model wearing the Corset de Soie silk corset bodice",
    sizes: APPAREL_SIZES,
  },
  {
    slug: "sac-atelier",
    name: "Sac Atelier",
    category: "Accessories",
    price: 269_000,
    edition: "Edition of 30",
    availability: "In Stock",
    image: IMAGES.flatlayAccessories,
    alt: "The Sac Atelier hand-stitched leather bag",
  },
  {
    slug: "robe-emeraude",
    name: "Robe Émeraude",
    category: "Evening",
    price: 355_000,
    edition: "Edition of 11",
    availability: "In Stock",
    image: IMAGES.dressWhite,
    alt: "A model wearing the Robe Émeraude emerald silk gown",
    sizes: APPAREL_SIZES,
  },
];

export function formatIDR(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

// TODO: replace with the maison's real WhatsApp Business number (country code, no leading 0/+)
export const WHATSAPP_NUMBER = "6281268529556";
