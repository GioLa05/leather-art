'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Lang, t } from '@/i18n/translations';

// ─── Styled Components ────────────────────────────────────────
const SectionTag = styled.span`
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mid);

  .num { color: var(--choc); margin-right: 8px; }
`;

const Footer = styled.footer`
  background: var(--tan);
  border-top: 0.5px solid var(--hair-strong);
  padding: 56px 32px 28px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  position: relative;

  .logo-big {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto 8px;
    aspect-ratio: 1 / 1;
    max-height: 280px;
    display: block;
    object-fit: contain;
  }

  @media (max-width: 720px) { padding: 36px 18px 20px; }
  @media (max-width: 480px) {
    padding: 28px 16px 16px;
    .logo-big { max-height: 160px; }
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 0.5px solid var(--hair-strong);
  padding-top: 18px;
  gap: 24px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--choc);

  .k {
    color: var(--mid);
    display: block;
    margin-bottom: 6px;
    font-size: 10px;
    letter-spacing: 0.1em;
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface LandingFooterProps {
  lang: Lang;
}

// ─── Component ───────────────────────────────────────────────
export default function LandingFooter({ lang }: LandingFooterProps) {
  return (
    <Footer>
      <SectionTag style={{ position: 'static' }}>
        <span className="num">§04</span>
        <span>{t(lang, 'tag.colophon')}</span>
      </SectionTag>
      <Image
        className="logo-big"
        src="/assets/leather-art-logo.png"
        alt="Leather Art"
        width={360}
        height={360}
        style={{ width: '100%', maxWidth: '1100px', margin: '0 auto 8px', maxHeight: '280px', objectFit: 'contain', display: 'block' }}
      />
      <FooterGrid>
        <div>
          <span className="k">{t(lang, 'footer.k.house')}</span>
          LEATHER//ART
        </div>
        <div>
          <span className="k">{t(lang, 'footer.k.cycle')}</span>
          MMXCIX · Δ-014
        </div>
        <div>
          <span className="k">{t(lang, 'footer.k.coords')}</span>
          41.7151°N / 44.8271°E
        </div>
        <div>
          <span className="k">{t(lang, 'footer.k.copy')}</span>
          © 2099 LEATHER//ART · ALL HIDES RESERVED
        </div>
      </FooterGrid>
    </Footer>
  );
}
