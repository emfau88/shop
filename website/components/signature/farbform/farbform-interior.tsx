'use client';

/* oxlint-disable nextjs/no-img-element -- Perspective-matched local WebP states are pre-optimized project assets. */

import { useEffect, useState } from 'react';

const colors = [
  { id: 'aubergine', label: 'Aubergine', effect: 'Tief · geborgen', note: 'Aubergine schafft Tiefe und einen warmen, geschützten Raumeindruck.', image: '/assets/signature/farbform/farbform-wall-aubergine.webp', mobile: '/assets/signature/farbform/farbform-wall-aubergine-mobile.webp' },
  { id: 'salbei', label: 'Salbei', effect: 'Ruhig · natürlich', note: 'Salbei verbindet eine ruhige Farbwirkung mit einer natürlichen, wohnlichen Leichtigkeit.', image: '/assets/signature/farbform/farbform-wall-salbei.webp', mobile: '/assets/signature/farbform/farbform-wall-salbei-mobile.webp' },
  { id: 'mineral', label: 'Mineral', effect: 'Klar · ausgewogen', note: 'Mineral wirkt zurückhaltend und bringt Möbel sowie Materialien ausgewogen zur Geltung.', image: '/assets/signature/farbform/farbform-wall-mineral.webp', mobile: '/assets/signature/farbform/farbform-wall-mineral-mobile.webp' },
  { id: 'sand', label: 'Sand', effect: 'Warm · zeitlos', note: 'Sand reflektiert viel Licht und erzeugt eine warme, zeitlose Basis für den Raum.', image: '/assets/signature/farbform/farbform-wall-sand.webp', mobile: '/assets/signature/farbform/farbform-wall-sand-mobile.webp' },
] as const;

type Stage = 'wall' | 'floor' | 'light' | 'atmosphere';
type ColorId = (typeof colors)[number]['id'];
type Atmosphere = 'natural' | 'warm' | 'expressive';

const beforeImage = '/assets/signature/farbform/farbform-room-vorher.webp';
const beforeMobile = '/assets/signature/farbform/farbform-room-vorher-mobile.webp';

