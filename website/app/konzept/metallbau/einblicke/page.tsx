import {
  MetalContact,
  MetalPhoto,
  MetalShell,
} from '@/components/metal/metal-shared';

export const metadata = { title: 'Qualität · Werkform Metalltechnik' };

export default function Page() {
  return (
    <MetalShell active="Qualität">
      <section className="metal-wrap metal-page-intro">
        <p className="metal-kicker">Qualität & Referenzen</p>
        <h1>Bauteil und Bauwerk.</h1>
        <p className="metal-lead">
          Präzision muss am Einzelteil erkennbar sein und sich in der fertigen
          Konstruktion bewähren. Zwei Projektansichten zeigen beide Seiten.
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
            schaffen die Grundlage für eine passgenaue Weiterverarbeitung.
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
              Konstruktion, Anschlussdetails und Oberfläche werden auf die
              Architektur und die spätere Nutzung abgestimmt.
            </p>
          </div>
        </div>
      </section>
      <MetalContact />
    </MetalShell>
  );
}
