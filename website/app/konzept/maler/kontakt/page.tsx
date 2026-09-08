/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { DemoShell } from '@/components/shared';
import { InquiryForm } from '@/components/inquiry-form';
export const metadata = { title: 'Demo-Anfrage · Farbform' };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ leistung?: string }>;
}) {
  const params = await searchParams;
  const service = [
    'Innenanstriche',
    'Oberflächengestaltung',
    'Farbkonzepte',
  ].includes(params.leistung || '')
    ? params.leistung
    : 'Noch offen';
  return (
    <DemoShell active="Kontakt">
      <section className="wrap contact-layout section">
        <div>
          <p className="eyebrow">Raum für Ihre Idee</p>
          <h1>Ihr Vorhaben beginnt mit einer Idee.</h1>
          <p className="lead">
            Welche Fläche möchten Sie verändern? Welche Stimmung soll entstehen?
            Hier können Sie den Anfrageweg ausprobieren.
          </p>
          <div className="contact-aside">
            <p className="eyebrow">So funktioniert das Beispiel</p>
            <p>
              Leistung auswählen, eine kurze Idee beschreiben und die
              Demo-Anfrage prüfen. In einem echten Betrieb kommen hier die
              bestätigten Kontaktangaben hinzu.
            </p>
            <a className="text-link" href="/">
              Zurück zum Webdesign-Angebot ↗
            </a>
          </div>
        </div>
        <InquiryForm demo initialService={service} />
      </section>
    </DemoShell>
  );
}
