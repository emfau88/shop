type Occasion = 'family' | 'wedding' | 'business' | 'rooms';

export {};

const occasions = {
  family: {
    eyebrow: 'Vertraut zusammenkommen',
    title: 'Ein Tisch für alle Generationen.',
    description:
      'Eine lange Tafel, Essen zum Teilen und genug Zeit für die Gespräche zwischen den Gängen.',
    configuration: 'Lange Tafel · Beispiel bis 30 Personen',
    detail: 'Menü oder geteilte Gerichte',
    cta: 'Familienfeier anfragen',
    href: '/konzept/gastronomie/reservieren/?anlass=Familienfeier',
    image: '/images/gastronomie/gesellschaft.webp',
    mobileImage: '/images/gastronomie/gesellschaft-480.webp',
    tabletImage: '/images/gastronomie/gesellschaft-960.webp',
    alt: 'Erwachsene Gäste verschiedener Generationen an einer langen Tafel',
    width: 1536,
    height: 1024,
  },
  wedding: {
    eyebrow: 'Festlich, nicht steif',
    title: 'Ein besonderer Tag mit Raum zum Ankommen.',
    description:
      'Kerzenlicht, eine persönlich gedeckte Tafel und ein Ablauf, der zum Paar statt zu einem Schema passt.',
    configuration: 'Festliche Tafel · Beispielkonfiguration',
    detail: 'Raum, Menü und Ablauf gemeinsam geplant',
    cta: 'Hochzeit besprechen',
    href: '/konzept/gastronomie/reservieren/?anlass=Hochzeit',
    image: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    mobileImage:
      '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
    tabletImage: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    alt: 'Festlich gedeckte Eichentafel in einem warm beleuchteten Restaurant',
    width: 1680,
    height: 1260,
  },
  business: {
    eyebrow: 'Begegnung mit Charakter',
    title: 'Ein ruhiger Rahmen für gute Gespräche.',
    description:
      'Offene Küche, flexible Tischgruppen und ein Menü, das den Abend zusammenhält, ohne ihn zu dominieren.',
    configuration: 'Tischgruppen · Beispielkonfiguration',
    detail: 'Für Teams, Kundschaft und Jubiläen',
    cta: 'Firmenabend planen',
    href: '/konzept/gastronomie/reservieren/?anlass=Geschäftsessen',
    image: '/images/gastronomie/gastraum.webp',
    mobileImage: '/images/gastronomie/gastraum-480.webp',
    tabletImage: '/images/gastronomie/gastraum-960.webp',
    alt: 'Warm beleuchteter Gastraum mit offener Küche und erwachsenen Gästen',
    width: 1536,
    height: 1024,
  },
  rooms: {
    eyebrow: 'Haus mit Möglichkeiten',
    title: 'Gaststube, Garten und die lange Tafel.',
    description:
      'Jeder Bereich hat einen eigenen Rhythmus. Gemeinsam bleiben natürliche Materialien, warmes Licht und die Nähe zur Küche.',
    configuration: 'Verschiedene Bereiche · unverbindliches Beispiel',
    detail: 'Gaststube · Garten · Gesellschaft',
    cta: 'Räume kennenlernen',
    href: '/konzept/gastronomie/haus/',
    image: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    mobileImage:
      '/assets/signature/lindenwirt/lindenwirt-event-room-mobile.webp',
    tabletImage: '/assets/signature/lindenwirt/lindenwirt-event-room.webp',
    alt: 'Warmer Restaurantbereich mit gedeckter Tafel, Holz und Naturstein',
    width: 1680,
    height: 1260,
  },
} as const;

function setText(root: HTMLElement, selector: string, value: string) {
  const element = root.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
}

function withPageBase(path: string) {
  return `${window.location.pathname.startsWith('/shop/') ? '/shop' : ''}${path}`;
}

function bindLindenwirt(root: HTMLElement) {
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-lw-occasion]'),
  );
  const picture = root.querySelector<HTMLPictureElement>(
    '[data-lw-occasion-picture]',
  );
  const sources = picture?.querySelectorAll<HTMLSourceElement>('source');
  const image = picture?.querySelector<HTMLImageElement>('img');
  const cta = root.querySelector<HTMLAnchorElement>('[data-lw-cta]');

  function setOccasion(occasion: Occasion, focus = false) {
    const data = occasions[occasion];
    root.dataset.occasion = occasion;

    for (const button of buttons) {
      const active = button.dataset.lwOccasion === occasion;
      button.setAttribute('aria-pressed', String(active));
      if (active && focus) button.focus();
    }

    if (sources?.[0]) sources[0].srcset = withPageBase(data.mobileImage);
    if (sources?.[1]) sources[1].srcset = withPageBase(data.tabletImage);
    if (image) {
      image.src = withPageBase(data.image);
      image.alt = data.alt;
      image.width = data.width;
      image.height = data.height;
    }

    setText(root, '[data-lw-eyebrow]', data.eyebrow);
    setText(root, '[data-lw-title]', data.title);
    setText(root, '[data-lw-description]', data.description);
    setText(root, '[data-lw-configuration]', data.configuration);
    setText(root, '[data-lw-detail]', data.detail);
    setText(root, '[data-lw-cta-label]', data.cta);
    if (cta) cta.href = withPageBase(data.href);
  }

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const occasion = button.dataset.lwOccasion;
      if (occasion && occasion in occasions) {
        setOccasion(occasion as Occasion);
      }
    });
  }

  const controls = root.querySelector<HTMLElement>('.lw-occasion-controls');
  controls?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const activeIndex = buttons.findIndex(
      (button) => button.getAttribute('aria-pressed') === 'true',
    );
    let nextIndex = activeIndex;
    if (event.key === 'ArrowLeft') nextIndex = Math.max(0, activeIndex - 1);
    if (event.key === 'ArrowRight')
      nextIndex = Math.min(buttons.length - 1, activeIndex + 1);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = buttons.length - 1;
    const occasion = buttons[nextIndex]?.dataset.lwOccasion;
    if (!occasion || !(occasion in occasions)) return;
    event.preventDefault();
    setOccasion(occasion as Occasion, true);
  });
}

for (const root of document.querySelectorAll<HTMLElement>(
  '[data-signature-brand="lindenwirt"]',
)) {
  bindLindenwirt(root);
}
