/* oxlint-disable nextjs/no-html-link-for-pages -- Native links keep the static Pages export self-contained. */
/* oxlint-disable nextjs/no-img-element -- Local responsive images are pre-optimized WebP files. */
'use client';

import { useState, type KeyboardEvent } from 'react';

type Occasion = 'family' | 'wedding' | 'business' | 'rooms';

type OccasionData = {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  configuration: string;
  detail: string;
  cta: string;
  href: string;
  image: string;
  mobileImage: string;
  tabletImage: string;
  alt: string;
  width: number;
  height: number;
};

const occasions: Record<Occasion, OccasionData> = {
  family: {
    label: 'Familienfeier',
    eyebrow: 'Vertraut zusammenkommen',
    title: 'Ein Tisch für alle Generationen.',
    description:
      'Eine lange Tafel, Essen zum Teilen und genug Zeit für die Gespräche zwischen den Gängen.',
    configuration: 'Lange Tafel · Beispiel bis 30 Personen',
    detail: 'Menü oder geteilte Gerichte',
    cta: 'Familienfeier anfragen',
    href: '/konzept/gastronomie/reservieren/?anlass=Familienfeier',
    image: '/images/gastronomie/gesellschaft.webp',
    mobileImage: '/images/gastronomie/gesellschaft-480.webp',
    tabletImage: '/images/gastronomie/gesellschaft-960.webp',
    alt: 'Erwachsene Gäste verschiedener Generationen an einer langen Tafel',
    width: 1536,
    height: 1024,
  },
  wedding: {
    label: 'Hochzeit',
    eyebrow: 'Festlich, nicht steif',
    title: 'Ein besonderer Tag mit Raum zum Ankommen.',
    description:
      'Kerzenlicht, eine persönlich gedeckte Tafel und ein Ablauf, der zum Paar statt zu einem Schema passt.',
    configuration: 'Festliche Tafel · Beispielkonfiguration',
    detail: 'Raum, Menü und Ablauf gemeinsam geplant',
    cta: 'Hochzeit besprechen',
    href: '/konzept/gastronomie/reservieren/?anlass=Hochzeit',
    image: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    mobileImage:
      '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
    tabletImage: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    alt: 'Festlich gedeckte Eichentafel in einem warm beleuchteten Restaurant',
    width: 1680,
    height: 1260,
  },
  business: {
    label: 'Firmenabend',
    eyebrow: 'Begegnung mit Charakter',
    title: 'Ein ruhiger Rahmen für gute Gespräche.',
    description:
      'Offene Küche, flexible Tischgruppen und ein Menü, das den Abend zusammenhält, ohne ihn zu dominieren.',
    configuration: 'Tischgruppen · Beispielkonfiguration',
    detail: 'Für Teams, Kundschaft und Jubiläen',
    cta: 'Firmenabend planen',
    href: '/konzept/gastronomie/reservieren/?anlass=Geschäftsessen',
    image: '/images/gastronomie/gastraum.webp',
    mobileImage: '/images/gastronomie/gastraum-480.webp',
    tabletImage: '/images/gastronomie/gastraum-960.webp',
    alt: 'Warm beleuchteter Gastraum mit offener Küche und erwachsenen Gästen',
    width: 1536,
    height: 1024,
  },
  rooms: {
    label: 'Unsere Räume',
    eyebrow: 'Haus mit Möglichkeiten',
    title: 'Gaststube, Garten und die lange Tafel.',
    description:
      'Jeder Bereich hat einen eigenen Rhythmus. Gemeinsam bleiben natürliche Materialien, warmes Licht und die Nähe zur Küche.',
    configuration: 'Verschiedene Bereiche · unverbindliches Beispiel',
    detail: 'Gaststube · Garten · Gesellschaft',
    cta: 'Räume kennenlernen',
    href: '/konzept/gastronomie/haus/',
    image: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    mobileImage:
      '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
    tabletImage: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    alt: 'Warmer Restaurantbereich mit gedeckter Tafel, Holz und Naturstein',
    width: 1680,
    height: 1260,
  },
};

