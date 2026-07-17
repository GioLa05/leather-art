'use client';

import React from 'react';
import Cursor from '@/components/Cursor';
import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import LandingFooter from '@/components/landing/LandingFooter';
import { Lang, t } from '@/i18n/translations';
import { useLang } from '@/i18n/LangContext';

interface PageShellProps {
  /** Nav id to mark active (matches NavItem.id). */
  activeId?: string;
  /** Render-prop body; receives the current language. */
  children: (lang: Lang) => React.ReactNode;
  /** Hide the shared footer (e.g. for the specimen detail page). */
  footer?: boolean;
}

/**
 * Shared chrome for interior pages: custom cursor, status bar (with the
 * language toggle), primary nav, body, and the colophon footer. Mirrors the
 * structure the landing and vault pages assemble inline, so interior pages
 * stay consistent without duplicating the wiring.
 */
export default function PageShell({ activeId, children, footer = true }: PageShellProps) {
  const { lang, setLang } = useLang();

  return (
    <>
      <Cursor />
      <StatusBar
        lang={lang}
        onLangChange={setLang}
        archive={t(lang, 'status.archive')}
        coords={t(lang, 'status.coords')}
        batch={t(lang, 'status.batch')}
        liveLabel={t(lang, 'status.live')}
      />
      <Nav lang={lang} activeId={activeId} />
      {children(lang)}
      {footer && <LandingFooter lang={lang} />}
    </>
  );
}
