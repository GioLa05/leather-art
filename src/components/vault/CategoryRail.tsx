'use client';

import React from 'react';
import styled from 'styled-components';
import { Lang, t } from '@/i18n/translations';
import { CATS } from '@/data/categories';
import { VAULT_SPECIMENS } from '@/data/specimens';

function pad3(n: number) { return String(n).padStart(3, '0'); }

// ─── Styled Components ────────────────────────────────────────
export const LeftRail = styled.aside`
  border-right: 0.5px solid var(--hair-strong);
  position: sticky;
  top: 90px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  @media (max-width: 820px) { display: none; }
`;

const CatRail = styled.div`
  padding: 18px 0;
`;

const CatBlock = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  text-align: left;
  border-left: 2px solid ${({ $active }) => ($active ? 'var(--choc)' : 'transparent')};
  background: ${({ $active }) => ($active ? 'var(--bone)' : 'transparent')};
  transition: background 120ms ease;
  cursor: none;
  border-top: 0; border-right: 0; border-bottom: 0;
  min-height: 44px;

  &:hover { background: var(--bone); }
  @media (pointer: coarse) { cursor: pointer; }

  .num {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--mid);
    flex-shrink: 0;
  }
  .nm {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--choc);
    flex: 1;
    font-weight: ${({ $active }) => ($active ? 700 : 400)};
  }
  .ct {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--mid);
    letter-spacing: 0.08em;
  }
`;

// ─── Mobile strip ─────────────────────────────────────────────
export const CatStrip = styled.div`
  display: none;
  overflow-x: auto;
  border-bottom: 0.5px solid var(--hair-strong);
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }

  @media (max-width: 820px) { display: flex; }
`;

export const CatStripBtn = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 12px 14px;
  min-height: 44px;
  border-bottom: 2px solid ${({ $active }) => ($active ? 'var(--choc)' : 'transparent')};
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? 'var(--choc)' : 'var(--mid)')};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  background: none;
  border-top: 0; border-left: 0; border-right: 0;
  cursor: none;

  &:hover { color: var(--choc); }
  @media (pointer: coarse) { cursor: pointer; }

  .num { opacity: 0.6; }
`;

// ─── Left rail header ─────────────────────────────────────────
const RailHead = styled.div`
  padding: 18px;
  border-bottom: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mid);
`;

// ─── Props ───────────────────────────────────────────────────
interface CategoryRailProps {
  lang: Lang;
  activeCat: string;
  onCatChange: (id: string) => void;
}

function catLabel(c: typeof CATS[0], lang: Lang) {
  if (c.isAll) return lang === 'KA' ? 'ყველა' : lang === 'RU' ? 'ВСЕ' : 'ALL';
  return c.k ? t(lang, c.k as Parameters<typeof t>[1]) : '';
}

function catCount(id: string) {
  return id === 'all' ? VAULT_SPECIMENS.length : VAULT_SPECIMENS.filter(s => s.cat === id).length;
}

// ─── Left rail (desktop) ─────────────────────────────────────
export function CategoryLeftRail({ lang, activeCat, onCatChange }: CategoryRailProps) {
  return (
    <LeftRail>
      <RailHead>
        {t(lang, 'bc.vault')} // {t(lang, 'bc.sector')} // {t(lang, 'bc.index')}
      </RailHead>
      <CatRail>
        {CATS.map(c => (
          <CatBlock key={c.id} $active={activeCat === c.id} onClick={() => onCatChange(c.id)}>
            <span className="num">{c.num}</span>
            <span className="nm">{catLabel(c, lang)}</span>
            <span className="ct">{pad3(catCount(c.id))}</span>
          </CatBlock>
        ))}
      </CatRail>
    </LeftRail>
  );
}

// ─── Mobile strip ─────────────────────────────────────────────
export function CategoryMobileStrip({ lang, activeCat, onCatChange }: CategoryRailProps) {
  return (
    <CatStrip>
      {CATS.map(c => (
        <CatStripBtn key={c.id} $active={activeCat === c.id} onClick={() => onCatChange(c.id)}>
          <span className="num">{c.num}</span>
          <span>{catLabel(c, lang)}</span>
        </CatStripBtn>
      ))}
    </CatStrip>
  );
}

export default CategoryLeftRail;
