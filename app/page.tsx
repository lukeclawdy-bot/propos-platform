import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Leistungen } from "@/components/Leistungen";
import { Vergleich } from "@/components/Vergleich";
import { Preise } from "@/components/Preise";
import { SoFunktionierts } from "@/components/SoFunktionierts";
import { WechselVersprechen } from "@/components/WechselVersprechen";
import { WarumWir } from "@/components/WarumWir";
import { Nachfolge } from "@/components/Nachfolge";
import { Kontakt } from "@/components/Kontakt";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Leistungen />
        <Vergleich />
        <Preise />
        <SoFunktionierts />
        <WechselVersprechen />
        <WarumWir />
        <Nachfolge />
        <Kontakt />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
