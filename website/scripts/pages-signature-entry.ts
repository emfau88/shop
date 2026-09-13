import { bindSignatureState } from '../components/signature/signature-state-controller';

for (const root of document.querySelectorAll<HTMLElement>('[data-signature-page]')) {
  bindSignatureState(root);
}

