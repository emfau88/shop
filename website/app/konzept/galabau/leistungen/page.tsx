import {
  LandscapeContact,
  LandscapeLink,
  LandscapePhoto,
  LandscapeShell,
  landscapeBase,
  landscapeServices,
} from '@/components/landscape/landscape-shared';

export const metadata = { title: 'Leistungen · Grünraum Gartenbau' };

const detail = [
  {
    heading: 'Aus Wünschen wird ein Garten mit Richtung.',
    copy: 'Sitzplätze, Blickachsen, Wege, Höhen und Bepflanzung werden gemeinsam betrachtet. Das Ergebnis soll zum Haus passen und im Alltag selbstverständlich funktionieren.',
    points: [
      'Neu- und Umgestaltung',
      'Pflanz- und Materialkonzept',
      'Zonierung und Wegeführung',
    ],
    image: 'garten' as const,
    alt: 'Gestalteter Privatgarten mit Terrasse und üppigen Staudenbeeten',
  },
  {
    heading: 'Flächen, die verbinden und belastbar bleiben.',
    copy: 'Terrassen und Wege prägen die Nutzung des Gartens. Material, Format, Unterbau und Entwässerung werden passend zum Ort und zur Beanspruchung gewählt.',
    points: [
      'Terrassen und Sitzplätze',
      'Wege und Einfassungen',
      'Naturstein und Pflaster',
    ],
    image: 'pflaster-detail' as const,
    alt: 'Handwerkliche Ausführung einer Natursteineinfassung',
  },
  {
    heading: 'Pflanzen, die zum Standort und zueinander passen.',
    copy: 'Eine gute Pflanzung verändert sich über das Jahr und entwickelt sich über viele Jahre. Die Pflege hält dabei Struktur, Vitalität und gewünschte Wirkung im Gleichgewicht.',
    points: [
      'Stauden und Gehölze',
      'Pflege und Entwicklung',
      'Klimaangepasste Pflanzung',
    ],
    image: 'regengarten' as const,
    alt: 'Klimaangepasster Garten mit Gräsern, Stauden und offenem Wasserlauf',
  },
];

export default function Page() {
  return (
    <LandscapeShell active="Leistungen">
      <section className="landscape-wrap landscape-page-intro">
        <p className="landscape-kicker">Leistungen</p>
        <h1>Von der ersten Linie bis zum lebendigen Garten.</h1>
        <p className="landscape-lead">
          Gestaltung, Bau und Pflege greifen ineinander, damit aus einzelnen
          Arbeiten ein stimmiges Ganzes entsteht.
        </p>
      </section>
      <div className="landscape-wrap landscape-service-details">
        {landscapeServices.map((service, index) => (
          <section id={service.slug} key={service.slug}>
            <LandscapePhoto
              name={detail[index].image}
              alt={detail[index].alt}
            />
            <div>
              <p className="landscape-kicker">
                {service.number} / {service.name}
              </p>
              <h2>{detail[index].heading}</h2>
              <p>{detail[index].copy}</p>
              <ul>
                {detail[index].points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <LandscapeLink
                href={`${landscapeBase}anfrage/?thema=${encodeURIComponent(service.name)}`}
              >
                Bereich anfragen
              </LandscapeLink>
            </div>
          </section>
        ))}
      </div>
      <LandscapeContact />
    </LandscapeShell>
  );
}
