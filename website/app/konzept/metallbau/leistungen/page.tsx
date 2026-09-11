import {
  MetalContact,
  MetalLink,
  MetalPhoto,
  MetalShell,
  metalBase,
  metalServices,
} from '@/components/metal/metal-shared';

export const metadata = { title: 'Leistungen · Werkform Metalltechnik' };

const projectFacts = [
  ['Bauteil', 'Skizze, Zeichnung oder vorhandenes Muster'],
  ['Werkstoff', 'Stahl, Edelstahl oder Aluminium'],
  ['Geometrie', 'Maße, Materialstärke und relevante Toleranzen'],
  ['Menge', 'Einzelteil, Kleinserie oder wiederkehrender Bedarf'],
  ['Oberfläche', 'Roh, geschliffen oder für Beschichtung vorbereitet'],
  ['Termin', 'Gewünschte Übergabe und nachgelagerte Arbeitsschritte'],
];

const capabilities = [
  {
    service: metalServices[0],
    input: 'DXF, Zeichnung oder Musterteil',
    focus: 'Kontur, Kantung, Materialstärke',
    result: 'Einzelteil oder wiederholbare Kleinserie',
  },
  {
    service: metalServices[1],
    input: 'Baugruppenzeichnung und Einsatz',
    focus: 'Verbindung, Schweißfolge, Verzug',
    result: 'Prüfbare, belastbare Baugruppe',
  },
  {
    service: metalServices[2],
    input: 'Anforderung, Einbausituation, Lasten',
    focus: 'Konstruktion, Fertigung, Montageweg',
    result: 'Lösung außerhalb des Standards',
  },
];

export default function Page() {
  return (
    <MetalShell active="Fertigung">
      <section className="metal-wrap metal-services-intro">
        <div>
          <p className="metal-kicker">Leistungen / Projektprüfung</p>
          <h1>Ist das Bauteil machbar?</h1>
        </div>
        <p className="metal-lead">
          Je klarer Geometrie, Werkstoff und Einsatz beschrieben sind, desto
          schneller lässt sich der passende Fertigungsweg bestimmen. Die
          Leistung beginnt deshalb nicht an der Maschine, sondern mit den
          richtigen Projektdaten.
        </p>
      </section>

      <section className="metal-project-brief">
        <div className="metal-wrap metal-project-brief-grid">
          <div>
            <p className="metal-kicker">01 / Projektbriefing</p>
            <h2>Sechs Angaben für eine belastbare Ersteinschätzung.</h2>
            <p>
              Nicht jedes Detail muss bereits feststehen. Diese Eckdaten zeigen,
              welche Bearbeitung, Rückfragen und Prüfungen für das Projekt
              entscheidend werden.
            </p>
            <MetalLink href={metalBase + 'anfrage/'}>
              Projektdaten übermitteln
            </MetalLink>
          </div>
          <dl>
            {projectFacts.map(([term, description], index) => (
              <div key={term}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="metal-wrap metal-capability-board">
        <header>
          <div>
            <p className="metal-kicker">02 / Fertigungsweg</p>
            <h2>Von den Eingangsdaten zum prüfbaren Ergebnis.</h2>
          </div>
          <p>
            Die drei Arbeitsfelder unterscheiden sich nicht nur durch die
            Maschine, sondern durch die Fragen, die vor der Fertigung geklärt
            werden müssen.
          </p>
        </header>
        <div className="metal-capability-table-wrap">
          <table>
            <caption>Projektanforderungen nach Leistungsbereich</caption>
            <thead>
              <tr>
                <th scope="col">Leistungsbereich</th>
                <th scope="col">Eingang</th>
                <th scope="col">Technischer Fokus</th>
                <th scope="col">Ergebnis</th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map(({ service, input, focus, result }) => (
                <tr id={service.slug} key={service.slug}>
                  <th scope="row">
                    <span>{service.number}</span>
                    <strong>{service.name}</strong>
                  </th>
                  <td>{input}</td>
                  <td>{focus}</td>
                  <td>{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <MetalLink secondary href={metalBase + 'anfrage/'}>
          Konkretes Projekt prüfen lassen
        </MetalLink>
      </section>

      <section className="metal-production-flow">
        <div className="metal-wrap metal-production-stage">
          <MetalPhoto
            name="werkhalle"
            alt="Aufgeräumte Metallwerkstatt mit Maschinen und vorbereiteten Werkstücken"
          />
          <div className="metal-production-copy">
            <p className="metal-kicker">03 / Arbeitsweg</p>
            <h2>Eine klare Übergabe an jedem Punkt.</h2>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Prüfen</strong>
                  <p>Zeichnung, Einsatz, Material und offene Punkte klären.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Vorbereiten</strong>
                  <p>Fertigungsfolge, Bezugskanten und Prüfmaße festlegen.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Fertigen</strong>
                  <p>
                    Bauteil kontrolliert bearbeiten und Zwischenschritte prüfen.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <strong>Übergeben</strong>
                  <p>
                    Maße, Oberfläche und vereinbarten Lieferumfang abgleichen.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="metal-wrap metal-output-grid">
        <article>
          <MetalPhoto
            name="bauteile"
            alt="Gebogene Bauteile aus Edelstahl und schwarzem Stahl auf einem Werkstatttisch"
          />
          <div>
            <p className="metal-kicker">Kontur / Kante / Wiederholung</p>
            <h3>Bauteile für die weitere Verarbeitung.</h3>
            <p>
              Passende Geometrie und definierte Bezugspunkte schaffen eine
              verlässliche Grundlage für Montage oder Serienbedarf.
            </p>
          </div>
        </article>
        <article>
          <MetalPhoto
            name="stahltreppe"
            alt="Individuell gefertigte Stahltreppe in einem modernen Gewerbegebäude"
          />
          <div>
            <p className="metal-kicker">Konstruktion / Fertigung / Einbau</p>
            <h3>Sonderlösung als zusammenhängendes Projekt.</h3>
            <p>
              Wenn Standard nicht passt, werden Einbausituation, Fertigung und
              Übergabe von Beginn an gemeinsam gedacht.
            </p>
          </div>
        </article>
      </section>

      <MetalContact />
    </MetalShell>
  );
}
