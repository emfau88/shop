'use client';

import { useState } from 'react';
import { ResponsiveImage } from './responsive-image';

const moods = [
  {
    id: 'aubergine',
    label: 'Aubergine',
    note: 'Aubergine 42 · Matt · warmes Tageslicht',
    image: '/images/raum-aubergine.webp',
  },
  {
    id: 'salbei',
    label: 'Salbei',
    note: 'Salbei 18 · Matt · gedämpftes Tageslicht',
    image: '/images/raum-salbei.webp',
  },
  {
    id: 'mineral',
    label: 'Mineral',
    note: 'Mineral 06 · Matt · weicher Steincharakter',
    image: '/images/raum-mineral.webp',
  },
] as const;

export function FarbformMoodSwitcher() {
  const [active, setActive] = useState(0);
  const mood = moods[active];

  return (
    <div className="farbform-mood-stage">
      <ResponsiveImage
        key={mood.id}
        src={mood.image}
        sourceWidth={1536}
        height={1024}
        alt={`Wohnraum in der Farbwelt ${mood.label}`}
        sizes="(max-width: 760px) 100vw, 92vw"
        fetchPriority="high"
      />
      <div
        className="farbform-mood-controls"
        aria-label="Raumstimmung auswählen"
      >
        <p className="eyebrow">Raumstimmungen</p>
        <div>
          {moods.map((item, index) => (
            <button
              aria-pressed={active === index}
              data-farbform-mood={item.id}
              key={item.id}
              onClick={() => setActive(index)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <span>{mood.note}</span>
      </div>
    </div>
  );
}
