'use client';

import { useState } from 'react';
import { SportLink, SportPhoto, sportBase } from './sport-shared';
import {
  SportWeekPlan,
  type SportFilter,
  type SportMode,
} from './sport-week-plan';

const modes = {
  Tennis: {
    time: 'MI · 17:30',
    title: 'Tennis · Startklar',
    line: 'Techniktraining für Einsteiger',
    image: 'tennis' as const,
    alt: 'Zwei Vereinsmitglieder bei einem Tennisballwechsel auf einem roten Sandplatz',
  },
  Badminton: {
    time: 'DI · 18:00',
    title: 'Badminton · Freies Doppel',
    line: 'Offenes Spiel für Erwachsene',
    image: 'badminton' as const,
    alt: 'Vereinsspieler bei einem dynamischen Badminton-Doppel in einer hellen Sporthalle',
  },
};

export function SportModeExperience() {
  const [mode, setMode] = useState<SportMode>('Badminton');
  const [filter, setFilter] = useState<SportFilter>('Badminton');
  const current = modes[mode];

  function selectMode(nextMode: SportMode) {
    setMode(nextMode);
    setFilter(nextMode);
  }

  return (
    <>
      <section className={`sport-mode-hero is-${mode.toLowerCase()}`}>
        <div className="sport-wrap sport-mode-hero-grid">
          <div className="sport-mode-copy">
            <p className="sport-kicker">Heute auf dem Court</p>
            <p className="sport-mode-time">{current.time}</p>
            <h1>{current.title}</h1>
            <p>
              {current.line}. Wähle deinen Sport und finde den nächsten
              passenden Ballwechsel.
            </p>
            <div className="sport-mode-switch" aria-label="Sportart auswählen">
              {(Object.keys(modes) as SportMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  data-sport-mode={item}
                  aria-pressed={mode === item}
                  onClick={() => selectMode(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <SportLink href={`${sportBase}probetraining/?sport=${mode}`}>
              {mode} ausprobieren
            </SportLink>
          </div>
          <div className="sport-mode-visual">
            <SportPhoto name={current.image} alt={current.alt} priority />
            <span className="sport-mode-court" aria-hidden="true" />
          </div>
        </div>
      </section>
      <SportWeekPlan
        filter={filter}
        onFilterChange={(nextFilter) => {
          setFilter(nextFilter);
          if (nextFilter === 'Tennis' || nextFilter === 'Badminton') {
            setMode(nextFilter);
          }
        }}
      />
    </>
  );
}
