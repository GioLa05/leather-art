'use client';

import React from 'react';
import styled from 'styled-components';
import Silhouette from '@/components/Silhouette';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS, VaultSpecimen } from '@/data/specimens';
import { formatPrice } from '@/lib/price';

function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }

// ─── Styled Components ────────────────────────────────────────
const DossierWrap = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const DossierHead = styled.div`
  display: grid;
  grid-template-columns: 52px 72px 1fr 72px 80px 110px 70px 72px 36px;
  gap: 10px;
  padding: 10px 28px;
  border-bottom: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mid);
  min-width: 700px;

  @media (max-width: 1100px) {
    grid-template-columns: 52px 72px 1fr 72px 72px 80px 60px 72px 36px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 44px 1fr 56px 72px 36px;
    gap: 8px;
    padding: 10px 16px;
    min-width: 0;
    .col-grain, .col-origin, .col-weight, .col-idx { display: none; }
  }
`;

const DRow = styled.div<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 52px 72px 1fr 72px 80px 110px 70px 72px 36px;
  gap: 10px;
  padding: 12px 28px;
  border-bottom: 0.5px solid var(--hair-strong);
  align-items: center;
  background: ${({ $selected }) => ($selected ? 'var(--bone)' : 'transparent')};
  transition: background 120ms ease;
  min-width: 700px;
  cursor: none;
  position: relative;
  min-height: 44px;

  &:hover { background: var(--bone); }
  @media (pointer: coarse) { cursor: pointer; }

  @media (max-width: 1100px) {
    grid-template-columns: 52px 72px 1fr 72px 72px 80px 60px 72px 36px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 44px 1fr 56px 72px 36px;
    gap: 8px;
    padding: 10px 16px;
    min-width: 0;
    .col-grain, .col-origin, .col-weight, .col-idx { display: none; }
  }

  .thumb {
    width: 44px;
    height: 44px;
    border: 0.5px solid var(--hair-strong);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bone);
    flex-shrink: 0;
    overflow: hidden;

    svg { width: 32px; height: 32px; }
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }
  .nm {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--choc);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--choc);
    letter-spacing: 0.04em;
  }
  .price {
    font-family: var(--display);
    font-size: 14px;
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

const EmptyState = styled.div`
  padding: 64px 28px;
  text-align: center;
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
interface DossierViewProps {
  lang: Lang;
  filtered: VaultSpecimen[];
  selected: number[];
  onToggleSelect: (id: number) => void;
  onOpenModal: (id: number) => void;
}

// ─── Component ───────────────────────────────────────────────
export default function DossierView({ lang, filtered, selected, onToggleSelect, onOpenModal }: DossierViewProps) {
  return (
    <DossierWrap>
      <DossierHead>
        <div>{t(lang, 'th.img')}</div>
        <div className="col-idx">{t(lang, 'th.idx')}</div>
        <div>{t(lang, 'th.name')}</div>
        <div>{t(lang, 'th.tan')}</div>
        <div className="col-grain">{t(lang, 'th.grain')}</div>
        <div className="col-origin">{t(lang, 'th.origin')}</div>
        <div className="col-weight">{t(lang, 'th.weight')}</div>
        <div>{t(lang, 'th.price')}</div>
        <div />
      </DossierHead>
      {filtered.length === 0 ? (
        <EmptyState>
          <div className="big">{t(lang, 'empty.big')}</div>
          <div className="sub">{t(lang, 'empty.sub')}</div>
        </EmptyState>
      ) : filtered.map(s => (
        <DRow key={s.i} $selected={selected.includes(s.i)} onClick={() => onOpenModal(s.i)}>
          <div className="thumb">
            {s.image
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={s.image} alt="" />
              : <Silhouette kind={s.sil} />}
          </div>
          <div className="v col-idx">{pad2(s.i)}/{pad3(VAULT_SPECIMENS.length)}</div>
          <div className="nm">{s.name[lang]}</div>
          <div className="v">{pad3(s.tan)}H</div>
          <div className="v col-grain">{t(lang, `grain.${s.grain.toLowerCase()}` as Parameters<typeof t>[1])}</div>
          <div className="v col-origin">{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</div>
          <div className="v col-weight">{s.weight} G</div>
          <div className="price">{formatPrice(lang, s)}</div>
          <AddBtn onClick={e => { e.stopPropagation(); onToggleSelect(s.i); }} aria-label="add to compare">
            {selected.includes(s.i) ? '×' : '+'}
          </AddBtn>
        </DRow>
      ))}
    </DossierWrap>
  );
}
