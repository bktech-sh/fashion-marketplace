import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
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
        <Story />
        <Values />
        <NewSeason />
      </main>
      <Footer />
    </>
  );
}
