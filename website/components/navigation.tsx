/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
export function Navigation({
  demo = false,
  active = '',
}: {
  demo?: boolean;
  active?: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    if (open) document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  const links = demo
    ? [
        ['Leistungen', '/konzept/maler/leistungen/'],
        ['Gestaltung', '/konzept/maler/gestaltung/'],
        ['Kontakt', '/konzept/maler/kontakt/'],
      ]
    : [
        ['Konzepte', '/konzepte/'],
        ['Leistung & Preis', '/#angebot'],
        ['Ablauf', '/#ablauf'],
        ['Projekt anfragen', '/#anfrage'],
      ];
  return (
    <>
      <a className="skip" href="#inhalt">
        Zum Inhalt
      </a>
      <div className="notice">
        <div className="wrap notice-inner">
          <span>
            {demo
              ? 'Fiktives Konzeptprojekt · keine realen Kundenaufträge'
              : 'Private Vorschau · noch kein buchbares Angebot'}
          </span>
          {demo && <a href="/">Zum Webdesign-Angebot ↗</a>}
        </div>
      </div>
      <header className="wrap header">
        <a
          className={'brand ' + (demo ? 'brand-demo' : '')}
          href={demo ? '/konzept/maler/' : '/'}
        >
          {demo ? (
            <>
              farbform<span>Malerarbeiten & Raumgestaltung</span>
            </>
          ) : (
            <>
              webdesign<span>persönlich umgesetzt</span>
            </>
          )}
        </a>
        <Button
          ref={trigger}
          className="menu-toggle"
          variant="outline"
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Schließen ×' : 'Menü +'}
        </Button>
        <nav
          id="hauptnavigation"
          aria-label="Hauptnavigation"
          className={open ? 'nav is-open' : 'nav'}
        >
          {links.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              aria-current={active === label ? 'page' : undefined}
              className={i === links.length - 1 ? 'nav-cta' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
              {i === links.length - 1 && <span aria-hidden="true"> ↗</span>}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