export function FarbformInterior() {
  const [stage, setStage] = useState<Stage>('wall');
  const [color, setColor] = useState<ColorId>('salbei');
  const [floor, setFloor] = useState<'eiche' | 'kalk'>('eiche');
  const [light, setLight] = useState<'day' | 'warm'>('day');
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('natural');
  const [reveal, setReveal] = useState(54);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-signature-brand="farbform"]');
    if (!root) return undefined;
    const onStateChange = (event: Event) => {
      const next = (event as CustomEvent<{ state?: Stage }>).detail?.state;
      if (next) setStage(next);
    };
    root.addEventListener('signaturestatechange', onStateChange);
    return () => root.removeEventListener('signaturestatechange', onStateChange);
  }, []);

  const activeColor = colors.find((item) => item.id === color) ?? colors[1];
  const comparisonActive = stage === 'wall' || stage === 'atmosphere';

  const applyAtmosphere = (next: Atmosphere) => {
    setAtmosphere(next);
    if (next === 'natural') { setColor('salbei'); setFloor('eiche'); setLight('day'); }
    if (next === 'warm') { setColor('sand'); setFloor('eiche'); setLight('warm'); }
    if (next === 'expressive') { setColor('aubergine'); setFloor('kalk'); setLight('warm'); }
  };

  return (
    <div className="farbform-interior" data-stage={stage} data-floor={floor} data-light={light}>
      <div className="farbform-image-stage">
        <img
          className="farbform-room farbform-room--base"
          src={beforeImage}
          srcSet={`${beforeMobile} 720w, ${beforeImage} 1448w`}
          sizes="100vw"
          alt={`Wohnraum mit interaktiv wählbarer Wandfarbe, aktuell ${activeColor.label}`}
          width="1448"
          height="1086"
        />
        <div className="farbform-room-after" style={{ width: comparisonActive ? `${reveal}%` : '100%' }} aria-hidden="true">
          <img src={activeColor.image} srcSet={`${activeColor.mobile} 720w, ${activeColor.image} 1448w`} sizes="100vw" alt="" width="1448" height="1086" />
        </div>
        <picture>
          <source media="(max-width: 920px)" srcSet="/assets/signature/farbform/farbform-plant-layer-mobile.webp" />
          <img
            className="farbform-decor-layer farbform-decor-layer--plant"
            src="/assets/signature/farbform/farbform-plant-layer.webp"
            alt=""
            width="1448"
            height="1086"
            aria-hidden="true"
          />
        </picture>
        <picture>
          <source media="(max-width: 920px)" srcSet="/assets/signature/farbform/farbform-artwork-layer-mobile.webp" />
          <img
            className="farbform-decor-layer farbform-decor-layer--artwork"
            src="/assets/signature/farbform/farbform-artwork-layer.webp"
            alt=""
            width="1448"
            height="1086"
            aria-hidden="true"
          />
        </picture>
        <div className="farbform-floor-wash" aria-hidden="true" />
        {comparisonActive && (
          <>
            <span className="farbform-signature-compare-label farbform-signature-compare-label--after">Nachher</span>
            <span className="farbform-signature-compare-label farbform-signature-compare-label--before">Vorher</span>
            <span className="farbform-divider" style={{ left: `${reveal}%` }} aria-hidden="true"><i>‹ ›</i></span>
            <label className="farbform-signature-compare-range">
              <span className="sr-only">Anteil der Nachher-Ansicht</span>
              <input
                type="range"
                min="0"
                max="100"
                value={reveal}
                onChange={(event) => setReveal(Number(event.target.value))}
                aria-valuetext={`${reveal} Prozent Nachher-Ansicht`}
              />
            </label>
          </>
        )}
      </div>

      <div className="farbform-options" aria-label="Raumgestaltung anpassen">
        {stage === 'wall' && (
          <div className="farbform-swatches" aria-label="Wandfarbe wählen">
            {colors.map((item) => (
              <button
                type="button"
                key={item.id}
                data-color={item.id}
                aria-pressed={color === item.id}
                onClick={() => setColor(item.id)}
              >
                <span aria-hidden="true" />{item.label}
              </button>
            ))}
          </div>
        )}
        {stage === 'floor' && (
          <div className="farbform-segmented" aria-label="Boden auswählen">
            <button type="button" aria-pressed={floor === 'eiche'} onClick={() => setFloor('eiche')}>Natureiche</button>
            <button type="button" aria-pressed={floor === 'kalk'} onClick={() => setFloor('kalk')}>Helle Eiche</button>
          </div>
        )}
        {stage === 'light' && (
          <div className="farbform-segmented" aria-label="Lichtstimmung auswählen">
            <button type="button" aria-pressed={light === 'day'} onClick={() => setLight('day')}>Tageslicht</button>
            <button type="button" aria-pressed={light === 'warm'} onClick={() => setLight('warm')}>Abendwarm</button>
          </div>
        )}
        {stage === 'atmosphere' && (
          <div className="farbform-segmented" aria-label="Raumatmosphäre auswählen">
            <button type="button" aria-pressed={atmosphere === 'natural'} onClick={() => applyAtmosphere('natural')}>Natürlich</button>
            <button type="button" aria-pressed={atmosphere === 'warm'} onClick={() => applyAtmosphere('warm')}>Warm</button>
            <button type="button" aria-pressed={atmosphere === 'expressive'} onClick={() => applyAtmosphere('expressive')}>Ausdrucksstark</button>
          </div>
        )}
      </div>

      <div className="farbform-hotspots" aria-label="Materialdetails">
        <details className="farbform-hotspot farbform-hotspot--wall">
          <summary><span aria-hidden="true">+</span><strong>{activeColor.label} im Raum<small>{activeColor.effect}</small></strong></summary>
          <p><b>Farbwirkung</b>{activeColor.note}<small>Oberfläche · matt-mineralisch</small></p>
        </details>
        <details className="farbform-hotspot farbform-hotspot--floor">
          <summary><span aria-hidden="true">+</span><strong>Passende Bodenbeläge<small>Stilvoll kombinieren</small></strong></summary>
          <p>Der Boden lässt sich unabhängig von Wandfarbe und Lichtstimmung variieren.</p>
        </details>
      </div>
    </div>
  );
}
