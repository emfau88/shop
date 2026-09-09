import {
  MetalContact,
  MetalLink,
  MetalPhoto,
  MetalShell,
  metalBase,
  metalServices,
} from '@/components/metal/metal-shared';

export const metadata = {
  title: 'Werkform · Metallverarbeitung & Konstruktion',
  description:
    'Fiktives Websitekonzept für einen präzise arbeitenden Metallverarbeitungsbetrieb.',
};

export default function Page() {
  return (
    <MetalShell>
      <section className="metal-hero-industrial">
        <div className="metal-wrap metal-hero-industrial-head">
          <div className="metal-hero-copy">
            <p className="metal-kicker">Metallverarbeitung · Konstruktion</p>
            <h1>Aus Metall wird Lösung.</h1>
            <p className="metal-lead">
              Präzise Bauteile, belastbare Baugruppen und Sonderkonstruktionen,
              die für ihren Einsatz gemacht sind.
            </p>
            <div className="metal-actions">
              <MetalLink href={metalBase + 'anfrage/'}>
                Projekt anfragen
              </MetalLink>
              <MetalLink secondary href={metalBase + 'leistungen/'}>
                Leistungen ansehen
              </MetalLink>
            </div>
          </div>
          <dl className="metal-hero-specs">
            <div>
              <dt>Werkstoffe</dt>
              <dd>Stahl · Edelstahl · Aluminium</dd>
            </div>
            <div>
              <dt>Projektarten</dt>
              <dd>Einzelteile · Kleinserien · Baugruppen</dd>
            </div>
            <div>
              <dt>Datengrundlage</dt>
              <dd>STEP · DXF · PDF</dd>
            </div>
          </dl>
        </div>
        <div className="metal-wrap metal-hero-panorama">
          <MetalPhoto
            name="werkhalle"
            alt="Moderne Metallwerkstatt mit Laserschneidanlage, Abkantpresse und vorbereiteten Blechteilen"
            caption="KI-Werkstattvisualisierung · fiktive Beispielausstattung"
            priority
          />
        </div>
      </section>

      <section
        className="metal-capability-line"
        aria-label="Leistungsschwerpunkte"
      >
        <div className="metal-wrap">
          <span>Blechbearbeitung</span>
          <i aria-hidden="true" />
          <span>Schweißbaugruppen</span>
          <i aria-hidden="true" />
          <span>Sonderkonstruktionen</span>
        </div>
      </section>

      <section className="metal-wrap metal-section">
        <div className="metal-section-head">
          <div>
            <p className="metal-kicker">Leistungsspektrum</p>
            <h2>Vom Zuschnitt bis zur fertigen Baugruppe.</h2>
          </div>
          <p>
            Kurze Wege, klare Abstimmung und eine Fertigung, die sich am
            späteren Einsatz orientiert. Die Website führt schnell zum passenden
            Leistungsbereich.
          </p>
        </div>
        <div className="metal-service-grid">
          {metalServices.map((service) => (
            <a
              href={`${metalBase}leistungen/#${service.slug}`}
              key={service.slug}
            >
              <span className="metal-service-number">{service.number}</span>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
              <span className="metal-service-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="metal-dark metal-section">
        <div className="metal-wrap metal-feature">
          <MetalPhoto
            name="bauteile"
            alt="Präzise gebogene Metallbauteile auf einem Prüftisch"
            caption="KI-Detailstudie · illustrative Bauteile"
          />
          <div>
            <p className="metal-kicker">Präzision im Detail</p>
            <h2>Saubere Kanten. Klare Geometrie.</h2>
            <p>
              Gute Fertigung zeigt sich dort, wo Teile zusammenkommen. Deshalb
              macht dieses Konzept Material, Verarbeitung und Anwendungsnähe
              sichtbar, ohne mit austauschbaren Werbeversprechen zu arbeiten.
            </p>
            <MetalLink secondary href={metalBase + 'einblicke/'}>
              Einblicke öffnen
            </MetalLink>
          </div>
        </div>
      </section>

      <section className="metal-wrap metal-section metal-process">
        <div className="metal-section-head">
          <div>
            <p className="metal-kicker">Projektablauf</p>
            <h2>Drei Schritte. Ein klares Ergebnis.</h2>
          </div>
        </div>
        <ol>
          <li>
            <span>01</span>
            <h3>Anforderungen klären</h3>
            <p>
              Zeichnung, Material, Menge, Termin und Einsatz werden gemeinsam
              eingeordnet.
            </p>
          </li>
          <li>
            <span>02</span>
            <h3>Fertigung abstimmen</h3>
            <p>
              Der passende Weg vom Einzelteil bis zur Baugruppe wird
              verständlich festgelegt.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Projekt übergeben</h3>
            <p>
              Bauteile und Konstruktionen werden passend zum vereinbarten Umfang
              bereitgestellt.
            </p>
          </li>
        </ol>
      </section>

      <MetalContact />
    </MetalShell>
  );
}
