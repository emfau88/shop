'use client';

import { useEffect } from 'react';
import { bindSignatureState } from './signature-state-controller';

export function SignatureRuntimeBridge() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-signature-page]');
    if (!root) return undefined;
    const disposeState = bindSignatureState(root);
    let disposeScene: undefined | (() => void);
    let cancelled = false;
    if (root.dataset.signatureBrand === 'werkform') {
      void import('./werkform/werkform-scene')
        .then(({ initializeWerkformScene }) => {
          if (!cancelled) disposeScene = initializeWerkformScene(root);
        })
        .catch(() => {
          root.dataset.signatureWebgl = 'asset-error';
        });
    }
    return () => {
      cancelled = true;
      disposeScene?.();
      disposeState();
    };
  }, []);
  return null;
}
