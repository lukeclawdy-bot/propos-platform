import { LegalLayout } from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen — einfach verwaltet.",
  description: "AGB der einfach verwaltet. Hausverwaltung Hamburg.",
};

export default function AGB() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen">
      <p>
        der RVLT Ventures GmbH, handelnd unter der Marke „einfach verwaltet.", Am Sandtorkai 27,
        20457 Hamburg (nachfolgend „Verwalter") für die Erbringung von Hausverwaltungsleistungen.
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche vertraglichen Beziehungen
        zwischen dem Verwalter und seinen Auftraggebern (nachfolgend „Eigentümer"), soweit nicht im
        jeweiligen Hausverwaltungsvertrag abweichende Regelungen getroffen werden.
      </p>
      <p>
        (2) Abweichende Bedingungen des Eigentümers werden nicht anerkannt, es sei denn, der Verwalter
        stimmt ihrer Geltung ausdrücklich schriftlich zu.
      </p>
      <p>
        (3) Im Falle von Widersprüchen zwischen diesen AGB und dem individuellen Hausverwaltungsvertrag
        gehen die Regelungen des Hausverwaltungsvertrages vor.
      </p>

      <h2>§ 2 Leistungsumfang</h2>
      <p>
        (1) Der Umfang der Hausverwaltungsleistungen ergibt sich aus dem jeweiligen Hausverwaltungsvertrag.
        Der Verwalter erbringt insbesondere folgende Leistungen, soweit vertraglich vereinbart:
      </p>
      <ul>
        <li>Kaufmännische Verwaltung (Mietinkasso, Buchhaltung, Nebenkostenabrechnung gemäß §§ 556 ff. BGB)</li>
        <li>Technische Verwaltung (Instandhaltung, Handwerkerkoordination, Verkehrssicherungspflichten)</li>
        <li>Rechtliche Verwaltung (Vertragsmanagement, Mieterhöhungen gemäß §§ 558 ff. BGB, Abmahnungen)</li>
        <li>WEG-Verwaltung gemäß §§ 18 ff. WEG (sofern vereinbart)</li>
        <li>Digitale Eigentümer- und Mieterportale</li>
      </ul>
      <p>
        (2) Nicht im Verwaltungshonorar enthaltene Sonderleistungen (z. B. Neuvermietung, gerichtliche
        Vertretung, Versicherungsschadenbearbeitung) werden gesondert vereinbart und vergütet.
      </p>

      <h2>§ 3 Vergütung</h2>
      <p>
        (1) Die Vergütung des Verwalters richtet sich nach dem jeweiligen Hausverwaltungsvertrag.
        Die aktuellen Standardpreise sind auf der Website des Verwalters unter{" "}
        <a href="https://einfach-verwaltet.de/#preise">einfach-verwaltet.de/preise</a> einsehbar.
      </p>
      <p>
        (2) Alle Preise verstehen sich als Nettopreise zuzüglich der gesetzlichen Umsatzsteuer.
      </p>
      <p>
        (3) Die Vergütung ist monatlich im Voraus zum 3. Werktag des Monats fällig und wird per
        SEPA-Lastschrift eingezogen, sofern nicht anders vereinbart.
      </p>
      <p>
        (4) Sonderleistungen gemäß § 2 Abs. 2 werden nach Aufwand oder gemäß gesondert vereinbarten
        Pauschalen abgerechnet. Die Neuvermietungsprovision beträgt, sofern nicht anders vereinbart,
        1,5 Nettokaltmieten gemäß § 2 WoVermG.
      </p>

      <h2>§ 4 Pflichten des Eigentümers</h2>
      <p>Der Eigentümer ist verpflichtet:</p>
      <ul>
        <li>dem Verwalter alle für die ordnungsgemäße Verwaltung erforderlichen Unterlagen, Informationen
          und Vollmachten rechtzeitig und vollständig zur Verfügung zu stellen;</li>
        <li>den Verwalter unverzüglich über alle für die Verwaltung relevanten Umstände zu informieren
          (insbesondere Eigentümerwechsel, Mieterwechsel, Schäden am Objekt);</li>
        <li>für eine ausreichende Deckung des Verwaltungskontos zu sorgen;</li>
        <li>die vereinbarte Vergütung fristgerecht zu entrichten.</li>
      </ul>

      <h2>§ 5 Haftung</h2>
      <p>
        (1) Der Verwalter haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit unbeschränkt.
        Bei leichter Fahrlässigkeit haftet der Verwalter nur bei Verletzung wesentlicher Vertragspflichten
        (Kardinalpflichten) und nur in Höhe des vorhersehbaren, vertragstypischen Schadens.
      </p>
      <p>
        (2) Die Haftungsbeschränkung gilt nicht für Schäden aus der Verletzung des Lebens, des Körpers
        oder der Gesundheit.
      </p>
      <p>
        (3) Der Verwalter unterhält eine Berufshaftpflichtversicherung gemäß § 15 MaBV in der gesetzlich
        vorgeschriebenen Höhe.
      </p>
      <p>
        (4) Ansprüche des Eigentümers gegen den Verwalter verjähren in 12 Monaten ab Kenntniserlangung,
        sofern gesetzlich keine kürzere Verjährungsfrist gilt. Dies gilt nicht für Ansprüche aus vorsätzlichem
        oder grob fahrlässigem Handeln.
      </p>

      <h2>§ 6 Vertragslaufzeit und Kündigung</h2>
      <p>
        (1) Die Vertragslaufzeit ergibt sich aus dem jeweiligen Hausverwaltungsvertrag. Die reguläre
        Mindestlaufzeit beträgt 12 Monate.
      </p>
      <p>
        (2) Nach Ablauf der Mindestlaufzeit verlängert sich der Vertrag automatisch um jeweils 12 Monate,
        sofern er nicht mit einer Frist von 3 Monaten zum Ende der jeweiligen Laufzeit schriftlich
        gekündigt wird.
      </p>
      <p>
        (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger
        Grund liegt insbesondere vor, wenn:
      </p>
      <ul>
        <li>der Verwalter seine wesentlichen Vertragspflichten trotz Abmahnung wiederholt verletzt;</li>
        <li>der Eigentümer mit der Vergütung trotz Mahnung mit angemessener Nachfristsetzung in Verzug ist;</li>
        <li>über das Vermögen einer Vertragspartei ein Insolvenzverfahren eröffnet oder die Eröffnung
          mangels Masse abgelehnt wird.</li>
      </ul>
      <p>
        (4) Im Falle der Beendigung des Vertrages ist der Verwalter verpflichtet, alle verwalteten
        Unterlagen, Schlüssel und Guthaben innerhalb von 30 Tagen an den Eigentümer oder dessen
        Nachfolgeverwalter herauszugeben.
      </p>

      <h2>§ 7 Datenschutz</h2>
      <p>
        (1) Der Verwalter verarbeitet personenbezogene Daten der Eigentümer und Mieter ausschließlich
        im Rahmen der geltenden Datenschutzgesetze, insbesondere der DSGVO und des BDSG.
      </p>
      <p>
        (2) Einzelheiten zur Datenverarbeitung sind in der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a> des Verwalters geregelt.
      </p>
      <p>
        (3) Soweit der Verwalter im Rahmen seiner Tätigkeit personenbezogene Daten im Auftrag des
        Eigentümers verarbeitet, schließen die Parteien einen Vertrag zur Auftragsverarbeitung gemäß
        Art. 28 DSGVO.
      </p>

      <h2>§ 8 Treuhandkonto</h2>
      <p>
        (1) Mieteinnahmen und sonstige Gelder des Eigentümers werden auf einem offenen Treuhandkonto
        verwaltet, das auf den Namen des Verwalters als Treuhänder für den Eigentümer geführt wird.
      </p>
      <p>
        (2) Die Gelder des Eigentümers werden strikt von den Eigengeldern des Verwalters getrennt gehalten.
      </p>
      <p>
        (3) Der Eigentümer erhält monatlich eine Übersicht über alle Kontobewegungen des Treuhandkontos
        über das digitale Eigentümerportal.
      </p>

      <h2>§ 9 Kommunikation und Erreichbarkeit</h2>
      <p>
        (1) Die reguläre Kommunikation erfolgt über E-Mail, Telefon und das digitale Eigentümer- bzw.
        Mieterportal des Verwalters.
      </p>
      <p>
        (2) Der Verwalter garantiert eine Reaktionszeit von maximal 24 Stunden auf Anfragen des
        Eigentümers (Werktage). In Notfällen (z. B. Wasserrohrbruch, Heizungsausfall im Winter) ist
        der Verwalter auch außerhalb der regulären Geschäftszeiten erreichbar.
      </p>
      <p>
        (3) Rechtserhebliche Erklärungen (insbesondere Kündigungen) bedürfen der Schriftform gemäß § 126 BGB.
      </p>

      <h2>§ 10 Schlussbestimmungen</h2>
      <p>
        (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
      </p>
      <p>
        (2) Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis
        ist Hamburg, soweit der Eigentümer Kaufmann, juristische Person des öffentlichen Rechts oder
        öffentlich-rechtliches Sondervermögen ist.
      </p>
      <p>
        (3) Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder nach
        Vertragsschluss unwirksam oder undurchführbar werden, bleibt die Wirksamkeit der übrigen
        Bestimmungen unberührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung soll
        diejenige wirksame und durchführbare Regelung treten, deren Wirkungen der wirtschaftlichen
        Zielsetzung am nächsten kommen (§ 306 BGB).
      </p>
      <p>
        (4) Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Dies gilt auch für die
        Aufhebung dieses Schriftformerfordernisses.
      </p>

      <p className="mt-12 text-xs text-text-light">Stand: Februar 2026</p>

      <div className="mt-8 p-4 bg-amber/10 rounded-xl border border-amber/20">
        <p className="text-xs text-amber font-semibold mb-1">⚠️ Hinweis</p>
        <p className="text-xs text-text-light">
          Diese AGB wurden sorgfältig nach deutschem Recht erstellt, ersetzen jedoch keine individuelle
          Rechtsberatung. Wir empfehlen, die AGB vor Vertragsschluss durch einen Rechtsanwalt prüfen
          zu lassen. Die RVLT Ventures GmbH fungiert als vorläufige Trägerin bis zur Eintragung der
          eigenständigen GmbH.
        </p>
      </div>
    </LegalLayout>
  );
}
