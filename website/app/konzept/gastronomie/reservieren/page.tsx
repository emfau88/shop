/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
import { GastroReservationForm } from '@/components/gastro/gastro-reservation-form';
import { GastroShell } from '@/components/gastro/gastro-shared';

export const metadata = { title: 'Reservieren · LINDENWIRT' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ anlass?: string }>;
}) {
  const params = await searchParams;
  const options = [
    'Abendessen',
    'Mittagessen',
    'Familienfeier',
    'Geschäftsessen',
  ];
  const initialOccasion = options.includes(params.anlass || '')
    ? params.anlass
    : 'Abendessen';

  return (
    <GastroShell active="Reservieren">
      <section>
        <div className="gastro-wrap gastro-reservation-layout">
          <div>
            <p className="gastro-kicker">Tischanfrage</p>
            <h1>Für wen dürfen wir decken?</h1>
            <p className="gastro-lead">
              Senden Sie uns Ihren Wunschtermin. Wir bestätigen die Anfrage
              persönlich oder schlagen eine passende Uhrzeit vor.
            </p>
            <div className="gastro-opening-card">
              <b>Öffnungszeiten & Adresse</b>
              <span>Mi–Fr · 17–23 Uhr</span>
              <span>Sa–So · 12–23 Uhr</span>
              <span>Marktgasse 12 · 00000 Beispielstadt</span>
            </div>
            <a
              className="gastro-plain-link"
              href="/konzept/gastronomie/speisekarte/"
            >
              Zur Speisekarte ↗
            </a>
          </div>
          <GastroReservationForm initialOccasion={initialOccasion} />
        </div>
      </section>
    </GastroShell>
  );
}
