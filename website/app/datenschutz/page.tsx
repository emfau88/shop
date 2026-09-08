/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/shared';
export const metadata = { title: 'Datenschutz · Vorschau' };
export default function Page() {
  return (
    <div data-theme="provider">
      <Navigation />
      <main id="inhalt" className="wrap legal section">
        <p className="eyebrow">Private Entwicklungsvorschau</p>
        <h1>Hinweise zu dieser Vorschau.</h1>
        <h2>Formulare</h2>
        <p>
          Die Formulare dienen ausschließlich der lokalen Simulation. Die
          Website versendet und speichert keine Formulareingaben. Bitte
          verwenden Sie nur Beispieldaten. Beim Neuladen der Seite werden die
          Eingaben nicht aus einer Speicherung wiederhergestellt.
        </p>
        <h2>Schriften, Bilder und Messdienste</h2>
        <p>
          Schriften und Bilder werden zusammen mit der Website ausgeliefert. Im
          Anwendungscode sind keine Analysewerkzeuge, Werbetracker oder externen
          Schriftabrufe eingebunden. Die Raum- und Materialbilder sind
          KI-generierte Konzeptdarstellungen.
        </p>
        <h2>Bereitstellung der Vorschau</h2>
        <p>
          Beim Abruf einer gehosteten Vorschau werden technisch erforderliche
          Verbindungsdaten durch die Hosting-Infrastruktur verarbeitet. Diese
          Hinweisseite ist noch keine vollständige Datenschutzerklärung für
          einen öffentlichen Betrieb.
        </p>
        <h2>Vor der Veröffentlichung</h2>
        <p>
          Die tatsächliche verantwortliche Person, Hosting-Dienste,
          Rechtsgrundlagen, Speicherdauern, Betroffenenrechte und der spätere
          Versandweg müssen in einer zum Betrieb passenden Datenschutzerklärung
          ergänzt werden.
        </p>
        <a className="text-link" href="/">
          Zurück zur Vorschau ↗
        </a>
      </main>
      <Footer />
    </div>
  );
}
