/* oxlint-disable nextjs/no-html-link-for-pages -- Native links keep the static Pages export self-contained. */
/* oxlint-disable nextjs/no-img-element -- Local WebP assets are optimized offline and served responsively. */
'use client';

import { useState } from 'react';

type Mode = 'tennis' | 'badminton';
type ScheduleFilter = 'alle' | Mode | 'jugend';

const sport = {
  tennis: {
    label: 'Tennis',
    eyebrow: 'Heute · Court 03',
    time: '17:30',
    session: 'Startklar',
    detail: 'Techniktraining · Einsteiger',
    image: 'tennis',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Zwei erwachsene Vereinsmitglieder bei einem Tennisballwechsel auf einem roten Sandplatz',
    cta: 'Tennis ausprobieren',
  },
  badminton: {
    label: 'Badminton',
    eyebrow: 'Heute · Halle 02',
    time: '18:00',
    session: 'Freies Doppel',
    detail: 'Offenes Spiel · Erwachsene',
    image: 'badminton',
    imageWidth: 1536,
    imageHeight: 1024,
    alt: 'Vereinsspieler bei einem dynamischen Badminton-Doppel in einer hellen Sporthalle',
    cta: 'Badminton ausprobieren',
  },
} as const;

const sessions: Array<{
  day: string;
  date: string;
  time: string;
  title: string;
  detail: string;
  tags: ScheduleFilter[];
}> = [
  {
    day: 'DI',
    date: '22.09.',
    time: '18:00',
    title: 'Freies Doppel',
    detail: 'Badminton · Erwachsene',
    tags: ['badminton'],
  },
  {
    day: 'MI',
    date: '23.09.',
    time: '17:30',
    title: 'Startklar',
    detail: 'Tennis · Einsteiger',
    tags: ['tennis'],
  },
  {
    day: 'DO',
    date: '24.09.',
    time: '18:30',
    title: 'Mannschaft',
    detail: 'Tennis · Erwachsene',
    tags: ['tennis'],
  },
  {
    day: 'FR',
    date: '25.09.',
    time: '16:00',
    title: 'Junge Schläger',
    detail: 'Tennis & Badminton · 10–16 Jahre',
    tags: ['tennis', 'badminton', 'jugend'],
  },
  {
    day: 'SO',
    date: '27.09.',
    time: '10:00',
    title: 'Offener Court',
    detail: 'Beide Sportarten · alle Level',
    tags: ['tennis', 'badminton'],
  },
];

const pathway = [
  [
    '01',
    'Erster Rally',
    'Schläger leihen, Spielgefühl testen, Menschen treffen.',
  ],
  ['02', 'Training', 'Technik aufbauen und eine feste Gruppe finden.'],
  ['03', 'Freies Spiel', 'Courts nutzen, Partner finden, Rhythmus entwickeln.'],
  ['04', 'Team', 'Spieltage, Liga und Verantwortung im Club übernehmen.'],
] as const;

