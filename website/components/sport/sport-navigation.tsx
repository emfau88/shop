/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const sportBase = '/konzept/sportverein/';
const links = [
  ['Training', sportBase + 'training/'],
  ['Verein', sportBase + 'verein/'],
  ['Probetraining', sportBase + 'probetraining/'],
];

export function SportNavigation({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    if (open) document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <>
      <a className="skip" href="#inhalt">
        Zum Inhalt
      </a>
      <div className="sport-notice">
        <div className="sport-wrap sport-notice-inner">
          <span>Fiktives Vereinskonzept · keine realen Termine</span>
          <a href="/konzepte/">Alle Websitekonzepte ↗</a>
        </div>
      </div>
      <header className="sport-wrap sport-header">
        <a className="sport-brand" href={sportBase}>
          <span className="sport-brand-ball" aria-hidden="true" />
          <span>
            AUFSCHLAG<small>Tennis · Badminton · Verein</small>
          </span>
        </a>
        <Button
          ref={trigger}
          className="sport-menu-toggle"
          variant="outline"
          aria-expanded={open}
          aria-controls="sport-hauptnavigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Schließen ×' : 'Menü +'}
        </Button>
        <nav
          id="sport-hauptnavigation"
          aria-label="Hauptnavigation"
          className={open ? 'sport-nav is-open' : 'sport-nav'}
        >
          {links.map(([label, href], index) => (
            <a
              href={href}
              key={href}
              aria-current={active === label ? 'page' : undefined}
              className={index === links.length - 1 ? 'sport-nav-cta' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
              {index === links.length - 1 && <span aria-hidden="true">↗</span>}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
