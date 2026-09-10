import {
  LandscapeContact,
  LandscapePhoto,
  LandscapeShell,
} from '@/components/landscape/landscape-shared';

export const metadata = { title: 'Projekte · Grünraum Gartenbau' };

export default function Page() {
  return (
    <LandscapeShell active="Projekte">
      <section className="landscape-wrap landscape-page-intro">
        <p className="landscape-kicker">Ausgewählte Projekte</p>
        <h1>Zwei Gärten. Zwei Antworten auf den Ort.</h1>
        <p className="landscape-lead">
          Jeder Garten antwortet auf einen anderen Ort, andere Wünsche und eine
          andere Art, draußen zu leben.
        </p>
      </section>
      <section className="landscape-wrap landscape-project">
        <LandscapePhoto
          name="garten"
          alt="Familiengarten mit Natursteinterrasse und eingewachsener Bepflanzung"
          caption="KI-Gartenvisualisierung · keine ausgeführte Referenz"
          priority
        />
        <div className="landscape-project-copy">
          <span>01 / Wohngarten</span>
          <h2>Ein Platz für jeden Tag.</h2>
          <p>
            Terrasse, Rasen und üppige Pflanzung bilden unterschiedliche
            Bereiche, ohne den Garten zu zerteilen. Der mehrstämmige Baum gibt
            Schatten und räumliche Tiefe.
          </p>
        </div>
      </section>
      <section className="landscape-project-surface" id="regengarten">
        <div className="landscape-wrap landscape-project">
          <LandscapePhoto
            name="regengarten"
            alt="Regengarten mit Kiesweg, Holzdeck und dichter naturnaher Pflanzung"
            caption="KI-Gartenvisualisierung · keine ausgeführte Referenz"
          />
          <div className="landscape-project-copy">
            <span>02 / Regengarten</span>
            <h2>Wasser darf bleiben.</h2>
            <p>
              Ein abgesenkter, bepflanzter Bereich nimmt Regen auf und macht
              Wasser zum sichtbaren Teil des Gartens. Kiesweg und Holzdeck
              bleiben leicht und durchlässig.
            </p>
          </div>
        </div>
      </section>
      <LandscapeContact />
    </LandscapeShell>
  );
}
