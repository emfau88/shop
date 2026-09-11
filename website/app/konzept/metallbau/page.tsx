import {
  MetalContact,
  MetalLink,
  MetalPhoto,
  MetalShell,
  metalBase,
  metalServices,
} from '@/components/metal/metal-shared';
import { MetalManufacturingSequence } from '@/components/metal/metal-manufacturing-sequence';

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
            <p className="metal-kicker">Präzision entlang der Fertigung</p>
            <h1>Von der Zeichnung zum Bauteil.</h1>
            <p className="metal-lead">
              Präzise Bauteile, belastbare Baugruppen und Sonderkonstruktionen:
              abgestimmt auf Daten, Einsatz und den nächsten Arbeitsschritt.
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

      <MetalManufacturingSequence />

      <section className="metal-capabilities" aria-labelledby="capability-title">
        <div className="metal-wrap">
          <div className="metal-capabilities-head">
            <div>
              <p className="metal-kicker">Fertigungsmatrix</p>
              <h2 id="capability-title">
                Passt Ihr Projekt in unsere Fertigung?
              </h2>
            </div>
            <p>
              Die wichtigsten Eckdaten auf einen Blick. Abweichende Werkstoffe,
              Maße oder Seriengrößen prüfen wir direkt anhand Ihrer Zeichnung.
            </p>
          </div>
          <div className="metal-matrix">
            <table>
              <caption className="sr-only">Fertigungsmöglichkeiten</caption>
              <thead>
                <tr>
                  <th>Verfahren</th>
                  <th>Werkstoff</th>
                  <th>Dimension</th>
                  <th>Losgröße</th>
                  <th>Daten</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    'Laserschneiden',
                    'Stahl · Edelstahl',
                    'bis 20 mm',
                    '1–500',
                    'DXF · STEP',
                  ],
                  [
                    'Abkanten',
                    'Stahl · Aluminium',
                    'bis 3.000 mm',
                    '1–250',
                    'STEP · PDF',
                  ],
                  [
                    'Schweißen',
                    'Stahl · Edelstahl',
                    'bis 2.500 kg',
                    '1–100',
                    'STEP · PDF',
                  ],
                  [
                    'Baugruppen',
                    'nach Anforderung',
                    'projektbezogen',
                    '1–50',
                    'STEP · Stückliste',
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((value, index) => (
                      <td
                        data-label={
                          [
                            'Verfahren',
                            'Werkstoff',
                            'Dimension',
                            'Losgröße',
                            'Daten',
                          ][index]
                        }
                        key={value}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MetalLink href={metalBase + 'anfrage/'}>
            Projektparameter senden
          </MetalLink>
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
            späteren Einsatz orientiert. Von der Zeichnung bis zur geprüften
            Baugruppe bleibt der technische Bedarf im Mittelpunkt.
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
              Gute Fertigung zeigt sich dort, wo Teile zusammenkommen. Saubere
              Kanten, nachvollziehbare Prüfungen und dokumentierte Maße sichern
              die Passung in der späteren Montage.
            </p>
            <MetalLink secondary href={metalBase + 'einblicke/'}>
              Qualität ansehen
            </MetalLink>
          </div>
        </div>
      </section>

      <MetalContact />
    </MetalShell>
  );
}
