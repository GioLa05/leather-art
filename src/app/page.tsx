'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Silhouette, { SchematicSvg } from '@/components/Silhouette';
import { Lang, t, MARQUEE, I18N } from '@/i18n/translations';
import { LANDING_SPECIMENS } from '@/data/specimens';

// ─── Keyframes ────────────────────────────────────────────────
const scanAnim = keyframes`
  0%   { top: -20px; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 102%; opacity: 0; }
`;

const marqueeAnim = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const pulseAnim = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: .25; transform: scale(.7); }
`;

// ─── Hero ─────────────────────────────────────────────────────
const HeroSection = styled.section`
  padding: 70px 32px 0;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;
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
`;

const HeroName = styled.h1`
  font-family: var(--display);
  font-size: clamp(64px, 11vw, 168px);
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
`;

const HeroSub = styled.p`
  margin-top: 22px;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.55;
  color: var(--choc);
  max-width: 38ch;
`;

const HeroQuote = styled.p`
  font-family: var(--script);
  font-size: clamp(28px, 3.4vw, 44px);
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
`;

const HeroSelector = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border-top: 0.5px solid var(--hair-strong);

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
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

// ─── Marquee ──────────────────────────────────────────────────
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

// ─── Specimen Grid ────────────────────────────────────────────
const Section = styled.section`
  padding: 48px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 720px) {
    padding: 36px 18px;
  }
`;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;

  h2 {
    margin: 0;
    font-family: var(--display);
    font-size: clamp(36px, 5vw, 64px);
    letter-spacing: -0.02em;
    color: var(--choc);
    text-transform: uppercase;
    line-height: 0.95;
  }
  .meta {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: right;
  }
`;

const SpecimensGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(220px, auto);
  gap: 0;
  border-top: 0.5px solid var(--hair-strong);
  border-left: 0.5px solid var(--hair-strong);

  @media (max-width: 980px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SpecCard = styled.article<{ $span: string }>`
  position: relative;
  border-right: 0.5px solid var(--hair-strong);
  border-bottom: 0.5px solid var(--hair-strong);
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  background: var(--tan);
  transition: background 200ms ease;
  min-height: 360px;
  grid-column: ${({ $span }) => {
    const map: Record<string, number> = { s1: 5, s2: 4, s3: 3, s4: 4, s5: 5, s6: 3 };
    return `span ${map[$span] ?? 4}`;
  }};

  @media (max-width: 980px) {
    grid-column: ${({ $span }) => {
      const map: Record<string, number> = { s1: 6, s2: 3, s3: 3, s4: 6, s5: 6, s6: 3 };
      return `span ${map[$span] ?? 3}`;
    }};
  }
  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

const SpecHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--mid);
  text-transform: uppercase;

  .sn { color: var(--choc); }
`;

const SpecIdx = styled.div`
  font-family: var(--display);
  font-size: clamp(56px, 7vw, 96px);
  line-height: 0.85;
  color: var(--choc);
  letter-spacing: -0.04em;
  margin: 18px 0 6px;

  sub {
    font-family: var(--mono);
    font-weight: 400;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--mid);
    margin-left: 4px;
    vertical-align: 0.3em;
  }
`;

const SpecName = styled.h3`
  font-family: var(--display);
  font-size: clamp(20px, 2vw, 26px);
  color: var(--choc);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.02;
  margin: 0 0 12px;
`;

const SpecSilhouette = styled.div`
  flex: 1;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px -6px 14px;
  position: relative;

  svg {
    width: 78%;
    height: 100%;
    max-height: 180px;
  }
`;

const SpecMeta = styled.div`
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.6;
  color: var(--choc);
  border-top: 0.5px solid var(--hair-strong);
  padding-top: 10px;

  div {
    display: grid;
    grid-template-columns: 7ch 1fr;
    gap: 10px;
  }
  .k {
    color: var(--mid);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 10px;
    padding-top: 2px;
  }
`;

const Schematic = styled.div`
  position: absolute;
  inset: 0;
  background: var(--choc);
  color: var(--bone);
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;

  ${SpecCard}:hover & {
    opacity: 1;
  }

  .head {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    color: var(--bone);
    opacity: 0.8;
  }
  .draw {
    flex: 1;
    position: relative;
    svg { width: 100%; height: 100%; }
  }
  .foot {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    text-transform: uppercase;
    font-size: 10px;
    opacity: 0.95;
    border-top: 0.5px solid rgba(240, 228, 210, 0.5);
    padding-top: 10px;
  }
  .foot .k {
    color: rgba(240, 228, 210, 0.6);
    display: block;
    margin-bottom: 4px;
    letter-spacing: 0.1em;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// ─── Telemetry ────────────────────────────────────────────────
const TelWrap = styled.section`
  background: var(--tan);
  padding: 48px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 720px) { padding: 36px 18px; }
