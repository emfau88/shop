/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const metalBase = '/konzept/metallbau/';

const links = [
  ['Leistungen', metalBase + 'leistungen/'],
  ['Einblicke', metalBase + 'einblicke/'],
  ['Projekt anfragen', metalBase + 'anfrage/'],
];

export function MetalNavigation({ active = '' }: { active?: string }) {
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
      <div className="metal-notice">
        <div className="metal-wrap metal-notice-inner">
          <span>Fiktives Konzeptprojekt · keine realen Kundenaufträge</span>
          <a href="/konzepte/">Alle Websitekonzepte ↗</a>
        </div>
      </div>
      <header className="metal-wrap metal-header">
        <a
          className="metal-brand"
          href={metalBase}
          aria-label="Werkform Startseite"
        >
          <span className="metal-brand-mark" aria-hidden="true">
            W
          </span>
          <span>
            WERKFORM
            <small>Metallverarbeitung · Konstruktion</small>
          </span>
        </a>
        <Button
          ref={trigger}
          className="metal-menu-toggle"
          variant="outline"
          aria-expanded={open}
          aria-controls="metal-hauptnavigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Schließen ×' : 'Menü +'}
        </Button>
        <nav
          id="metal-hauptnavigation"
          aria-label="Hauptnavigation"
          className={open ? 'metal-nav is-open' : 'metal-nav'}
        >
          {links.map(([label, href], index) => (
            <a
              href={href}
              key={href}
              aria-current={active === label ? 'page' : undefined}
              className={index === links.length - 1 ? 'metal-nav-cta' : ''}
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
