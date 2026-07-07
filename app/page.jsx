import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Features from "@/components/Features";
import Highlights from "@/components/Highlights";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <Features />
        <Highlights />
        <Comparison />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
