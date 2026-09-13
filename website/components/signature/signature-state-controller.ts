export type SignatureCleanup = () => void;

function setState(root: HTMLElement, button: HTMLButtonElement) {
  const state = button.dataset.signatureStateTarget;
  if (!state) return;
  root.dataset.signatureState = state;
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-signature-state-target]'));
  for (const item of buttons) {
    const active = item === button;
    item.setAttribute('aria-pressed', String(active));
    item.tabIndex = active ? 0 : -1;
  }
  const eyebrow = root.querySelector<HTMLElement>('[data-signature-stage-eyebrow]');
  const description = root.querySelector<HTMLElement>('[data-signature-stage-description]');
  if (eyebrow) eyebrow.textContent = button.dataset.signatureEyebrow ?? '';
  if (description) description.textContent = button.dataset.signatureDescription ?? '';
  root.dispatchEvent(new CustomEvent('signaturestatechange', { detail: { state } }));
}

export function bindSignatureState(root: HTMLElement): SignatureCleanup {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-signature-state-target]'));
  const cleanups: SignatureCleanup[] = [];
  buttons.forEach((button, index) => {
    const activate = () => setState(root, button);
    const keydown = (event: KeyboardEvent) => {
      let target = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[target].focus();
      setState(root, buttons[target]);
    };
    button.addEventListener('click', activate);
    button.addEventListener('keydown', keydown);
    cleanups.push(() => {
      button.removeEventListener('click', activate);
      button.removeEventListener('keydown', keydown);
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}

