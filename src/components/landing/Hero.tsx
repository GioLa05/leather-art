'use client';

import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Silhouette from '@/components/Silhouette';
import { Lang, t } from '@/i18n/translations';
import { LANDING_SPECIMENS } from '@/data/specimens';

// ─── Keyframes ────────────────────────────────────────────────
const scanAnim = keyframes`
  0%   { top: -20px; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 102%; opacity: 0; }
`;

// ─── Styled Components ────────────────────────────────────────
const HeroSection = styled.section`
  padding: 70px 32px 0;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 480px) {
    padding: 60px 16px 0;
  }
`;

const SectionTag = styled.span`
  position: absolute;
  top: 12px;
  left: 32px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mid);

  .num { color: var(--choc); margin-right: 8px; }

  @media (max-width: 720px) { left: 18px; }
  @media (max-width: 480px) { left: 16px; }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5px 1fr 0.5px 360px;
  gap: 28px;
  align-items: stretch;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 22px;
    .vrule { display: none; }
  }
`;

const VRule = styled.div`
  background: var(--hair-strong);
  width: 0.5px;
  align-self: stretch;
`;

const HeroEyebrow = styled.div`
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mid);
  display: flex;
  gap: 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  .k { color: var(--choc); }

  @media (max-width: 480px) {
    font-size: 10px;
    gap: 10px;
  }
`;

const HeroName = styled.h1`
  font-family: var(--display);
  font-size: clamp(48px, 11vw, 168px);
  line-height: 0.86;
  color: var(--choc);
  letter-spacing: -0.035em;
  margin: 0;
  text-transform: uppercase;
  text-wrap: balance;

  .slash {
    font-family: var(--mono);
    font-weight: 400;
    font-size: 0.42em;
    vertical-align: 0.35em;
    color: var(--mid);
    padding: 0 0.18em;
  }

  @media (max-width: 320px) {
    font-size: 44px;
  }
`;

const HeroSub = styled.p`
  margin-top: 22px;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.55;
  color: var(--choc);
  max-width: 38ch;

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 16px;
  }
`;

const HeroQuote = styled.p`
  font-family: var(--script);
  font-size: clamp(24px, 3.4vw, 44px);
  color: var(--choc);
  line-height: 1.05;
  margin-top: 28px;
  padding-top: 18px;
  border-top: 0.5px solid var(--hair-strong);
  max-width: 22ch;

  &::before { content: '"'; color: var(--mid); }
  &::after  { content: '"'; color: var(--mid); }
`;

const HeroImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--bone);
  border: 0.5px solid var(--hair-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .index {
    position: absolute;
    top: 10px;
    left: 12px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--choc);
  }
  .stamp {
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--choc);
  }

  svg {
    width: 78%;
    height: 78%;
  }
`;

const Scanline = styled.span<{ $run: boolean }>`
  position: absolute;
  left: -2%;
  right: -2%;
  height: 18px;
  background: linear-gradient(180deg, transparent, rgba(61, 31, 15, 0.18), transparent);
  border-top: 0.5px solid var(--choc);
  border-bottom: 0.5px solid var(--choc);
  pointer-events: none;
  top: -20px;
  ${({ $run }) =>
    $run
      ? css`animation: ${scanAnim} 1.6s ease-out 1 forwards;`
      : css`animation: none;`}

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Specsheet = styled.aside`
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.55;
  color: var(--choc);

  h3 {
    font-family: var(--mono);
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 0 0 14px;
  }

  .row {
    display: grid;
    grid-template-columns: 12ch 1fr;
    gap: 14px;
    padding: 7px 0;
    border-top: 0.5px solid var(--hair-strong);
  }
  .row:last-child { border-bottom: 0.5px solid var(--hair-strong); }
  .row .k {
    color: var(--mid);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 10.5px;
    padding-top: 2px;
  }
  .row .v .big {
    font-family: var(--display);
    font-size: 22px;
    line-height: 1;
    letter-spacing: -0.02em;
    display: inline-block;
    margin-right: 6px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    .row { grid-template-columns: 10ch 1fr; gap: 10px; }
  }
`;

