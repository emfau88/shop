import {
  LandscapeContact,
  LandscapeLink,
  LandscapePhoto,
  LandscapeShell,
  landscapeBase,
} from '@/components/landscape/landscape-shared';

export const metadata = { title: 'Leistungen · Grünraum Gartenbau' };

const startingPoints = [
  ['Alltag', 'Wer nutzt den Garten – und zu welchen Tageszeiten?'],
  ['Bestand', 'Was bleibt, was stört und was soll weiterwachsen?'],
  ['Standort', 'Wie verhalten sich Licht, Boden, Gefälle und Wasser?'],
  ['Entwicklung', 'Wie viel Pflege passt langfristig zum Garten?'],
];

export default function Page() {
  return (
    <LandscapeShell active="Leistungen">
      <section className="landscape-wrap landscape-services-intro">
        <div>
          <p className="landscape-kicker">Leistungen</p>
          <h1>Ein Garten entsteht in Etappen. Und wächst danach weiter.</h1>
        </div>
        <p className="landscape-lead">
          Planung, Bau, Pflanzung und Pflege sind keine getrennten Pakete. Sie
          bilden einen Weg, der vom heutigen Grundstück zu einem Garten führt,
          der auch in einigen Jahren noch stimmig funktioniert.
        </p>
      </section>

      <section className="landscape-starting-point">
        <div className="landscape-wrap landscape-starting-grid">
          <div>
            <p className="landscape-kicker">Bevor die erste Linie entsteht</p>
            <h2>Das Grundstück gibt die Richtung vor.</h2>
          </div>
          <dl>
            {startingPoints.map(([term, description], index) => (
              <div key={term}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ol className="landscape-lifecycle">
        <li
          className="landscape-phase landscape-phase-plan"
          id="gartengestaltung"
        >
          <div className="landscape-wrap landscape-phase-grid">
            <div className="landscape-phase-copy">
              <span className="landscape-phase-number">01</span>
              <p className="landscape-kicker">Planen / Gartengestaltung</p>
              <h2>Aus Wünschen wird ein Garten mit Richtung.</h2>
              <p>
                Sitzplätze, Blickachsen, Wege, Höhen und Bepflanzung werden als
                ein Ganzes betrachtet. So entsteht ein Plan, der zum Haus, zum
                Grundstück und zum Alltag seiner Bewohner passt.
              </p>
              <ul>
                <li>Nutzungsbereiche und Blickachsen</li>
                <li>Material- und Pflanzkonzept</li>
                <li>Etappen, Budgetrahmen und Baufolge</li>
              </ul>
              <LandscapeLink
                href={`${landscapeBase}anfrage/?thema=Gartengestaltung`}
              >
                Planung anfragen
              </LandscapeLink>
            </div>
            <LandscapePhoto
              name="garten"
              alt="Gestalteter Privatgarten mit Terrasse und üppigen Staudenbeeten"
            />
          </div>
        </li>

        <li
          className="landscape-phase landscape-phase-build"
          id="wege-terrassen"
        >
          <div className="landscape-wrap landscape-build-grid">
            <div className="landscape-build-heading">
              <span className="landscape-phase-number">02</span>
              <p className="landscape-kicker">Bauen / Wege & Terrassen</p>
              <h2>Erst der Unterbau. Dann die sichtbare Fläche.</h2>
            </div>
            <div className="landscape-build-copy">
              <p>
                Terrassen und Wege tragen den Alltag im Garten. Material,
                Format, Übergänge, Unterbau und Entwässerung werden passend zum
                Ort und zur Beanspruchung gewählt.
              </p>
              <dl>
                <div>
                  <dt>Tragfähigkeit</dt>
                  <dd>Aufbau passend zur späteren Nutzung</dd>
                </div>
                <div>
                  <dt>Wasser</dt>
                  <dd>Gefälle, Ableitung und versickerungsfähige Bereiche</dd>
                </div>
                <div>
                  <dt>Übergänge</dt>
                  <dd>Anschlüsse an Haus, Beet und vorhandene Höhen</dd>
                </div>
              </dl>
              <LandscapeLink
                href={`${landscapeBase}anfrage/?thema=Wege%20%26%20Terrassen`}
              >
                Flächen besprechen
              </LandscapeLink>
            </div>
            <LandscapePhoto
              name="pflaster-detail"
              alt="Handwerkliche Ausführung einer Natursteineinfassung"
            />
          </div>
        </li>

        <li
          className="landscape-phase landscape-phase-grow"
          id="pflanzung-pflege"
        >
          <div className="landscape-wrap landscape-grow-grid">
            <LandscapePhoto
              name="regengarten"
              alt="Klimaangepasster Garten mit Gräsern, Stauden und offenem Wasserlauf"
            />
            <div className="landscape-phase-copy">
              <span className="landscape-phase-number">03</span>
              <p className="landscape-kicker">Pflanzen / Standort</p>
              <h2>Was heute gesetzt wird, verändert sich jedes Jahr.</h2>
              <p>
                Standortgerechte Stauden, Gräser und Gehölze geben dem Garten
                Struktur und Jahreszeiten. Wuchshöhe, Blüte, Wasserbedarf und
                spätere Pflege werden schon bei der Auswahl mitgedacht.
              </p>
              <div className="landscape-growth-notes">
                <span>Frühjahr · Aufbau</span>
                <span>Sommer · Blüte & Schatten</span>
                <span>Herbst · Struktur & Farbe</span>
                <span>Winter · Gerüst & Rückzug</span>
              </div>
            </div>
          </div>
        </li>

        <li className="landscape-phase landscape-phase-care">
          <div className="landscape-wrap landscape-care-grid">
            <div>
              <span className="landscape-phase-number">04</span>
              <p className="landscape-kicker">Weiterentwickeln / Pflege</p>
              <h2>Der fertige Garten ist erst der Anfang.</h2>
            </div>
            <div>
              <p>
                Rückschnitt, Bodenpflege und gezielte Ergänzungen halten die
                gewünschte Struktur, ohne die natürliche Entwicklung zu stoppen.
                Der Pflegeumfang wird deshalb bereits in der Planung abgestimmt.
              </p>
              <LandscapeLink
                light
                href={`${landscapeBase}anfrage/?thema=Pflanzung%20%26%20Pflege`}
              >
                Pflanzung und Pflege anfragen
              </LandscapeLink>
            </div>
          </div>
        </li>
      </ol>

      <LandscapeContact />
    </LandscapeShell>
  );
}
