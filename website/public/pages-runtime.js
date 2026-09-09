(() => {
  const menus = [
    ['.menu-toggle', '.nav'],
    ['.metal-menu-toggle', '.metal-nav'],
    ['.landscape-menu-toggle', '.landscape-nav'],
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
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });
  }

  const queryMappings = [
    ['.inquiry select[name="service"]', 'leistung'],
    ['.metal-inquiry select[name="project"]', 'projekt'],
    ['.landscape-inquiry select[name="topic"]', 'thema'],
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
      message: 'Beispiel vollständig. Der Ablauf ist vorbereitet; in dieser Vorschau werden keine Daten versendet.',
    },
    {
      selector: '.metal-inquiry',
      successClass: 'metal-success',
      message: 'Beispiel vollständig. In einer echten Website würde die Anfrage jetzt sicher an den Betrieb übermittelt.',
    },
    {
      selector: '.landscape-inquiry',
      successClass: 'landscape-success',
      message: 'Beispiel vollständig. In einer echten Website würde die Anfrage jetzt an den Gartenbaubetrieb übermittelt.',
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
