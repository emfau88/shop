'use client';

import { useEffect, useRef, useState } from 'react';
import { MetalLink, metalBase } from './metal-shared';
import {
  createMetalViewer,
  metalStages,
  type MetalViewer,
} from './metal-viewer';

export function MetalManufacturingSequence() {
  const [activeStage, setActiveStage] = useState(2);
  const [viewerStatus, setViewerStatus] = useState<
    'loading' | 'ready' | 'error'
  >('loading');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<MetalViewer | null>(null);
  const stage = metalStages[activeStage];

  useEffect(() => {
    if (!canvasRef.current) return;
    let active = true;
    const viewer = createMetalViewer(
      canvasRef.current,
      () => active && setViewerStatus('ready'),
      () => active && setViewerStatus('error'),
    );
    viewerRef.current = viewer;
    if (!viewer) setViewerStatus('error');
    return () => {
      active = false;
      viewer?.dispose();
    };
  }, []);

  useEffect(() => {
    viewerRef.current?.setStage(stage.id);
  }, [stage.id]);

  return (
    <section
      className="metal-engineering-lab"
      aria-labelledby="metal-sequence-title"
    >
      <div className="metal-wrap metal-lab-grid">
        <div className="metal-lab-copy">
          <p className="metal-kicker">Product Engineering · WF-042</p>
          <h1 id="metal-sequence-title">Von der Zeichnung zum Bauteil.</h1>
          <p className="metal-lead">
            Daten, Material und Bearbeitungsfolge werden zu einer Geometrie, die
            am Einsatzort weiterarbeitet.
          </p>
          <div className="metal-actions">
            <MetalLink href={metalBase + 'anfrage/'}>
              Projekt anfragen
            </MetalLink>
            <MetalLink secondary href={metalBase + 'leistungen/'}>
              Fertigung prüfen
            </MetalLink>
          </div>
          <p className="metal-lab-disclaimer">
            Interaktives Demonstrationsmodell · Pierre-Louis Baril
          </p>
        </div>

        <div
          className="metal-viewer-shell"
          data-active={stage.id}
          data-viewer-status={viewerStatus}
        >
          <div className="metal-viewer-topline">
            <span>LIVE ASSEMBLY / WF-042</span>
            <span>PBR · 3D</span>
          </div>
          <canvas
            ref={canvasRef}
            className="metal-part-viewer"
            data-stage={stage.id}
            tabIndex={0}
            aria-label="Drehbares, fotorealistisches Werkstattbauteil. Mit Ziehen oder Pfeiltasten bewegen."
            aria-describedby="metal-viewer-help"
          />
          <div className="metal-viewer-fallback" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="metal-viewer-loading" aria-live="polite">
            {viewerStatus === 'loading' && '3D-Baugruppe wird geladen …'}
            {viewerStatus === 'error' && '3D-Ansicht nicht verfügbar'}
          </p>
          <div className="metal-viewer-axis" aria-hidden="true">
            <i>X</i>
            <i>Y</i>
            <i>Z</i>
          </div>
          <p id="metal-viewer-help">
            Dreht automatisch · Ziehen oder Pfeiltasten übernimmt
          </p>
          <button
            type="button"
            className="metal-viewer-reset"
            onClick={() => viewerRef.current?.reset()}
          >
            Auto-Rotation
          </button>
          <dl className="metal-viewer-specs">
            <div>
              <dt>Material</dt>
              <dd>Aluminium</dd>
            </div>
            <div>
              <dt>Shader</dt>
              <dd>Metall-PBR</dd>
            </div>
            <div>
              <dt>Geometrie</dt>
              <dd>10K Polys</dd>
            </div>
            <div>
              <dt>Datensatz</dt>
              <dd>GLB</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="metal-wrap metal-lab-process">
        <div
          className="metal-sequence-controls"
          aria-label="Fertigungszustand auswählen"
        >
          {metalStages.map((item, index) => (
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
        <div className="metal-lab-stage" aria-live="polite">
          <p className="metal-kicker">
            {stage.number} / {stage.eyebrow}
          </p>
          <h2>{stage.title}</h2>
          <p>{stage.text}</p>
          <ul aria-label={`${stage.label}: technische Merkmale`}>
            {stage.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
