'use client';

import React from 'react';
import styled from 'styled-components';
import { Lang, t } from '@/i18n/translations';

function pad3(n: number) { return String(n).padStart(3, '0'); }

// ─── Styled Components ────────────────────────────────────────
const VaultHeaderWrap = styled.div`
  padding: 22px 28px 16px;
  border-bottom: 0.5px solid var(--hair-strong);
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 480px) {
    padding: 16px 16px 12px;
    gap: 8px;
  }
`;

const Breadcrumb = styled.div`
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--mid);
  text-transform: uppercase;
  display: flex;
  gap: 6px;
  align-items: center;

  .sep { opacity: 0.5; }
  .cur { color: var(--choc); }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 18px;
  flex-wrap: wrap;

  h1 {
    font-family: var(--display);
    font-size: clamp(22px, 4vw, 48px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0;
    line-height: 0.95;
  }
  .sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    letter-spacing: 0.1em;
  }

  @media (max-width: 480px) {
    gap: 10px;
    .sub { font-size: 10px; }
  }
`;

const CounterRow = styled.div`
  display: flex;
  gap: 0;
  border-top: 0.5px solid var(--hair-strong);
  padding-top: 10px;

  @media (max-width: 375px) {
    padding-top: 8px;
  }
`;

const Counter = styled.div`
  flex: 1;
  padding-right: 18px;

  .val {
    font-family: var(--display);
    font-size: clamp(20px, 3vw, 28px);
    letter-spacing: -0.02em;
    color: var(--choc);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .lbl {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--mid);
    text-transform: uppercase;
    margin-top: 2px;
  }

  @media (max-width: 375px) {
    padding-right: 10px;
    .lbl { font-size: 9px; letter-spacing: 0.06em; }
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface VaultHeaderProps {
  lang: Lang;
  specsCount: number;
  vaultCount: number;
  selectedCount: number;
}

// ─── Component ───────────────────────────────────────────────
export default function VaultHeader({ lang, specsCount, vaultCount, selectedCount }: VaultHeaderProps) {
  return (
    <VaultHeaderWrap>
      <Breadcrumb>
        <span>{t(lang, 'bc.vault')}</span>
        <span className="sep">//</span>
        <span>{t(lang, 'bc.sector')}</span>
        <span className="sep">//</span>
        <span className="cur">{t(lang, 'bc.index')}</span>
      </Breadcrumb>
      <TitleRow>
        <h1>VAULT INDEX</h1>
        <span className="sub">{t(lang, 'title.sub')}</span>
      </TitleRow>
      <CounterRow>
        <Counter>
          <div className="val">{pad3(specsCount)}</div>
          <div className="lbl">{t(lang, 'counter.specs')}</div>
        </Counter>
        <Counter>
          <div className="val">{pad3(vaultCount)}</div>
          <div className="lbl">{t(lang, 'counter.vault')}</div>
        </Counter>
        <Counter>
          <div className="val">{pad3(selectedCount)}</div>
          <div className="lbl">{t(lang, 'counter.sel')}</div>
        </Counter>
      </CounterRow>
    </VaultHeaderWrap>
  );
}
