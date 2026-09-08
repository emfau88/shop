/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- Local WebP assets are optimized offline and include explicit dimensions. */
import { MetalNavigation } from './metal-navigation';

export const metalBase = '/konzept/metallbau/';

export const metalServices = [
  {
    number: '01',
    name: 'Blechbearbeitung',
    slug: 'blechbearbeitung',
    text: 'Zuschnitt, Kanten und saubere Weiterverarbeitung für passgenaue Einzelteile und Kleinserien.',
  },
  {
    number: '02',
    name: 'Schweißbaugruppen',
    slug: 'schweissbaugruppen',
    text: 'Stabile Verbindungen und durchdachte Baugruppen aus Stahl, Edelstahl oder Aluminium.',
  },
  {
    number: '03',
    name: 'Sonderkonstruktionen',
    slug: 'sonderkonstruktionen',
    text: 'Individuelle Lösungen für Industrie, Gewerbe und Architektur – vom Bauteil bis zur Konstruktion.',
  },
];

export function MetalLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={secondary ? 'metal-text-link' : 'metal-action'}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

const imageData = {
  werkhalle: {
    width: 1536,
    height: 1024,
    file: 'werkhalle.webp',
  },
  bauteile: {
    width: 1448,
    height: 1086,
    file: 'bauteile.webp',
  },
  stahltreppe: {
    width: 1536,
    height: 1024,
    file: 'stahltreppe.webp',
  },
} as const;

export function MetalPhoto({
  name,
  alt,
  caption = 'KI-Visualisierung · fiktives Konzeptmotiv',
  priority = false,
}: {
  name: keyof typeof imageData;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const image = imageData[name];
  return (
    <figure className={`metal-photo metal-photo-${name}`}>
      <img
        src={`/images/metal/${image.file}`}
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

export function MetalFooter() {
  return (
    <footer className="metal-footer">
      <div className="metal-wrap metal-footer-inner">
        <a className="metal-footer-brand" href={metalBase}>
          WERKFORM
        </a>
        <span>Fiktives Websitekonzept für Metallverarbeitung</span>
        <div>
          <a href="/konzepte/">Alle Konzepte</a>
          <a href="/impressum/">Impressum</a>
          <a href="/datenschutz/">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

export function MetalShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <div data-theme="metal">
      <MetalNavigation active={active} />
      <main id="inhalt">{children}</main>
      <MetalFooter />
    </div>
  );
}

export function MetalContact() {
  return (
    <section className="metal-contact-strip">
      <div className="metal-wrap metal-contact-grid">
        <div>
          <p className="metal-kicker">Projektstart</p>
          <h2>Zeichnung, Idee oder konkreter Bedarf?</h2>
        </div>
        <div>
          <p>
            Ein paar Eckdaten reichen für den Anfang. Im nächsten Schritt werden
            Material, Menge, Termin und gewünschter Leistungsumfang geklärt.
          </p>
          <MetalLink href={metalBase + 'anfrage/'}>
            Projekt beschreiben
          </MetalLink>
          <small>Formularsimulation · es werden keine Daten versendet</small>
        </div>
      </div>
    </section>
  );
}
