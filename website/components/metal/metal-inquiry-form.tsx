/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

export function MetalInquiryForm({
  initialProject = 'Noch offen',
}: {
  initialProject?: string;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <form
      className="metal-inquiry"
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
        ) {
          field.setCustomValidity('');
        }
      }}
    >
      <p className="metal-form-note">
        Demo-Anfrage: Bitte nur Beispieldaten verwenden. Es wird nichts
        versendet oder gespeichert.
      </p>
      <div className="metal-field">
        <label htmlFor="metal-project">Projektart</label>
        <NativeSelect
          id="metal-project"
          name="project"
          defaultValue={initialProject}
        >
          <option>Noch offen</option>
          <option>Blechbearbeitung</option>
          <option>Schweißbaugruppen</option>
          <option>Sonderkonstruktionen</option>
        </NativeSelect>
      </div>
      <div className="metal-form-row">
        <div className="metal-field">
          <label htmlFor="metal-name">
            Name <span>(Pflichtfeld)</span>
          </label>
          <Input
            id="metal-name"
            name="name"
            autoComplete="off"
            minLength={2}
            maxLength={100}
            required
            placeholder="Max Beispiel"
          />
        </div>
        <div className="metal-field">
          <label htmlFor="metal-quantity">
            Menge <span>(optional)</span>
          </label>
          <Input
            id="metal-quantity"
            name="quantity"
            autoComplete="off"
            maxLength={80}
            placeholder="z. B. Einzelteil oder 25 Stück"
          />
        </div>
      </div>
      <div className="metal-field">
        <label htmlFor="metal-message">
          Bauteil oder Vorhaben <span>(Pflichtfeld)</span>
        </label>
        <Textarea
          id="metal-message"
          name="message"
          minLength={10}
          maxLength={3000}
          rows={6}
          required
          placeholder="Material, Abmessungen, Einsatzbereich und gewünschter Termin – soweit bereits bekannt."
        />
        <small>
          Mindestens 10 Zeichen. Ein echter Dateiupload würde bei der Umsetzung
          ergänzt.
        </small>
      </div>
      <div className="metal-form-bottom">
        <Button type="submit" className="metal-action">
          Demo-Anfrage prüfen <span aria-hidden="true">↗</span>
        </Button>
        <a href="/datenschutz/">Datenschutzhinweise</a>
      </div>
      <output aria-live="polite">
        {complete && (
          <span className="metal-success">
            Beispiel vollständig. In einer echten Website würde die Anfrage
            jetzt sicher an den Betrieb übermittelt.
          </span>
        )}
      </output>
    </form>
  );
}
