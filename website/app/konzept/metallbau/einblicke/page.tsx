import {
  MetalContact,
  MetalPhoto,
  MetalShell,
} from '@/components/metal/metal-shared';

export const metadata = { title: 'Einblicke · Werkform Metalltechnik' };

export default function Page() {
  return (
    <MetalShell active="Einblicke">
      <section className="metal-wrap metal-page-intro">
        <p className="metal-kicker">Einblicke</p>
        <h1>Bauteil und Bauwerk.</h1>
        <p className="metal-lead">
          Zwei KI-erstellte Motive zeigen, wie die Website Fertigungsqualität
          und fertige Anwendung verbindet. Sie sind ausdrücklich keine realen
          Kundenreferenzen.
        </p>
      </section>
      <section className="metal-wrap metal-project" id="praezise-bauteile">
        <MetalPhoto
          name="bauteile"
          alt="Mehrere präzise gefertigte Winkelbauteile aus unterschiedlichen Metallen"
          caption="KI-Detailstudie · fiktive Bauteile"
          priority
        />
        <div className="metal-project-copy">
          <p className="metal-kicker">01 / Fertigungsdetail</p>
          <h2>Präzise vorbereitet.</h2>
          <p>
            Saubere Konturen, exakte Biegungen und nachvollziehbare Geometrien
            vermitteln die Kernleistung unmittelbar. Der Bildstil wirkt
            technisch, aber nicht kalt.
          </p>
        </div>
      </section>
      <section className="metal-project-band" id="stahltreppe">
        <div className="metal-wrap metal-project">
          <MetalPhoto
            name="stahltreppe"
            alt="Anthrazitfarbene Stahltreppe mit Geländer in einem hellen Gewerbegebäude"
            caption="KI-Projektvisualisierung · keine ausgeführte Referenz"
          />
          <div className="metal-project-copy">
            <p className="metal-kicker">02 / Sonderkonstruktion</p>
            <h2>Stahl im Raum.</h2>
            <p>
              Das Anwendungsbild zeigt die Konstruktion im späteren Umfeld.
              Material, Anschlussdetails und Architektur bleiben glaubwürdig und
              geben Interessenten einen konkreten Bezugspunkt.
            </p>
          </div>
        </div>
      </section>
      <MetalContact />
    </MetalShell>
  );
}
