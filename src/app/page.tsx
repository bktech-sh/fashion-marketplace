import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import ProductBento from "@/components/ProductBento";
import ProductBentoV2 from "@/components/ProductBentoV2";
import ProductMasonry from "@/components/ProductMasonry";
import ProductSplitHero from "@/components/ProductSplitHero";
import Story from "@/components/Story";
import Values from "@/components/Values";
import NewSeason from "@/components/NewSeason";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Collection />
        <ProductBento />
        <ProductBentoV2 />
        <ProductMasonry />
        <ProductSplitHero />
        <Story />
        <Values />
        <NewSeason />
      </main>
      <Footer />
    </>
  );
}
