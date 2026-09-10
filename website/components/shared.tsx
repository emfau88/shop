/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- WebP assets are optimized offline and served locally with dimensions and loading priorities. */
import { Navigation } from './navigation';
import { DemoBar } from './demo-bar';
export const base = '/konzept/maler/';
export function ArrowLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={secondary ? 'text-link' : 'action'}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function Photo(props: {
  name: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  const { name, alt, priority = false } = props;
  const dimensions =
    name === 'raum-aubergine' || name === 'farbform-raum-vorher'
      ? [1536, 1024]
      : name === 'eingang-senf'
        ? [1448, 1086]
        : [1254, 1254];
  return (
    <figure className={'photo photo-' + name}>
      <img
        src={'/images/' + name + '.webp'}
        alt={alt}
        width={dimensions[0]}
        height={dimensions[1]}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  );
}
export function Footer({ demo = false }: { demo?: boolean }) {
  return (
    <footer className="wrap footer">
      <a className="footer-name" href={demo ? base : '/'}>
        {demo ? 'farbform' : 'webdesign · persönlich umgesetzt'}
      </a>
      <span>
        {demo
          ? 'Farbe · Oberfläche · Raumwirkung'
          : 'Gestaltung & Entwicklung aus einer Hand'}
      </span>
      <div>
        {demo ? (
          <>
            <a href={base + 'leistungen/'}>Leistungen</a>
            <a href={base + 'gestaltung/'}>Projekte</a>
            <a href={base + 'kontakt/'}>Kontakt</a>
          </>
        ) : (
          <>
            <a href="/impressum/">Impressum</a>
            <a href="/datenschutz/">Datenschutz</a>
          </>
        )}
      </div>
    </footer>
  );
}
export function DemoShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <>
      <DemoBar concept="Farbform · Maler & Raumgestaltung" />
      <div data-theme="demo">
        <Navigation demo active={active} />
        <main id="inhalt">{children}</main>
        <Footer demo />
      </div>
    </>
  );
}
export function DemoContact() {
  return (
    <section className="demo-cta">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Der nächste Schritt</p>
          <h2>Ein neuer Blick auf Ihre Räume.</h2>
        </div>
        <div>
          <p>
            Eine Wand, ein Raum oder ein ganzes Zuhause: Am Anfang steht die
            Idee, wie es sich anfühlen soll.
          </p>
          <ArrowLink href={base + 'kontakt/'}>Vorhaben beschreiben</ArrowLink>
          <small>Unverbindliche Anfrage</small>
        </div>
      </div>
    </section>
  );
}
export const services = [
  {
    name: 'Innenanstriche',
    slug: 'innenanstriche',
    text: 'Ruhige Flächen, die den Raum zusammenbringen. Wand- und Deckenfarben, abgestimmt auf Licht und Nutzung.',
  },
  {
    name: 'Oberflächengestaltung',
    slug: 'oberflaechen',
    text: 'Oberflächen mit Charakter. Von fein und zurückhaltend bis zu einer sichtbar lebendigen Struktur.',
  },
  {
    name: 'Farbkonzepte',
    slug: 'farbkonzepte',
    text: 'Farbtöne, die zueinander passen. Im Zusammenspiel mit Boden, Möbeln und dem vorhandenen Tageslicht.',
  },
];
