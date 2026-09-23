/* oxlint-disable nextjs/no-html-link-for-pages -- Native links keep the static Pages export self-contained. */
/* oxlint-disable nextjs/no-img-element -- Local responsive WebP assets are optimized offline and include explicit dimensions. */
import { DemoBar } from '@/components/demo-bar';
import { GruenraumProjectViewer } from '@/components/signature/gruenraum/gruenraum-project-viewer';
import { SignatureRuntimeBridge } from '@/components/signature/signature-runtime-bridge';
import './gruenraum-signature.css';

export const metadata = {
  title: 'GRÜNRAUM Signature · Vom Ort zum Lebensraum',
  description:
    'Eine interaktive Signature-Erfahrung für Gartenplanung, handwerkliche Ausführung und langfristig wachsende Außenräume.',
};

const phases = [
  {
    id: 'existing',
    number: '01',
    label: 'Bestand',
    eyebrow: 'Den Ort lesen',
    description:
      'Licht, Boden, Höhen und gewachsene Strukturen bilden die belastbare Ausgangslage.',
  },
  {
    id: 'design',
    number: '02',
    label: 'Entwurf',
    eyebrow: 'Räume zeichnen',
    description:
      'Terrasse, Weg, Mauer und Beet ordnen Nutzung, Übergänge und Blickachsen.',
  },
  {
    id: 'build',
    number: '03',
    label: 'Umsetzung',
    eyebrow: 'Material fügen',
    description:
      'Unterbau, Kanten und Flächen entstehen in einer abgestimmten Baufolge.',
  },
  {
    id: 'result',
    number: '04',
    label: 'Ergebnis',
    eyebrow: 'Garten erleben',
    description:
      'Haus, Material und Pflanze verbinden sich zu einem ruhigen Lebensraum.',
  },
] as const;

const siteQuestions = [
  {
    number: '01',
    term: 'Alltag',
    description: 'Wer nutzt den Garten – und zu welchen Tageszeiten?',
  },
  {
    number: '02',
    term: 'Bestand',
    description: 'Was bleibt, was stört und was soll weiterwachsen?',
  },
  {
    number: '03',
    term: 'Standort',
    description: 'Wie verhalten sich Licht, Boden, Gefälle und Wasser?',
  },
  {
    number: '04',
    term: 'Entwicklung',
    description: 'Wie viel Pflege passt langfristig zum Garten?',
  },
] as const;

