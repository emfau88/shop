import '@/components/signature/signature-foundation.css';
import './werkform-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

const hotspots = [
  { id: 'material', label: 'Hochfester Stahl', detail: 'Tragende Platten mit kontrollierter Kantenbearbeitung.', anchor: 'Upright_Right' },
  { id: 'precision', label: 'Präzisionsführung', detail: 'Spindel, Lager und Distanzringe bilden eine definierte Achse.', anchor: 'Precision_Spindle' },
  { id: 'connection', label: 'Modular verbunden', detail: 'Schrauben, Scheiben und Muttern bleiben einzeln nachvollziehbar.', anchor: 'Bolt_Top_FR' },
  { id: 'base', label: 'Stabile Grundplatte', detail: 'Das Bohrbild bindet die Baugruppe sicher in die Montage ein.', anchor: 'Base_Plate' },
];

export const metadata = { title: 'WERKFORM Signature · Technik, die man versteht' };

export default function Page() {
  return (
    <SignatureShell
      brand="WERKFORM"
      concept="Werkform · Metallverarbeitung"
      className="werkform-signature"
      initialStage="exploded"
      kicker="Von der Idee zum Bauteil"
      title={<>Technik, die man <em>versteht.</em></>}
      intro="Wir verbinden CAD, präzise Fertigung und effiziente Montage zu maßgeschneiderten Lösungen aus Metall."
      coreBase="/konzept/metallbau/"
      cta="anfrage/"
      nav={[
        { label: 'Produkte', href: '/konzept/metallbau/leistungen/' },
        { label: 'Fertigung', href: '/konzept/metallbau/leistungen/' },
        { label: 'Qualität', href: '/konzept/metallbau/einblicke/' },
      ]}
      stages={[
        { id: 'drawing', label: 'Zeichnung', eyebrow: 'Konstruktion', description: 'Aus Anforderungen wird eine belastbare Geometrie.' },
        { id: 'manufacturing', label: 'Fertigung', eyebrow: 'Präzisionsarbeit', description: 'Saubere Radien, Bohrbilder und definierte Toleranzen.' },
        { id: 'component', label: 'Bauteil', eyebrow: 'Montagebereit', description: 'Einzelteile werden zur geprüften Baugruppe.' },
        { id: 'exploded', label: 'Exploded View', eyebrow: 'Aufbau verstehen', description: 'Jede Verbindung bleibt technisch nachvollziehbar.' },
      ]}
      image={{ src: '/assets/signature/werkform/werkform-assembly-fallback.webp', src480: '/assets/signature/werkform/werkform-assembly-fallback.webp', src960: '/assets/signature/werkform/werkform-assembly-fallback.webp', width: 1200, height: 900, alt: 'Komplexe WERKFORM Metallbaugruppe als statische Alternative zur interaktiven 3D-Ansicht' }}
      metrics={[
        { value: '20+', label: 'Jahre Erfahrung' },
        { value: '100 %', label: 'Fiktives Konzept' },
        { value: 'Individuell', label: 'Statt Standard' },
      ]}
    >
      <div className="werkform-model-stage" data-werkform-stage data-status="loading">
        <canvas className="werkform-canvas" data-werkform-canvas tabIndex={0} aria-label="Interaktive 3D-Baugruppe. Mit Maus, Touch oder Pfeiltasten drehen; mit Mausrad zoomen." />
        <p className="werkform-loading" data-werkform-loading>Technische Baugruppe wird geladen …</p>
        <div className="werkform-hotspots" aria-label="Bauteildetails">
          {hotspots.map((hotspot, index) => (
            <button key={hotspot.id} type="button" data-werkform-hotspot={hotspot.id} data-anchor={hotspot.anchor} style={{ '--hotspot-index': index } as React.CSSProperties}>
              <span aria-hidden="true">+</span><strong>{hotspot.label}</strong>
            </button>
          ))}
        </div>
        <aside className="werkform-detail" data-werkform-detail hidden aria-live="polite">
          <button type="button" data-werkform-detail-close aria-label="Detail schließen">×</button>
          <p>Bauteildetail</p>
          <h2 data-werkform-detail-title>Hochfester Stahl</h2>
          <span data-werkform-detail-copy>{hotspots[0].detail}</span>
        </aside>
        <label className="werkform-explosion" htmlFor="werkform-explosion-range">
          <span>Montiert</span>
          <input id="werkform-explosion-range" type="range" min="0" max="100" defaultValue="100" data-werkform-explosion aria-label="Explosionsgrad der Baugruppe" />
          <span>Zerlegt</span>
        </label>
      </div>
    </SignatureShell>
  );
}
