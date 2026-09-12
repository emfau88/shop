(() => {
  const menus = [
    ['.menu-toggle', '.nav'],
    ['.metal-menu-toggle', '.metal-nav'],
    ['.landscape-menu-toggle', '.landscape-nav'],
    ['.sport-menu-toggle', '.sport-nav'],
    ['.gastro-menu-toggle', '.gastro-nav'],
  ];

  for (const [buttonSelector, navigationSelector] of menus) {
    const button = document.querySelector(buttonSelector);
    const navigation = document.querySelector(navigationSelector);
    if (!button || !navigation) continue;

    const setOpen = (open) => {
      navigation.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? 'Schließen ×' : 'Menü +';
    };

    button.addEventListener('click', () => {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        button.getAttribute('aria-expanded') === 'true'
      ) {
        setOpen(false);
        button.focus();
      }
    });
  }

  const metalStages = {
    drawing: {
      number: '01',
      label: 'Zeichnung',
      eyebrow: 'Eingangsdaten',
      title: 'Die Fertigung beginnt mit einer lesbaren Vorgabe.',
      text: 'DXF, STEP, PDF oder ein Musterteil geben Kontur, Bezug und offenen Klärungsbedarf vor.',
      facts: ['DXF · STEP · PDF', 'Materialstärke', 'Bezugskanten'],
    },
    manufacturing: {
      number: '02',
      label: 'Fertigung',
      eyebrow: 'Bearbeitungsfolge',
      title: 'Aus Daten wird ein kontrollierter Arbeitsweg.',
      text: 'Material, Maß, Toleranz und Reihenfolge werden so abgestimmt, dass das Bauteil später sicher weiterverarbeitet werden kann.',
      facts: ['Stahl · Edelstahl · Aluminium', 'Maß / Toleranz', 'Prüfpunkt'],
    },
    component: {
      number: '03',
      label: 'Bauteil',
      eyebrow: 'Übergabe',
      title: 'Das Ergebnis muss an seinem Einsatzort stimmen.',
      text: 'Geometrie, Oberfläche und vereinbarter Umfang werden vor der Übergabe gegen die Projektvorgabe abgeglichen.',
      facts: ['Kontur geprüft', 'Oberfläche definiert', 'Lieferumfang klar'],
    },
  };
  const metalStage = document.querySelector('.metal-sequence-stage');
  const metalStageCopy = metalStage?.querySelector('.metal-sequence-copy');
  for (const button of document.querySelectorAll('[data-metal-stage]')) {
    button.addEventListener('click', () => {
      const selected = button.dataset.metalStage;
      const stage = metalStages[selected];
      if (!stage || !metalStage || !metalStageCopy) return;
      for (const candidate of document.querySelectorAll('[data-metal-stage]')) {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      }
      metalStage.dataset.active = selected;
      const [kicker, title, text, facts] = metalStageCopy.children;
      kicker.textContent = `${stage.number} / ${stage.eyebrow}`;
      title.textContent = stage.title;
      text.textContent = stage.text;
      facts.setAttribute('aria-label', `${stage.label}: technische Merkmale`);
      facts.replaceChildren(
        ...stage.facts.map((fact) => {
          const item = document.createElement('li');
          item.textContent = fact;
          return item;
        }),
      );
    });
  }

  const farbformMoods = {
    aubergine: [
      'Aubergine',
      'Aubergine 42 · Matt · warmes Tageslicht',
      'raum-aubergine',
    ],
    salbei: [
      'Salbei',
      'Salbei 18 · Matt · gedämpftes Tageslicht',
      'raum-salbei',
    ],
    mineral: [
      'Mineral',
      'Mineral 06 · Matt · weicher Steincharakter',
      'raum-mineral',
    ],
  };
  const moodStage = document.querySelector('.farbform-mood-stage');
  const moodImage = moodStage?.querySelector('img');
  const moodNote = moodStage?.querySelector('.farbform-mood-controls > span');
  for (const button of document.querySelectorAll('[data-farbform-mood]')) {
    button.addEventListener('click', () => {
      const selected = button.dataset.farbformMood;
      const mood = farbformMoods[selected];
      if (!mood || !moodImage || !moodNote) return;
      for (const candidate of document.querySelectorAll(
        '[data-farbform-mood]',
      )) {
        candidate.setAttribute('aria-pressed', String(candidate === button));
      }
      const imagePath = `/shop/images/${mood[2]}`;
      moodImage.src = `${imagePath}.webp`;
      moodImage.srcset = `${imagePath}-480.webp 480w, ${imagePath}-960.webp 960w, ${imagePath}.webp 1536w`;
      moodImage.alt = `Wohnraum in der Farbwelt ${mood[0]}`;
      moodNote.textContent = mood[1];
    });
  }

  const compare = document.querySelector('.farbform-compare');
  const compareRange = compare?.querySelector('input[type="range"]');
  compareRange?.addEventListener('input', () => {
    compare.style.setProperty('--reveal', `${compareRange.value}%`);
    compareRange.setAttribute(
      'aria-valuetext',
      `${compareRange.value} Prozent Nachher-Ansicht`,
    );
  });

  const gardenPhases = {
    bestand: {
      number: '01',
      label: 'Bestand',
      title: 'Ein Hang, der zum Haus drängt.',
      text: 'Verdichteter Boden und fehlende Gefälle führten Wasser zum Haus. Der Hang blieb im Alltag kaum nutzbar und ein schattiger Sitzplatz fehlte.',
      facts: [
        '420 m² Hanglage',
        'Verdichteter Boden',
        'Wasserführung zum Haus',
      ],
      image: 'regengarten',
      alt: 'Naturnaher Regengarten als Ausgangssituation des Projekts',
    },
    entwurf: {
      number: '02',
      label: 'Entwurf',
      title: 'Wasser bekommt einen Weg.',
      text: 'Eine klare Folge aus Mulden, durchlässigen Wegen und ruhigen Aufenthaltsorten verbindet Haus, Hang und Grundstücksgrenze.',
      facts: [
        'Mulden und Retentionsflächen',
        'Wegeschleife zum Sitzplatz',
        'Schatten durch Gehölze',
      ],
      image: 'plan',
    },
    umsetzung: {
      number: '03',
      label: 'Umsetzung',
      title: 'Materialien bauen den Übergang.',
      text: 'Naturstein, Holz und Kies machen Niveauunterschiede begehbar. Unterbau und Kanten halten die Wege offen und dauerhaft.',
      facts: [
        'Naturstein · Holz · Kies',
        'Durchlässiger Unterbau',
        'Saubere Kantenführung',
      ],
      image: 'pflaster-detail',
      alt: 'Ausführung einer Natursteinkante entlang eines Gartenwegs',
    },
    ergebnis: {
      number: '04',
      label: 'Ergebnis',
      title: 'Ein Garten, der Regen weiterdenkt.',
      text: 'Neue Wege erschließen den ganzen Hang. Stauden und Gehölze schaffen Schatten, und das Regenwasser bleibt als Teil des Ortes im Garten.',
      facts: [
        'Regenwasser im Garten',
        'Sitzplatz im Schatten',
        'Planung und Ausführung',
      ],
      image: 'garten',
      alt: 'Fertiger Wohngarten mit Natursteinterrasse und dichter Bepflanzung',
    },
  };
  const gardenStage = document.querySelector('.landscape-journey-stage');
  const gardenVisual = gardenStage?.querySelector('.landscape-journey-visual');
  const gardenCopy = gardenStage?.querySelector('.landscape-journey-copy');
  for (const button of document.querySelectorAll('[data-garden-phase]')) {
    button.addEventListener('click', () => {
      const selected = button.dataset.gardenPhase;
      const phase = gardenPhases[selected];
      if (!phase || !gardenStage || !gardenVisual || !gardenCopy) return;
      for (const candidate of document.querySelectorAll(
        '[data-garden-phase]',
      )) {
        candidate.setAttribute('aria-selected', String(candidate === button));
      }
      gardenStage.id = `garden-phase-${selected}`;
      gardenStage.setAttribute('aria-labelledby', `garden-tab-${selected}`);
      if (phase.image === 'plan') {
        gardenVisual.innerHTML = `<svg viewBox="0 0 800 560" aria-label="Reduzierter Entwurfsplan für Garten 07"><path class="landscape-plan-boundary" d="M80 89 689 64 739 465 120 501Z"></path><path class="landscape-plan-house" d="M104 119 315 109 330 255 121 270Z"></path><path class="landscape-plan-path" d="M317 280C415 250 478 160 659 153M317 280c87 19 94 143 250 151M350 328c63-20 139 8 179 58"></path><path class="landscape-plan-water" d="M364 376c70-57 188-38 240 30-84 45-180 47-240-30Z"></path><circle class="landscape-plan-tree" cx="576" cy="215" r="47"></circle><circle class="landscape-plan-tree" cx="664" cy="330" r="58"></circle><text x="128" y="160">HAUS</text><text x="427" y="184">WEG</text><text x="426" y="421">MULDE</text></svg>`;
      } else {
        const sourceWidth = phase.image === 'pflaster-detail' ? 1448 : 1536;
        const sourceHeight = phase.image === 'pflaster-detail' ? 1086 : 1024;
        const imagePath = `/shop/images/galabau/${phase.image}`;
        gardenVisual.innerHTML = `<figure class="landscape-photo landscape-photo-${phase.image}"><div class="landscape-photo-frame"><img height="${sourceHeight}" alt="${phase.alt}" loading="lazy" fetchpriority="auto" src="${imagePath}.webp" srcset="${imagePath}-480.webp 480w, ${imagePath}-960.webp 960w, ${imagePath}.webp ${sourceWidth}w" sizes="(max-width: 850px) 100vw, 68vw" width="${sourceWidth}" decoding="async"></div></figure>`;
      }
      const [number, title, text, facts] = gardenCopy.children;
      number.textContent = phase.number;
      title.textContent = phase.title;
      text.textContent = phase.text;
      facts.replaceChildren(
        ...phase.facts.map((fact) => {
          const item = document.createElement('li');
          item.textContent = fact;
          return item;
        }),
      );
    });
  }

  const sportModes = {
    Tennis: {
      slug: 'tennis',
      time: 'MI · 17:30',
      title: 'Tennis · Startklar',
      line: 'Techniktraining für Einsteiger',
      width: 1448,
      height: 1086,
      alt: 'Zwei Vereinsmitglieder bei einem Tennisballwechsel auf einem roten Sandplatz',
    },
    Badminton: {
      slug: 'badminton',
      time: 'DI · 18:00',
      title: 'Badminton · Freies Doppel',
      line: 'Offenes Spiel für Erwachsene',
      width: 1536,
      height: 1024,
      alt: 'Vereinsspieler bei einem dynamischen Badminton-Doppel in einer hellen Sporthalle',
    },
  };
  const sportHero = document.querySelector('.sport-mode-hero');
  const sportModeButtons = document.querySelectorAll('[data-sport-mode]');
  const sportFilters = document.querySelectorAll('[data-sport-filter]');
  const sportSessions = document.querySelectorAll('[data-sport-tags]');

  function applySportFilter(selected) {
    for (const candidate of sportFilters) {
      candidate.setAttribute(
        'aria-pressed',
        String(candidate.dataset.sportFilter === selected),
      );
    }
    for (const session of sportSessions) {
      const tags = session.dataset.sportTags?.split(' ') || [];
      session.hidden = selected !== 'Alle' && !tags.includes(selected);
    }
  }

  function applySportMode(selected) {
    const mode = sportModes[selected];
    if (!mode || !sportHero) return;
    for (const candidate of sportModeButtons) {
      candidate.setAttribute(
        'aria-pressed',
        String(candidate.dataset.sportMode === selected),
      );
    }
    sportHero.classList.remove('is-tennis', 'is-badminton');
    sportHero.classList.add(`is-${mode.slug}`);
    const copy = sportHero.querySelector('.sport-mode-copy');
    const paragraphs = copy.querySelectorAll(':scope > p');
    copy.querySelector('.sport-mode-time').textContent = mode.time;
    copy.querySelector('h1').textContent = mode.title;
    paragraphs[2].textContent = `${mode.line}. Wähle deinen Sport und finde den nächsten passenden Ballwechsel.`;
    const link = copy.querySelector('.sport-link');
    link.href = `/shop/konzept/sportverein/probetraining/?sport=${selected}`;
    link.innerHTML = `${selected} ausprobieren <span aria-hidden="true">↗</span>`;
    const figure = sportHero.querySelector('.sport-photo');
    const image = figure.querySelector('img');
    figure.className = `sport-photo sport-photo-${mode.slug}`;
    const imagePath = `/shop/images/sportverein/${mode.slug}`;
    image.src = `${imagePath}.webp`;
    image.srcset = `${imagePath}-480.webp 480w, ${imagePath}-960.webp 960w, ${imagePath}.webp ${mode.width}w`;
    image.width = mode.width;
    image.height = mode.height;
    image.alt = mode.alt;
    applySportFilter(selected);
  }

  for (const button of sportModeButtons) {
    button.addEventListener('click', () =>
      applySportMode(button.dataset.sportMode),
    );
  }
  for (const button of sportFilters) {
    button.addEventListener('click', () => {
      const selected = button.dataset.sportFilter;
      if (sportModes[selected]) applySportMode(selected);
      else applySportFilter(selected);
    });
  }

  const queryMappings = [
    ['.inquiry select[name="service"]', 'leistung'],
    ['.metal-inquiry select[name="project"]', 'projekt'],
    ['.landscape-inquiry select[name="topic"]', 'thema'],
    ['.sport-inquiry select[name="sport"]', 'sport'],
    ['.gastro-inquiry select[name="occasion"]', 'anlass'],
  ];
  const search = new URLSearchParams(window.location.search);
  for (const [selector, parameter] of queryMappings) {
    const select = document.querySelector(selector);
    const requestedValue = search.get(parameter);
    if (!select || !requestedValue) continue;
    if ([...select.options].some((option) => option.value === requestedValue)) {
      select.value = requestedValue;
    }
  }

  const forms = [
    {
      selector: '.inquiry',
      successClass: 'success',
      message:
        'Beispiel vollständig. Der Ablauf ist vorbereitet; in dieser Vorschau werden keine Daten versendet.',
    },
    {
      selector: '.metal-inquiry',
      successClass: 'metal-success',
      message:
        'Beispiel vollständig. In einer echten Website würde die Anfrage jetzt sicher an den Betrieb übermittelt.',
    },
    {
      selector: '.landscape-inquiry',
      successClass: 'landscape-success',
      message:
        'Beispiel vollständig. In einer echten Website würde die Anfrage jetzt an den Gartenbaubetrieb übermittelt.',
    },
    {
      selector: '.sport-inquiry',
      successClass: 'sport-success',
      message:
        'Beispiel vollständig. In einer echten Vereinswebsite würde die Anfrage jetzt an das passende Trainingsteam gehen.',
    },
    {
      selector: '.gastro-inquiry',
      successClass: 'gastro-success',
      message:
        'Reservierungsbeispiel vollständig. In einer echten Restaurantwebsite würde die Anfrage jetzt an das Team übermittelt.',
    },
  ];

  for (const config of forms) {
    for (const form of document.querySelectorAll(config.selector)) {
      const output = form.querySelector('output');
      form.addEventListener('input', () => {
        if (output) output.replaceChildren();
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.elements.namedItem('name');
        const message = form.elements.namedItem('message');
        name?.setCustomValidity(
          name.value.trim().length < 2
            ? 'Bitte geben Sie mindestens zwei Zeichen ein.'
            : '',
        );
        message?.setCustomValidity(
          message.value.trim().length < 10
            ? 'Bitte beschreiben Sie das Vorhaben mit mindestens zehn Zeichen.'
            : '',
        );
        if (!form.reportValidity() || !output) return;
        const result = document.createElement('span');
        result.className = config.successClass;
        result.textContent = config.message;
        output.replaceChildren(result);
      });
    }
  }
})();
