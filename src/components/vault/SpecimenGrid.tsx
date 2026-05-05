'use client';

import React from 'react';
import styled from 'styled-components';
import Silhouette, { SchematicSvg } from '@/components/Silhouette';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS, VaultSpecimen } from '@/data/specimens';

function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }

const SPAN_MAP: Record<string, number> = { s1: 5, s2: 4, s3: 3, s4: 4, s5: 5, s6: 3, s7: 6, s8: 5, s9: 4 };
const SPAN_MAP_MD: Record<string, number> = { s1: 6, s2: 3, s3: 3, s4: 6, s5: 6, s6: 3, s7: 6, s8: 6, s9: 3 };

// ─── Styled Components ────────────────────────────────────────
const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border-top: 0.5px solid var(--hair-strong);
  border-left: 0.5px solid var(--hair-strong);

  @media (max-width: 980px) { grid-template-columns: repeat(6, 1fr); }
  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 320px) { grid-template-columns: 1fr; }
`;

const SCard = styled.article<{ $span: string; $selected: boolean }>`
  border-right: 0.5px solid var(--hair-strong);
  border-bottom: 0.5px solid var(--hair-strong);
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  background: ${({ $selected }) => ($selected ? 'var(--bone)' : 'var(--tan)')};
  transition: background 200ms ease;
  min-height: 280px;
  position: relative;
  overflow: hidden;
  cursor: none;
  grid-column: span ${({ $span }) => SPAN_MAP[$span] ?? 4};

  @media (max-width: 980px) {
    grid-column: span ${({ $span }) => SPAN_MAP_MD[$span] ?? 3};
  }
  @media (max-width: 600px) {
    grid-column: span 1;
    min-height: 220px;
  }
  @media (max-width: 320px) {
    grid-column: span 1;
    min-height: 200px;
  }
  @media (pointer: coarse) { cursor: pointer; }
`;

const SCardHead = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--mid);
  text-transform: uppercase;
  .sn { color: var(--choc); }
`;

const SCardImg = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  svg { width: 80%; height: 100%; max-height: 140px; }

  @media (max-width: 600px) {
    svg { max-height: 100px; }
  }
`;

const SCardName = styled.h3`
  font-family: var(--display);
  font-size: clamp(13px, 1.6vw, 18px);
  color: var(--choc);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  line-height: 1.05;
`;

const SCardMeta = styled.div`
  font-family: var(--mono);
  font-size: 10px;
  color: var(--choc);
  border-top: 0.5px solid var(--hair-strong);
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;

  div {
    display: flex;
    justify-content: space-between;
    .k { color: var(--mid); text-transform: uppercase; letter-spacing: 0.08em; }
  }
`;

const SCardFoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  .price {
    font-family: var(--display);
    font-size: 16px;
    color: var(--choc);
  }
`;

const AddBtn = styled.button`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 16px;
  color: var(--choc);
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  transition: background 120ms ease;
  flex-shrink: 0;

  &:hover { background: var(--choc); color: var(--bone); }
  @media (pointer: coarse) {
    cursor: pointer;
    width: 44px;
    height: 44px;
    min-width: 44px;
  }
`;

const SCardSchematic = styled.div`
  position: absolute;
  inset: 0;
  background: var(--choc);
  color: var(--bone);
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;

  ${SCard}:hover & { opacity: 1; }
  ${SCard}:active & { opacity: 1; }

  .head {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    color: rgba(240,228,210,0.8);
  }
  .draw { flex: 1; svg { width: 100%; height: 100%; } }
  .foot {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    text-transform: uppercase;
    border-top: 0.5px solid rgba(240,228,210,0.4);
    padding-top: 8px;
    .k { color: rgba(240,228,210,0.6); display: block; margin-bottom: 2px; }
  }

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const EmptyState = styled.div`
  padding: 64px 28px;
  text-align: center;
  grid-column: 1 / -1;
  .big {
    font-family: var(--display);
    font-size: clamp(18px, 2.5vw, 28px);
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: var(--choc);
  }
  .sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    margin-top: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface SpecimenGridProps {
  lang: Lang;
  filtered: VaultSpecimen[];
  selected: number[];
  onToggleSelect: (id: number) => void;
  onOpenModal: (id: number) => void;
}

// ─── Component ───────────────────────────────────────────────
export default function SpecimenGrid({ lang, filtered, selected, onToggleSelect, onOpenModal }: SpecimenGridProps) {
  if (filtered.length === 0) {
    return (
      <SpecGrid>
        <EmptyState>
          <div className="big">{t(lang, 'empty.big')}</div>
          <div className="sub">{t(lang, 'empty.sub')}</div>
        </EmptyState>
      </SpecGrid>
    );
  }

  return (
    <SpecGrid>
      {filtered.map(s => (
        <SCard key={s.i} $span={s.span} $selected={selected.includes(s.i)}
          onClick={() => onOpenModal(s.i)}>
          <SCardHead>
            <span className="sn">{s.sn}</span>
            <span>{pad2(s.i)} / {pad3(VAULT_SPECIMENS.length)}</span>
          </SCardHead>
          <SCardImg aria-hidden="true"><Silhouette kind={s.sil} /></SCardImg>
          <SCardName>{s.name}</SCardName>
          <SCardMeta>
            <div><span className="k">{t(lang, 'th.tan')}</span><span>{pad3(s.tan)}H</span></div>
            <div><span className="k">{t(lang, 'th.origin')}</span><span>{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</span></div>
            <div><span className="k">{t(lang, 'th.weight')}</span><span>{s.weight} G</span></div>
          </SCardMeta>
          <SCardFoot>
            <span className="price">€{s.price}</span>
            <AddBtn onClick={e => { e.stopPropagation(); onToggleSelect(s.i); }}>
              {selected.includes(s.i) ? '×' : '+'}
            </AddBtn>
          </SCardFoot>
          <SCardSchematic aria-hidden="true">
            <div className="head"><span>SCHEMATIC · {s.sn}</span><span>{pad2(s.i)} / {pad3(VAULT_SPECIMENS.length)}</span></div>
            <div className="draw"><SchematicSvg /></div>
            <div className="foot">
              <div><span className="k">{t(lang, 'th.tan')}</span>{pad3(s.tan)}H</div>
              <div><span className="k">{t(lang, 'th.origin')}</span>{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</div>
              <div><span className="k">{t(lang, 'th.weight')}</span>{s.weight} G</div>
            </div>
          </SCardSchematic>
        </SCard>
      ))}
    </SpecGrid>
  );
}
