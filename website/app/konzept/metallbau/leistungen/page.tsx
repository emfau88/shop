import {
  MetalContact,
  MetalLink,
  MetalPhoto,
  MetalShell,
  metalBase,
  metalServices,
} from '@/components/metal/metal-shared';

export const metadata = { title: 'Leistungen · Werkform Metalltechnik' };

const details = [
  {
    headline: 'Blechteile mit sauberer Kontur und passender Form.',
    copy: 'Vom flachen Zuschnitt bis zum gekanteten Bauteil werden Geometrie, Material und weitere Bearbeitung gemeinsam gedacht. So entsteht eine belastbare Grundlage für Einzelteile und wiederkehrende Bedarfe.',
    image: 'bauteile' as const,
    alt: 'Gebogene Bauteile aus Edelstahl und schwarzem Stahl auf einem Werkstatttisch',
  },
  {
    headline: 'Bauteile werden zu belastbaren Einheiten.',
    copy: 'Bei Schweißbaugruppen zählen vorbereitete Teile, sinnvolle Verbindungen und der spätere Einsatz. Schweißfolge, Verzug und prüfbare Maße werden deshalb von Anfang an berücksichtigt.',
    image: 'werkhalle' as const,
    alt: 'Aufgeräumte Metallwerkstatt mit Maschinen und vorbereiteten Werkstücken',
  },
  {
    headline: 'Wenn Standard nicht zur Aufgabe passt.',
    copy: 'Gestelle, Treppen, Einbauten oder funktionale Sonderteile beginnen mit einer konkreten Anforderung. Konstruktion, Fertigung und gewünschte Übergabe werden dafür als zusammenhängendes Projekt betrachtet.',
    image: 'stahltreppe' as const,
    alt: 'Individuell gefertigte Stahltreppe in einem modernen Gewerbegebäude',
  },
];

export default function Page() {
  return (
    <MetalShell active="Fertigung">
      <section className="metal-wrap metal-page-intro">
        <p className="metal-kicker">Leistungen</p>
        <h1>Was die Aufgabe braucht.</h1>
        <p className="metal-lead">
          Drei Leistungsbereiche, die vom präzisen Einzelteil bis zur
          individuellen Konstruktion führen.
        </p>
      </section>
      <div className="metal-wrap metal-service-details">
        {metalServices.map((service, index) => (
          <section id={service.slug} key={service.slug}>
            <div className="metal-detail-copy">
              <p className="metal-kicker">
                {service.number} / {service.name}
              </p>
              <h2>{details[index].headline}</h2>
              <p>{service.text}</p>
              <p>{details[index].copy}</p>
              <MetalLink
                secondary
                href={`${metalBase}anfrage/?projekt=${encodeURIComponent(service.name)}`}
              >
                Leistung anfragen
              </MetalLink>
            </div>
            <MetalPhoto
              name={details[index].image}
              alt={details[index].alt}
              caption={
                index === 0
                  ? 'KI-Detailstudie · illustrative Bauteile'
                  : undefined
              }
            />
          </section>
        ))}
      </div>
      <MetalContact />
    </MetalShell>
  );
}
