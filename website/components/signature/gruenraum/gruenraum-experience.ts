import type { SignatureCleanup } from '../signature-state-controller';

export function bindGruenraumExperience(root: HTMLElement): SignatureCleanup {
  const project = root.querySelector<HTMLElement>('[data-gruenraum-project]');
  if (!project) return () => undefined;

  const details = Array.from(
    project.querySelectorAll<HTMLDetailsElement>('.gruenraum-hotspot'),
  );
  const cleanups: SignatureCleanup[] = [];

  for (const item of details) {
    const onToggle = () => {
      if (!item.open) return;
      for (const sibling of details) {
        if (sibling !== item) sibling.open = false;
      }
    };
    item.addEventListener('toggle', onToggle);
    cleanups.push(() => item.removeEventListener('toggle', onToggle));
  }

  const closeDetails = () => {
    for (const item of details) item.open = false;
  };
  const onStateChange = () => closeDetails();
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    const openItem = details.find((item) => item.open);
    if (!openItem) return;
    openItem.open = false;
    openItem.querySelector<HTMLElement>('summary')?.focus();
  };

  root.addEventListener('signaturestatechange', onStateChange);
  root.addEventListener('keydown', onKeydown);
  cleanups.push(() =>
    root.removeEventListener('signaturestatechange', onStateChange),
  );
  cleanups.push(() => root.removeEventListener('keydown', onKeydown));

  return () => cleanups.forEach((cleanup) => cleanup());
}
