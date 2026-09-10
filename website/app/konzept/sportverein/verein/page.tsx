import {
  SportLink,
  SportPhoto,
  SportShell,
  SportTrialStrip,
  sportBase,
} from '@/components/sport/sport-shared';

export const metadata = { title: 'Verein · AUFSCHLAG' };

export default function Page() {
  return (
    <SportShell active="Verein">
      <section className="sport-wrap sport-page-intro sport-club-intro">
        <div>
          <p className="sport-kicker">Der Verein</p>
          <h1>Zusammen auf dem Court. Zusammen daneben.</h1>
        </div>
        <p className="sport-lead">
          Bei uns treffen Jugend, Freizeitspieler und Mannschaften aufeinander.
          Was uns verbindet, ist die Freude am Spiel und am gemeinsamen
          Vereinsleben.
        </p>
      </section>
      <section className="sport-wrap sport-club-photo">
        <SportPhoto
          name="gemeinschaft"
          alt="Vereinsmitglieder verschiedener Altersgruppen auf der Terrasse eines lokalen Clubhauses"
          priority
        />
      </section>
      <section className="sport-wrap sport-section sport-values">
        <div>
          <span>01</span>
          <h3>Offen starten</h3>
          <p>
            Probetrainings und klare Ansprechpartner machen den Einstieg leicht.
          </p>
        </div>
        <div>
          <span>02</span>
          <h3>Gemeinsam wachsen</h3>
          <p>
            Jugend, Freizeit und Mannschaften bleiben sichtbar Teil eines
            Vereins.
          </p>
        </div>
        <div>
          <span>03</span>
          <h3>Verantwortung teilen</h3>
          <p>
            Training, Spieltage und Aktionen leben vom Mitmachen vieler
            Mitglieder.
          </p>
        </div>
      </section>
      <section className="sport-club-life">
        <div className="sport-wrap sport-club-life-grid">
          <div>
            <p className="sport-kicker">Vereinsleben</p>
            <h2>Termine, die man gern im Kalender hat.</h2>
          </div>
          <div className="sport-event-list">
            <article>
              <span>APR</span>
              <div>
                <p>Saisonstart</p>
                <h3>Plätze öffnen & gemeinsam anspielen</h3>
                <small>Beispieltermin · noch nicht real</small>
              </div>
            </article>
            <article>
              <span>JUN</span>
              <div>
                <p>Clubtag</p>
                <h3>Tennis, Badminton und Sommerabend</h3>
                <small>Beispieltermin · noch nicht real</small>
              </div>
            </article>
            <article>
              <span>SEP</span>
              <div>
                <p>Jugend</p>
                <h3>Feriencamp & Abschlussturnier</h3>
                <small>Beispieltermin · noch nicht real</small>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="sport-wrap sport-section sport-support">
        <p className="sport-kicker">Partner & Engagement</p>
        <h2>Ein Platz für lokale Unterstützer.</h2>
        <p>
          Lokale Unternehmen helfen bei Jugendtraining, Turnieren und der Pflege
          unserer Anlage. Wir entwickeln Partnerschaften, die zum Verein und zur
          Region passen.
        </p>
        <SportLink secondary href={sportBase + 'probetraining/'}>
          Mitglied werden
        </SportLink>
      </section>
      <SportTrialStrip />
    </SportShell>
  );
}