function SportPicture({
  name,
  alt,
  width,
  height,
  className,
  eager = false,
}: {
  name: 'tennis' | 'badminton' | 'gemeinschaft';
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
        srcSet={`/images/sportverein/${name}-480.webp`}
      />
      <source
        media="(max-width: 1080px)"
        srcSet={`/images/sportverein/${name}-960.webp`}
      />
      <img
        src={`/images/sportverein/${name}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
    </picture>
  );
}

export function AufschlagSignatureExperience() {
  const [mode, setMode] = useState<Mode>('tennis');
  const [filter, setFilter] = useState<ScheduleFilter>('alle');
  const current = sport[mode];
  const returnCurrent = mode === 'tennis' ? sport.badminton : sport.tennis;

  function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    setFilter(nextMode);
  }

  return (
    <div
      className="aufschlag-signature"
      data-mode={mode}
      data-signature-page
      data-signature-brand="aufschlag"
    >
      <a className="as-skip" href="#aufschlag-main">
        Zum Inhalt
      </a>

      <header className="as-header">
        <a
          className="as-brand"
          href="/konzept/sportverein/signature/"
          aria-label="AUFSCHLAG Signature Startseite"
        >
          <span className="as-brand-mark" aria-hidden="true" />
          <span>AUFSCHLAG</span>
          <small>Tennis · Badminton · Club</small>
        </a>
        <nav className="as-nav" aria-label="Signature Navigation">
          <a href="#heute">Heute</a>
          <a href="#training">Training</a>
          <a href="#club">Club</a>
          <a className="as-nav-core" href="/konzept/sportverein/">
            Core ansehen
          </a>
        </nav>
        <a className="as-header-cta" href="/konzept/sportverein/probetraining/">
          Probetraining <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="aufschlag-main">
        <section className="as-hero" id="heute" aria-labelledby="as-hero-title">
          <div className="as-hero-copy">
            <p className="as-overline">The rally · No. 01</p>
            <h1 id="as-hero-title">
              Zwei Flugbahnen.<span>Ein Club.</span>
            </h1>
            <p className="as-hero-intro">
              Tennis draußen, Badminton drinnen. Dazwischen ein Club, der aus
              Training echte Spielpartner und aus Spielpartnern ein Team macht.
            </p>
            <div className="as-mode-switch" aria-label="Sportart auswählen">
              {(Object.keys(sport) as Mode[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  data-as-mode={item}
                  aria-pressed={mode === item}
                  onClick={() => chooseMode(item)}
                >
                  <span>{item === 'tennis' ? '01' : '02'}</span>
                  {sport[item].label}
                </button>
              ))}
            </div>
          </div>

          <div className="as-hero-visual">
            <SportPicture
              name={current.image}
              alt={current.alt}
              width={current.imageWidth}
              height={current.imageHeight}
              eager
            />
            <p className="as-visual-label" data-as-visual-label>
              {mode === 'tennis' ? 'Sand · Außenplatz' : 'Parkett · Sporthalle'}
            </p>
          </div>

          <aside
            className="as-now"
            aria-label={`Nächstes ${current.label}-Training`}
            aria-live="polite"
          >
            <div>
              <span data-as-now-eyebrow>{current.eyebrow}</span>
              <strong data-as-now-time>{current.time}</strong>
            </div>
            <div>
              <b data-as-now-session>{current.session}</b>
              <span data-as-now-detail>{current.detail}</span>
            </div>
            <a
              data-as-now-cta
              href={`/konzept/sportverein/probetraining/?sport=${current.label}`}
            >
              {current.cta} <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </section>

        <section className="as-return" aria-labelledby="as-return-title">
          <SportPicture
            className="as-return-photo"
            name={returnCurrent.image}
            alt={returnCurrent.alt}
            width={returnCurrent.imageWidth}
            height={returnCurrent.imageHeight}
          />
          <div className="as-return-word" aria-hidden="true">
            RETURN
          </div>
          <div className="as-return-copy">
            <p className="as-overline">Jeder Punkt beginnt neu</p>
            <h2 id="as-return-title">Zwei Courts. Ein Rhythmus.</h2>
          </div>
          <div className="as-return-mark" aria-hidden="true">
            <span>0</span>
            <span>0</span>
          </div>
        </section>

        <section
          className="as-week"
          id="training"
          aria-labelledby="as-week-title"
        >
          <header className="as-section-head">
            <div>
              <p className="as-overline">Diese Woche · Beispielplan</p>
              <h2 id="as-week-title">Was passiert heute?</h2>
            </div>
            <p>
              Kein anonymer Kurskatalog. Du siehst Sportart, Gruppe und Level –
              und fragst deinen Platz direkt an.
            </p>
          </header>

          <div className="as-filters" aria-label="Trainingsplan filtern">
            {(
              ['alle', 'tennis', 'badminton', 'jugend'] as ScheduleFilter[]
            ).map((item) => (
              <button
                type="button"
                key={item}
                data-as-filter={item}
                aria-pressed={filter === item}
                onClick={() => {
                  setFilter(item);
                  if (item === 'tennis' || item === 'badminton') setMode(item);
                }}
              >
                {item === 'alle'
                  ? 'Alle Termine'
                  : item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <div className="as-schedule">
            <div className="as-schedule-labels" aria-hidden="true">
              <span>Tag</span>
              <span>Zeit</span>
              <span>Training</span>
              <span>Aktion</span>
            </div>
            {sessions.map((session) => {
              const visible =
                filter === 'alle' || session.tags.includes(filter);
              return (
                <article
                  key={`${session.day}-${session.time}`}
                  data-as-tags={session.tags.join(' ')}
                  hidden={!visible}
                >
                  <div className="as-day">
                    <strong>{session.day}</strong>
                    <span>{session.date}</span>
                  </div>
                  <time>{session.time}</time>
                  <div className="as-session">
                    <h3>{session.title}</h3>
                    <p>{session.detail}</p>
                  </div>
                  <a
                    href={`/konzept/sportverein/probetraining/?sport=${session.tags[0]}`}
                  >
                    Platz anfragen <span aria-hidden="true">↗</span>
                  </a>
                </article>
              );
            })}
          </div>
          <footer className="as-week-note">
            <span>
              Demonstrationsdaten · aktuelle Zeiten bitte beim Verein erfragen
            </span>
            <a href="/konzept/sportverein/training/">
              Kompletten Core-Trainingsplan öffnen →
            </a>
          </footer>
        </section>

        <section className="as-path" aria-labelledby="as-path-title">
          <header>
            <p className="as-overline">Find your game</p>
            <h2 id="as-path-title">Vom ersten Rally bis ins Team.</h2>
          </header>
          <ol>
            {pathway.map(([number, title, text], index) => (
              <li key={number}>
                <span className="as-path-dot" aria-hidden="true" />
                <span className="as-path-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {index === 0 ? <em>Dein Start</em> : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="as-details" aria-labelledby="as-details-title">
          <header className="as-section-head">
            <div>
              <p className="as-overline">Close to the game</p>
              <h2 id="as-details-title">Nähe macht den Unterschied.</h2>
            </div>
            <p>
              Nicht die Kulisse steht im Mittelpunkt, sondern der Moment:
              Absprung, Treffpunkt, Blickkontakt und der nächste gemeinsame
              Punkt.
            </p>
          </header>
          <div className="as-detail-grid">
            <figure className="as-detail-main">
              <SportPicture
                name="badminton"
                alt="Badmintonspieler beim Absprung kurz vor dem Schlag"
                width={1536}
                height={1024}
              />
              <figcaption>
                <span>01</span> Absprung · Badminton
              </figcaption>
            </figure>
            <figure className="as-detail-crop as-detail-crop-tennis">
              <SportPicture
                name="tennis"
                alt="Tennisspieler im Ballwechsel am Netz"
                width={1448}
                height={1086}
              />
              <figcaption>
                <span>02</span> Treffpunkt · Tennis
              </figcaption>
            </figure>
            <div className="as-detail-quote">
              <span aria-hidden="true">“</span>
              <blockquote>
                Das gute Spiel beginnt, wenn niemand mehr allein trainiert.
              </blockquote>
              <p>AUFSCHLAG Clubgedanke</p>
            </div>
          </div>
        </section>

        <section
          className="as-community"
          id="club"
          aria-labelledby="as-community-title"
        >
          <div className="as-community-photo">
            <SportPicture
              name="gemeinschaft"
              alt="Erwachsene Vereinsmitglieder verschiedener Altersgruppen im Gespräch auf der Clubterrasse"
              width={1536}
              height={1024}
            />
            <span>Nach dem Spiel · Clubterrasse</span>
          </div>
          <div className="as-community-copy">
            <p className="as-overline">Between rallies</p>
            <h2 id="as-community-title">Der Club beginnt nach dem Match.</h2>
            <p>
              Gemeinschaft wird nicht behauptet. Sie passiert zwischen zwei
              Trainings, am langen Tisch und bei den Terminen, die alle Level
              verbinden.
            </p>
            <ul>
              <li>
                <time>FR · 19:30</time>
                <span>Open Court & Abendbrot</span>
              </li>
              <li>
                <time>SO · 12:00</time>
                <span>Mixed Rally mit Jugendteam</span>
              </li>
              <li>
                <time>1× / Monat</time>
                <span>Schlägerwerkstatt im Clubhaus</span>
              </li>
            </ul>
            <a className="as-text-link" href="/konzept/sportverein/verein/">
              Den Verein kennenlernen <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="as-next" aria-labelledby="as-next-title">
          <p className="as-overline">Next serve</p>
          <div>
            <h2 id="as-next-title">Dein erster Aufschlag?</h2>
            <a href="/konzept/sportverein/probetraining/">
              Probetraining anfragen <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="as-next-note">
            Tennis · Badminton · Schläger können für den ersten Termin
            ausgeliehen werden.
          </p>
        </section>
      </main>

      <footer className="as-footer">
        <a className="as-brand" href="/konzept/sportverein/signature/">
          <span className="as-brand-mark" aria-hidden="true" />
          <span>AUFSCHLAG</span>
        </a>
        <p>Sport. Menschen. Club.</p>
        <div>
          <a href="/konzept/sportverein/training/">Training</a>
          <a href="/konzept/sportverein/verein/">Verein</a>
          <a href="/konzept/sportverein/">Core</a>
        </div>
      </footer>
    </div>
  );
}
