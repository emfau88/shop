/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { MetalInquiryForm } from '@/components/metal/metal-inquiry-form';
import { MetalShell } from '@/components/metal/metal-shared';

export const metadata = { title: 'Projekt anfragen · Werkform Metalltechnik' };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ projekt?: string }>;
}) {
  const params = await searchParams;
  const initialProject = [
    'Blechbearbeitung',
    'Schweißbaugruppen',
    'Sonderkonstruktionen',
  ].includes(params.projekt || '')
    ? params.projekt
    : 'Noch offen';

  return (
    <MetalShell active="Projekt anfragen">
      <section className="metal-wrap metal-inquiry-layout metal-section">
        <div>
          <p className="metal-kicker">Projekt anfragen</p>
          <h1>Worum geht es?</h1>
          <p className="metal-lead">
            Ob fertige Zeichnung oder erste Idee: Die wichtigsten Eckdaten
            schaffen eine gute Grundlage für das nächste Gespräch.
          </p>
          <div className="metal-request-list">
            <p className="metal-kicker">Hilfreiche Angaben</p>
            <ul>
              <li>Material und ungefähre Abmessungen</li>
              <li>Einzelteil, Stückzahl oder Baugruppe</li>
              <li>Einsatzbereich und gewünschter Termin</li>
            </ul>
          </div>
          <a className="metal-text-link" href="/">
            Zum Webdesign-Angebot <span aria-hidden="true">↗</span>
          </a>
        </div>
        <MetalInquiryForm initialProject={initialProject} />
      </section>
    </MetalShell>
  );
}
