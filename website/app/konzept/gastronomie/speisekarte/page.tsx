import {
  GastroReserveBand,
  GastroShell,
} from '@/components/gastro/gastro-shared';

export const metadata = { title: 'Speisekarte · LINDENWIRT' };

const sections = [
  {
    kicker: 'Zum Start',
    items: [
      ['Sauerteigbrot', 'Aufgeschlagene Butter · Kräutersalz', '6'],
      ['Geröstete Karotte', 'Molke · Haselnuss · Gartenkräuter', '12'],
      ['Tatar vom Weiderind', 'Senfsaat · Eigelb · Roggen', '16'],
    ],
  },
  {
    kicker: 'Hauptsache',
    items: [
      ['Geschmorte Rinderbacke', 'Wurzelgemüse · Kartoffel', '28'],
      ['Gebratener Saibling', 'Fenchel · Dill · Zitronenbutter', '26'],
      ['Gerösteter Sellerie', 'Linsen · Birne · Walnuss', '22'],
      ['Wirtshaus-Schnitzel', 'Kartoffel-Gurkensalat · Preiselbeere', '25'],
    ],
  },
  {
    kicker: 'Zum Schluss',
    items: [
      ['Ofenapfel', 'Vanille · Buchweizen · Karamell', '10'],
      ['Käse aus der Region', 'Chutney · Früchtebrot', '14'],
      ['Hausgemachtes Eis', 'Drei kleine Kugeln nach Tagesangebot', '8'],
    ],
  },
];

export default function Page() {
  return (
    <GastroShell active="Speisekarte">
      <section className="gastro-wrap gastro-page-intro gastro-menu-intro">
        <p className="gastro-kicker">Beispielkarte · saisonal gedacht</p>
        <h1>Weniger Auswahl. Mehr Grund zur Vorfreude.</h1>
        <p>
          Diese Gerichte und Preise sind rein beispielhaft. In einer echten
          Restaurantwebsite wird die aktuelle Karte schnell erfassbar,
          druckfreundlich und auch ohne PDF zugänglich dargestellt.
        </p>
      </section>

      <section className="gastro-wrap gastro-menu-sheet">
        {sections.map((section) => (
          <div className="gastro-menu-section" key={section.kicker}>
            <h2>{section.kicker}</h2>
            <div className="gastro-dish-list">
              {section.items.map(([name, description, price]) => (
                <div key={name}>
                  <div>
                    <b>{name}</b>
                    <span>{description}</span>
                  </div>
                  <strong>{price} €</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
        <aside className="gastro-menu-note">
          <b>Gut zu wissen</b>
          <p>
            Vegetarische Gerichte und Hinweise zu Allergenen gehören sichtbar
            direkt zur echten Karte. Das Service-Team beantwortet individuelle
            Fragen persönlich.
          </p>
        </aside>
      </section>
      <GastroReserveBand />
    </GastroShell>
  );
}
