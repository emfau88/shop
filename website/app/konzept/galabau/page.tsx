import {
  LandscapeContact,
  LandscapeLink,
  LandscapePhoto,
  LandscapeShell,
  landscapeBase,
  landscapeServices,
} from '@/components/landscape/landscape-shared';

export const metadata = {
  title: 'Grünraum · Garten- & Landschaftsbau',
  description:
    'Fiktives Websitekonzept für einen hochwertigen Garten- und Landschaftsbaubetrieb.',
};

export default function Page() {
  return (
    <LandscapeShell>
      <section className="landscape-wrap landscape-hero">
        <div className="landscape-hero-copy">
          <p className="landscape-kicker">Garten- & Landschaftsbau</p>
          <h1>Draußen beginnt Zuhause.</h1>
          <p className="landscape-lead">
            Gärten, Wege und Terrassen, die natürlich wirken, gut funktionieren
            und mit den Jahren noch schöner werden.
          </p>
          <div className="landscape-actions">
            <LandscapeLink href={landscapeBase + 'anfrage/'}>
              Garten anfragen
            </LandscapeLink>
            <a
              className="landscape-quiet-link"
              href={landscapeBase + 'gartenideen/'}
            >
              Gartenideen ansehen ↘
            </a>
          </div>
        </div>
        <LandscapePhoto
          name="garten"
          alt="Üppig bepflanzter Wohngarten mit Natursteinterrasse, Baum und Sitzplatz"
          caption="KI-Gartenvisualisierung · fiktives Projekt"
          priority
        />
        <div className="landscape-hero-note">
          <span>Planen</span>
          <i /> <span>Bauen</span>
          <i /> <span>Entwickeln</span>
        </div>
      </section>

      <section className="landscape-intro">
        <div className="landscape-wrap landscape-intro-grid">
          <p className="landscape-kicker">Ein Garten als Ganzes</p>
          <h2>Gute Gestaltung verbindet Haus, Pflanzen und Alltag.</h2>
          <p>
            Ein Garten muss mehr können als gut aussehen. Wege sollen führen,
            Plätze sollen sich richtig anfühlen und Pflanzen dauerhaft zum
            Standort passen. Darum beginnt jedes Vorhaben mit dem Zuhören.
          </p>
        </div>
      </section>

      <section className="landscape-wrap landscape-section">
        <div className="landscape-section-head">
          <p className="landscape-kicker">Leistungen</p>
          <h2>Alles, was draußen zusammengehört.</h2>
        </div>
        <div className="landscape-services">
          {landscapeServices.map((service) => (
            <a
              href={`${landscapeBase}leistungen/#${service.slug}`}
              key={service.slug}
            >
              <span>{service.number}</span>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="landscape-craft">
        <div className="landscape-wrap landscape-craft-grid">
          <div>
            <p className="landscape-kicker">Sauber gebaut</p>
            <h2>Damit Ideen dauerhaft tragen.</h2>
            <p>
              Unterbau, Gefälle, Anschlüsse und Kanten sieht man später nur
              selten. Für ein dauerhaft gutes Ergebnis sind genau diese Details
              entscheidend.
            </p>
            <LandscapeLink
              light
              href={landscapeBase + 'leistungen/#wege-terrassen'}
            >
              Wege & Terrassen
            </LandscapeLink>
          </div>
          <LandscapePhoto
            name="pflaster-detail"
            alt="Gartenbauer setzt eine Natursteinkante entlang eines Pflasterwegs"
            caption="KI-Handwerksstudie · illustrative Ausführung"
          />
        </div>
      </section>

      <section className="landscape-wrap landscape-section landscape-future">
        <LandscapePhoto
          name="regengarten"
          alt="Naturnaher Regengarten mit Bachlauf, Kiesweg und dichter Bepflanzung"
          caption="KI-Gartenvisualisierung · fiktives Projekt"
        />
        <div>
          <p className="landscape-kicker">Mit Wasser gestalten</p>
          <h2>Gärten für heiße Tage und starken Regen.</h2>
          <p>
            Versickerungsfähige Flächen, schattenspendende Gehölze und eine
            passende Pflanzung können Wasser im Garten halten und zugleich neue
            Lebensräume schaffen.
          </p>
          <a
            className="landscape-quiet-link"
            href={landscapeBase + 'gartenideen/#regengarten'}
          >
            Idee entdecken ↗
          </a>
        </div>
      </section>

      <section className="landscape-steps">
        <div className="landscape-wrap">
          <div className="landscape-section-head">
            <p className="landscape-kicker">Der Weg zum Garten</p>
            <h2>Erst verstehen. Dann gestalten.</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <h3>Kennenlernen</h3>
              <p>
                Grundstück, Wünsche, Nutzung und Rahmenbedingungen werden
                gemeinsam eingeordnet.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Idee & Angebot</h3>
              <p>
                Gestaltung, Materialien und Leistungsumfang erhalten eine klare
                Richtung.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Umsetzung</h3>
              <p>
                Die Gewerke werden koordiniert und der Garten Schritt für
                Schritt angelegt.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Weiterwachsen</h3>
              <p>
                Auf Wunsch begleitet passende Pflege die Entwicklung nach der
                Fertigstellung.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <LandscapeContact />
    </LandscapeShell>
  );
}
