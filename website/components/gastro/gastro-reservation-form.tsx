/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation keeps every route independently renderable. */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

export function GastroReservationForm({
  initialOccasion = 'Abendessen',
}: {
  initialOccasion?: string;
}) {
  const [complete, setComplete] = useState(false);
  return (
    <form
      className="gastro-inquiry"
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
            ? 'Bitte ergänzen Sie mindestens zehn Zeichen.'
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
      <p className="gastro-form-note">
        Demo-Reservierung: Bitte nur Beispieldaten verwenden. Es wird nichts
        versendet oder gespeichert.
      </p>
      <div className="gastro-form-row">
        <div className="gastro-field">
          <label htmlFor="gastro-date">Datum</label>
          <Input id="gastro-date" name="date" type="date" required />
        </div>
        <div className="gastro-field">
          <label htmlFor="gastro-time">Uhrzeit</label>
          <NativeSelect
            id="gastro-time"
            name="time"
            defaultValue="19:00"
            required
          >
            <option>17:30</option>
            <option>18:00</option>
            <option>18:30</option>
            <option>19:00</option>
            <option>19:30</option>
            <option>20:00</option>
          </NativeSelect>
        </div>
      </div>
      <div className="gastro-form-row">
        <div className="gastro-field">
          <label htmlFor="gastro-guests">Personen</label>
          <NativeSelect
            id="gastro-guests"
            name="guests"
            defaultValue="2 Personen"
          >
            <option>1 Person</option>
            <option>2 Personen</option>
            <option>3 Personen</option>
            <option>4 Personen</option>
            <option>5 Personen</option>
            <option>6 Personen</option>
            <option>7+ Personen</option>
          </NativeSelect>
        </div>
        <div className="gastro-field">
          <label htmlFor="gastro-occasion">Anlass</label>
          <NativeSelect
            id="gastro-occasion"
            name="occasion"
            defaultValue={initialOccasion}
          >
            <option>Abendessen</option>
            <option>Mittagessen</option>
            <option>Familienfeier</option>
            <option>Geschäftsessen</option>
          </NativeSelect>
        </div>
      </div>
      <div className="gastro-field">
        <label htmlFor="gastro-name">Name</label>
        <Input
          id="gastro-name"
          name="name"
          required
          minLength={2}
          maxLength={100}
          autoComplete="off"
          placeholder="Maria Beispiel"
        />
      </div>
      <div className="gastro-field">
        <label htmlFor="gastro-email">E-Mail</label>
        <Input
          id="gastro-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="off"
          placeholder="maria@example.de"
        />
      </div>
      <div className="gastro-field">
        <label htmlFor="gastro-message">Wünsche oder Hinweise</label>
        <Textarea
          id="gastro-message"
          name="message"
          required
          minLength={10}
          maxLength={1200}
          rows={4}
          placeholder="Zum Beispiel: Wir wünschen einen ruhigen Tisch am Fenster."
        />
        <small>Mindestens 10 Zeichen.</small>
      </div>
      <div className="gastro-form-bottom">
        <Button type="submit" className="gastro-submit">
          Demo-Anfrage prüfen <span aria-hidden="true">→</span>
        </Button>
        <a href="/datenschutz/">Datenschutzhinweise</a>
      </div>
      <output aria-live="polite">
        {complete && (
          <span className="gastro-success">
            Reservierungsbeispiel vollständig. In einer echten Restaurantwebsite
            würde die Anfrage jetzt an das Team übermittelt.
          </span>
        )}
      </output>
    </form>
  );
}
