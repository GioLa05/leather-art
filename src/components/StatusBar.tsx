'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '@/i18n/translations';

const pulseAnim = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .25; transform: scale(.7); }
`;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--tan);
  border-bottom: 0.5px solid var(--hair-strong);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 8px 18px;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1;

  @media (max-width: 880px) {
    grid-template-columns: auto 1fr;
    gap: 10px;
    padding: 8px 12px;
  }
`;

const Logo = styled(Image)`
  height: 36px;
  width: auto;
  display: block;
  image-rendering: -webkit-optimize-contrast;

  @media (max-width: 880px) {
    height: 30px;
  }
`;

const StatusStream = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  color: var(--choc);

  > span {
    padding: 0 14px;
    border-left: 0.5px solid var(--hair-strong);
    white-space: nowrap;
  }
  > span:first-child {
    border-left: 0;
    padding-left: 0;
  }

  @media (max-width: 880px) {
    display: none;
  }
`;

const LiveDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  background: var(--choc);
  margin-right: 6px;
  animation: ${pulseAnim} 1.6s ease-in-out infinite;
  vertical-align: middle;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LangNav = styled.nav`
  display: flex;
  align-items: center;
`;

const LangBtn = styled.button<{ $active?: boolean }>`
  padding: 4px 9px;
  font-family: var(--mono);
  font-size: 11px;
  color: ${({ $active }) => ($active ? 'var(--choc)' : 'var(--mid)')};
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  letter-spacing: 0.04em;
  border-left: 0.5px solid var(--hair-strong);
  background: none;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  cursor: none;

  &:first-child {
    border-left: 0;
  }
  &:hover {
    color: var(--choc);
  }
  @media (pointer: coarse) {
    cursor: pointer;
  }
`;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface StatusBarProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  archive?: string;
  coords?: string;
  batch?: string;
  liveLabel?: string;
}

export default function StatusBar({
  lang,
  onLangChange,
  archive = 'ARCHIVE',
  coords = 'COORDS',
  batch = 'BATCH',
  liveLabel = 'LIVE · TANNING',
}: StatusBarProps) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    function tick() {
      const d = new Date();
      const ts = `2099.${pad(d.getMonth() + 1)}.${pad(d.getDate())} · ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} UTC`;
      setClock(ts);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Bar role="banner">
      <Link href="/" aria-label="Leather Art home">
        <Logo
          src="/assets/leather-art-logo.png"
          alt="Leather Art"
          width={120}
          height={36}
          style={{ height: '36px', width: 'auto' }}
          priority
        />
      </Link>

      <StatusStream>
        <span>
          <span className="mono">{archive}</span> ·{' '}
          <span className="mono">{clock}</span>
        </span>
        <span>
          <span className="mono">{coords}</span> 41.7151°N / 44.8271°E
        </span>
        <span>
          <span className="mono">{batch}</span> LA-2099/Δ-014
        </span>
        <span>
          <LiveDot aria-hidden="true" />
          <span>{liveLabel}</span>
        </span>
      </StatusStream>

      <LangNav aria-label="Language">
        {(['EN', 'KA', 'RU'] as Lang[]).map((l) => (
          <LangBtn
            key={l}
            $active={lang === l}
            aria-pressed={lang === l}
            onClick={() => onLangChange(l)}
          >
            {l}
          </LangBtn>
        ))}
      </LangNav>
    </Bar>
  );
}
