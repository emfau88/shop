type AufschlagMode = 'tennis' | 'badminton';
type AufschlagFilter = 'alle' | AufschlagMode | 'jugend';

const modes = {
  tennis: {
    label: 'Tennis',
    image: 'tennis',
    imageWidth: 1448,
    imageHeight: 1086,
    alt: 'Zwei erwachsene Vereinsmitglieder bei einem Tennisballwechsel auf einem roten Sandplatz',
    eyebrow: 'Heute · Court 03',
    time: '17:30',
    session: 'Startklar',
    detail: 'Techniktraining · Einsteiger',
    cta: 'Tennis ausprobieren',
    visualLabel: 'Sand · Außenplatz',
  },
  badminton: {
    label: 'Badminton',
    image: 'badminton',
    imageWidth: 1536,
    imageHeight: 1024,
    alt: 'Vereinsspieler bei einem dynamischen Badminton-Doppel in einer hellen Sporthalle',
    eyebrow: 'Heute · Halle 02',
    time: '18:00',
    session: 'Freies Doppel',
    detail: 'Offenes Spiel · Erwachsene',
    cta: 'Badminton ausprobieren',
    visualLabel: 'Parkett · Sporthalle',
  },
} as const;

function setText(root: HTMLElement, selector: string, value: string) {
  const element = root.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
}

function updatePicture(
  picture: HTMLPictureElement | null,
  mode: AufschlagMode,
) {
  const image = picture?.querySelector<HTMLImageElement>('img');
  if (!picture || !image) return;
  const data = modes[mode];
  const assetBase = new URL(image.src).pathname.replace(/[^/]+$/, '');
  const sources = picture.querySelectorAll<HTMLSourceElement>('source');
  if (sources[0]) sources[0].srcset = `${assetBase}${data.image}-480.webp`;
  if (sources[1]) sources[1].srcset = `${assetBase}${data.image}-960.webp`;
  image.src = `${assetBase}${data.image}.webp`;
  image.alt = data.alt;
  image.width = data.imageWidth;
  image.height = data.imageHeight;
}

function bindAufschlag(root: HTMLElement) {
  const modeButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-as-mode]'),
  );
  const filterButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-as-filter]'),
  );
  const sessions = Array.from(
    root.querySelectorAll<HTMLElement>('[data-as-tags]'),
  );
  const heroPicture = root.querySelector<HTMLPictureElement>(
    '.as-hero-visual picture',
  );
  const returnPicture =
    root.querySelector<HTMLPictureElement>('.as-return-photo');
  const now = root.querySelector<HTMLElement>('.as-now');
  const cta = root.querySelector<HTMLAnchorElement>('[data-as-now-cta]');
  const trialPath = cta ? new URL(cta.href).pathname : '';

  function setFilter(filter: AufschlagFilter) {
    for (const button of filterButtons) {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.asFilter === filter),
      );
    }
    for (const session of sessions) {
      const tags = session.dataset.asTags?.split(' ') ?? [];
      session.hidden = filter !== 'alle' && !tags.includes(filter);
    }
  }

  function setMode(mode: AufschlagMode, syncFilter = true) {
    const data = modes[mode];
    root.dataset.mode = mode;
    for (const button of modeButtons) {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.asMode === mode),
      );
    }
    updatePicture(heroPicture, mode);
    updatePicture(returnPicture, mode === 'tennis' ? 'badminton' : 'tennis');
    setText(root, '[data-as-visual-label]', data.visualLabel);
    setText(root, '[data-as-now-eyebrow]', data.eyebrow);
    setText(root, '[data-as-now-time]', data.time);
    setText(root, '[data-as-now-session]', data.session);
    setText(root, '[data-as-now-detail]', data.detail);
    if (now) now.setAttribute('aria-label', `Nächstes ${data.label}-Training`);
    if (cta) {
      cta.href = `${trialPath}?sport=${data.label}`;
      cta.firstChild?.remove();
      cta.prepend(`${data.cta} `);
    }
    if (syncFilter) setFilter(mode);
  }

  for (const button of modeButtons) {
    button.addEventListener('click', () => {
      const mode = button.dataset.asMode;
      if (mode === 'tennis' || mode === 'badminton') setMode(mode);
    });
  }
  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      const filter = button.dataset.asFilter;
      if (
        filter !== 'alle' &&
        filter !== 'tennis' &&
        filter !== 'badminton' &&
        filter !== 'jugend'
      ) {
        return;
      }
      setFilter(filter);
      if (filter === 'tennis' || filter === 'badminton') {
        setMode(filter, false);
      }
    });
  }
}

for (const root of document.querySelectorAll<HTMLElement>(
  '[data-signature-brand="aufschlag"]',
)) {
  bindAufschlag(root);
}