const occasionOrder = Object.keys(occasions) as Occasion[];

const dishes = [
  ['Geröstete Karotte', 'Molke · Haselnuss · Gartenkräuter', '12'],
  ['Geschmorte Rinderbacke', 'Wurzelgemüse · Kartoffel', '28'],
  ['Gebratener Saibling', 'Fenchel · Dill · Zitronenbutter', '26'],
  ['Gerösteter Sellerie', 'Linsen · Birne · Walnuss', '22'],
  ['Ofenapfel', 'Vanille · Buchweizen · Karamell', '10'],
] as const;

function GastroPicture({
  name,
  alt,
  width,
  height,
  className,
  eager = false,
}: {
  name: 'gastraum' | 'gericht' | 'gesellschaft';
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source
        media="(max-width: 520px)"
        srcSet={`/images/gastronomie/${name}-480.webp`}
      />
      <source
        media="(max-width: 1080px)"
        srcSet={`/images/gastronomie/${name}-960.webp`}
      />
      <img
        src={`/images/gastronomie/${name}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </picture>
  );
}

function OccasionPicture({ occasion }: { occasion: OccasionData }) {
  return (
    <picture className="lw-occasion-picture" data-lw-occasion-picture>
      <source media="(max-width: 520px)" srcSet={occasion.mobileImage} />
      <source media="(max-width: 1080px)" srcSet={occasion.tabletImage} />
      <img
        src={occasion.image}
        alt={occasion.alt}
        width={occasion.width}
        height={occasion.height}
        loading="lazy"
      />
    </picture>
  );
}

export function LindenwirtSignatureExperience() {
  const [occasion, setOccasion] = useState<Occasion>('family');
  const current = occasions[occasion];

  const handleOccasionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    item: Occasion,
  ) => {
    const index = occasionOrder.indexOf(item);
    let nextIndex: number | undefined;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % occasionOrder.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + occasionOrder.length) % occasionOrder.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = occasionOrder.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextOccasion = occasionOrder[nextIndex];
    setOccasion(nextOccasion);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-lw-occasion="${nextOccasion}"]`)
      ?.focus();
  };

  return (
    <div
      className="lindenwirt-signature"
      data-occasion={occasion}
      data-signature-page
      data-signature-brand="lindenwirt"
    >
      <a className="lw-skip" href="#lindenwirt-main">
        Zum Inhalt
      </a>

      <header className="lw-header">
        <a
          className="lw-brand"
          href="/konzept/gastronomie/signature/"
          aria-label="LINDENWIRT Signature Startseite"
        >
          <span className="lw-brand-leaf" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>LINDENWIRT</span>
          <small>Genießen · Feiern · Ankommen</small>
        </a>
        <nav className="lw-nav" aria-label="Signature Navigation">
          <a href="#karte">Karte</a>
          <a href="#anlaesse">Anlässe</a>
          <a href="#haus">Haus</a>
          <a className="lw-nav-core" href="/konzept/gastronomie/">
            Core ansehen
          </a>
        </nav>
        <a className="lw-header-cta" href="/konzept/gastronomie/reservieren/">
          Tisch anfragen <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="lindenwirt-main">
        <section className="lw-hero" aria-labelledby="lw-hero-title">
          <div className="lw-hero-copy">
            <p className="lw-overline">Ein Abend im Lindenwirt</p>
            <h1 id="lw-hero-title">
              Ankommen.<span>Teilen.</span>Bleiben.
            </h1>
            <p className="lw-hero-intro">
              Regionale Küche, ein offenes Feuer und Tische, an denen der Abend
              nicht nach dem letzten Gang enden muss.
            </p>
            <div className="lw-hero-actions">
              <a href="/konzept/gastronomie/reservieren/">
                Tisch anfragen <span aria-hidden="true">↗</span>
              </a>
              <a href="/konzept/gastronomie/speisekarte/">Abendkarte ansehen</a>
            </div>
          </div>
          <div className="lw-hero-media">
            <GastroPicture
              name="gastraum"
              alt="Belebter, warm beleuchteter Gastraum mit offener Feuerküche"
              width={1536}
              height={1024}
              eager
            />
            <p>Offene Küche · früher Abend</p>
          </div>
          <aside
            className="lw-tonight"
            aria-label="Heutige Öffnungsinformation"
          >
            <div>
              <span>Heute geöffnet</span>
              <strong>17–23 Uhr</strong>
            </div>
            <div>
              <span>Mitten in der Altstadt</span>
              <strong>Marktgasse 12 · Beispielstadt</strong>
            </div>
            <p>Fiktive Demonstrationsangaben</p>
          </aside>
        </section>

        <section className="lw-menu" id="karte" aria-labelledby="lw-menu-title">
          <header className="lw-section-head">
            <div>
              <p className="lw-overline">Heute auf dem Tisch</p>
              <h2 id="lw-menu-title">Eine kurze Karte. Viele gute Gründe.</h2>
            </div>
            <p>
              Saison, Ernte und Fang geben den Takt vor. Die Karte bleibt
              bewusst überschaubar – als fiktives Beispiel für dieses Konzept.
            </p>
          </header>
          <div className="lw-menu-layout">
            <figure className="lw-dish-photo">
              <GastroPicture
                name="gericht"
                alt="Saisonal angerichtetes Hauptgericht mit Rind, Wurzelgemüse und Kräutern"
                width={1448}
                height={1086}
              />
              <figcaption>
                <span>Aus der Abendkarte</span>Handwerklich · saisonal · ohne
                steife Inszenierung
              </figcaption>
            </figure>
            <div className="lw-dish-list">
              {dishes.map(([name, description, price], index) => (
                <article key={name}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                  <strong>{price} €</strong>
                </article>
              ))}
              <footer>
                <span>Beispielkarte · Angaben ohne Gewähr</span>
                <a href="/konzept/gastronomie/speisekarte/">
                  Vollständige Karte <span aria-hidden="true">↗</span>
                </a>
              </footer>
            </div>
          </div>
        </section>

        <section className="lw-kitchen" aria-labelledby="lw-kitchen-title">
          <div className="lw-kitchen-media">
            <GastroPicture
              name="gastraum"
              alt="Blick durch den Gastraum zur offenen Küche mit Holzfeuer"
              width={1536}
              height={1024}
            />
            <span>Offenes Feuer · offene Küche</span>
          </div>
          <div className="lw-kitchen-copy">
            <p className="lw-overline">Aus der Küche</p>
            <h2 id="lw-kitchen-title">Vertraut gekocht. Frisch gedacht.</h2>
            <p>
              Kein Herkunftstheater, keine überladene Karte. Stattdessen klare
              Aromen, gute Produkte und Gerichte, die auch ohne lange Erklärung
              funktionieren.
            </p>
            <dl>
              <div>
                <dt>01</dt>
                <dd>Kurze, saisonale Auswahl</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Vegetarisch als eigenes Gericht</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Persönliche Beratung bei Allergenen</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="lw-occasions"
          id="anlaesse"
          aria-labelledby="lw-occasions-title"
        >
          <header className="lw-occasion-heading">
            <p className="lw-overline">Der Tisch passt sich an</p>
            <h2 id="lw-occasions-title">Ein Haus. Unterschiedliche Abende.</h2>
          </header>
          <div className="lw-occasion-stage">
            <div className="lw-occasion-controls" aria-label="Anlass auswählen">
              {occasionOrder.map((item, index) => (
                <button
                  type="button"
                  key={item}
                  data-lw-occasion={item}
                  aria-pressed={occasion === item}
                  onClick={() => setOccasion(item)}
                  onKeyDown={(event) => handleOccasionKeyDown(event, item)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {occasions[item].label}
                </button>
              ))}
            </div>
            <div className="lw-occasion-media">
              <OccasionPicture occasion={current} />
              <span className="lw-occasion-image-label">
                Beispielinszenierung
              </span>
            </div>
            <article className="lw-occasion-copy" aria-live="polite">
              <p data-lw-eyebrow>{current.eyebrow}</p>
              <h3 data-lw-title>{current.title}</h3>
              <p data-lw-description>{current.description}</p>
              <dl>
                <div>
                  <dt>Raum</dt>
                  <dd data-lw-configuration>{current.configuration}</dd>
                </div>
                <div>
                  <dt>Abend</dt>
                  <dd data-lw-detail>{current.detail}</dd>
                </div>
              </dl>
              <a data-lw-cta href={current.href}>
                <span data-lw-cta-label>{current.cta}</span>{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
          <p className="lw-occasion-note">
            Kapazitäten und Konfigurationen sind unverbindliche
            Demonstrationsangaben.
          </p>
        </section>

        <section className="lw-close" aria-labelledby="lw-close-title">
          <header>
            <p className="lw-overline">Nah am Tisch</p>
            <h2 id="lw-close-title">Die leisen Dinge machen den Abend.</h2>
          </header>
          <figure>
            <GastroPicture
              name="gericht"
              alt="Nahaufnahme von Keramikteller, saisonalem Gericht und natürlichem Leinen"
              width={1448}
              height={1086}
            />
            <figcaption>
              <span>Keramik</span>
              <span>Leinen</span>
              <span>Eichenholz</span>
              <span>Kräuter</span>
            </figcaption>
          </figure>
          <blockquote>
            Gute Gastlichkeit beginnt, bevor der erste Teller den Tisch
            erreicht.
          </blockquote>
        </section>

        <section
          className="lw-gathering"
          id="haus"
          aria-labelledby="lw-gathering-title"
        >
          <div className="lw-gathering-photo">
            <GastroPicture
              name="gesellschaft"
              alt="Entspannte Gesellschaft beim gemeinsamen Essen an einer langen Tafel"
              width={1536}
              height={1024}
            />
            <time dateTime="19:48">19:48 · der Hauptgang ist serviert</time>
          </div>
          <div className="lw-gathering-copy">
            <p className="lw-overline">Wenn der Tisch länger wird</p>
            <h2 id="lw-gathering-title">
              Aus einem Essen wird ein gemeinsamer Abend.
            </h2>
            <p>
              Service, Küche und Raum halten sich nicht im Vordergrund. Sie
              schaffen den Rahmen, in dem Gespräche länger und Tische voller
              werden dürfen.
            </p>
            <ul>
              <li>
                <span>Gaststube</span>
                <strong>Nah an Feuer und Küche</strong>
              </li>
              <li>
                <span>Garten</span>
                <strong>Geschützt unter Bäumen</strong>
              </li>
              <li>
                <span>Gesellschaft</span>
                <strong>Eine lange Tafel für den Anlass</strong>
              </li>
            </ul>
            <a href="/konzept/gastronomie/haus/">
              Das Haus kennenlernen <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="lw-reserve" aria-labelledby="lw-reserve-title">
          <p className="lw-overline">Der nächste Tisch</p>
          <div>
            <h2 id="lw-reserve-title">Ein Tisch für heute?</h2>
            <a href="/konzept/gastronomie/reservieren/">
              Tisch anfragen <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl>
            <div>
              <dt>Heute</dt>
              <dd>17–23 Uhr</dd>
            </div>
            <div>
              <dt>Ort</dt>
              <dd>Marktgasse 12 · Beispielstadt</dd>
            </div>
            <div>
              <dt>Hinweis</dt>
              <dd>Fiktives Konzept · keine Live-Reservierung</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="lw-footer">
        <a className="lw-brand" href="/konzept/gastronomie/signature/">
          <span>LINDENWIRT</span>
          <small>Genießen · Feiern · Ankommen</small>
        </a>
        <p>Regionale Küche. Gute Gesellschaft.</p>
        <div>
          <a href="/konzept/gastronomie/speisekarte/">Speisekarte</a>
          <a href="/konzept/gastronomie/feiern/">Feiern</a>
          <a href="/konzept/gastronomie/">Core</a>
        </div>
      </footer>
    </div>
  );
}
