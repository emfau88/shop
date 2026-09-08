/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
export function InquiryForm({
  demo = false,
  initialService = 'Noch offen',
}: {
  demo?: boolean;
  initialService?: string;
}) {
  const [complete, setComplete] = useState(false);
  return (
    <form
      className="inquiry"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const message = form.elements.namedItem(
          'message',
        ) as HTMLTextAreaElement;
        name.setCustomValidity(
          name.value.trim().length < 2
            ? 'Bitte geben Sie mindestens zwei Zeichen ein.'
            : '',
        );
        message.setCustomValidity(
          message.value.trim().length < 10
            ? 'Bitte beschreiben Sie die Idee mit mindestens zehn Zeichen.'
            : '',
        );
        if (form.reportValidity()) setComplete(true);
      }}
      onChange={(e) => {
        setComplete(false);
        const field = e.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity('');
      }}
    >
      <p className="form-note">
        {demo
          ? 'Demo-Anfrage: Bitte nur Beispieldaten verwenden. Es wird nichts versendet oder gespeichert.'
          : 'Vorschau: Bitte nur Beispieldaten verwenden. Der Versand ist noch nicht eingerichtet; Eingaben werden weder versendet noch gespeichert.'}
      </p>
      {demo && (
        <div className="field">
          <label htmlFor="service">Worum geht es?</label>
          <NativeSelect
            className="service-select"
            id="service"
            name="service"
            defaultValue={initialService}
          >
            <option>Noch offen</option>
            <option>Innenanstriche</option>
            <option>Oberflächengestaltung</option>
            <option>Farbkonzepte</option>
          </NativeSelect>
        </div>
      )}
      <div className={demo ? '' : 'form-row'}>
        <div className="field">
          <label htmlFor="name">
            Name <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            required
            minLength={2}
            maxLength={100}
            placeholder="Erika Beispiel"
          />
        </div>
        {!demo && (
          <div className="field">
            <label htmlFor="email">
              E-Mail <span>(Pflichtfeld)</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              required
              maxLength={200}
              placeholder="beispiel@example.com"
            />
          </div>
        )}
      </div>
      {!demo && (
        <div className="field">
          <label htmlFor="website">
            Bestehende Website <span>(optional)</span>
          </label>
          <Input
            type="url"
            id="website"
            name="website"
            placeholder="https://"
            maxLength={500}
          />
        </div>
      )}
      <div className="field">
        <label htmlFor="message">
          {demo ? 'Ihre Idee' : 'Ihr Vorhaben'} <span>(Pflichtfeld)</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder={
            demo
              ? 'Zum Beispiel: Ein heller Wohnraum soll eine ruhige Akzentfarbe bekommen.'
              : 'Was macht Ihr Betrieb und was soll die Website zeigen?'
          }
        />
        <small>Mindestens 10 Zeichen.</small>
      </div>
      <div className="form-bottom">
        <Button type="submit" className="action">
          {demo ? 'Demo-Anfrage prüfen' : 'Beispiel-Anfrage prüfen'}{' '}
          <span aria-hidden="true">↗</span>
        </Button>
        <a href="/datenschutz/">Datenschutzhinweise</a>
      </div>
      <output aria-live="polite">
        {complete && (
          <span className="success">
            Beispiel vollständig.{' '}
            {demo
              ? 'In einer echten Website würde diese Anfrage jetzt an den Betrieb übermittelt.'
              : 'Der Ablauf ist vorbereitet. Ein echter Versand ist in dieser Vorschau noch nicht möglich.'}
          </span>
        )}
      </output>
    </form>
  );
}
