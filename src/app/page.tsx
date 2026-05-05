'use client';

import React, { useState, useCallback } from 'react';
import Cursor from '@/components/Cursor';
import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Hero from '@/components/landing/Hero';
import Marquee from '@/components/landing/Marquee';
import SpecimenGrid from '@/components/landing/SpecimenGrid';
import Telemetry from '@/components/landing/Telemetry';
import LandingFooter from '@/components/landing/LandingFooter';
import { Lang, t } from '@/i18n/translations';
import { LANDING_SPECIMENS } from '@/data/specimens';

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('EN');
  const [activeSpec, setActiveSpec] = useState(2);
  const [scanRun, setScanRun] = useState(true);

  const triggerScan = useCallback(() => {
    setScanRun(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setScanRun(true));
    });
  }, []);

  function handleSelectSpec(i: number) {
    setActiveSpec(i);
    triggerScan();
  }

  const spec = LANDING_SPECIMENS[activeSpec];

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
      <Nav lang={lang} activeId="index" />

      <main id="top">
        <Hero
          lang={lang}
          spec={spec}
          activeSpec={activeSpec}
          scanRun={scanRun}
          onSelectSpec={handleSelectSpec}
        />

        <Marquee lang={lang} />

        <SpecimenGrid
          lang={lang}
          activeSpec={activeSpec}
          onSelectSpec={handleSelectSpec}
        />

        <Telemetry lang={lang} />

        <LandingFooter lang={lang} />
      </main>
    </>
  );
}
