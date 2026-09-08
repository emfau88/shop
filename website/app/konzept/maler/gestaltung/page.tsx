import { DemoShell, Photo, DemoContact } from '@/components/shared';
export const metadata = { title: 'Gestaltung · Farbform' };
export default function Page() {
  return (
    <DemoShell active="Gestaltung">
      <section className="wrap page-intro">
        <p className="eyebrow">Raum & Farbe</p>
        <h1>
          Zwei Räume.
          <br /> Zwei Farbwelten.
        </h1>
        <p className="lead">
          Fiktive Raumkonzepte zur Veranschaulichung der Website. Die Bilder
          wurden mit KI erstellt.
        </p>
      </section>
      <section className="wrap project" id="ruhige-tiefe">
        <Photo
          name="raum-aubergine"
          alt="Wohnzimmer mit auberginefarbener Akzentwand und cremefarbenem Sofa"
          priority
        />
        <div className="project-description">
          <span className="eyebrow">01 / Wohnen</span>
          <h2>Ruhige Tiefe.</h2>
          <div>
            <p>
              Ein satter Aubergineton gibt dem Raum Halt. Helle Nachbarflächen
              und das natürliche Tageslicht lassen ihn offen wirken. Weiche
              Textilien und warmes Holz gleichen die Tiefe der Wand aus.
            </p>
            <div className="palette">
              <span>
                <i className="swatch aubergine" />
                Aubergine
              </span>
              <span>
                <i className="swatch chalk" />
                Kreideweiß
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="surface section">
        <div className="wrap project" id="heller-empfang">
          <Photo
            name="eingang-senf"
            alt="Senfgelber Eingangsbereich mit Holzbank, Spiegel und heller Nachbarwand"
          />
          <div className="project-description">
            <span className="eyebrow">02 / Ankommen</span>
            <h2>Ein heller Empfang.</h2>
            <div>
              <p>
                Senfgelb bringt Wärme in einen funktionalen Bereich. Die klar
                begrenzte Farbfläche bleibt der Mittelpunkt; eine schlichte Bank
                und dunkle Details ergänzen die Komposition.
              </p>
              <div className="palette">
                <span>
                  <i className="swatch mustard" />
                  Senfgelb
                </span>
                <span>
                  <i className="swatch chalk" />
                  Kreideweiß
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DemoContact />
    </DemoShell>
  );
}
