import {
  GastroLink,
  GastroPhoto,
  GastroReserveBand,
  GastroShell,
  gastroBase,
} from '@/components/gastro/gastro-shared';

export const metadata = { title: 'Unser Haus · LINDENWIRT' };

export default function Page() {
  return (
    <GastroShell active="Unser Haus">
      <section className="gastro-house-hero">
        <GastroPhoto
          name="gesellschaft"
          alt="Festlich, aber ungezwungen gedeckte lange Tafel mit erwachsenen Gästen in einem hellen Gastraum"
          caption=""
          priority
        />
        <div className="gastro-wrap gastro-house-title">
          <p className="gastro-kicker">Unser Haus</p>
          <h1>Raum für einen richtig guten Abend.</h1>
        </div>
      </section>

      <section className="gastro-wrap gastro-house-copy">
        <div>
          <span>01</span>
          <h2>Gaststube</h2>
          <p>
            Warm, offen und nah an der Küche. Für spontane Abendessen, vertraute
            Runden und den Tisch, an dem man etwas länger sitzen bleibt.
          </p>
        </div>
        <div>
          <span>02</span>
          <h2>Garten</h2>
          <p>
            Ein geschützter Platz unter Bäumen für Mittagessen, Sommerabende und
            kleine Feiern im Freien.
          </p>
        </div>
        <div>
          <span>03</span>
          <h2>Gesellschaft</h2>
          <p>
            Für bis zu 30 Personen: Menü, Sitzordnung und Ablauf werden passend
            zum Anlass besprochen.
          </p>
        </div>
      </section>

      <section className="gastro-celebration">
        <div className="gastro-wrap gastro-celebration-grid">
          <div>
            <p className="gastro-kicker">Ein besonderer Anlass</p>
            <h2>Das ganze Haus für einen guten Abend.</h2>
          </div>
          <div>
            <p>
              Für Familienfeste und Geschäftsessen planen wir Raum, Menü und
              Ablauf gemeinsam.
            </p>
            <GastroLink href={gastroBase + 'feiern/'}>
              Feiern im LINDENWIRT
            </GastroLink>
          </div>
        </div>
      </section>

      <GastroReserveBand />
    </GastroShell>
  );
}
