import { LegalLayout } from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — einfach verwaltet.",
  description: "Impressum der einfach verwaltet. Hausverwaltung Hamburg.",
};

export default function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        RVLT Ventures GmbH<br />
        handelnd unter der Marke „einfach verwaltet."<br />
        <br />
        Am Sandtorkai 27<br />
        20457 Hamburg
      </p>

      <h2>Vertreten durch</h2>
      <p>Geschäftsführer: Lukas Schmitz</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0)40 — folgt<br />
        E-Mail: kontakt@einfach-verwaltet.de
      </p>

      <h2>Registereintrag</h2>
      <p>
        Eintragung im Handelsregister.<br />
        Registergericht: Amtsgericht Hamburg<br />
        Registernummer: folgt
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
        folgt
      </p>

      <h2>Erlaubnis nach § 34c GewO</h2>
      <p>
        Die Erlaubnis zur Tätigkeit als Wohnimmobilienverwalter gemäß § 34c Abs. 1 Nr. 4 GewO wurde erteilt durch:<br />
        Bezirksamt Hamburg-Mitte<br />
        Fachamt Verbraucherschutz, Gewerbe und Umwelt<br />
        Caffamacherreihe 1–3<br />
        20355 Hamburg
      </p>

      <h2>Berufshaftpflichtversicherung</h2>
      <p>
        Berufshaftpflichtversicherung gemäß § 15 MaBV:<br />
        Versicherer: folgt<br />
        Geltungsbereich: Bundesrepublik Deutschland
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Lukas Schmitz<br />
        Am Sandtorkai 27<br />
        20457 Hamburg
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
      </p>
      <p>
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p className="mt-12 text-xs text-text-light">Stand: Februar 2026</p>
    </LegalLayout>
  );
}
