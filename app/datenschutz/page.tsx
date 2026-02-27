import { LegalLayout } from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — einfach verwaltet.",
  description: "Datenschutzerklärung der einfach verwaltet. Hausverwaltung Hamburg gemäß DSGVO.",
};

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung">

      <h2>1. Datenschutz auf einen Blick</h2>

      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
        Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
        Sie persönlich identifiziert werden können. Ausführliche Informationen entnehmen Sie der
        nachfolgenden Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
        finden Sie im Abschnitt „Verantwortliche Stelle" dieser Erklärung.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen — z. B. über ein
        Kontaktformular. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der
        Website durch unsere IT-Systeme erfasst (technische Daten wie Browser, Betriebssystem, Uhrzeit
        des Seitenaufrufs). Für das Setzen von Cookies nutzen wir das Consent-Management-Tool{" "}
        <strong>CCM19</strong> von Papoo Software &amp; Media GmbH.
      </p>
      <p>
        <strong>Wofür nutzen wir Ihre Daten?</strong><br />
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
        Andere Daten können zur Analyse des Nutzerverhaltens verwendet werden. Kontaktformular-Daten
        werden zur Bearbeitung Ihrer Anfrage verarbeitet.
      </p>
      <p>
        <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck
        Ihrer gespeicherten personenbezogenen Daten. Darüber hinaus haben Sie folgende Rechte:
      </p>
      <ul>
        <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
        <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
        <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li><strong>Widerruf</strong> einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        <li><strong>Beschwerderecht</strong> bei der zuständigen Datenschutzaufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <hr />

      <h2>2. Verantwortliche Stelle</h2>
      <p>
        <strong>einfach verwaltet.</strong><br />
        RVLT Ventures GmbH<br />
        Singapurstr. 19<br />
        20457 Hamburg<br />
        <br />
        E-Mail: datenschutz@einfach-verwaltet.de<br />
        Website: www.einfach-verwaltet.de
      </p>
      <p>
        Verantwortliche Stelle ist die juristische Person, die allein oder gemeinsam mit anderen über die
        Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
      </p>

      <hr />

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA
        gehostet. Beim Besuch unserer Website erfasst Vercel automatisch Server-Logfiles. Details entnehmen
        Sie der Datenschutzerklärung von Vercel:{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          https://vercel.com/legal/privacy-policy
        </a>.
      </p>
      <p>
        Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse an zuverlässiger Website-Darstellung). Mit Vercel besteht ein Auftragsverarbeitungsvertrag
        gemäß Art. 28 DSGVO.
      </p>
      <p>
        <strong>Datenübertragung in die USA:</strong> Vercel Inc. ist unter dem{" "}
        <strong>EU-US Data Privacy Framework</strong> zertifiziert (Beschluss der Europäischen Kommission
        vom 10. Juli 2023), das als angemessenes Datenschutzniveau für die Datenübertragung in die USA
        anerkannt ist. Ergänzend werden EU-Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c
        DSGVO eingesetzt.
      </p>

      <hr />

      <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>

      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
        Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
        sowie dieser Datenschutzerklärung.
      </p>

      <h3>Hinweis zur Datenweitergabe in Drittstaaten</h3>
      <p>
        Wir verwenden unter anderem Dienste von Unternehmen mit Sitz in den USA. Soweit keine
        Angemessenheitsentscheidung der EU-Kommission vorliegt, stützen wir die Übertragung auf
        EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c DSGVO. Auf Anfrage stellen wir Ihnen
        die relevanten Transfermechanismen zur Verfügung.
      </p>

      <h3>Widerruf Ihrer Einwilligung</h3>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Eine
        bereits erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die
        Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.
      </p>
      <p>
        Für den Widerruf von Cookie-Einwilligungen nutzen Sie bitte das CCM19-Consent-Banner (erreichbar
        über den Link „Cookie-Einstellungen" in der Fußzeile unserer Website).
      </p>

      <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
      <p>
        Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben
        Sie das Recht, aus Gründen Ihrer besonderen Situation jederzeit Widerspruch einzulegen. Wir
        verarbeiten Ihre Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe
        nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung von
        Rechtsansprüchen.
      </p>

      <h3>Beschwerderecht bei der Aufsichtsbehörde</h3>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde
        zu. Zuständige Aufsichtsbehörde ist:
      </p>
      <p>
        <strong>Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit</strong><br />
        Ludwig-Erhard-Str. 22, 7. OG<br />
        20459 Hamburg<br />
        Telefon: +49 40 42854-4040<br />
        E-Mail: mailbox@datenschutz.hamburg.de<br />
        Website:{" "}
        <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">
          https://datenschutz-hamburg.de
        </a>
      </p>

      <h3>Recht auf Datenübertragbarkeit</h3>
      <p>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
        Vertrags automatisiert verarbeiten, in einem gängigen, maschinenlesbaren Format zu erhalten oder
        an einen anderen Verantwortlichen übertragen zu lassen, soweit dies technisch machbar ist
        (Art. 20 DSGVO).
      </p>

      <h3>Auskunft, Berichtigung und Löschung</h3>
      <p>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
        Auskunft über Ihre gespeicherten personenbezogenen Daten sowie ggf. ein Recht auf Berichtigung
        oder Löschung. Bitte wenden Sie sich hierzu an: datenschutz@einfach-verwaltet.de.
      </p>

      <hr />

      <h2>5. Datenerfassung auf dieser Website</h2>

      <h3>Cookies und Consent-Management (CCM19)</h3>
      <p>
        Unsere Website verwendet Cookies — kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
        Wir setzen das Consent-Management-Tool <strong>CCM19</strong> der Papoo Software &amp; Media GmbH,
        Auguststr. 4, 53229 Bonn ein, um Ihre Einwilligung zur Verwendung von Cookies rechtssicher
        einzuholen und zu dokumentieren.
      </p>
      <p>
        Beim ersten Besuch unserer Website erscheint ein Cookie-Banner, über das Sie einzelne
        Cookie-Kategorien akzeptieren oder ablehnen können. Sie können Ihre Einwilligung jederzeit über
        den Link <strong>„Cookie-Einstellungen"</strong> in unserer Fußzeile anpassen oder widerrufen.
        CCM19 selbst setzt ein technisch notwendiges Cookie zur Speicherung Ihrer Einwilligungsentscheidung.
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. c und lit. f DSGVO. Mit Papoo
        Software &amp; Media GmbH besteht ein Auftragsverarbeitungsvertrag. Weitere Informationen:{" "}
        <a href="https://www.ccm19.de/datenschutzerklaerung" target="_blank" rel="noopener noreferrer">
          https://www.ccm19.de/datenschutzerklaerung
        </a>.
      </p>
      <p><strong>Kategorien von Cookies, die wir einsetzen:</strong></p>
      <ul>
        <li>
          <strong>Technisch notwendige Cookies</strong> (keine Einwilligung erforderlich): für den Betrieb
          der Website unerlässlich (z. B. Session-Cookies, Consent-Speicherung).
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </li>
        <li>
          <strong>Analyse-Cookies</strong> (nur mit Einwilligung): zur Analyse des Nutzerverhaltens.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
        </li>
        <li>
          <strong>Marketing-Cookies</strong> (nur mit Einwilligung): zur Ausspielung personalisierter
          Inhalte oder Werbung. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
        </li>
      </ul>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Hosting-Anbieter erhebt und speichert automatisch Informationen in Server-Log-Dateien, die
        Ihr Browser übermittelt:
      </p>
      <ul>
        <li>Browsertyp und -version</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung
        erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an fehlerfreier
        Website-Darstellung). <strong>Speicherdauer:</strong> Server-Log-Dateien werden in der Regel nach
        7 bis 30 Tagen automatisch gelöscht.
      </p>

      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre Angaben inklusive der angegebenen
        Kontaktdaten zur Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre
        Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
        (vorvertragliche oder vertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse an effektiver Kommunikation).
      </p>
      <p>
        <strong>Speicherdauer:</strong> Kontaktformular-Daten werden in der Regel <strong>3 Jahre</strong>{" "}
        nach Abschluss der Anfrage gelöscht, sofern keine gesetzliche Aufbewahrungspflicht oder ein
        laufendes Vertragsverhältnis entgegensteht.
      </p>

      <hr />

      <h2>6. Eigentümer- und Mieterportal</h2>
      <p>
        Im Rahmen unserer Hausverwaltungstätigkeit verarbeiten wir personenbezogene Daten von
        Immobilieneigentümern und Mietern. Die Verarbeitung erfolgt auf folgenden Rechtsgrundlagen:
      </p>
      <ul>
        <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Erfüllung des Hausverwaltungsvertrages und vorvertraglicher Maßnahmen</li>
        <li><strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> Erfüllung gesetzlicher Pflichten (insbesondere §§ 556, 259 BGB, WEG, §§ 238 ff. HGB, AO)</li>
        <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte Interessen (z. B. Geltendmachung von Forderungen)</li>
        <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung (z. B. für Bonitätsprüfungen)</li>
      </ul>

      <p><strong>Verarbeitete Datenkategorien:</strong></p>
      <ul>
        <li>Name, Anschrift, Kontaktdaten</li>
        <li>Vertragsdaten (Mietvertrag, Eigentumsanteile, Nebenkosten)</li>
        <li>Zahlungsdaten (Bankverbindung, Mietzahlungen, Betriebskosten)</li>
        <li>Kommunikationsdaten (E-Mails, Schadensmeldungen, Protokolle)</li>
        <li>Bonitätsdaten (bei Neuvermietung, nur mit gesonderter Einwilligung)</li>
      </ul>

      <p><strong>Empfänger / Empfängerkategorien:</strong></p>
      <ul>
        <li>Handwerker und Dienstleister (zur Auftragsabwicklung)</li>
        <li>Versicherungsunternehmen (bei Schadensmeldungen)</li>
        <li>Steuerberater und Buchhalter (zur Buchführung)</li>
        <li>Inkassodienstleister (bei Zahlungsverzug)</li>
        <li>Behörden (auf gesetzliche Anforderung)</li>
        <li>
          SCHUFA Holding AG (bei Bonitätsprüfung im Rahmen der Neuvermietung, nur mit Einwilligung des
          Betroffenen; Hinweis: Die SCHUFA verarbeitet die erhaltenen Daten nach eigenen
          datenschutzrechtlichen Grundsätzen, einsehbar unter{" "}
          <a href="https://www.schufa.de/datenschutz" target="_blank" rel="noopener noreferrer">
            www.schufa.de/datenschutz
          </a>)
        </li>
      </ul>

      <p>
        <strong>Speicherdauer:</strong> Daten aus Miet- und Verwaltungsverhältnissen werden nach
        Beendigung des Vertragsverhältnisses für die gesetzlich vorgeschriebenen Fristen aufbewahrt:
        steuerlich relevante Unterlagen <strong>10 Jahre</strong> (§ 147 AO, § 257 HGB), sonstige
        kaufmännische Unterlagen <strong>6 Jahre</strong> (§ 257 HGB), zivilrechtliche Ansprüche bis
        zum Ablauf der regelmäßigen Verjährungsfrist von <strong>3 Jahren</strong> (§ 195 BGB), jeweils
        beginnend mit dem Ende des Kalenderjahres der Entstehung.
      </p>

      <p>
        <strong>Automatisierte Entscheidungsfindung:</strong> Eine automatisierte Entscheidungsfindung
        im Sinne des Art. 22 DSGVO findet nicht statt. Alle wesentlichen Entscheidungen (z. B.
        Mieterauswahl, Kündigungen) werden von Menschen getroffen.
      </p>

      <hr />

      <h2>7. Auftragsverarbeitung</h2>
      <p>
        Wir haben mit unseren Dienstleistern, die in unserem Auftrag personenbezogene Daten verarbeiten,
        Auftragsverarbeitungsverträge (AVV) gemäß Art. 28 DSGVO geschlossen. Dies umfasst insbesondere
        unseren Hosting-Anbieter (Vercel) und das Consent-Management-Tool (CCM19). Diese Dienstleister
        verarbeiten Daten ausschließlich nach unseren Weisungen und unter Einhaltung der DSGVO.
      </p>

      <hr />

      <h2>8. Google Fonts (lokal)</h2>
      <p>
        Diese Website nutzt zur einheitlichen Darstellung von Schriftarten Google Fonts, die{" "}
        <strong>lokal auf unserem Server eingebunden</strong> sind. Beim Aufruf einer Seite werden keine
        Daten an Google-Server übertragen.
      </p>

      <hr />

      <h2>9. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
        rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen widerspiegelt. Bei
        wesentlichen Änderungen, die Ihre Rechte oder die Art der Datenverarbeitung betreffen, werden
        wir Sie gesondert informieren. Für Ihren erneuten Besuch gilt jeweils die aktuelle Fassung der
        Datenschutzerklärung.
      </p>

      <p className="mt-12 text-xs text-text-light">
        Stand: Februar 2026 | einfach verwaltet. — RVLT Ventures GmbH, Hamburg
      </p>
    </LegalLayout>
  );
}