const HeroSelector = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border-top: 0.5px solid var(--hair-strong);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 720px) {
    grid-template-columns: repeat(6, minmax(80px, 1fr));
    overflow-x: auto;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(6, minmax(70px, 1fr));
  }

  button {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 14px 10px;
    text-align: left;
    border-right: 0.5px solid var(--hair-strong);
    transition: background 120ms ease;
    min-width: 0;
    background: none;
    border-top: 0;
    border-left: 0;
    border-bottom: 0;
    cursor: none;
    min-height: 44px;
  }
  button:last-child { border-right: 0; }
  button:hover, button.active { background: var(--bone); }

  .idx {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--mid);
  }
  .nm {
    font-family: var(--display);
    font-size: 13px;
    letter-spacing: -0.01em;
    color: var(--choc);
    text-transform: uppercase;
    line-height: 1.05;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  button.active .idx { color: var(--choc); }

  @media (pointer: coarse) { button { cursor: pointer; } }
`;

// ─── Helpers ─────────────────────────────────────────────────
function bigNum(v: string) {
  const m = v.match(/^([\d.]+)(.*)$/);
  if (!m) return v;
  return (
    <>
      <span className="big">{m[1]}</span>
      {m[2].trim() ? ' ' + m[2].trim() : ''}
    </>
  );
}

// ─── Props ───────────────────────────────────────────────────
interface HeroProps {
  lang: Lang;
  spec: typeof LANDING_SPECIMENS[0];
  activeSpec: number;
  scanRun: boolean;
  onSelectSpec: (i: number) => void;
}

// ─── Component ───────────────────────────────────────────────
export default function Hero({ lang, spec, activeSpec, scanRun, onSelectSpec }: HeroProps) {
  // Hero name split
  const name = spec.name[lang];
  const parts = name.split(/\s*\/\/\s*|\s+/);
  let heroNameEl: React.ReactNode;
  if (parts.length >= 2) {
    heroNameEl = (
      <>
        {parts[0]}
        <br />
        <span className="slash">//</span>
        {parts.slice(1).join(' ')}
      </>
    );
  } else {
    heroNameEl = name;
  }

  return (
    <HeroSection>
      <SectionTag>
        <span className="num">§01</span>
        <span>{t(lang, 'tag.specimen')}</span>
      </SectionTag>
      <HeroGrid>
        <div>
          <HeroEyebrow>
            <span>
              <span className="k">{t(lang, 'hero.eyebrow.kind')}</span> {spec.idx} / 06
            </span>
            <span>
              <span className="k">{t(lang, 'hero.eyebrow.tan')}</span>{' '}
              {spec.meta.find((m) => m[0] === 'TAN')?.[1] ?? spec.spec.tan}
            </span>
            <span>
              <span className="k">{t(lang, 'hero.eyebrow.year')}</span> MMXCIX
            </span>
          </HeroEyebrow>
          <HeroName>{heroNameEl}</HeroName>
          <HeroSub>{spec.sub[lang]}</HeroSub>
          <HeroQuote className="script">{spec.quote[lang]}</HeroQuote>
        </div>

        <VRule className="vrule" />

        <HeroImage aria-hidden="true">
          <span className="index mono">IDX. {spec.idx} / 06 · ARC.LA-Δ</span>
          <span className="stamp mono">⌖ 41.7151°N · 44.8271°E</span>
          <Scanline $run={scanRun} />
          <Silhouette kind={spec.silhouette} />
        </HeroImage>

        <VRule className="vrule" />

        <Specsheet aria-label="Specimen spec sheet">
          <h3>{t(lang, 'hero.spec.title')}</h3>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.tannage')}</span>
            <span className="v">{bigNum(spec.spec.tan)}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.grain')}</span>
            <span className="v">{bigNum(spec.spec.grain)}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.origin')}</span>
            <span className="v">{spec.spec.origin}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.finish')}</span>
            <span className="v">{bigNum(spec.spec.finish)}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.weight')}</span>
            <span className="v">{bigNum(spec.spec.weight)}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.edge')}</span>
            <span className="v">{spec.spec.edge}</span>
          </div>
          <div className="row">
            <span className="k">{t(lang, 'hero.spec.cert')}</span>
            <span className="v">{spec.spec.cert}</span>
          </div>
        </Specsheet>
      </HeroGrid>

      <HeroSelector role="tablist" aria-label="Specimen selector">
        {LANDING_SPECIMENS.map((s, i) => (
          <button
            key={s.id}
            className={i === activeSpec ? 'active' : ''}
            role="tab"
            aria-selected={i === activeSpec}
            onClick={() => onSelectSpec(i)}
          >
            <span className="idx mono">
              {s.idx} / 06
            </span>
            <span className="nm">{s.name[lang]}</span>
          </button>
        ))}
      </HeroSelector>
    </HeroSection>
  );
}
