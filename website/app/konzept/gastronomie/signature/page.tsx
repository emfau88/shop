import '@/components/signature/signature-foundation.css';
import './lindenwirt-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'LINDENWIRT Signature · Besondere Atmosphäre' };

function StageIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const stages = [
  {
    id: 'family',
    label: 'Familienfeier',
    eyebrow: 'Gemeinsam feiern',
    description: 'Eine lange Tafel, warmes Licht und Raum für alle Generationen.',
    icon: <StageIcon path="M4 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M15 12a3 3 0 0 0 0-6M16 14a4 4 0 0 1 4 4v2" />,
  },
  {
    id: 'wedding',
    label: 'Hochzeit',
    eyebrow: 'Ein besonderer Tag',
    description: 'Florale Details und festliche Atmosphäre für eine persönliche Feier.',
    icon: <StageIcon path="M8.5 5.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm7 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />,
  },
  {
    id: 'business',
    label: 'Firmenabend',
    eyebrow: 'Begegnung mit Charakter',
    description: 'Ein konzentrierter Rahmen für Teams, Kundschaft und gute Gespräche.',
    icon: <StageIcon path="M4 7h16v12H4zM9 7V4h6v3M4 12h16M10 12v2h4v-2" />,
  },
  {
    id: 'rooms',
    label: 'Unsere Räume',
    eyebrow: 'Räume, die erzählen',
    description: 'Material, Licht und Bestuhlung bilden ein stimmiges Ganzes.',
    icon: <StageIcon path="M4 20V5l8-2 8 2v15M4 8h16M9 20v-5h6v5M7 11h2M15 11h2" />,
  },
];

export default function Page() {
  return (
    <SignatureShell
      brand="LINDENWIRT"
      brandTagline="Genießen · Feiern · Ankommen"
      concept="Lindenwirt · Gastronomie"
      className="lindenwirt-signature"
      kicker="Besondere Momente"
      title={<>Feiern in ganz besonderer <em>Atmosphäre.</em></>}
      intro="Ob Familienfeier, Hochzeit oder Firmenabend – im Lindenwirt schaffen wir den passenden Rahmen für besondere Momente."
      coreBase="/konzept/gastronomie/"
      cta="feiern/"
      ctaLabel="Anfrage stellen"
      nav={[
        { label: 'Restaurant', href: '/konzept/gastronomie/speisekarte/' },
        { label: 'Veranstaltungen', href: '/konzept/gastronomie/feiern/' },
        { label: 'Räume', href: '/konzept/gastronomie/haus/' },
        { label: 'Reservieren', href: '/konzept/gastronomie/reservieren/' },
      ]}
      stages={stages}
      initialStage="rooms"
      image={{
        src: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
        src480: '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
        src960: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
        alt: 'Festlich gedeckte Eichentafel in einem warm beleuchteten Restaurant',
        width: 1680,
        height: 1260,
      }}
      storyMedia={{
        src: '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
        alt: 'Detail einer festlich gedeckten Tafel',
      }}
      storyHref="/konzept/gastronomie/haus/"
      storyLinkLabel="Räume entdecken"
      metrics={[
        { value: '4', label: 'Anlässe inszeniert' },
        { value: 'Saisonal', label: 'Menüs als Beispiel' },
        { value: 'Persönlich', label: 'Individuelle Beratung' },
      ]}
    >
      <div className="lindenwirt-glow" aria-hidden="true"><i /><i /><i /></div>

      <div className="lindenwirt-hotspots" aria-label="Details zur Atmosphäre">
        <details className="lindenwirt-hotspot lindenwirt-hotspot--ambience">
          <summary><span aria-hidden="true">+</span><strong>Stilvolles Ambiente<small>Zeitlos elegant</small></strong></summary>
          <p>Holz, Naturstein und warmes Licht geben dem Raum eine ruhige, festliche Tiefe.</p>
        </details>
        <details className="lindenwirt-hotspot lindenwirt-hotspot--seating">
          <summary><span aria-hidden="true">+</span><strong>Flexible Bestuhlung<small>Für jeden Anlass</small></strong></summary>
          <p>Tafel, Gruppen oder offene Anordnung – das gezeigte Setting ist eine beispielhafte Konfiguration.</p>
        </details>
      </div>

      <aside className="lindenwirt-capacity" aria-live="polite">
        <span>Beispielkonfiguration</span>
        <strong data-capacity="family">Familientafel · 28 Gäste</strong>
        <strong data-capacity="wedding">Hochzeitstafel · 72 Gäste</strong>
        <strong data-capacity="business">Firmenabend · 48 Gäste</strong>
        <strong data-capacity="rooms">Verschiedene Raumgrößen</strong>
      </aside>

      <p className="lindenwirt-signoff" aria-hidden="true">Besondere<br />Momente<br />bleiben.</p>
    </SignatureShell>
  );
}
