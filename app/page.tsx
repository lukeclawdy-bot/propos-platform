import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { SocialProof } from "@/components/SocialProof";
import { Leistungen } from "@/components/Leistungen";
import { BetaUrgency } from "@/components/BetaUrgency";
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
        <TrustBar />
        <SocialProof />
        <Leistungen />
        <BetaUrgency />
        <Vergleich />
        <Preise />
        <SoFunktionierts />
        <WechselVersprechen />
        <WarumWir />
        <Nachfolge />
        <Kontakt />
        <FAQ />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://einfach-verwaltet.de","name":"einfach verwaltet.","description":"Professionelle Hausverwaltung in Hamburg. Mietverwaltung, WEG-Verwaltung und Sondereigentumsverwaltung ab 20ac24/Einheit/Monat.","url":"https://einfach-verwaltet.de","email":"kontakt@einfach-verwaltet.de","address":{"@type":"PostalAddress","streetAddress":"Singapurstr. 19","addressLocality":"Hamburg","postalCode":"20457","addressCountry":"DE"},"geo":{"@type":"GeoCoordinates","latitude":53.5444,"longitude":9.9857},"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"},"priceRange":"20ac20ac","areaServed":["Hamburg","Berlin"],"serviceType":["Hausverwaltung","WEG-Verwaltung","Mietverwaltung","Sondereigentumsverwaltung"]}) }} />
      <Footer />
    </>
  );
}