`;

const TelHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 22px;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-family: var(--display);
    font-size: clamp(28px, 4vw, 48px);
    letter-spacing: -0.02em;
    color: var(--choc);
    text-transform: uppercase;
  }
  .timestamp {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const TelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 0.5px solid var(--hair-strong);
  border-left: 0.5px solid var(--hair-strong);

  @media (max-width: 880px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const TCell = styled.div`
  border-right: 0.5px solid var(--hair-strong);
  border-bottom: 0.5px solid var(--hair-strong);
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 170px;

  .lbl {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    color: var(--mid);
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }
  .val {
    font-family: var(--display);
    font-size: clamp(34px, 4vw, 52px);
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--choc);
    font-variant-numeric: tabular-nums;
  }
  .val .unit {
    font-family: var(--mono);
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--mid);
    margin-left: 6px;
  }
  .sub { font-family: var(--mono); font-size: 11px; color: var(--choc); }
  .bar {
    height: 6px;
    background: var(--bone);
    border: 0.5px solid var(--hair-strong);
    overflow: hidden;
    position: relative;
  }
  .bar i {
    display: block;
    height: 100%;
    background: var(--choc);
    transition: width 800ms ease;
  }
`;

// ─── Footer ───────────────────────────────────────────────────
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
    max-height: 360px;
    display: block;
    object-fit: contain;
  }

  @media (max-width: 720px) { padding: 36px 18px 20px; }
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
`;

// ─── Telemetry data ───────────────────────────────────────────
interface TelItem {
  labelKey: 'telemetry.vault' | 'telemetry.queue' | 'telemetry.hours' | 'telemetry.hands';
  subKey: 'telemetry.vault.sub' | 'telemetry.queue.sub' | 'telemetry.hours.sub' | 'telemetry.hands.sub';
  val: number;
  unit: string;
  drift: [number, number];
  barFrom: number;
  barTo: number;
  integer?: boolean;
}

const TEL_INIT: TelItem[] = [
  { labelKey: 'telemetry.vault', subKey: 'telemetry.vault.sub', val: 60.4, unit: '%', drift: [58, 62], barFrom: 0, barTo: 100 },
  { labelKey: 'telemetry.queue', subKey: 'telemetry.queue.sub', val: 47, unit: 'hides', drift: [40, 68], barFrom: 0, barTo: 84, integer: true },
  { labelKey: 'telemetry.hours', subKey: 'telemetry.hours.sub', val: 142, unit: 'hrs', drift: [120, 180], barFrom: 0, barTo: 240, integer: true },
  { labelKey: 'telemetry.hands', subKey: 'telemetry.hands.sub', val: 11, unit: 'on bench', drift: [8, 16], barFrom: 0, barTo: 24, integer: true },
];

function pad2(n: number) { return String(n).padStart(2, '0'); }

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

