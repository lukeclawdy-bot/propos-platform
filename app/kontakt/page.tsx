import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Kontakt } from "@/components/Kontakt";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt — einfach verwaltet.",
  description:
    "Kostenloses Erstgespräch anfragen. Wir melden uns noch am selben Werktag. Hausverwaltung Hamburg.",
  openGraph: {
    title: "Kontakt — einfach verwaltet.",
    description: "Kostenloses Erstgespräch anfragen. Antwort noch am selben Tag.",
    url: "https://einfach-verwaltet.de/kontakt",
    siteName: "einfach verwaltet.",
    locale: "de_DE",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="py-10 bg-navy text-center">
          <h1 className="text-4xl font-bold text-white font-serif">Kontakt aufnehmen</h1>
          <p className="text-white/70 mt-2">Kostenloses Erstgespräch — Rückmeldung noch heute.</p>
        </div>
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
