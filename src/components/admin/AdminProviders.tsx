'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from './Toast';
import { AdminGlobal } from './ui';

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <AdminGlobal />
        {children}
      </ToastProvider>
    </SessionProvider>
  );
}
