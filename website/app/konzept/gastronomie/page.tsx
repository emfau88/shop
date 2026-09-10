import {
  GastroLink,
  GastroPhoto,
  GastroReserveBand,
  GastroShell,
  gastroBase,
} from '@/components/gastro/gastro-shared';

export const metadata = {
  title: 'LINDENWIRT · Küche, Haus & Garten',
  description:
    'Fiktives Websitekonzept für eine moderne, regional geprägte Gaststätte.',
};

const dishes = [
  ['Geröstete Karotte', 'Molke · Haselnuss · Gartenkräuter', '12'],
  ['Geschmorte Rinderbacke', 'Wurzelgemüse · Kartoffel', '28'],
  ['Gebratener Saibling', 'Fenchel · Dill · Zitronenbutter', '26'],
  ['Ofenapfel', 'Vanille · Buchweizen · Karamell', '10'],
];

export default function Page() {
  return (
    <GastroShell>
      <section className="gastro-hero">
        <GastroPhoto
          name="gastraum"
          alt="Warm beleuchteter Gastraum einer modernen regionalen Gaststätte mit offener Küche und erwachsenen Gästen"
          caption=""
          priority
          className="gastro-hero-photo"
        />
        <div className="gastro-hero-shade" />
        <div className="gastro-wrap gastro-hero-copy">
          <p className="gastro-kicker">Regionale Küche · offenes Feuer</p>
          <h1>
            Regional auf dem Teller.
            <br />
            <em>Herzlich am Tisch.</em>
          </h1>
          <p>
            Eine moderne Gaststätte für gutes Essen, lange Abende und Menschen,
            die gern wiederkommen.
          </p>
          <GastroLink href={gastroBase + 'reservieren/'}>
            Tisch anfragen
          </GastroLink>
        </div>
        <div className="gastro-hero-quick">
          <div className="gastro-wrap gastro-hero-quick-grid">
            <div>
              <small>Heute geöffnet</small>
              <b>17–23 Uhr</b>
            </div>
            <div>
              <small>Mitten in der Altstadt</small>
              <b>Marktgasse 12 · Beispielstadt</b>
            </div>
            <a href={gastroBase + 'speisekarte/'}>
              Zur Speisekarte <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="gastro-wrap gastro-statement">
        <p className="gastro-kicker">Unser Haus</p>
        <h2>Vertraute Küche, mit frischem Blick gekocht.</h2>
        <p>
          Wir kochen mit dem, was die Region und die Jahreszeit hergeben. Auf
          der Karte stehen vertraute Gerichte, klare Aromen und Zutaten, deren
          Herkunft wir kennen.
        </p>
      </section>

      <section className="gastro-menu-feature">
        <div className="gastro-wrap gastro-menu-feature-grid">
          <GastroPhoto
            name="gericht"
            alt="Saisonal angerichtetes Hauptgericht mit Rind, Wurzelgemüse und Kräutern auf Keramikteller"
          />
          <div className="gastro-menu-card">
            <p className="gastro-kicker">Kleine Abendkarte</p>
            <h2>Heute besonders gut.</h2>
            <div className="gastro-dish-list">
              {dishes.map(([name, description, price]) => (
                <div key={name}>
                  <div>
                    <b>{name}</b>
                    <span>{description}</span>
                  </div>
                  <strong>{price} €</strong>
                </div>
              ))}
            </div>
            <GastroLink secondary href={gastroBase + 'speisekarte/'}>
              Ganze Speisekarte
            </GastroLink>
          </div>
        </div>
      </section>

      <section className="gastro-full-story">
        <GastroPhoto
          name="gesellschaft"
          alt="Erwachsene Gäste bei einer Familienfeier an einer langen Tafel, während eine Servicekraft serviert"
          caption=""
        />
        <div className="gastro-wrap gastro-story-panel">
          <p className="gastro-kicker">Feste & Gesellschaften</p>
          <h2>Wenn der Tisch etwas länger werden darf.</h2>
          <p>
            Geburtstag, Familienfest oder Geschäftsessen: Anlass, Raum und Menü
            werden als ein gemeinsamer Abend gedacht.
          </p>
          <GastroLink href={gastroBase + 'feiern/'}>
            Feiern im LINDENWIRT
          </GastroLink>
        </div>
      </section>

      <GastroReserveBand />
    </GastroShell>
  );
}
