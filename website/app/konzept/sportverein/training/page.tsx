import {
  SportLink,
  SportPhoto,
  SportShell,
  SportTrialStrip,
  sportBase,
} from '@/components/sport/sport-shared';

export const metadata = { title: 'Training · AUFSCHLAG' };

const sessions = [
  ['Dienstag', '18:00–20:00', 'Badminton · Freies Spiel', 'Erwachsene'],
  ['Mittwoch', '17:30–19:00', 'Tennis · Einstieg', 'Jugend & Erwachsene'],
  ['Donnerstag', '18:30–20:00', 'Tennis · Mannschaft', 'Erwachsene'],
  ['Freitag', '16:00–18:00', 'Jugendtraining', 'Beide Sportarten'],
  ['Sonntag', '10:00–12:00', 'Offener Court', 'Alle Spielstärken'],
];

export default function Page() {
  return (
    <SportShell active="Training">
      <section className="sport-wrap sport-page-intro">
        <p className="sport-kicker">Training</p>
        <h1>Finde deinen Rhythmus.</h1>
        <p className="sport-lead">
          Feste Gruppen geben Orientierung. Offene Zeiten lassen Raum für
          spontane Ballwechsel. Alle Angaben sind beispielhaft und Teil des
          fiktiven Konzepts.
        </p>
      </section>
      <section
        className="sport-wrap sport-schedule"
        aria-label="Beispielhafte Trainingszeiten"
      >
        <div className="sport-schedule-head">
          <span>Tag</span>
          <span>Zeit</span>
          <span>Training</span>
          <span>Gruppe</span>
        </div>
        {sessions.map(([day, time, training, group]) => (
          <div className="sport-schedule-row" key={day}>
            <b>{day}</b>
            <span>{time}</span>
            <strong>{training}</strong>
            <span>{group}</span>
          </div>
        ))}
      </section>
      <section className="sport-training-block" id="tennis">
        <div className="sport-wrap sport-training-grid">
          <SportPhoto
            name="tennis"
            alt="Freundschaftlicher Tennisballwechsel auf einem roten Vereinsplatz"
          />
          <div>
            <p className="sport-kicker">Tennis</p>
            <h2>Vom ersten Aufschlag bis zum Mannschaftsspiel.</h2>
            <p>
              Einsteiger lernen Grundlagen in kleinen Gruppen. Fortgeschrittene
              finden Techniktraining, freie Spielzeiten und Mannschaftsangebote.
            </p>
            <ul>
              <li>Jugend- und Erwachsenentraining</li>
              <li>Einsteigerkurse</li>
              <li>Mannschafts- und freies Spiel</li>
            </ul>
            <SportLink href={`${sportBase}probetraining/?sport=Tennis`}>
              Tennis ausprobieren
            </SportLink>
          </div>
        </div>
      </section>
      <section
        className="sport-wrap sport-training-grid sport-training-alt"
        id="badminton"
      >
        <div>
          <p className="sport-kicker">Badminton</p>
          <h2>Schnell im Spiel. Gemeinsam besser.</h2>
          <p>
            Offene Hallenzeiten und betreute Gruppen verbinden lockeres Spielen
            mit Technik, Bewegung und echten Herausforderungen.
          </p>
          <ul>
            <li>Freies Doppel und Einzel</li>
            <li>Technik- und Lauftraining</li>
            <li>Jugend und Erwachsene</li>
          </ul>
          <SportLink href={`${sportBase}probetraining/?sport=Badminton`}>
            Badminton ausprobieren
          </SportLink>
        </div>
        <SportPhoto
          name="badminton"
          alt="Badminton-Doppel mit vier erwachsenen Vereinsspielern in einer hellen Halle"
        />
      </section>
      <SportTrialStrip />
    </SportShell>
  );
}
