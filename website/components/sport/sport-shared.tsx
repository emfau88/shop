/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
/* oxlint-disable nextjs/no-img-element -- Local WebP assets are optimized offline and include dimensions. */
import { SportNavigation } from './sport-navigation';

export const sportBase = '/konzept/sportverein/';

const images = {
  badminton: { file: 'badminton.webp', width: 1536, height: 1024 },
  tennis: { file: 'tennis.webp', width: 1448, height: 1086 },
  gemeinschaft: { file: 'gemeinschaft.webp', width: 1536, height: 1024 },
} as const;

export function SportPhoto({
  name,
  alt,
  caption = 'KI-Sportfotografie · fiktives Vereinskonzept',
  priority = false,
}: {
  name: keyof typeof images;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const image = images[name];
  return (
    <figure className={`sport-photo sport-photo-${name}`}>
      <img
        src={`/images/sportverein/${image.file}`}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function SportLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={secondary ? 'sport-link is-secondary' : 'sport-link'}
      href={href}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function SportFooter() {
  return (
    <footer className="sport-footer">
      <div className="sport-wrap sport-footer-inner">
        <a className="sport-footer-brand" href={sportBase}>
          AUFSCHLAG
        </a>
        <span>Fiktives Konzept für einen lokalen Schlägersportverein</span>
        <div>
          <a href="/konzepte/">Alle Konzepte</a>
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

export function SportShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div data-theme="sport">
      <SportNavigation active={active} />
      <main id="inhalt">{children}</main>
      <SportFooter />
    </div>
  );
}

export function SportTrialStrip() {
  return (
    <section className="sport-trial-strip">
      <div className="sport-wrap sport-trial-grid">
        <div>
          <p className="sport-kicker">Einfach ausprobieren</p>
          <h2>Dein erster Ballwechsel wartet.</h2>
        </div>
        <div>
          <p>
            Wähle deine Sportart und erzähle kurz, was du schon mitbringst. Der
            Demo-Ablauf zeigt, wie Interessierte ohne Umwege zum passenden
            Training finden.
          </p>
          <SportLink href={sportBase + 'probetraining/'}>
            Probetraining anfragen
          </SportLink>
          <small>Formularsimulation · es werden keine Daten versendet</small>
        </div>
      </div>
    </section>
  );
}
