/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
/* oxlint-disable nextjs/no-img-element -- Local WebP assets are optimized offline and include dimensions. */
import { GastroNavigation } from './gastro-navigation';
import { DemoBar } from '@/components/demo-bar';

export const gastroBase = '/konzept/gastronomie/';

const images = {
  gastraum: { file: 'gastraum.webp', width: 1536, height: 1024 },
  gericht: { file: 'gericht.webp', width: 1448, height: 1086 },
  gesellschaft: { file: 'gesellschaft.webp', width: 1536, height: 1024 },
} as const;

export function GastroPhoto(props: {
  name: keyof typeof images;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const { name, alt, priority = false, className = '' } = props;
  const image = images[name];
  return (
    <figure className={`gastro-photo gastro-photo-${name} ${className}`}>
      <img
        src={`/images/gastronomie/${image.file}`}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  );
}

export function GastroLink({
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
      className={secondary ? 'gastro-link is-secondary' : 'gastro-link'}
      href={href}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function GastroFooter() {
  return (
    <footer className="gastro-footer">
      <div className="gastro-wrap gastro-footer-main">
        <div>
          <a className="gastro-footer-brand" href={gastroBase}>
            LINDENWIRT
          </a>
          <p>
            Regionale Küche, offene Gastlichkeit und ein Garten für lange
            Abende.
          </p>
        </div>
        <div>
          <b>Beispieladresse</b>
          <span>Marktgasse 12</span>
          <span>00000 Beispielstadt</span>
        </div>
        <div>
          <b>Beispielzeiten</b>
          <span>Mi–Fr · 17–23 Uhr</span>
          <span>Sa–So · 12–23 Uhr</span>
        </div>
      </div>
      <div className="gastro-wrap gastro-footer-bottom">
        <span>Mi–Fr · 17–23 Uhr · Sa–So · 12–23 Uhr</span>
        <nav aria-label="Restaurantnavigation">
          <a href={gastroBase + 'speisekarte/'}>Speisekarte</a>
          <a href={gastroBase + 'haus/'}>Unser Haus</a>
          <a href={gastroBase + 'feiern/'}>Feiern</a>
          <a href={gastroBase + 'reservieren/'}>Reservieren</a>
        </nav>
      </div>
    </footer>
  );
}

export function GastroShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: string;
}) {
  return (
    <>
      <DemoBar concept="LINDENWIRT · Gastronomie" />
      <div data-theme="gastro">
        <GastroNavigation active={active} />
        <main id="inhalt">{children}</main>
        <GastroFooter />
      </div>
    </>
  );
}

export function GastroReserveBand() {
  return (
    <section className="gastro-reserve-band">
      <div className="gastro-wrap gastro-reserve-band-inner">
        <div>
          <p className="gastro-kicker">Ein Tisch für heute?</p>
          <h2>Ein Abend, auf den man sich freut.</h2>
        </div>
        <div>
          <p>
            Datum, Uhrzeit und Personenzahl genügen für den ersten Schritt. Für
            Feiern oder größere Runden stimmen wir Menü und Raum persönlich ab.
          </p>
          <GastroLink href={gastroBase + 'reservieren/'}>
            Tisch anfragen
          </GastroLink>
        </div>
      </div>
    </section>
  );
}
