'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Lang, MARQUEE } from '@/i18n/translations';

const marqueeAnim = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const MarqueeWrap = styled.div`
  background: var(--choc);
  color: var(--bone);
  border-top: 0.5px solid var(--choc);
  border-bottom: 0.5px solid var(--choc);
  overflow: hidden;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 14px 0;

  &:hover .marquee-track {
    animation-play-state: paused;
  }
`;

const MarqueeTrack = styled.div`
  display: inline-flex;
  gap: 0;
  white-space: nowrap;
  animation: ${marqueeAnim} 60s linear infinite;
  will-change: transform;

  > span {
    padding: 0 28px;
    border-left: 0.5px solid rgba(240, 228, 210, 0.4);
  }
  > span:first-child { border-left: 0; }
  .star { color: var(--bone); opacity: 0.7; padding: 0 18px; }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

interface MarqueeProps {
  lang: Lang;
}

export default function Marquee({ lang }: MarqueeProps) {
  const marqueeTokens = MARQUEE[lang];
  const seq = marqueeTokens.map((s, i) => (
    <React.Fragment key={i}>
      <span>{s}</span>
      <span className="star">✦</span>
    </React.Fragment>
  ));

  return (
    <MarqueeWrap aria-hidden="true">
      <MarqueeTrack className="marquee-track">
        {seq}
        {seq}
      </MarqueeTrack>
    </MarqueeWrap>
  );
}
