/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { LandscapeInquiryForm } from '@/components/landscape/landscape-inquiry-form';
import { LandscapeShell } from '@/components/landscape/landscape-shared';

export const metadata = { title: 'Garten anfragen · Grünraum Gartenbau' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ thema?: string }>;
}) {
  const params = await searchParams;
  const initialTopic = [
    'Gartengestaltung',
    'Wege & Terrassen',
    'Pflanzung & Pflege',
  ].includes(params.thema || '')
    ? params.thema
    : 'Noch offen';

  return (
    <LandscapeShell active="Garten anfragen">
      <section className="landscape-wrap landscape-inquiry-layout landscape-section">
        <div>
          <p className="landscape-kicker">Garten anfragen</p>
          <h1>Erzählen Sie von Ihrem Garten.</h1>
          <p className="landscape-lead">
            Was soll sich verändern? Wie möchten Sie den Außenraum nutzen? Ein
            paar Angaben reichen für den ersten Überblick.
          </p>
          <div className="landscape-help">
            <p className="landscape-kicker">Hilfreich für den Einstieg</p>
            <ul>
              <li>Ort und ungefähre Grundstücksgröße</li>
              <li>Wünsche, Nutzung und vorhandene Elemente</li>
              <li>Gewünschter Zeitraum und möglicher Umfang</li>
            </ul>
          </div>
          <a
            className="landscape-quiet-link"
            href="/konzept/galabau/gartenideen/"
          >
            Ausgewählte Gärten ansehen ↗
          </a>
        </div>
        <LandscapeInquiryForm initialTopic={initialTopic} />
      </section>
    </LandscapeShell>
  );
}
