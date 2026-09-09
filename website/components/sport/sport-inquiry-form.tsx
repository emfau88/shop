/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

export function SportInquiryForm({
  initialSport = 'Noch offen',
}: {
  initialSport?: string;
}) {
  const [complete, setComplete] = useState(false);
  return (
    <form
      className="sport-inquiry"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const message = form.elements.namedItem(
          'message',
        ) as HTMLTextAreaElement;
        name.setCustomValidity(
          name.value.trim().length < 2
            ? 'Bitte gib mindestens zwei Zeichen ein.'
            : '',
        );
        message.setCustomValidity(
          message.value.trim().length < 10
            ? 'Bitte beschreibe dich mit mindestens zehn Zeichen.'
            : '',
        );
        if (form.reportValidity()) setComplete(true);
      }}
      onChange={(event) => {
        setComplete(false);
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity('');
      }}
    >
      <p className="sport-form-note">
        Demo-Anfrage: Bitte nur Beispieldaten verwenden. Es wird nichts
        versendet oder gespeichert.
      </p>
      <div className="sport-form-row">
        <div className="sport-field">
          <label htmlFor="sport-discipline">Sportart</label>
          <NativeSelect
            id="sport-discipline"
            name="sport"
            defaultValue={initialSport}
          >
            <option>Noch offen</option>
            <option>Tennis</option>
            <option>Badminton</option>
          </NativeSelect>
        </div>
        <div className="sport-field">
          <label htmlFor="sport-level">Erfahrung</label>
          <NativeSelect
            id="sport-level"
            name="level"
            defaultValue="Einsteiger/in"
          >
            <option>Einsteiger/in</option>
            <option>Schon etwas gespielt</option>
            <option>Vereinserfahrung</option>
          </NativeSelect>
        </div>
      </div>
      <div className="sport-field">
        <label htmlFor="sport-name">
          Name <span>(Pflichtfeld)</span>
        </label>
        <Input
          id="sport-name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          autoComplete="off"
          placeholder="Alex Beispiel"
        />
      </div>
      <div className="sport-form-row">
        <div className="sport-field">
          <label htmlFor="sport-email">
            E-Mail <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="sport-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="off"
            placeholder="alex@example.de"
          />
        </div>
        <div className="sport-field">
          <label htmlFor="sport-age">Altersgruppe</label>
          <NativeSelect id="sport-age" name="age" defaultValue="Erwachsene">
            <option>Jugend</option>
            <option>Erwachsene</option>
            <option>60+</option>
          </NativeSelect>
        </div>
      </div>
      <div className="sport-field">
        <label htmlFor="sport-message">
          Was sollten wir wissen? <span>(Pflichtfeld)</span>
        </label>
        <Textarea
          id="sport-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Zum Beispiel: Ich bin neu im Ort und würde gern einmal beim Erwachsenentraining mitspielen."
        />
        <small>Mindestens 10 Zeichen.</small>
      </div>
      <div className="sport-form-bottom">
        <Button type="submit" className="sport-submit">
          Demo-Anfrage prüfen <span aria-hidden="true">↗</span>
        </Button>
        <a href="/datenschutz/">Datenschutzhinweise</a>
      </div>
      <output aria-live="polite">
        {complete && (
          <span className="sport-success">
            Beispiel vollständig. In einer echten Vereinswebsite würde die
            Anfrage jetzt an das passende Trainingsteam gehen.
          </span>
        )}
      </output>
    </form>
  );
}
