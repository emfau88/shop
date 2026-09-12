import { SportLink, SportPhoto, SportShell, SportTrialStrip, sportBase } from '@/components/sport/sport-shared';
import { SportModeExperience } from '@/components/sport/sport-mode-experience';

export const metadata = {
  title: 'AUFSCHLAG · Tennis & Badminton',
  description:
    'Fiktives Websitekonzept für einen modernen lokalen Tennis- und Badmintonverein.',
};

export default function Page() {
  return (
    <SportShell>
      <SportModeExperience />

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
