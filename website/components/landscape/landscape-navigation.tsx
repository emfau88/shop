/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const landscapeBase = '/konzept/galabau/';
const links = [
  ['Leistungen', landscapeBase + 'leistungen/'],
  ['Projekte', landscapeBase + 'gartenideen/'],
  ['Garten anfragen', landscapeBase + 'anfrage/'],
];

export function LandscapeNavigation({ active = '' }: { active?: string }) {
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
      <header className="landscape-wrap landscape-header">
        <a className="landscape-brand" href={landscapeBase}>
          <span className="landscape-brand-sign" aria-hidden="true">
            G
          </span>
          <span>
            GRÜNRAUM<small>Garten- & Landschaftsbau</small>
          </span>
        </a>
        <Button
          ref={trigger}
          className="landscape-menu-toggle"
          variant="outline"
          aria-expanded={open}
          aria-controls="landscape-hauptnavigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Schließen ×' : 'Menü +'}
        </Button>
        <nav
          id="landscape-hauptnavigation"
          aria-label="Hauptnavigation"
          className={open ? 'landscape-nav is-open' : 'landscape-nav'}
        >
          {links.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              aria-current={active === label ? 'page' : undefined}
              className={index === links.length - 1 ? 'landscape-nav-cta' : ''}
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
