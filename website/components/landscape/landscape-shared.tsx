/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- Local WebP assets are optimized offline and include explicit dimensions. */
import { LandscapeNavigation } from './landscape-navigation';

export const landscapeBase = '/konzept/galabau/';

export const landscapeServices = [
  {
    number: '01',
    name: 'Gartengestaltung',
    slug: 'gartengestaltung',
    text: 'Räume im Freien, die zum Haus, zum Grundstück und zum Alltag ihrer Bewohner passen.',
  },
  {
    number: '02',
    name: 'Wege & Terrassen',
    slug: 'wege-terrassen',
    text: 'Belastbare Flächen mit gutem Übergang, passender Materialwahl und sauberer Ausführung.',
  },
  {
    number: '03',
    name: 'Pflanzung & Pflege',
    slug: 'pflanzung-pflege',
    text: 'Standortgerechte Pflanzenbilder und Pflege, die den Garten langfristig weiterentwickelt.',
  },
];

export function LandscapeLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      className={light ? 'landscape-link is-light' : 'landscape-link'}
      href={href}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

const images = {
  garten: { file: 'garten.webp', width: 1536, height: 1024 },
  'pflaster-detail': {
    file: 'pflaster-detail.webp',
    width: 1448,
    height: 1086,
  },
  regengarten: { file: 'regengarten.webp', width: 1536, height: 1024 },
} as const;

export function LandscapePhoto({
  name,
  alt,
  caption = 'KI-Visualisierung · fiktives Konzeptmotiv',
  priority = false,
}: {
  name: keyof typeof images;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const image = images[name];
  return (
    <figure className={`landscape-photo landscape-photo-${name}`}>
      <div className="landscape-photo-frame">
        <img
          src={`/images/galabau/${image.file}`}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function LandscapeFooter() {
  return (
    <footer className="landscape-footer">
      <div className="landscape-wrap landscape-footer-inner">
        <a className="landscape-footer-brand" href={landscapeBase}>
          GRÜNRAUM
        </a>
        <span>Fiktives Websitekonzept für Garten- & Landschaftsbau</span>
        <div>
          <a href="/konzepte/">Alle Konzepte</a>
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

export function LandscapeShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div data-theme="landscape">
      <LandscapeNavigation active={active} />
      <main id="inhalt">{children}</main>
      <LandscapeFooter />
    </div>
  );
}

export function LandscapeContact() {
  return (
    <section className="landscape-contact">
      <div className="landscape-wrap landscape-contact-inner">
        <p className="landscape-kicker">Der erste Schritt</p>
        <h2>Was darf draußen entstehen?</h2>
        <p>
          Erzählen Sie kurz vom Grundstück, Ihren Wünschen und dem gewünschten
          Zeitraum. Fotos oder ein Lageplan würden in der echten Umsetzung den
          Einstieg erleichtern.
        </p>
        <LandscapeLink light href={landscapeBase + 'anfrage/'}>
          Garten beschreiben
        </LandscapeLink>
        <small>Formularsimulation · es werden keine Daten versendet</small>
      </div>
    </section>
  );
}