const seasons = [
  ['Frühjahr', 'Aufbau', 'Frische Triebe geben dem Garten Richtung.'],
  [
    'Sommer',
    'Blüte & Schatten',
    'Dichte Pflanzung formt kühle Aufenthaltsräume.',
  ],
  [
    'Herbst',
    'Struktur & Farbe',
    'Gräser und Gehölze tragen den späten Garten.',
  ],
  [
    'Winter',
    'Gerüst & Ruhe',
    'Samenstände und Kronen halten die räumliche Ordnung.',
  ],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function LeafMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M39 7C22 9 10 18 9 36c12 1 26-6 30-29Z" />
      <path d="M8 41c7-13 16-21 28-29" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <DemoBar concept="Grünraum · Garten- & Landschaftsbau · Signature" />
      <main
        className="gruenraum-signature"
        data-signature-page
        data-signature-brand="grünraum"
        data-signature-state="existing"
      >
        <SignatureRuntimeBridge />

        <section className="grs-hero" aria-labelledby="grs-title">
          <picture className="grs-hero-media">
            <source
              media="(max-width: 680px)"
              srcSet="/assets/signature/gruenraum/gruenraum-garden-hero-mobile.webp"
            />
            <img
              src="/assets/signature/gruenraum/gruenraum-garden-hero.webp"
              alt="Moderner Garten mit Natursteinterrasse, geschwungenem Weg und üppiger Bepflanzung bei warmem Abendlicht"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </picture>
          <div className="grs-hero-shade" aria-hidden="true" />

          <header className="grs-header">
            <a
              className="grs-brand"
              href="/konzept/galabau/"
              aria-label="GRÜNRAUM Core-Website"
            >
              <span>GRÜNRAUM</span>
              <small>Planen · Bauen · Entwickeln</small>
            </a>
            <nav aria-label="GRÜNRAUM Navigation">
              <a href="#projekt">Projektweg</a>
              <a href="/konzept/galabau/leistungen/">Leistungen</a>
              <a href="/konzept/galabau/gartenideen/">Gartenideen</a>
            </nav>
            <a className="grs-header-cta" href="/konzept/galabau/anfrage/">
              Projekt anfragen <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className="grs-hero-copy">
            <p className="grs-kicker grs-kicker--light">
              Aus Ideen wachsen Lebensräume
            </p>
            <h1 id="grs-title">
              Vom Ort
              <br />
              zum <em>Lebensraum.</em>
            </h1>
            <p className="grs-hero-lead">
              Wir planen und bauen Gärten, die Haus, Menschen und Landschaft
              selbstverständlich miteinander verbinden.
            </p>
            <div className="grs-hero-actions">
              <a className="grs-button grs-button--light" href="#projekt">
                Projektweg erleben <span aria-hidden="true">↓</span>
              </a>
              <a
                className="grs-text-link grs-text-link--light"
                href="/konzept/galabau/gartenideen/"
              >
                Gartenideen ansehen <Arrow />
              </a>
            </div>
          </div>

          <div className="grs-hero-principles" aria-label="Arbeitsweise">
            <span>Ort lesen</span>
            <i aria-hidden="true" />
            <span>Räume ordnen</span>
            <i aria-hidden="true" />
            <span>Wachsen lassen</span>
          </div>

          <a className="grs-scroll-cue" href="#ort">
            <span aria-hidden="true">↓</span>
            Den Ort verstehen
          </a>
        </section>

        <section className="grs-site" id="ort" aria-labelledby="grs-site-title">
          <div className="grs-shell grs-site-grid">
            <div className="grs-section-intro">
              <p className="grs-kicker">01 · Den Ort lesen</p>
              <h2 id="grs-site-title">
                Der Garten beginnt
                <br />
                <em>vor der ersten Linie.</em>
              </h2>
              <p>
                Ein guter Entwurf setzt nicht bei Formen an. Er beginnt mit dem
                Grundstück, dem Alltag seiner Bewohner und allem, was bereits da
                ist.
              </p>
            </div>

            <div className="grs-site-map" aria-hidden="true">
              <span className="grs-site-house">Haus</span>
              <span className="grs-site-sun">Licht</span>
              <span className="grs-site-water">Wasser</span>
              <span className="grs-site-tree">Bestand</span>
              <svg viewBox="0 0 620 620">
                <path
                  className="grs-contour grs-contour--one"
                  d="M65 457c75-94 81-188 51-280 130-83 280-85 438-6 17 117-23 229-120 337-142 52-265 35-369-51Z"
                />
                <path
                  className="grs-contour grs-contour--two"
                  d="M111 433c57-75 62-153 38-233 103-61 223-64 354-7 13 95-20 187-98 275-114 42-212 30-294-35Z"
                />
                <path
                  className="grs-contour grs-contour--three"
                  d="M161 405c39-55 43-113 27-173 75-43 161-45 255-4 8 69-16 136-73 200-82 30-152 22-209-23Z"
                />
                <path
                  className="grs-route"
                  d="M128 522c63-108 117-156 221-190 74-24 127-65 164-123"
                />
                <circle cx="128" cy="522" r="5" />
                <circle cx="513" cy="209" r="5" />
              </svg>
              <p>Jeder Ort gibt eine andere Richtung vor.</p>
            </div>

            <dl className="grs-site-questions">
              {siteQuestions.map((item) => (
                <div key={item.term}>
                  <span>{item.number}</span>
                  <dt>{item.term}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="grs-project"
          id="projekt"
          aria-labelledby="grs-project-title"
        >
          <div className="grs-project-heading grs-shell">
            <div>
              <p className="grs-kicker grs-kicker--light">
                02 · Räume entwickeln
              </p>
              <h2 id="grs-project-title">
                Ein Grundstück.
                <br />
                <em>Vier klare Schritte.</em>
              </h2>
            </div>
            <p>
              Wechseln Sie durch die Projektphasen. Planlinien, gebaute Elemente
              und Bepflanzung zeigen, wie aus dem Bestand ein zusammenhängender
              Außenraum wird.
            </p>
          </div>

          <div className="grs-project-stage">
            <picture className="grs-project-photo">
              <source
                media="(max-width: 680px)"
                srcSet="/assets/signature/gruenraum/gruenraum-garden-hero-mobile.webp"
              />
              <img
                src="/assets/signature/gruenraum/gruenraum-garden-hero.webp"
                alt="Gartenprojekt mit Terrasse, Natursteinmauer, Weg und Staudenbeeten"
                width="1536"
                height="1024"
                loading="lazy"
              />
            </picture>
            <GruenraumProjectViewer />

            <div
              className="grs-phase-controls"
              role="toolbar"
              aria-label="Projektphase auswählen"
            >
              {phases.map((phase) => (
                <button
                  type="button"
                  key={phase.id}
                  data-signature-state-target={phase.id}
                  data-signature-eyebrow={phase.eyebrow}
                  data-signature-description={phase.description}
                  aria-pressed={phase.id === 'existing'}
                  tabIndex={phase.id === 'existing' ? 0 : -1}
                >
                  <span>{phase.number}</span>
                  <strong>{phase.label}</strong>
                </button>
              ))}
            </div>

            <aside className="grs-phase-story" aria-live="polite">
              <p data-signature-stage-eyebrow>Den Ort lesen</p>
              <strong data-signature-stage-description>
                Licht, Boden, Höhen und gewachsene Strukturen bilden die
                belastbare Ausgangslage.
              </strong>
              <a href="/konzept/galabau/leistungen/">
                Planung kennenlernen <Arrow />
              </a>
            </aside>

            <p className="grs-concept-note">
              Interaktive Konzeptdarstellung · kein ausgeführtes Referenzprojekt
            </p>
          </div>
        </section>

        <section className="grs-craft" aria-labelledby="grs-craft-title">
          <div className="grs-shell grs-craft-grid">
            <div className="grs-craft-copy">
              <p className="grs-kicker grs-kicker--light">
                03 · Material fügen
              </p>
              <h2 id="grs-craft-title">
                Was später ruhig wirkt,
                <br />
                ist vorher <em>präzise gebaut.</em>
              </h2>
              <p>
                Unterbau, Gefälle und Anschlüsse verschwinden unter der
                sichtbaren Fläche. Für ein dauerhaft gutes Ergebnis sind genau
                diese Details entscheidend.
              </p>
              <a
                className="grs-text-link grs-text-link--light"
                href="/konzept/galabau/leistungen/#wege-terrassen"
              >
                Wege & Terrassen <Arrow />
              </a>
            </div>

            <figure className="grs-craft-photo">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/galabau/pflaster-detail-480.webp"
                />
                <source
                  media="(max-width: 1100px)"
                  srcSet="/images/galabau/pflaster-detail-960.webp"
                />
                <img
                  src="/images/galabau/pflaster-detail.webp"
                  alt="Gartenbauer setzt eine Natursteinkante entlang einer Pflasterfläche"
                  width="1448"
                  height="1086"
                  loading="lazy"
                />
              </picture>
              <figcaption>
                KI-Handwerksstudie · illustrative Ausführung
              </figcaption>
              <span className="grs-craft-index" aria-hidden="true">
                03
              </span>
            </figure>

            <dl className="grs-craft-details">
              <div>
                <dt>Tragfähigkeit</dt>
                <dd>
                  Der Aufbau folgt der späteren Nutzung – nicht nur der
                  sichtbaren Oberfläche.
                </dd>
              </div>
              <div>
                <dt>Wasser</dt>
                <dd>
                  Gefälle und versickerungsfähige Bereiche werden von Anfang an
                  mitgedacht.
                </dd>
              </div>
              <div>
                <dt>Übergänge</dt>
                <dd>
                  Haus, Fläche, Beet und vorhandene Höhen treffen sauber
                  aufeinander.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="grs-growth" aria-labelledby="grs-growth-title">
          <div className="grs-shell grs-growth-grid">
            <div className="grs-growth-heading">
              <p className="grs-kicker">04 · Wachsen lassen</p>
              <h2 id="grs-growth-title">
                Was heute gesetzt wird,
                <br />
                <em>verändert sich jedes Jahr.</em>
              </h2>
              <p>
                Standortgerechte Stauden, Gräser und Gehölze geben dem Garten
                Struktur. Blüte, Schatten, Wasserbedarf und Pflege werden schon
                bei der Auswahl mitgedacht.
              </p>
            </div>

            <figure className="grs-growth-photo">
              <picture>
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/galabau/regengarten-480.webp"
                />
                <source
                  media="(max-width: 1100px)"
                  srcSet="/images/galabau/regengarten-960.webp"
                />
                <img
                  src="/images/galabau/regengarten.webp"
                  alt="Klimaorientierter Regengarten mit Gräsern, Stauden, Kiesweg und offenem Wasserlauf"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </picture>
              <figcaption>
                KI-Konzeptgarten · keine ausgeführte Referenz
              </figcaption>
            </figure>

            <ol className="grs-seasons" aria-label="Der Garten im Jahreslauf">
              {seasons.map(([season, title, description], index) => (
                <li key={season}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p>{season}</p>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grs-life" aria-labelledby="grs-life-title">
          <picture className="grs-life-photo">
            <source
              media="(max-width: 640px)"
              srcSet="/images/galabau/garten-480.webp"
            />
            <source
              media="(max-width: 1100px)"
              srcSet="/images/galabau/garten-960.webp"
            />
            <img
              src="/images/galabau/garten.webp"
              alt="Eingewachsener Wohngarten mit Natursteinterrasse, Baum und dicht bepflanzten Beeten"
              width="1536"
              height="1024"
              loading="lazy"
            />
          </picture>
          <div className="grs-life-shade" aria-hidden="true" />
          <div className="grs-shell grs-life-content">
            <div>
              <p className="grs-kicker grs-kicker--light">
                05 · Garten im Alltag
              </p>
              <h2 id="grs-life-title">
                Nicht für den ersten Blick.
                <br />
                <em>Für viele Jahre.</em>
              </h2>
            </div>
            <ul>
              <li>
                <span>07:42</span> Morgensonne auf der Terrasse.
              </li>
              <li>
                <span>14:10</span> Schatten unter dem mehrstämmigen Baum.
              </li>
              <li>
                <span>18:35</span> Ein Weg, der selbstverständlich zum Sitzplatz
                führt.
              </li>
              <li>
                <span>Jahr 04</span> Pflanzen, die inzwischen selbst Raum
                bilden.
              </li>
            </ul>
            <p className="grs-life-note">
              Gestalterische Alltagsszenen · keine behaupteten Live- oder
              Referenzdaten
            </p>
          </div>
        </section>

        <section className="grs-services" aria-labelledby="grs-services-title">
          <div className="grs-shell">
            <div className="grs-services-heading">
              <p className="grs-kicker">06 · Alles greift ineinander</p>
              <h2 id="grs-services-title">Planen. Bauen. Weiterentwickeln.</h2>
              <p>
                Drei Leistungsbereiche, ein Garten als Ganzes. Jeder Schritt
                baut auf dem vorherigen auf.
              </p>
            </div>
            <nav className="grs-service-paths" aria-label="Leistungsbereiche">
              <a href="/konzept/galabau/leistungen/#gartengestaltung">
                <span>01</span>
                <strong>Gartengestaltung</strong>
                <small>Räume, Blickachsen und Nutzung ordnen.</small>
                <Arrow />
              </a>
              <a href="/konzept/galabau/leistungen/#wege-terrassen">
                <span>02</span>
                <strong>Wege & Terrassen</strong>
                <small>Belastbare Flächen sauber ausführen.</small>
                <Arrow />
              </a>
              <a href="/konzept/galabau/leistungen/#pflanzung-pflege">
                <span>03</span>
                <strong>Pflanzung & Pflege</strong>
                <small>Struktur über Jahre weiterentwickeln.</small>
                <Arrow />
              </a>
            </nav>
          </div>
        </section>

        <section className="grs-contact" aria-labelledby="grs-contact-title">
          <div className="grs-contact-mark" aria-hidden="true">
            <LeafMark />
          </div>
          <div className="grs-shell grs-contact-grid">
            <p className="grs-kicker grs-kicker--light">
              07 · Der erste Schritt
            </p>
            <h2 id="grs-contact-title">
              Was darf draußen
              <br />
              <em>entstehen?</em>
            </h2>
            <div className="grs-contact-copy">
              <p>
                Erzählen Sie kurz vom Grundstück, Ihren Wünschen und dem
                gewünschten Zeitraum. Wenige Angaben reichen für einen ersten
                Überblick.
              </p>
              <div className="grs-contact-actions">
                <a
                  className="grs-button grs-button--light"
                  href="/konzept/galabau/anfrage/"
                >
                  Garten beschreiben <span aria-hidden="true">→</span>
                </a>
                <a
                  className="grs-text-link grs-text-link--light"
                  href="/konzept/galabau/gartenideen/"
                >
                  Gartenideen ansehen <Arrow />
                </a>
              </div>
              <small>
                Unverbindliche Erstaufnahme eines fiktiven Gartenprojekts
              </small>
            </div>
          </div>
        </section>

        <footer className="grs-footer">
          <div className="grs-shell">
            <a className="grs-footer-brand" href="/konzept/galabau/">
              GRÜNRAUM
            </a>
            <span>Planung · Ausführung · Pflege</span>
            <nav aria-label="GRÜNRAUM Footer-Navigation">
              <a href="/konzept/galabau/">Core-Website</a>
              <a href="/konzept/galabau/leistungen/">Leistungen</a>
              <a href="/konzept/galabau/anfrage/">Anfrage</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
