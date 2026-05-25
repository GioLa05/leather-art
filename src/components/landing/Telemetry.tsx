'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Lang, t } from '@/i18n/translations';
import { TELEMETRY } from '@/data/telemetry';

const TEL_INIT = TELEMETRY;

function pad2(n: number) { return String(n).padStart(2, '0'); }

// ─── Styled Components ────────────────────────────────────────
const TelWrap = styled.section`
  background: var(--tan);
  padding: 48px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 720px) { padding: 36px 18px; }
  @media (max-width: 480px) { padding: 32px 16px; }
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

  @media (max-width: 480px) {
    gap: 12px;
    .timestamp { font-size: 10px; }
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
  min-height: 140px;

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
    font-size: clamp(28px, 4vw, 52px);
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

  @media (max-width: 480px) {
    min-height: 100px;
    padding: 14px 16px 16px;
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface TelemetryProps {
  lang: Lang;
}

// ─── Component ───────────────────────────────────────────────
export default function Telemetry({ lang }: TelemetryProps) {
  const [telData, setTelData] = useState(TEL_INIT.map(item => ({ ...item })));
  const [telClock, setTelClock] = useState('');

  // Telemetry tick
  useEffect(() => {
    const id = setInterval(() => {
      setTelData(prev =>
        prev.map(item => {
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

  return (
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
  );
}
