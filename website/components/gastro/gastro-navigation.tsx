/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const gastroBase = '/konzept/gastronomie/';
const links = [
  ['Speisekarte', gastroBase + 'speisekarte/'],
  ['Haus & Feiern', gastroBase + 'haus/'],
  ['Reservieren', gastroBase + 'reservieren/'],
];

export function GastroNavigation({ active = '' }: { active?: string }) {
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
      <div className="gastro-notice">
        <div className="gastro-wrap gastro-notice-inner">
          <span>Fiktives Restaurantkonzept · keine realen Öffnungszeiten</span>
          <a href="/konzepte/">Alle Websitekonzepte ↗</a>
        </div>
      </div>
      <header className="gastro-header">
        <div className="gastro-wrap gastro-header-inner">
          <a className="gastro-brand" href={gastroBase}>
            <span>LINDENWIRT</span>
            <small>Küche · Haus · Garten</small>
          </a>
          <Button
            ref={trigger}
            className="gastro-menu-toggle"
            variant="outline"
            aria-expanded={open}
            aria-controls="gastro-hauptnavigation"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Schließen ×' : 'Menü +'}
          </Button>
          <nav
            id="gastro-hauptnavigation"
            aria-label="Hauptnavigation"
            className={open ? 'gastro-nav is-open' : 'gastro-nav'}
          >
            {links.map(([label, href], index) => (
              <a
                href={href}
                key={href}
                aria-current={active === label ? 'page' : undefined}
                className={index === links.length - 1 ? 'gastro-nav-cta' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
