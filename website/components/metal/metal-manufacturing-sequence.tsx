'use client';

import { useState } from 'react';

const stages = [
  {
    id: 'drawing',
    number: '01',
    label: 'Zeichnung',
    eyebrow: 'Eingangsdaten',
    title: 'Die Fertigung beginnt mit einer lesbaren Vorgabe.',
    text: 'DXF, STEP, PDF oder ein Musterteil geben Kontur, Bezug und offenen Klärungsbedarf vor.',
    facts: ['DXF · STEP · PDF', 'Materialstärke', 'Bezugskanten'],
  },
  {
    id: 'manufacturing',
    number: '02',
    label: 'Fertigung',
    eyebrow: 'Bearbeitungsfolge',
    title: 'Aus Daten wird ein kontrollierter Arbeitsweg.',
    text: 'Material, Maß, Toleranz und Reihenfolge werden so abgestimmt, dass das Bauteil später sicher weiterverarbeitet werden kann.',
    facts: ['Stahl · Edelstahl · Aluminium', 'Maß / Toleranz', 'Prüfpunkt'],
  },
  {
    id: 'component',
    number: '03',
    label: 'Bauteil',
    eyebrow: 'Übergabe',
    title: 'Das Ergebnis muss an seinem Einsatzort stimmen.',
    text: 'Geometrie, Oberfläche und vereinbarter Umfang werden vor der Übergabe gegen die Projektvorgabe abgeglichen.',
    facts: ['Kontur geprüft', 'Oberfläche definiert', 'Lieferumfang klar'],
  },
] as const;

export function MetalManufacturingSequence() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  return (
    <section
      className="metal-manufacturing-sequence"
      aria-labelledby="metal-sequence-title"
    >
      <div className="metal-wrap">
        <header className="metal-sequence-head">
          <div>
            <p className="metal-kicker">Fertigung in drei Zuständen</p>
            <h2 id="metal-sequence-title">Zeichnung → Fertigung → Bauteil.</h2>
          </div>
          <p>
            Ein bewusst vereinfachtes Beispiel für den technischen Weg vom
            Eingang bis zur Übergabe. Die Schritte lassen sich direkt anwählen.
          </p>
        </header>

        <div
          className="metal-sequence-controls"
          aria-label="Fertigungszustand auswählen"
        >
          {stages.map((item, index) => (
            <button
              aria-pressed={activeStage === index}
              data-metal-stage={item.id}
              key={item.id}
              onClick={() => setActiveStage(index)}
              type="button"
            >
              <span>{item.number}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="metal-sequence-stage" data-active={stage.id}>
          <div className="metal-sequence-visual" aria-hidden="true">
            <svg viewBox="0 0 960 330">
              <path className="metal-sequence-line" d="M114 165H845" />
              <g className="metal-sequence-node metal-sequence-node-drawing">
                <rect x="58" y="70" width="156" height="190" rx="2" />
                <path d="M83 109H187M83 137H164M83 214H187M110 185H163M137 159V211" />
                <text x="58" y="294">
                  DXF / STEP / PDF
                </text>
              </g>
              <g className="metal-sequence-node metal-sequence-node-manufacturing">
                <path d="M380 244V91H587V244" />
                <path d="M414 91V64H553V91M448 116V207M519 116V207M412 226H556" />
                <path className="metal-sequence-beam" d="M436 182H530" />
                <text x="383" y="294">
                  MASS / TOLERANZ
                </text>
              </g>
              <g className="metal-sequence-node metal-sequence-node-component">
                <path d="M735 103L842 128V205L735 230L678 185V148Z" />
                <path d="M735 103V180L842 205M735 180L678 148M735 180L678 185" />
                <circle cx="762" cy="153" r="12" />
                <text x="691" y="294">
                  KONTROLLIERTES BAUTEIL
                </text>
              </g>
            </svg>
          </div>
          <div className="metal-sequence-copy">
            <p className="metal-kicker">
              {stage.number} / {stage.eyebrow}
            </p>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
            <ul aria-label={`${stage.label}: technische Merkmale`}>
              {stage.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
