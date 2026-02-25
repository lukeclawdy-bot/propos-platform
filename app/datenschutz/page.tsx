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
        Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz
        entnehmen Sie unserer nachfolgend aufgeführten Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
        können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
        z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch
        oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
        allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
      </p>
      <p>
        <strong>Wofür nutzen wir Ihre Daten?</strong><br />
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
        Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Wenn Sie über das
        Kontaktformular eine Anfrage stellen, werden Ihre Daten zur Bearbeitung Ihrer Anfrage verarbeitet.
      </p>
      <p>
        <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
        gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
        oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
        haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
        Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
        zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
      </p>

      <h2>2. Verantwortliche Stelle</h2>
      <p>
        RVLT Ventures GmbH<br />
        handelnd unter der Marke „einfach verwaltet."<br />
        Am Sandtorkai 27<br />
        20457 Hamburg<br />
        <br />
        Telefon: +49 (0)40 — folgt<br />
        E-Mail: datenschutz@einfach-verwaltet.de
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
        anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen,
        E-Mail-Adressen o. Ä.) entscheidet.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet.
        Beim Besuch unserer Website erfasst Vercel automatisch verschiedene Server-Logfiles. Details hierzu
        entnehmen Sie der Datenschutzerklärung von Vercel:{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          https://vercel.com/legal/privacy-policy
        </a>.
      </p>
      <p>
        Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
        berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage
        von Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.
      </p>
      <p>
        Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
      </p>

      <h2>4. Allgemeine Hinweise und Pflichtinformationen</h2>

      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
        Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
        sowie dieser Datenschutzerklärung.
      </p>

      <h3>Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</h3>
      <p>
        Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen
        datenschutzrechtlich nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können Ihre
        personenbezogenen Daten in diese Drittstaaten übertragen und dort verarbeitet werden. Wir weisen
        darauf hin, dass in diesen Ländern kein mit der EU vergleichbares Datenschutzniveau garantiert
        werden kann.
      </p>

      <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
        eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
        erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
      </p>

      <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen (Art. 21 DSGVO)</h3>
      <p>
        <strong>
          Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben
          Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die
          Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Die jeweilige Rechtsgrundlage,
          auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch
          einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn,
          wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen,
          Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
        </strong>
      </p>

      <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
        Aufsichtsbehörde zu. Die zuständige Aufsichtsbehörde ist:
      </p>
      <p>
        Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit<br />
        Ludwig-Erhard-Str. 22, 7. OG<br />
        20459 Hamburg<br />
        Telefon: +49 40 42854-4040<br />
        E-Mail: mailbox@datenschutz.hamburg.de<br />
        Website: <a href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">https://datenschutz-hamburg.de</a>
      </p>

      <h3>Recht auf Datenübertragbarkeit</h3>
      <p>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
        Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren
        Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen
        Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
      </p>

      <h3>Auskunft, Berichtigung und Löschung</h3>
      <p>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
        Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den
        Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
        Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
      </p>

      <h2>5. Datenerfassung auf dieser Website</h2>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
        Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung
        dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
        berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
      </p>

      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
        Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
        Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
        ohne Ihre Einwilligung weiter.
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
        Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
        Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten
        Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
        auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
        entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
      </p>

      <h2>6. Eigentümer- und Mieterportal</h2>
      <p>
        Im Rahmen unserer Hausverwaltungstätigkeit verarbeiten wir personenbezogene Daten von
        Immobilieneigentümern und Mietern. Die Verarbeitung erfolgt auf Grundlage des
        Hausverwaltungsvertrages (Art. 6 Abs. 1 lit. b DSGVO) sowie gesetzlicher Pflichten
        (Art. 6 Abs. 1 lit. c DSGVO, insbesondere §§ 556, 259 BGB, WEG, HGB).
      </p>
      <p>Die verarbeiteten Daten umfassen insbesondere:</p>
      <ul>
        <li>Name, Anschrift, Kontaktdaten</li>
        <li>Vertragsdaten (Mietvertrag, Eigentumsanteile)</li>
        <li>Zahlungsdaten (Bankverbindung, Mietzahlungen, Nebenkosten)</li>
        <li>Kommunikationsdaten (E-Mails, Schadensmeldungen, Protokolle)</li>
        <li>Bonitätsdaten (bei Neuvermietung, mit gesonderter Einwilligung)</li>
      </ul>
      <p>
        Eine automatisierte Entscheidungsfindung im Sinne des Art. 22 DSGVO findet nicht statt.
        Alle wesentlichen Entscheidungen (z. B. Mieterauswahl, Kündigungen) werden von Menschen getroffen.
      </p>

      <h2>7. Auftragsverarbeitung</h2>
      <p>
        Wir haben mit unseren Dienstleistern Verträge zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO
        geschlossen. Dies stellt sicher, dass diese die personenbezogenen Daten unserer Websitebesucher
        und Kunden nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeiten.
      </p>

      <h2>8. Google Fonts (lokal)</h2>
      <p>
        Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts, die
        lokal eingebunden sind. Beim Aufruf einer Seite werden keine Daten an Google übertragen, da die
        Schriftarten über den Hosting-Server geladen werden.
      </p>

      <h2>9. Änderung dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
        rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der
        Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
      </p>

      <p className="mt-12 text-xs text-text-light">Stand: Februar 2026</p>
    </LegalLayout>
  );
}
