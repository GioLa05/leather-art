'use client';

import React from 'react';
import styled from 'styled-components';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS, ORIGINS, GRAINS } from '@/data/specimens';
import { Filters } from '@/types/vault';

function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }

const SORTS = ['idx', 'tan', 'grain', 'entry', 'weight'];

// ─── Styled Components ────────────────────────────────────────
export const RightRail = styled.aside<{ $mobileOpen: boolean }>`
  border-left: 0.5px solid var(--hair-strong);
  position: sticky;
  top: 90px;
  height: calc(100vh - 90px);
  overflow-y: auto;

  @media (max-width: 820px) {
    position: fixed;
    inset: 0;
    z-index: 200;
    height: 100%;
    background: var(--tan);
    border-left: 0;
    transform: ${({ $mobileOpen }) => ($mobileOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 280ms ease;
    overflow-y: auto;
    width: 90vw;
    max-width: 360px;
    right: 0; left: auto;
  }
`;

const FilterRail = styled.div`
  padding: 18px 0 80px;
`;

const FilterSection = styled.div`
  padding: 14px 18px;
  border-bottom: 0.5px solid var(--hair-strong);

  h4 {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 0 0 12px;
    font-weight: 400;
  }
`;

const RangeWrap = styled.div`
  position: relative;
  height: 20px;
  margin: 16px 0 8px;

  input[type=range] {
    position: absolute;
    width: 100%;
    height: 4px;
    top: 8px;
    background: none;
    -webkit-appearance: none;
    pointer-events: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: var(--choc);
      border-radius: 50%;
      cursor: none;
      pointer-events: all;
      border: 0;
    }
    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: var(--choc);
      border-radius: 50%;
      pointer-events: all;
      border: 0;
    }
    @media (pointer: coarse) {
      &::-webkit-slider-thumb {
        cursor: pointer;
        width: 22px;
        height: 22px;
      }
      &::-moz-range-thumb { width: 22px; height: 22px; }
    }
  }
`;

const RangeTrack = styled.div`
  position: absolute;
  top: 10px;
  left: 0; right: 0;
  height: 2px;
  background: var(--bone);
  border: 0.5px solid var(--hair-strong);
`;

const RangeFill = styled.div<{ $left: number; $right: number }>`
  position: absolute;
  top: 0;
  left: ${({ $left }) => $left}%;
  right: ${({ $right }) => $right}%;
  height: 100%;
  background: var(--choc);
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--choc);
  margin-top: 8px;
`;

const GrainStepper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  button {
    padding: 8px 10px;
    min-height: 36px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
    border: 0.5px solid var(--hair-strong);
    background: none;
    cursor: none;
    transition: all 120ms;

    &.active { color: var(--bone); background: var(--choc); border-color: var(--choc); font-weight: 700; }
    &:hover { color: var(--choc); }
    @media (pointer: coarse) {
      cursor: pointer;
      min-height: 44px;
      padding: 10px 14px;
    }
  }
`;

const OriginList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
    padding: 8px 0;
    min-height: 44px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--choc);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: none;
    border: 0;
    cursor: none;

    .box { color: var(--choc); letter-spacing: 0; }
    .ct { margin-left: auto; color: var(--mid); }
    &:hover { color: var(--choc); }
    @media (pointer: coarse) { cursor: pointer; }
  }
`;

const NumberInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  input {
    width: 100%;
    background: var(--bone);
    border: 0.5px solid var(--hair-strong);
    color: var(--choc);
    font-family: var(--mono);
    font-size: 16px; /* min 16px prevents iOS zoom */
    padding: 10px 8px;
    letter-spacing: 0.06em;
    outline: none;
    min-height: 44px;

    &:focus { border-color: var(--choc); }

    @media (min-width: 820px) {
      font-size: 11px;
      padding: 6px 8px;
      min-height: 32px;
    }
  }
`;

const SortList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  button {
    text-align: left;
    padding: 10px 0;
    min-height: 44px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: none;
    border: 0;
    cursor: none;

    &.active { color: var(--choc); font-weight: 700; }
    &:hover { color: var(--choc); }
    @media (pointer: coarse) { cursor: pointer; }

    @media (min-width: 820px) {
      padding: 5px 0;
      min-height: unset;
    }
  }
`;

export const RailClose = styled.button`
  display: none;
  width: 100%;
  padding: 14px 18px;
  min-height: 52px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--choc);
  border-bottom: 0.5px solid var(--hair-strong);
  text-align: left;
  background: none;
  border-left: 0; border-right: 0; border-top: 0;
  cursor: pointer;

  @media (max-width: 820px) { display: block; }
`;

