import {
  SportLink,
  SportPhoto,
  SportShell,
  SportTrialStrip,
  sportBase,
} from '@/components/sport/sport-shared';
import { SportWeekPlan } from '@/components/sport/sport-week-plan';

export const metadata = {
  title: 'AUFSCHLAG · Tennis & Badminton',
  description:
    'Fiktives Websitekonzept für einen modernen lokalen Tennis- und Badmintonverein.',
};

export default function Page() {
  return (
    <SportShell>
      <section className="sport-hero-live">
        <div className="sport-wrap sport-hero-live-head">
          <div className="sport-hero-copy">
            <p className="sport-kicker">Tennis · Badminton · Gemeinschaft</p>
            <h1>
              Heute ist <em>Spieltag.</em>
            </h1>
            <p className="sport-lead">
              Zwei Sportarten, viele Spielstärken und ein Verein, in dem der
              erste Ballwechsel genauso zählt wie der nächste Punkt.
            </p>
            <div className="sport-actions">
              <SportLink href={sportBase + 'probetraining/'}>
                Probetraining starten
              </SportLink>
              <SportLink secondary href={sportBase + 'training/'}>
                Training finden
              </SportLink>
            </div>
          </div>
          <aside className="sport-next-session">
            <span>Nächster Beispieltermin</span>
            <b>DI · 18:00</b>
            <strong>Badminton · Freies Spiel</strong>
            <a href={sportBase + 'training/'}>Zum Wochenplan ↗</a>
          </aside>
        </div>
        <div className="sport-wrap sport-hero-live-photo">
          <SportPhoto
            name="badminton"
            alt="Vier erwachsene Vereinsspieler bei einem dynamischen Badminton-Doppel in einer hellen Sporthalle"
            caption="KI-Sportfotografie · fiktives Vereinstraining"
            priority
          />
        </div>
      </section>

      <SportWeekPlan />

      <section className="sport-wrap sport-section sport-choice">
        <div className="sport-section-head">
          <div>
            <p className="sport-kicker">Dein Sport</p>
            <h2>
              Zwei Courts.
              <br />
              Ein Teamgefühl.
            </h2>
          </div>
          <p>
            Ob draußen auf Asche oder drinnen in der Halle: Du findest Gruppen
            für den Einstieg, regelmäßiges Training und ambitioniertes
            Mannschaftsspiel.
          </p>
        </div>
        <div className="sport-choice-grid">
          <a href={sportBase + 'training/#tennis'}>
            <span className="sport-number">01</span>
            <h3>Tennis</h3>
            <p>
              Techniktraining, freies Spiel und Mannschaften für Jugend und
              Erwachsene.
            </p>
            <b>Auf den Platz ↗</b>
          </a>
          <a href={sportBase + 'training/#badminton'}>
            <span className="sport-number">02</span>
            <h3>Badminton</h3>
            <p>
              Schnelle Ballwechsel, feste Trainingsgruppen und offene
              Spielzeiten in der Halle.
            </p>
            <b>In die Halle ↗</b>
          </a>
        </div>
      </section>

      <section className="sport-feature">
        <div className="sport-wrap sport-feature-grid">
          <SportPhoto
            name="tennis"
            alt="Zwei erwachsene Vereinsmitglieder bei einem freundschaftlichen Tennisballwechsel auf einem roten Sandplatz"
          />
          <div>
            <p className="sport-kicker">Einsteigen & dranbleiben</p>
            <h2>Spielstärke ist kein Eintrittsticket.</h2>
            <p>
              Unsere Trainer ordnen Sportart, Erfahrung und Altersgruppe so
              zusammen, dass der Einstieg weder über- noch unterfordert. Ein
              erster Termin reicht zum Kennenlernen.
            </p>
            <SportLink secondary href={sportBase + 'training/'}>
              Gruppen entdecken
            </SportLink>
          </div>
        </div>
      </section>

      <section className="sport-wrap sport-section sport-community">
        <div>
          <p className="sport-kicker">Mehr als Training</p>
          <h2>Ein Verein lebt zwischen den Ballwechseln.</h2>
          <p>
            Gemeinsame Spieltage, Jugendaktionen und Zeit auf der Clubterrasse
            machen aus Trainingspartnern eine Gemeinschaft.
          </p>
          <SportLink secondary href={sportBase + 'verein/'}>
            Verein kennenlernen
          </SportLink>
        </div>
        <SportPhoto
          name="gemeinschaft"
          alt="Acht erwachsene Vereinsmitglieder verschiedener Altersgruppen im Gespräch auf der Clubterrasse"
          caption="KI-Sportfotografie · fiktive Vereinsgemeinschaft"
        />
      </section>
      <SportTrialStrip />
    </SportShell>
  );
}
