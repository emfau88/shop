import '@/components/signature/signature-foundation.css';
import './farbform-signature.css';
import { FarbformInterior } from '@/components/signature/farbform/farbform-interior';
import { SignatureShell } from '@/components/signature/signature-shell';

export const metadata = { title: 'FARBFORM Signature · Räume, die sich gut anfühlen' };

function StageIcon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path} /></svg>;
}

const stages = [
  { id: 'wall', label: 'Wandfarbe', eyebrow: 'Farbe erleben', description: 'Vier matte Farbtöne verändern die Atmosphäre ohne Seitenwechsel.', icon: <StageIcon path="M5 20V8l7-4 7 4v12M8 11h8M9 15h6" /> },
  { id: 'floor', label: 'Boden', eyebrow: 'Material kombinieren', description: 'Natur- und helle Eiche geben der Farbwelt einen anderen Grundton.', icon: <StageIcon path="M4 5h16v14H4zM4 10h16M9 5v14M15 5v14" /> },
  { id: 'light', label: 'Licht', eyebrow: 'Wirkung verstehen', description: 'Neutrales Tageslicht und eine warme Abendstimmung im direkten Wechsel.', icon: <StageIcon path="M9 18h6M10 21h4M8 13a6 6 0 1 1 8 0c-1 1-2 2-2 3h-4c0-1-1-2-2-3Z" /> },
  { id: 'atmosphere', label: 'Raumatmosphäre', eyebrow: 'Alles zusammendenken', description: 'Kuratierte Kombinationen aus Farbe, Boden und Licht verändern den Gesamteindruck.', icon: <StageIcon path="M12 3a9 9 0 1 0 9 9c0-2-2-3-4-3h-1a2 2 0 0 1-2-2V6c0-2-1-3-2-3ZM7 12h.01M9 8h.01M12 17h.01" /> },
];

export default function Page() {
  return (
    <SignatureShell
      brand="FARBFORM"
      brandTagline="Räume · Farben · Leben"
      concept="Farbform · Maler & Raumgestaltung"
      className="farbform-signature"
      kicker="Mehr als Farbe"
      title={<>Räume, die sich gut <em>anfühlen.</em></>}
      intro="Wir gestalten Wohnräume mit Farbe, Struktur und Gefühl. Für ein Zuhause, das zu Ihnen passt – individuell, hochwertig und zeitlos schön."
      coreBase="/konzept/maler/"
      cta="kontakt/"
      ctaLabel="Beratung anfragen"
      nav={[
        { label: 'Leistungen', href: '/konzept/maler/leistungen/' },
        { label: 'Inspiration', href: '/konzept/maler/gestaltung/' },
        { label: 'Farbberatung', href: '/konzept/maler/kontakt/' },
      ]}
      stages={stages}
      initialStage="wall"
      image={{
        src: '/assets/signature/farbform/farbform-fallback-salbei.webp',
        src480: '/assets/signature/farbform/farbform-fallback-salbei-mobile.webp',
        src960: '/assets/signature/farbform/farbform-fallback-salbei.webp',
        alt: 'Heller Wohnraum mit Fenster, Olivenbaum, Couchtisch und salbeigrüner Wand',
        width: 1448,
        height: 1086,
      }}
      storyVideo={{
        src: '/assets/signature/farbform/farbform-before-after.mp4',
        poster: '/assets/signature/farbform/farbform-fallback-salbei-mobile.webp',
        label: 'Kurzen Vorher-Nachher-Film',
      }}
      storyHref="/konzept/maler/gestaltung/"
      storyLinkLabel="Inspiration ansehen"
      metrics={[
        { value: '4', label: 'Farbwelten' },
        { value: '2', label: 'Lichtstimmungen' },
        { value: 'Individuell', label: 'Persönliche Beratung' },
      ]}
    >
      <FarbformInterior />
      <p className="farbform-signoff" aria-hidden="true">Schönere<br />Räume für ein<br />besseres Leben.</p>
    </SignatureShell>
  );
}
