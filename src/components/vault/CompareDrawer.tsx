'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS } from '@/data/specimens';
import { formatPrice } from '@/lib/price';

function pad3(n: number) { return String(n).padStart(3, '0'); }

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

// ─── Styled Components ────────────────────────────────────────
const Drawer = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--choc);
  color: var(--bone);
  border-top: 0.5px solid var(--bone);
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 300ms ease;

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  border-bottom: 0.5px solid rgba(240,228,210,0.3);
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(240,228,210,0.7);
  gap: 12px;
  flex-wrap: wrap;
  min-height: 48px;

  .title { color: var(--bone); font-weight: 700; }

  button {
    color: rgba(240,228,210,0.7);
    background: none;
    border: 0.5px solid rgba(240,228,210,0.3);
    padding: 8px 14px;
    min-height: 36px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: none;
    &:hover { color: var(--bone); border-color: var(--bone); }
    @media (pointer: coarse) { cursor: pointer; min-height: 44px; }
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
  }
`;

const DrawerSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 0;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const DrawerSlot = styled.div<{ $empty: boolean }>`
  padding: 16px 22px;
  border-right: 0.5px solid rgba(240,228,210,0.2);
  &:last-child { border-right: 0; }

  @media (max-width: 600px) {
    border-right: 0;
    border-bottom: 0.5px solid rgba(240,228,210,0.2);
    &:last-child { border-bottom: 0; }
  }

  ${({ $empty }) => $empty && `
    color: rgba(240,228,210,0.35);
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    min-height: 80px;
  `}

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  .nm {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--bone);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .sn {
    font-family: var(--mono);
    font-size: 9px;
    color: rgba(240,228,210,0.5);
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }
  .rows {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-family: var(--mono);
    font-size: 10px;
    div {
      display: flex;
      justify-content: space-between;
      .k { color: rgba(240,228,210,0.5); text-transform: uppercase; letter-spacing: 0.08em; }
    }
  }

  button.rm {
    font-family: var(--mono);
    font-size: 10px;
    color: rgba(240,228,210,0.5);
    background: none;
    border: 0;
    cursor: none;
    padding: 4px;
    min-width: 30px;
    min-height: 30px;
    &:hover { color: var(--bone); }
    @media (pointer: coarse) {
      cursor: pointer;
      min-width: 44px;
      min-height: 44px;
    }
  }
`;

// ─── Props ───────────────────────────────────────────────────
interface CompareDrawerProps {
  lang: Lang;
  selected: number[];
  onToggleSelect: (id: number) => void;
  onClear: () => void;
}

// ─── Component ───────────────────────────────────────────────
export default function CompareDrawer({ lang, selected, onToggleSelect, onClear }: CompareDrawerProps) {
  return (
    <Drawer $open={selected.length > 0} data-testid="compare-drawer">
      <DrawerHeader>
        <span className="title">{t(lang, 'drawer.title')}</span>
        <span>{t(lang, 'drawer.slot')} {selected.length} / 3</span>
        <button onClick={onClear}>{t(lang, 'drawer.clear')}</button>
      </DrawerHeader>
      <DrawerSlots>
        {[0, 1, 2].map(i => {
          const id = selected[i];
          if (id == null) {
            return <DrawerSlot key={i} $empty>{t(lang, 'drawer.empty')}</DrawerSlot>;
          }
          const s = VAULT_SPECIMENS.find(x => x.i === id)!;
          return (
            <DrawerSlot key={i} $empty={false}>
              <div className="top">
                <span className="nm">{s.name[lang]}</span>
                <button className="rm" onClick={() => onToggleSelect(s.i)}>[ × ]</button>
              </div>
              <div className="sn">{s.sn}</div>
              <div className="rows">
                <div><span className="k">{t(lang, 'th.tan')}</span><span>{pad3(s.tan)}H</span></div>
                <div><span className="k">{t(lang, 'th.grain')}</span><span>{t(lang, `grain.${s.grain.toLowerCase()}` as Parameters<typeof t>[1])}</span></div>
                <div><span className="k">{t(lang, 'th.origin')}</span><span>{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</span></div>
                <div><span className="k">{t(lang, 'th.weight')}</span><span>{s.weight} G</span></div>
                <div><span className="k">{t(lang, 'th.price')}</span><span>{formatPrice(lang, s)}</span></div>
              </div>
            </DrawerSlot>
          );
        })}
      </DrawerSlots>
    </Drawer>
  );
}
