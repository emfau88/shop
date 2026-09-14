import '@/components/signature/signature-foundation.css';
import './werkform-signature.css';
import { SignatureShell } from '@/components/signature/signature-shell';

const hotspots = [
  { id: 'material', label: 'Steife Seitenwangen', detail: 'Verrippte Stahlwangen tragen die Radiallast der Rolle.', anchor: 'Side_Cheek_Right', x: 82, y: 64 },
  { id: 'precision', label: 'Servicefähige Lagerung', detail: 'Lagerkartuschen und Distanzringe führen die Rolle spielfrei.', anchor: 'Bearing_Cartridge_Right', x: 76, y: 45 },
  { id: 'connection', label: 'Gesicherte Achse', detail: 'Endschrauben fixieren die Lagerfolge entlang einer Montageachse.', anchor: 'Shaft_End_Bolt_Right', x: 85, y: 27 },
  { id: 'base', label: 'Definierte Krafteinleitung', detail: 'Vier Ankerpunkte verbinden den Rollenbock mit dem Maschinenbett.', anchor: 'Base_Plate', x: 65, y: 79 },
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
        { id: 'drawing', label: 'Zeichnung', eyebrow: 'Konstruktion', description: 'Aus Anforderungen wird eine belastbare Geometrie.', icon: <svg viewBox="0 0 24 24"><path d="M5 3h10l4 4v14H5zM15 3v5h4M8 13h8M8 17h6" /></svg> },
        { id: 'manufacturing', label: 'Fertigung', eyebrow: 'Präzisionsarbeit', description: 'Saubere Radien, Bohrbilder und definierte Toleranzen.', icon: <svg viewBox="0 0 24 24"><path d="M4 19h16M6 16h12v3H6zM8 16V9h8v7M10 9V5h4v4M9 5h6" /></svg> },
        { id: 'component', label: 'Bauteil', eyebrow: 'Montagebereit', description: 'Einzelteile werden zur geprüften Baugruppe.', icon: <svg viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" /></svg> },
        { id: 'exploded', label: 'Exploded View', eyebrow: 'Aufbau verstehen', description: 'Jede Verbindung bleibt technisch nachvollziehbar.', icon: <svg viewBox="0 0 24 24"><path d="m12 2 6 3-6 3-6-3zM6 11l6 3 6-3M6 17l6 3 6-3" /></svg> },
      ]}
      image={{ src: '/assets/signature/werkform/werkform-assembly-fallback.webp', src480: '/assets/signature/werkform/werkform-assembly-fallback.webp', src960: '/assets/signature/werkform/werkform-assembly-fallback.webp', width: 1200, height: 900, alt: 'Komplexe WERKFORM Metallbaugruppe als statische Alternative zur interaktiven 3D-Ansicht' }}
      storyMedia={{ src: '/assets/signature/werkform/werkform-studio-background-mobile.webp', alt: 'Blick in eine moderne Präzisionswerkstatt' }}
      metrics={[
        { value: '20+', label: 'Jahre Erfahrung' },
        { value: '±0,05 mm', label: 'Illustrative Präzision' },
        { value: 'Individuell', label: 'Statt Standard' },
      ]}
    >
      <div className="werkform-model-stage" data-werkform-stage data-status="loading">
        <canvas className="werkform-canvas" data-werkform-canvas tabIndex={0} aria-label="Interaktive 3D-Baugruppe. Mit Maus, Touch oder Pfeiltasten drehen; mit Mausrad zoomen." />
        <p className="werkform-loading" data-werkform-loading>Technische Baugruppe wird geladen …</p>
        <svg className="werkform-guides" data-werkform-guides aria-hidden="true" preserveAspectRatio="none">
          {hotspots.map((hotspot) => <path key={hotspot.id} data-werkform-line={hotspot.id} />)}
        </svg>
        <div className="werkform-hotspots" aria-label="Bauteildetails">
          {hotspots.map((hotspot, index) => (
            <button key={hotspot.id} type="button" data-werkform-hotspot={hotspot.id} data-anchor={hotspot.anchor} data-label-x={hotspot.x} data-label-y={hotspot.y} style={{ '--hotspot-index': index } as React.CSSProperties}>
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
        <p className="werkform-signoff" aria-hidden="true">Ideen<br />in Form<br />bringen.</p>
      </div>
    </SignatureShell>
  );
}
