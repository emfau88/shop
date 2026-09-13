import {
  createMetalViewer,
  metalStages,
} from '../components/metal/metal-viewer';

function initializeMetalViewer() {
  const canvas = document.querySelector<HTMLCanvasElement>(
    'canvas.metal-part-viewer',
  );
  const shell = document.querySelector<HTMLElement>('.metal-viewer-shell');
  if (!canvas || !shell || canvas.dataset.ready === 'true') return;

  const viewer = createMetalViewer(
    canvas,
    () => {
      shell.dataset.viewerStatus = 'ready';
    },
    () => {
      shell.dataset.viewerStatus = 'error';
    },
  );
  if (!viewer) {
    shell.dataset.viewerStatus = 'error';
    return;
  }

  const stageCopy = document.querySelector<HTMLElement>('.metal-lab-stage');
  const reset = document.querySelector<HTMLButtonElement>(
    '.metal-viewer-reset',
  );
  reset?.addEventListener('click', () => viewer.reset());

  document
    .querySelectorAll<HTMLButtonElement>('[data-metal-stage]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const index = metalStages.findIndex(
          (stage) => stage.id === button.dataset.metalStage,
        );
        if (index < 0) return;
        const stage = metalStages[index];
        viewer.setStage(stage.id);
        shell.dataset.active = stage.id;

        document
          .querySelectorAll<HTMLButtonElement>('[data-metal-stage]')
          .forEach((candidate) => {
            candidate.setAttribute(
              'aria-pressed',
              String(candidate === button),
            );
          });

        if (!stageCopy) return;
        const kicker = stageCopy.querySelector<HTMLElement>('.metal-kicker');
        const title = stageCopy.querySelector<HTMLElement>('h2');
        const text = stageCopy.querySelector<HTMLElement>(
          'p:not(.metal-kicker)',
        );
        const facts = stageCopy.querySelector<HTMLUListElement>('ul');
        if (kicker) kicker.textContent = `${stage.number} / ${stage.eyebrow}`;
        if (title) title.textContent = stage.title;
        if (text) text.textContent = stage.text;
        if (facts) {
          facts.setAttribute(
            'aria-label',
            `${stage.label}: technische Merkmale`,
          );
          facts.replaceChildren(
            ...stage.facts.map((fact) => {
              const item = document.createElement('li');
              item.textContent = fact;
              return item;
            }),
          );
        }
      });
    });

  window.addEventListener('pagehide', () => viewer.dispose(), { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMetalViewer, {
    once: true,
  });
} else {
  initializeMetalViewer();
}
