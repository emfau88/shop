import {
  DemoShell,
  Photo,
  ArrowLink,
  DemoContact,
  services,
  base,
} from '@/components/shared';
export const metadata = { title: 'Leistungen · Farbform' };
export default function Page() {
  return (
    <DemoShell active="Leistungen">
      <section className="wrap page-intro">
        <p className="eyebrow">Die Leistungen</p>
        <h1>Passende Oberflächen für jeden Raum.</h1>
        <p className="lead">
          Vom ersten Farbgedanken bis zum Zusammenspiel aller Flächen. Drei
          Bereiche, die Ihren Räumen eine klare Richtung geben.
        </p>
      </section>
      <div className="wrap">
        {services.map((s, i) => (
          <section className="service-detail" id={s.slug} key={s.slug}>
            <div>
              <p className="eyebrow">
                0{i + 1} / {s.name}
              </p>
              <h2>
                {
                  [
                    'Ein neuer Ton für Wände und Decken.',
                    'Oberflächen, die mehr zeigen.',
                    'Ein stimmiges Ganzes.',
                  ][i]
                }
              </h2>
              <p>{s.text}</p>
              <p>
                {
                  [
                    'Jeder Raum wird anders genutzt. Untergrund, Lichteinfall und gewünschte Wirkung bestimmen, welcher Anstrich passt. Wände und Decken werden dabei gemeinsam betrachtet.',
                    'Glatte, matte Flächen wirken ruhig. Feine Strukturen bringen Bewegung ins Licht. Musterflächen helfen dabei, die Wirkung vorab einzuschätzen.',
                    'Eine Farbe wirkt nie für sich allein. Boden, vorhandene Möbel und wechselndes Tageslicht gehören deshalb zum Konzept. Aufeinander abgestimmte Farbtöne verbinden die Räume.',
                  ][i]
                }
              </p>
              <ArrowLink
                secondary
                href={base + 'kontakt/?leistung=' + encodeURIComponent(s.name)}
              >
                Diese Leistung anfragen
              </ArrowLink>
            </div>
            <Photo
              name={['raum-aubergine', 'farbmuster', 'eingang-senf'][i]}
              alt={
                [
                  'Wohnzimmer mit matter auberginefarbener Akzentwand',
                  'Drei matte Farbmuster auf Leinen',
                  'Gelbe Wandfläche in einem hellen Eingang',
                ][i]
              }
              caption={
                i === 1
                  ? 'KI-Materialstudie · illustrative Farbmuster'
                  : undefined
              }
            />
          </section>
        ))}
      </div>
      <DemoContact />
    </DemoShell>
  );
}
