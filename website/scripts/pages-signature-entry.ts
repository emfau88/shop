import { bindSignatureState } from '../components/signature/signature-state-controller';
import { bindGruenraumExperience } from '../components/signature/gruenraum/gruenraum-experience';

type FarbformStage = 'wall' | 'floor' | 'light' | 'atmosphere';

const farbformColors = {
  aubergine: { label: 'Aubergine', effect: 'Tief · geborgen', note: 'Aubergine schafft Tiefe und einen warmen, geschützten Raumeindruck.' },
  salbei: { label: 'Salbei', effect: 'Ruhig · natürlich', note: 'Salbei verbindet eine ruhige Farbwirkung mit einer natürlichen, wohnlichen Leichtigkeit.' },
  mineral: { label: 'Mineral', effect: 'Klar · ausgewogen', note: 'Mineral wirkt zurückhaltend und bringt Möbel sowie Materialien ausgewogen zur Geltung.' },
  sand: { label: 'Sand', effect: 'Warm · zeitlos', note: 'Sand reflektiert viel Licht und erzeugt eine warme, zeitlose Basis für den Raum.' },
} as const;

type FarbformColor = keyof typeof farbformColors;

function bindFarbform(root: HTMLElement) {
  const interior = root.querySelector<HTMLElement>('.farbform-interior');
  const wallLayer = interior?.querySelector<HTMLImageElement>('.farbform-room-after img');
  const revealLayer = interior?.querySelector<HTMLElement>('.farbform-room-after');
  const divider = interior?.querySelector<HTMLElement>('.farbform-divider');
  const range = interior?.querySelector<HTMLInputElement>('.farbform-signature-compare-range input');
  const options = interior?.querySelector<HTMLElement>('.farbform-options');
  if (!interior || !wallLayer || !revealLayer || !divider || !range || !options) return;

  let color: FarbformColor = 'salbei';
  let floor = 'eiche';
  let light = 'day';
  const assetPath = new URL(wallLayer.src).pathname.replace(/farbform-wall-[^/]+\.webp$/, '');
  const comparisonElements = Array.from(interior.querySelectorAll<HTMLElement>('.farbform-signature-compare-label,.farbform-divider,.farbform-signature-compare-range'));

  const updateWall = (next: FarbformColor) => {
    color = next;
    wallLayer.src = `${assetPath}farbform-wall-${next}.webp`;
    wallLayer.srcset = `${assetPath}farbform-wall-${next}-mobile.webp 720w, ${assetPath}farbform-wall-${next}.webp 1448w`;
    const copy = farbformColors[next];
    const title = interior.querySelector<HTMLElement>('.farbform-hotspot--wall strong');
    const paragraph = interior.querySelector<HTMLElement>('.farbform-hotspot--wall p');
    if (title) title.innerHTML = `${copy.label} im Raum<small>${copy.effect}</small>`;
    if (paragraph) paragraph.innerHTML = `<b>Farbwirkung</b>${copy.note}<small>Oberfläche · matt-mineralisch</small>`;
  };

  const setReveal = (value: number) => {
    const width = `${value}%`;
    revealLayer.style.width = width;
    divider.style.left = width;
    range.setAttribute('aria-valuetext', `${value} Prozent Nachher-Ansicht`);
  };
  range.addEventListener('input', () => setReveal(Number(range.value)));

  const button = (label: string, pressed: boolean, action: () => void) => {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = label;
    element.setAttribute('aria-pressed', String(pressed));
    element.addEventListener('click', action);
    return element;
  };

  const renderOptions = (stage: FarbformStage) => {
    options.replaceChildren();
    if (stage === 'wall') {
      const group = document.createElement('div');
      group.className = 'farbform-swatches';
      group.setAttribute('aria-label', 'Wandfarbe wählen');
      for (const [id, copy] of Object.entries(farbformColors) as Array<[FarbformColor, (typeof farbformColors)[FarbformColor]]>) {
        const item = button(copy.label, color === id, () => { updateWall(id); renderOptions('wall'); });
        item.dataset.color = id;
        const swatch = document.createElement('span');
        swatch.setAttribute('aria-hidden', 'true');
        item.insertBefore(swatch, item.firstChild);
        group.appendChild(item);
      }
      options.appendChild(group);
      return;
    }

    const group = document.createElement('div');
    group.className = 'farbform-segmented';
    if (stage === 'floor') {
      group.setAttribute('aria-label', 'Boden auswählen');
      group.appendChild(button('Natureiche', floor === 'eiche', () => { floor = 'eiche'; interior.dataset.floor = floor; renderOptions(stage); }));
      group.appendChild(button('Helle Eiche', floor === 'kalk', () => { floor = 'kalk'; interior.dataset.floor = floor; renderOptions(stage); }));
    } else if (stage === 'light') {
      group.setAttribute('aria-label', 'Lichtstimmung auswählen');
      group.appendChild(button('Tageslicht', light === 'day', () => { light = 'day'; interior.dataset.light = light; renderOptions(stage); }));
      group.appendChild(button('Abendwarm', light === 'warm', () => { light = 'warm'; interior.dataset.light = light; renderOptions(stage); }));
    } else {
      group.setAttribute('aria-label', 'Raumatmosphäre auswählen');
      const apply = (nextColor: FarbformColor, nextFloor: string, nextLight: string) => {
        updateWall(nextColor); floor = nextFloor; light = nextLight;
        interior.dataset.floor = floor; interior.dataset.light = light;
        renderOptions(stage);
      };
      group.appendChild(button('Natürlich', color === 'salbei' && light === 'day', () => apply('salbei', 'eiche', 'day')));
      group.appendChild(button('Warm', color === 'sand' && light === 'warm', () => apply('sand', 'eiche', 'warm')));
      group.appendChild(button('Ausdrucksstark', color === 'aubergine' && light === 'warm', () => apply('aubergine', 'kalk', 'warm')));
    }
    options.appendChild(group);
  };

  root.addEventListener('signaturestatechange', (event) => {
    const stage = (event as CustomEvent<{ state?: FarbformStage }>).detail?.state ?? 'wall';
    const comparison = stage === 'wall' || stage === 'atmosphere';
    interior.dataset.stage = stage;
    comparisonElements.forEach((element) => { element.hidden = !comparison; });
    setReveal(comparison ? Number(range.value) : 100);
    renderOptions(stage);
  });

  root.querySelector<HTMLButtonElement>('.signature-story-video')?.addEventListener('click', async (event) => {
    const control = event.currentTarget as HTMLButtonElement;
    const video = control.querySelector('video');
    const indicator = control.querySelector('span');
    if (!video || !indicator) return;
    if (video.paused) { await video.play(); indicator.textContent = 'Ⅱ'; }
    else { video.pause(); indicator.textContent = '▶'; }
  });

  renderOptions('wall');
}

for (const root of document.querySelectorAll<HTMLElement>('[data-signature-page]')) {
  bindSignatureState(root);
  if (root.dataset.signatureBrand === 'farbform') bindFarbform(root);
  if (root.dataset.signatureBrand === 'grünraum') bindGruenraumExperience(root);
}
