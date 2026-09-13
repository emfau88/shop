import { initializeWerkformScene } from '../components/signature/werkform/werkform-scene';

function initialize() {
  const root = document.querySelector<HTMLElement>('[data-signature-brand="werkform"]');
  if (!root) return;
  const dispose = initializeWerkformScene(root);
  window.addEventListener('pagehide', dispose, { once: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
else initialize();

