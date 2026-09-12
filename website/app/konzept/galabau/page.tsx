import {
  LandscapeContact,
  LandscapeLink,
  LandscapePhoto,
  LandscapeShell,
  landscapeBase,
  landscapeServices,
} from '@/components/landscape/landscape-shared';
import { LandscapeProjectJourney } from '@/components/landscape/landscape-project-journey';

export const metadata = {
  title: 'Grünraum · Garten- & Landschaftsbau',
  description:
    'Fiktives Websitekonzept für einen hochwertigen Garten- und Landschaftsbaubetrieb.',
};

export default function Page() {
  return (
    <LandscapeShell>
      <section className="landscape-hero-stage">
        <LandscapePhoto
          name="garten"
          alt="Üppig bepflanzter Wohngarten mit Natursteinterrasse, Baum und Sitzplatz"
          caption="KI-Gartenvisualisierung · fiktives Projekt"
          priority
        />
        <div className="landscape-wrap landscape-hero-panel">
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
          <div className="landscape-hero-note">
            <span>Planen</span>
            <i /> <span>Bauen</span>
            <i /> <span>Entwickeln</span>
          </div>
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

      <LandscapeProjectJourney />

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

      <section className="landscape-wrap landscape-service-paths">
        <div>
          <p className="landscape-kicker">Was wir verbinden</p>
          <h2>Planen, bauen und weiterentwickeln.</h2>
        </div>
        <nav aria-label="Leistungsbereiche">
          {landscapeServices.map((service) => (
            <a
              href={`${landscapeBase}leistungen/#${service.slug}`}
              key={service.slug}
            >
              <span>{service.number}</span>
              <strong>{service.name}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </nav>
      </section>
      <LandscapeContact />
    </LandscapeShell>
  );
}