// ─── Props ───────────────────────────────────────────────────
interface FilterPanelProps {
  lang: Lang;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  mobileOpen: boolean;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────
export default function FilterPanel({ lang, filters, onFiltersChange, mobileOpen, onClose }: FilterPanelProps) {
  const tanMin = 48, tanMax = 240;
  const tanLeftPct = ((filters.tanLo - tanMin) / (tanMax - tanMin)) * 100;
  const tanRightPct = 100 - ((filters.tanHi - tanMin) / (tanMax - tanMin)) * 100;

  function updateTanLo(v: number) {
    onFiltersChange({ ...filters, tanLo: Math.min(v, filters.tanHi - 1) });
  }
  function updateTanHi(v: number) {
    onFiltersChange({ ...filters, tanHi: Math.max(v, filters.tanLo + 1) });
  }

  return (
    <RightRail $mobileOpen={mobileOpen}>
      <RailClose onClick={onClose}>✕ {t(lang, 'filters.title')}</RailClose>
      <FilterRail>
        {/* Tannage range */}
        <FilterSection>
          <h4>{t(lang, 'filter.tan')}</h4>
          <RangeWrap>
            <RangeTrack>
              <RangeFill $left={tanLeftPct} $right={tanRightPct} />
            </RangeTrack>
            <input type="range" min={tanMin} max={tanMax} value={filters.tanLo}
              onChange={e => updateTanLo(+e.target.value)} style={{ zIndex: 2 }} />
            <input type="range" min={tanMin} max={tanMax} value={filters.tanHi}
              onChange={e => updateTanHi(+e.target.value)} style={{ zIndex: 3 }} />
          </RangeWrap>
          <RangeLabels>
            <span>{pad3(filters.tanLo)}H</span>
            <span>{pad3(filters.tanHi)}H</span>
          </RangeLabels>
        </FilterSection>

        {/* Grain */}
        <FilterSection>
          <h4>{t(lang, 'filter.grain')}</h4>
          <GrainStepper>
            {GRAINS.map(g => (
              <button key={g}
                className={filters.grain === g ? 'active' : ''}
                onClick={() => onFiltersChange({ ...filters, grain: filters.grain === g ? null : g })}>
                {t(lang, `grain.${g.toLowerCase()}` as Parameters<typeof t>[1])}
              </button>
            ))}
          </GrainStepper>
        </FilterSection>

        {/* Origins */}
        <FilterSection>
          <h4>{t(lang, 'filter.origin')}</h4>
          <OriginList>
            {ORIGINS.map(o => {
              const checked = filters.origins.has(o);
              const ct = VAULT_SPECIMENS.filter(s => s.origin === o).length;
              return (
                <button key={o} onClick={() => {
                  const next = new Set(filters.origins);
                  if (next.has(o)) next.delete(o); else next.add(o);
                  onFiltersChange({ ...filters, origins: next });
                }}>
                  <span className="box mono">[{checked ? 'X' : ' '}]</span>
                  <span>{t(lang, `origin.${o.toLowerCase()}` as Parameters<typeof t>[1])}</span>
                  <span className="ct">{pad2(ct)}</span>
                </button>
              );
            })}
          </OriginList>
        </FilterSection>

        {/* Weight */}
        <FilterSection>
          <h4>{t(lang, 'filter.weight')}</h4>
          <NumberInputRow>
            <input type="number" placeholder="0" value={filters.wLo || ''}
              onChange={e => onFiltersChange({ ...filters, wLo: +e.target.value || 0 })} />
            <input type="number" placeholder="3000" value={filters.wHi || ''}
              onChange={e => onFiltersChange({ ...filters, wHi: +e.target.value || 3000 })} />
          </NumberInputRow>
        </FilterSection>

        {/* Entry date */}
        <FilterSection>
          <h4>{t(lang, 'filter.entry')}</h4>
          <NumberInputRow>
            <input type="text" placeholder="2099.03.14" value={filters.dLo}
              onChange={e => onFiltersChange({ ...filters, dLo: e.target.value })} />
            <input type="text" placeholder="2099.11.02" value={filters.dHi}
              onChange={e => onFiltersChange({ ...filters, dHi: e.target.value })} />
          </NumberInputRow>
        </FilterSection>

        {/* Sort */}
        <FilterSection>
          <h4>{t(lang, 'filter.sort')}</h4>
          <SortList>
            {SORTS.map(s => (
              <button key={s} className={filters.sort === s ? 'active' : ''}
                onClick={() => onFiltersChange({ ...filters, sort: s })}>
                {t(lang, `sort.${s}` as Parameters<typeof t>[1])}
              </button>
            ))}
          </SortList>
        </FilterSection>
      </FilterRail>
    </RightRail>
  );
}
