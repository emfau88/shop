'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { sportBase } from './sport-shared';

const filters = ['Alle', 'Tennis', 'Badminton', 'Jugend'] as const;
export type SportMode = 'Tennis' | 'Badminton';
const sessions = [
  {
    day: 'DI',
    time: '18:00',
    title: 'Freies Doppel',
    detail: 'Badminton · Erwachsene',
    tags: ['Badminton'],
  },
  {
    day: 'MI',
    time: '17:30',
    title: 'Startklar',
    detail: 'Tennis · Einsteiger',
    tags: ['Tennis'],
  },
  {
    day: 'DO',
    time: '18:30',
    title: 'Mannschaft',
    detail: 'Tennis · Erwachsene',
    tags: ['Tennis'],
  },
  {
    day: 'FR',
    time: '16:00',
    title: 'Junge Schläger',
    detail: 'Tennis & Badminton · 10–16 Jahre',
    tags: ['Tennis', 'Badminton', 'Jugend'],
  },
  {
    day: 'SO',
    time: '10:00',
    title: 'Offener Court',
    detail: 'Beide Sportarten · alle Level',
    tags: ['Tennis', 'Badminton'],
  },
];

export function SportWeekPlan({
  mode,
  onModeChange,
}: {
  mode?: SportMode | null;
  onModeChange?: (mode: SportMode | null) => void;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Alle');
  const activeFilter = mode ?? filter;

  function selectFilter(item: (typeof filters)[number]) {
    setFilter(item);
    onModeChange?.(item === 'Tennis' || item === 'Badminton' ? item : null);
  }

  return (
    <section className="sport-plan" aria-labelledby="sport-plan-title">
      <div className="sport-wrap sport-plan-head">
        <div>
          <p className="sport-kicker">Diese Woche auf dem Court</p>
          <h2 id="sport-plan-title">Wann möchtest du spielen?</h2>
        </div>
        <div className="sport-plan-filters" aria-label="Training filtern">
          {filters.map((item) => (
            <Button
              type="button"
              variant="ghost"
              key={item}
              data-sport-filter={item}
              aria-pressed={activeFilter === item}
              onClick={() => selectFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="sport-wrap sport-plan-board">
        {sessions.map((session) => {
          const visible =
            activeFilter === 'Alle' || session.tags.includes(activeFilter);
          return (
            <article
              key={`${session.day}-${session.time}`}
              data-sport-tags={session.tags.join(' ')}
              hidden={!visible}
            >
              <span>{session.day}</span>
              <b>{session.time}</b>
              <div>
                <strong>{session.title}</strong>
                <small>{session.detail}</small>
              </div>
              <a href={`${sportBase}probetraining/?sport=${session.tags[0]}`}>
                Platz anfragen <span aria-hidden="true">↗</span>
              </a>
            </article>
          );
        })}
      </div>
      <div className="sport-wrap sport-plan-footer">
        <span>
          Beispielzeiten · aktuelle Belegung bitte beim Verein erfragen
        </span>
        <a href={sportBase + 'training/'}>
          Vollständigen Trainingsplan öffnen →
        </a>
      </div>
    </section>
  );
}
