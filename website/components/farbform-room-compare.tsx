'use client';

import { useState } from 'react';
import { ResponsiveImage } from './responsive-image';

export function FarbformRoomCompare() {
  const [reveal, setReveal] = useState(52);

  return (
    <div
      className="farbform-compare"
      style={{ '--reveal': `${reveal}%` } as React.CSSProperties}
    >
      <ResponsiveImage
        src="/images/farbform-raum-vorher.webp"
        sourceWidth={1536}
        height={1024}
        alt="Wohnraum vor der Neugestaltung mit warmer, weißer Wand"
        sizes="(max-width: 760px) 100vw, 92vw"
      />
      <div className="farbform-compare-after" aria-hidden="true">
        <ResponsiveImage
          src="/images/raum-aubergine.webp"
          sourceWidth={1536}
          height={1024}
          alt=""
          sizes="(max-width: 760px) 100vw, 92vw"
        />
      </div>
      <span className="farbform-compare-label farbform-compare-label-before">
        Vorher
      </span>
      <span className="farbform-compare-label farbform-compare-label-after">
        Nachher
      </span>
      <label className="farbform-compare-range">
        <span className="sr-only">Vorher-Nachher-Ansicht verschieben</span>
        <input
          type="range"
          min="0"
          max="100"
          value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-valuetext={`${reveal} Prozent Nachher-Ansicht`}
        />
      </label>
    </div>
  );
}
