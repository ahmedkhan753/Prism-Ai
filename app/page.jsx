import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Vision from "@/components/Vision";
import Solutions from "@/components/Solutions";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Team from "@/components/Team";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Vision />
        <Solutions />
        <Services />
        <Packages />
        <HowItWorks />
        <Comparison />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
