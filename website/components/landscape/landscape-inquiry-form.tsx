/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

export function LandscapeInquiryForm({
  initialTopic = 'Noch offen',
}: {
  initialTopic?: string;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <form
      className="landscape-inquiry"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
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
            ? 'Bitte beschreiben Sie das Vorhaben mit mindestens zehn Zeichen.'
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
      <p className="landscape-form-note">
        Demo-Anfrage: Bitte nur Beispieldaten verwenden. Es wird nichts
        versendet oder gespeichert.
      </p>
      <div className="landscape-field">
        <label htmlFor="landscape-topic">Worum geht es?</label>
        <NativeSelect
          id="landscape-topic"
          name="topic"
          defaultValue={initialTopic}
        >
          <option>Noch offen</option>
          <option>Gartengestaltung</option>
          <option>Wege & Terrassen</option>
          <option>Pflanzung & Pflege</option>
        </NativeSelect>
      </div>
      <div className="landscape-form-row">
        <div className="landscape-field">
          <label htmlFor="landscape-area">
            Fläche <span>(optional)</span>
          </label>
          <Input
            id="landscape-area"
            name="area"
            maxLength={80}
            autoComplete="off"
            placeholder="z. B. etwa 180 m²"
          />
        </div>
        <div className="landscape-field">
          <label htmlFor="landscape-postcode">
            Postleitzahl <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="landscape-postcode"
            name="postcode"
            inputMode="numeric"
            pattern="[0-9]{5}"
            required
            maxLength={5}
            autoComplete="off"
            placeholder="12345"
          />
        </div>
      </div>
      <div className="landscape-form-row">
        <div className="landscape-field">
          <label htmlFor="landscape-name">
            Name <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="landscape-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="off"
            placeholder="Erika Beispiel"
          />
        </div>
        <div className="landscape-field">
          <label htmlFor="landscape-email">
            E-Mail <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="landscape-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="off"
            placeholder="beispiel@example.de"
          />
        </div>
      </div>
      <div className="landscape-field">
        <label htmlFor="landscape-message">
          Ihr Gartenwunsch <span>(Pflichtfeld)</span>
        </label>
        <Textarea
          id="landscape-message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder="Was soll bleiben, was soll sich verändern und wie möchten Sie den Garten künftig nutzen?"
        />
        <small>
          Mindestens 10 Zeichen. Ein echter Foto-Upload würde bei der Umsetzung
          ergänzt.
        </small>
      </div>
      <div className="landscape-form-bottom">
        <Button className="landscape-submit" type="submit">
          Demo-Anfrage prüfen <span aria-hidden="true">↗</span>
        </Button>
        <a href="/datenschutz/">Datenschutzhinweise</a>
      </div>
      <output aria-live="polite">
        {complete && (
          <span className="landscape-success">
            Beispiel vollständig. In einer echten Website würde die Anfrage
            jetzt an den Gartenbaubetrieb übermittelt.
          </span>
        )}
      </output>
    </form>
  );
}
