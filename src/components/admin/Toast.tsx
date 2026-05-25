'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type ToastKind = 'ok' | 'error';
interface ToastItem {
  id: number;
  kind: ToastKind;
  text: string;
}

const ToastCtx = createContext<(kind: ToastKind, text: string) => void>(() => {});

/** Brand-voice toast: "ARCHIVED" on success, "TRANSMISSION FAILED" on error. */
export function useToast() {
  const push = useContext(ToastCtx);
  // Stable reference: callers put this in effect deps; a fresh object each
  // render would re-run those effects and clobber in-progress edits.
  return useMemo(
    () => ({
      archived: (text = 'ARCHIVED') => push('ok', text),
      failed: (text = 'TRANSMISSION FAILED') => push('error', text),
    }),
    [push],
  );
}

const slideIn = keyframes`
  from { transform: translateY(12px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
`;

const Stack = styled.div`
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Toast = styled.div<{ $kind: ToastKind }>`
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 18px;
  min-width: 220px;
  border: 0.5px solid ${({ $kind }) => ($kind === 'ok' ? 'var(--tan)' : '#c46')};
  background: var(--choc);
  color: ${({ $kind }) => ($kind === 'ok' ? 'var(--tan)' : '#e8a')};
  animation: ${slideIn} 160ms ease;
`;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((kind: ToastKind, text: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, kind, text }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <Stack>
        {items.map((t) => (
          <Toast key={t.id} $kind={t.kind} role="status" data-testid="toast">
            {t.text}
          </Toast>
        ))}
      </Stack>
    </ToastCtx.Provider>
  );
}
