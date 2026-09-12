'use client';

import { useState } from 'react';
import { LandscapePhoto } from './landscape-shared';

const phases = [
  {
    id: 'bestand',
    number: '01',
    label: 'Bestand',
    title: 'Ein Hang, der zum Haus drängt.',
    text: 'Verdichteter Boden und fehlende Gefälle führten Wasser zum Haus. Der Hang blieb im Alltag kaum nutzbar und ein schattiger Sitzplatz fehlte.',
    facts: ['420 m² Hanglage', 'Verdichteter Boden', 'Wasserführung zum Haus'],
    image: 'regengarten',
  },
  {
    id: 'entwurf',
    number: '02',
    label: 'Entwurf',
    title: 'Wasser bekommt einen Weg.',
    text: 'Eine klare Folge aus Mulden, durchlässigen Wegen und ruhigen Aufenthaltsorten verbindet Haus, Hang und Grundstücksgrenze.',
    facts: [
      'Mulden und Retentionsflächen',
      'Wegeschleife zum Sitzplatz',
      'Schatten durch Gehölze',
    ],
    image: 'plan',
  },
  {
    id: 'umsetzung',
    number: '03',
    label: 'Umsetzung',
    title: 'Materialien bauen den Übergang.',
    text: 'Naturstein, Holz und Kies machen Niveauunterschiede begehbar. Unterbau und Kanten halten die Wege offen und dauerhaft.',
    facts: [
      'Naturstein · Holz · Kies',
      'Durchlässiger Unterbau',
      'Saubere Kantenführung',
    ],
    image: 'pflaster-detail',
  },
  {
    id: 'ergebnis',
    number: '04',
    label: 'Ergebnis',
    title: 'Ein Garten, der Regen weiterdenkt.',
    text: 'Neue Wege erschließen den ganzen Hang. Stauden und Gehölze schaffen Schatten, und das Regenwasser bleibt als Teil des Ortes im Garten.',
    facts: [
      'Regenwasser im Garten',
      'Sitzplatz im Schatten',
      'Planung und Ausführung',
    ],
    image: 'garten',
  },
] as const;

export function LandscapeProjectJourney() {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <section
      className="landscape-journey"
      aria-labelledby="garden-journey-title"
    >
      <div className="landscape-wrap landscape-journey-head">
        <div>
          <p className="landscape-kicker">Garten 07 · fiktives Projekt</p>
          <h2 id="garden-journey-title">Vom Hang zum Garten am Wasser.</h2>
        </div>
        <p>
          420 m² Hanglage, ein klarer Wasserweg und ein Garten, der im Alltag
          verschiedene Orte schafft.
        </p>
      </div>
      <div
        className="landscape-wrap landscape-journey-tabs"
        role="tablist"
        aria-label="Projektphasen"
      >
        {phases.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-garden-phase={item.id}
            aria-selected={active === index}
            aria-controls={`garden-phase-${item.id}`}
            id={`garden-tab-${item.id}`}
            onClick={() => setActive(index)}
          >
            <span>{item.number}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        className="landscape-wrap landscape-journey-stage"
        id={`garden-phase-${phase.id}`}
        role="tabpanel"
        aria-labelledby={`garden-tab-${phase.id}`}
      >
        <div className="landscape-journey-visual">
          {phase.image === 'plan' ? (
            <svg
              viewBox="0 0 800 560"
              aria-label="Reduzierter Entwurfsplan für Garten 07"
            >
              <path
                className="landscape-plan-boundary"
                d="M80 89 689 64 739 465 120 501Z"
              />
              <path
                className="landscape-plan-house"
                d="M104 119 315 109 330 255 121 270Z"
              />
              <path
                className="landscape-plan-path"
                d="M317 280C415 250 478 160 659 153M317 280c87 19 94 143 250 151M350 328c63-20 139 8 179 58"
              />
              <path
                className="landscape-plan-water"
                d="M364 376c70-57 188-38 240 30-84 45-180 47-240-30Z"
              />
              <circle
                className="landscape-plan-tree"
                cx="576"
                cy="215"
                r="47"
              />
              <circle
                className="landscape-plan-tree"
                cx="664"
                cy="330"
                r="58"
              />
              <text x="128" y="160">
                HAUS
              </text>
              <text x="427" y="184">
                WEG
              </text>
              <text x="426" y="421">
                MULDE
              </text>
            </svg>
          ) : (
            <LandscapePhoto
              name={phase.image}
              alt={
                phase.image === 'garten'
                  ? 'Fertiger Wohngarten mit Natursteinterrasse und dichter Bepflanzung'
                  : phase.image === 'pflaster-detail'
                    ? 'Ausführung einer Natursteinkante entlang eines Gartenwegs'
                    : 'Naturnaher Regengarten als Ausgangssituation des Projekts'
              }
            />
          )}
        </div>
        <div className="landscape-journey-copy">
          <span>{phase.number}</span>
          <h3>{phase.title}</h3>
          <p>{phase.text}</p>
          <ul>
            {phase.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
