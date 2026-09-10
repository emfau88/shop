import {
  DemoShell,
  Photo,
  ArrowLink,
  DemoContact,
  base,
} from '@/components/shared';

export const metadata = { title: 'Leistungen · Farbform' };

const decisions = [
  {
    number: '01',
    href: '#farbkonzepte',
    question: 'Wie soll sich der Raum anfühlen?',
    answer: 'Farbkonzept',
  },
  {
    number: '02',
    href: '#innenanstriche',
    question: 'Welche Flächen geben ihm Ruhe?',
    answer: 'Innenanstrich',
  },
  {
    number: '03',
    href: '#oberflaechen',
    question: 'Wo darf Material sichtbar werden?',
    answer: 'Oberfläche',
  },
];

export default function Page() {
  return (
    <DemoShell active="Leistungen">
      <section className="wrap farbform-services-intro">
        <div>
          <p className="eyebrow">Die Leistungen</p>
          <h1>Nicht mit der Farbe beginnen. Mit dem Raum.</h1>
          <p className="lead">
            Nutzung, Licht und vorhandene Materialien geben die Richtung vor.
            Daraus entstehen Farbkonzept, Oberfläche und Ausführung als ein
            zusammenhängender Weg.
          </p>
        </div>
        <nav
          className="farbform-decision-index"
          aria-label="Einstieg nach Gestaltungsfrage"
        >
          {decisions.map((decision) => (
            <a href={decision.href} key={decision.number}>
              <span>{decision.number}</span>
              <span>
                <small>{decision.question}</small>
                <strong>{decision.answer}</strong>
              </span>
              <b aria-hidden="true">↓</b>
            </a>
          ))}
        </nav>
      </section>

      <section className="farbform-brief" id="farbkonzepte">
        <div className="wrap farbform-brief-grid">
          <div className="farbform-brief-copy">
            <p className="eyebrow">01 / Farbkonzept</p>
            <h2>Erst verstehen, was bereits da ist.</h2>
            <p>
              Eine Farbe wirkt nie allein. Boden, Möbel, Tageslicht und die
              Nutzung des Raums entscheiden darüber, ob ein Ton ruhig, warm oder
              zu schwer erscheint.
            </p>
            <dl>
              <div>
                <dt>Nutzung</dt>
                <dd>Rückzug, Alltag oder ein Ort mit viel Bewegung</dd>
              </div>
              <div>
                <dt>Licht</dt>
                <dd>
                  Himmelsrichtung, Tagesverlauf und künstliche Beleuchtung
                </dd>
              </div>
              <div>
                <dt>Bestand</dt>
                <dd>Boden, Möbel, Stoffe und Flächen, die bleiben sollen</dd>
              </div>
            </dl>
            <ArrowLink secondary href={base + 'kontakt/?leistung=Farbkonzepte'}>
              Farbkonzept anfragen
            </ArrowLink>
          </div>
          <div className="farbform-brief-visual">
            <Photo
              name="farbmuster"
              alt="Drei matte Farbmuster auf Leinen"
              caption="KI-Materialstudie · illustrative Farbmuster"
            />
            <blockquote>
              Der passende Ton zeigt sich im Zusammenspiel – nicht auf einem
              einzelnen Farbfächer.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="farbform-room-change" id="innenanstriche">
        <div className="wrap">
          <header className="farbform-room-change-head">
            <div>
              <p className="eyebrow">02 / Innenanstriche</p>
              <h2>Die gleiche Architektur. Eine andere Wirkung.</h2>
            </div>
            <p>
              Untergrund, Lichteinfall und gewünschte Raumstimmung bestimmen,
              welcher Aufbau und welcher Farbton passen. Eine Musterfläche macht
              die Entscheidung vor der Ausführung sichtbar.
            </p>
          </header>
          <div className="farbform-room-pair">
            <div>
              <span>Vorher · heller Bestand</span>
              <Photo
                name="farbform-raum-vorher"
                alt="Wohnraum vor der Neugestaltung mit warmer, weißer Wand"
              />
            </div>
            <div>
              <span>Nachher · Aubergine 42</span>
              <Photo
                name="raum-aubergine"
                alt="Wohnzimmer mit matter auberginefarbener Akzentwand"
              />
            </div>
          </div>
          <div className="farbform-room-change-foot">
            <p>
              Ruhige Decken- und Wandflächen fassen den Raum. Der Akzent setzt
              Tiefe, ohne dem Tageslicht seine Leichtigkeit zu nehmen.
            </p>
            <ArrowLink
              secondary
              href={base + 'kontakt/?leistung=Innenanstriche'}
            >
              Innenanstrich besprechen
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="wrap farbform-surface-study" id="oberflaechen">
        <div className="farbform-surface-note">
          <p className="eyebrow">03 / Oberflächengestaltung</p>
          <p>Eine Oberfläche verändert sich mit Blickwinkel und Tageszeit.</p>
          <ul aria-label="Mögliche Oberflächenwirkungen">
            <li>
              <span>Matt</span>
              <small>ruhig und flächig</small>
            </li>
            <li>
              <span>Fein strukturiert</span>
              <small>lebendig im Streiflicht</small>
            </li>
            <li>
              <span>Akzentuiert</span>
              <small>gezielt statt überall</small>
            </li>
          </ul>
        </div>
        <Photo
          name="eingang-senf"
          alt="Gelbe Wandfläche in einem hellen Eingang"
        />
        <div className="farbform-surface-copy">
          <h2>Material darf man sehen. Und spüren.</h2>
          <p>
            Glatte, matte Flächen wirken zurückhaltend. Feine Strukturen bringen
            Bewegung ins Licht. Vor der Entscheidung zeigt eine Musterfläche,
            wie Farbe und Material am tatsächlichen Ort reagieren.
          </p>
          <ArrowLink
            secondary
            href={base + 'kontakt/?leistung=Oberflächengestaltung'}
          >
            Oberfläche auswählen
          </ArrowLink>
        </div>
      </section>

      <section className="farbform-delivery">
        <div className="wrap farbform-delivery-grid">
          <div>
            <p className="eyebrow">Vom Muster zum Raum</p>
            <h2>Eine Entscheidung nach der anderen.</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <strong>Raum lesen</strong>
              <p>Nutzung, Licht und Bestand gemeinsam einordnen.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Muster prüfen</strong>
              <p>Farbton und Oberfläche dort ansehen, wo sie wirken sollen.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Sauber ausführen</strong>
              <p>Flächen vorbereiten, schützen, beschichten und abnehmen.</p>
            </li>
          </ol>
        </div>
      </section>

      <DemoContact />
    </DemoShell>
  );
}
