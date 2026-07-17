'use client';

import React from 'react';
import styled from 'styled-components';
import Silhouette, { SchematicSvg } from '@/components/Silhouette';
import { Lang, t, I18N } from '@/i18n/translations';
import { LANDING_SPECIMENS } from '@/data/specimens';

// ─── Styled Components ────────────────────────────────────────
const Section = styled.section`
  padding: 48px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 720px) {
    padding: 36px 18px;
  }
  @media (max-width: 480px) {
    padding: 32px 16px;
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

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    .meta { display: none; }
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
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(160px, auto);
  }
  @media (max-width: 320px) {
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
  @media (max-width: 480px) {
    grid-column: span 1;
    min-height: 200px;
  }
  @media (max-width: 320px) {
    grid-column: span 1;
    min-height: 180px;
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
  font-size: clamp(40px, 7vw, 96px);
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

  @media (max-width: 480px) {
    margin: 10px 0 4px;
  }
`;

const SpecName = styled.h3`
  font-family: var(--display);
  font-size: clamp(16px, 2vw, 26px);
  color: var(--choc);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.02;
  margin: 0 0 12px;
`;

const SpecSilhouette = styled.div`
  flex: 1;
  min-height: 80px;
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
  img {
    width: 100%;
    height: 100%;
    max-height: 180px;
    object-fit: cover;
    border: 0.5px solid var(--hair-strong);
  }

  @media (max-width: 480px) {
    min-height: 60px;
    svg { max-height: 100px; }
    img { max-height: 100px; }
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

  @media (max-width: 480px) {
    font-size: 10px;
    div { grid-template-columns: 6ch 1fr; gap: 8px; }
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

  /* Touch: show on active press */
  ${SpecCard}:active & {
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

// ─── Props ───────────────────────────────────────────────────
interface SpecimenGridProps {
  lang: Lang;
  activeSpec: number;
  onSelectSpec: (i: number) => void;
}

// ─── Component ───────────────────────────────────────────────
export default function SpecimenGrid({ lang, activeSpec, onSelectSpec }: SpecimenGridProps) {
  return (
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
        {LANDING_SPECIMENS.map((s, i) => (
          <SpecCard
            key={s.id}
            $span={s.span}
            onClick={() => {
              onSelectSpec(i);
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
              {s.image
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={s.image} alt="" />
                : <Silhouette kind={s.silhouette} />}
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
        ))}
      </SpecimensGrid>
    </Section>
  );
}