// ─── Main Component ───────────────────────────────────────────
export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('EN');
  const [activeSpec, setActiveSpec] = useState(2); // index 3 = Carrara//Steed
  const [scanRun, setScanRun] = useState(true);
  const [telData, setTelData] = useState(TEL_INIT.map((item) => ({ ...item })));
  const [telClock, setTelClock] = useState('');

  const triggerScan = useCallback(() => {
    setScanRun(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setScanRun(true));
    });
  }, []);

  // Telemetry tick
  useEffect(() => {
    const id = setInterval(() => {
      setTelData((prev) =>
        prev.map((item) => {
          const [lo, hi] = item.drift;
          const range = hi - lo;
          let next: number;
          if (item.integer) {
            next = Math.max(lo, Math.min(hi, Math.round(item.val + (Math.random() * 2 - 1) * Math.max(1, range * 0.04))));
          } else {
            next = Math.max(lo, Math.min(hi, +(item.val + (Math.random() * 2 - 1) * range * 0.02).toFixed(1)));
          }
          return { ...item, val: next };
        })
      );
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // Telemetry clock
  useEffect(() => {
    function tick() {
      const d = new Date();
      setTelClock(`${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const spec = LANDING_SPECIMENS[activeSpec];

  // Marquee tokens
  const marqueeTokens = MARQUEE[lang];
  const seq = marqueeTokens.map((s, i) => (
    <React.Fragment key={i}>
      <span>{s}</span>
      <span className="star">✦</span>
    </React.Fragment>
  ));

  function handleSelectSpec(i: number) {
    setActiveSpec(i);
    triggerScan();
  }

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
        {/* ─── HERO ─────────────────────────────────────────── */}
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
                  <span className="k">{t(lang, 'hero.eyebrow.tan')}</span> VEG · 28D
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
                onClick={() => handleSelectSpec(i)}
              >
                <span className="idx mono">
                  {s.idx} / 06
                </span>
                <span className="nm">{s.name[lang]}</span>
              </button>
            ))}
          </HeroSelector>
        </HeroSection>

        {/* ─── MARQUEE ──────────────────────────────────────── */}
        <MarqueeWrap aria-hidden="true">
          <MarqueeTrack className="marquee-track">
            {seq}
            {seq}
          </MarqueeTrack>
        </MarqueeWrap>

        {/* ─── SPECIMEN GRID ────────────────────────────────── */}
        <Section>
          <SectionTag>
            <span className="num">§02</span>
            <span>{t(lang, 'tag.archive')}</span>
          </SectionTag>
          <GridHead>
            <h2 dangerouslySetInnerHTML={{ __html: t(lang, 'grid.title') }} />
            <div className="meta">
              <div>{t(lang, 'grid.meta1')}</div>
              <div>{t(lang, 'grid.meta2')}</div>
            </div>
          </GridHead>
          <SpecimensGrid>
            {LANDING_SPECIMENS.map((s, i) => {
              const metaKeys = s.meta.map(([k]) => k.toLowerCase());
              return (
                <SpecCard
                  key={s.id}
                  $span={s.span}
                  as="article"
                  onClick={() => {
                    setActiveSpec(i);
                    triggerScan();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: 'none' }}
                >
                  <SpecHead>
                    <span className="sn mono">{s.sn}</span>
                    <span className="mono">{s.idx} / 06</span>
                  </SpecHead>
                  <SpecIdx>
                    {s.idx}
                    <sub>/06</sub>
                  </SpecIdx>
                  <SpecName>{s.name[lang]}</SpecName>
                  <SpecSilhouette aria-hidden="true">
                    <Silhouette kind={s.silhouette} />
                  </SpecSilhouette>
                  <SpecMeta>
                    {s.meta.map(([k, v]) => (
                      <div key={k}>
                        <span className="k">
                          {I18N[lang][`spec.k.${k.toLowerCase()}` as keyof typeof I18N.EN] ?? k}
                        </span>
                        <span className="v mono">{v}</span>
                      </div>
                    ))}
                  </SpecMeta>
                  <Schematic aria-hidden="true">
                    <div className="head">
                      <span>SCHEMATIC · {s.sn}</span>
                      <span>{s.idx} / 06</span>
                    </div>
                    <div className="draw">
                      <SchematicSvg />
                    </div>
                    <div className="foot">
                      {s.meta.map(([k, v]) => (
                        <div key={k}>
                          <span className="k">
                            {I18N[lang][`spec.k.${k.toLowerCase()}` as keyof typeof I18N.EN] ?? k}
                          </span>
                          {v}
                        </div>
                      ))}
                    </div>
                  </Schematic>
                </SpecCard>
              );
            })}
          </SpecimensGrid>
        </Section>

        {/* ─── TELEMETRY ────────────────────────────────────── */}
        <TelWrap>
          <SectionTag>
            <span className="num">§03</span>
            <span>{t(lang, 'tag.telemetry')}</span>
          </SectionTag>
          <TelHead>
            <h2>{t(lang, 'telemetry.title')}</h2>
            <span className="timestamp">
              {t(lang, 'telemetry.synced')} · <span>{telClock}</span>
            </span>
          </TelHead>
          <TelGrid>
            {telData.map((item, i) => {
              const pct = Math.max(2, Math.min(100, ((item.val - item.barFrom) / (item.barTo - item.barFrom)) * 100));
              const valStr = item.integer ? Math.round(item.val).toString() : item.val.toFixed(1);
              return (
                <TCell key={i}>
                  <div className="lbl">
                    <span>{t(lang, item.labelKey)}</span>
                    <span className="mono">N°0{i + 1}</span>
                  </div>
                  <div className="val">
                    <span className="num">{valStr}</span>
                    <span className="unit">{item.unit}</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <div className="sub">{t(lang, item.subKey)}</div>
                </TCell>
              );
            })}
          </TelGrid>
        </TelWrap>

        {/* ─── FOOTER ───────────────────────────────────────── */}
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
            style={{ width: '100%', maxWidth: '1100px', margin: '0 auto 8px', maxHeight: '360px', objectFit: 'contain', display: 'block' }}
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
      </main>
    </>
  );
}
