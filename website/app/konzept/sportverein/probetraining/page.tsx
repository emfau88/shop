/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
import { SportInquiryForm } from '@/components/sport/sport-inquiry-form';
import { SportShell } from '@/components/sport/sport-shared';

export const metadata = { title: 'Probetraining · AUFSCHLAG' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const params = await searchParams;
  const initialSport = ['Tennis', 'Badminton'].includes(params.sport || '')
    ? params.sport
    : 'Noch offen';
  return (
    <SportShell active="Probetraining">
      <section className="sport-wrap sport-inquiry-layout sport-section">
        <div>
          <p className="sport-kicker">Probetraining</p>
          <h1>Komm einfach ins Spiel.</h1>
          <p className="sport-lead">
            Du musst noch nichts beweisen. Ein paar Angaben helfen, die passende
            Gruppe und einen sinnvollen Einstieg zu finden.
          </p>
          <div className="sport-info-card">
            <b>So geht es weiter</b>
            <ol>
              <li>Sportart und Erfahrung auswählen</li>
              <li>Passende Gruppe vorgeschlagen bekommen</li>
              <li>Schläger beim ersten Termin ausleihen</li>
            </ol>
          </div>
          <a className="sport-plain-link" href="/">
            Zum Webdesign-Angebot ↗
          </a>
        </div>
        <SportInquiryForm initialSport={initialSport} />
      </section>
    </SportShell>
  );
}
