/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/shared';
export const metadata = { title: 'Impressum · Vorschau' };
export default function Page() {
  return (
    <div data-theme="provider">
      <Navigation />
      <main id="inhalt" className="wrap legal section">
        <p className="eyebrow">Private Entwicklungsvorschau</p>
        <h1>Impressum vorbereiten.</h1>
        <p>
          Diese Website ist noch kein öffentliches oder buchbares Angebot. Die
          Angaben des tatsächlichen Anbieters sind noch nicht hinterlegt.
        </p>
        <h2>Vor dem Verkaufsstart ergänzen</h2>
        <p>
          Der bestätigte Anbietername, die ladungsfähige Anschrift, echte
          Kontaktangaben sowie die für den konkreten Betrieb erforderlichen
          Register-, Berufs- und Steuerangaben werden hier eingefügt.
        </p>
        <p>
          Farbform ist ein fiktives Konzeptprojekt. Es gibt keinen dargestellten
          Malerbetrieb, keine realen Kundenaufträge und keine erfundene
          Anbieteridentität.
        </p>
        <a className="text-link" href="/">
          Zurück zur Vorschau ↗
        </a>
      </main>
      <Footer />
    </div>
  );
}
