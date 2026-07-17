'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Cursor from '@/components/Cursor';
import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import VaultHeader from '@/components/vault/VaultHeader';
import { CategoryLeftRail, CategoryMobileStrip } from '@/components/vault/CategoryRail';
import FilterPanel from '@/components/vault/FilterPanel';
import DossierView from '@/components/vault/DossierView';
import VaultSpecimenGrid from '@/components/vault/SpecimenGrid';
import CompareDrawer from '@/components/vault/CompareDrawer';
import SpecimenModal from '@/components/vault/SpecimenModal';
import { t } from '@/i18n/translations';
import { useLang } from '@/i18n/LangContext';
import { VAULT_SPECIMENS, ORIGINS, TOTAL_SPECIMENS, IN_VAULT, VaultSpecimen } from '@/data/specimens';
import { Filters } from '@/types/vault';

// ─── Helpers ──────────────────────────────────────────────────
function pad3(n: number) { return String(n).padStart(3, '0'); }

// ─── Animations ───────────────────────────────────────────────
const flickerAnim = keyframes`
  0%, 100% { opacity: 1; }
  25%       { opacity: 0.4; }
  50%       { opacity: 0.9; }
  75%       { opacity: 0.3; }
`;

// ─── Layout ───────────────────────────────────────────────────
const PageWrap = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 260px;
  min-height: calc(100vh - 90px);
  border-top: 0.5px solid var(--hair-strong);

  @media (max-width: 1100px) { grid-template-columns: 180px 1fr 220px; }
  @media (max-width: 820px)  { grid-template-columns: 1fr; }
`;

const Main = styled.main`
  min-width: 0;
`;

// ─── Toolbar ──────────────────────────────────────────────────
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 28px;
  border-bottom: 0.5px solid var(--hair-strong);
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    padding: 8px 16px;
    gap: 8px;
  }
`;

const CalibText = styled.span<{ $calibrating: boolean }>`
  font-family: var(--mono);
  font-size: 12px;
  color: var(--choc);
  letter-spacing: 0.06em;
  animation: ${({ $calibrating }) => ($calibrating ? css`${flickerAnim} 0.2s linear` : 'none')};

  b { font-weight: 700; }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0;
  border: 0.5px solid var(--hair-strong);

  button {
    padding: 8px 14px;
    min-height: 36px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--mid);
    background: none;
    border: 0;
    border-left: 0.5px solid var(--hair-strong);
    cursor: none;
    text-transform: uppercase;

    &:first-child { border-left: 0; }
    &.active { color: var(--choc); background: var(--bone); font-weight: 700; }
    &:hover { color: var(--choc); }
    @media (pointer: coarse) {
      cursor: pointer;
      min-height: 44px;
      padding: 10px 16px;
    }
  }
`;

const FilterFab = styled.button`
  display: none;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--choc);
  border: 0.5px solid var(--hair-strong);
  padding: 8px 14px;
  min-height: 36px;
  background: none;
  cursor: pointer;

  @media (max-width: 820px) {
    display: block;
    min-height: 44px;
  }
`;

// ─── Filter ───────────────────────────────────────────────────
function applyFilters(cat: string, f: Filters): VaultSpecimen[] {
  let out = VAULT_SPECIMENS.slice();
  if (cat !== 'all') out = out.filter(s => s.cat === cat);
  out = out.filter(s => s.tan >= f.tanLo && s.tan <= f.tanHi);
  if (f.grain) out = out.filter(s => s.grain === f.grain);
  out = out.filter(s => f.origins.has(s.origin));
  if (f.wLo) out = out.filter(s => s.weight >= f.wLo);
  if (f.wHi) out = out.filter(s => s.weight <= f.wHi);
  out = out.filter(s => s.entry >= f.dLo && s.entry <= f.dHi);
  const go: Record<string, number> = { FINE: 0, MEDIUM: 1, COARSE: 2, RAW: 3, MIXED: 4 };
  switch (f.sort) {
    case 'tan':    out.sort((a, b) => a.tan - b.tan); break;
    case 'grain':  out.sort((a, b) => go[a.grain] - go[b.grain]); break;
    case 'entry':  out.sort((a, b) => a.entry < b.entry ? -1 : 1); break;
    case 'weight': out.sort((a, b) => a.weight - b.weight); break;
    default:       out.sort((a, b) => a.i - b.i);
  }
  return out;
}

// ─── Component ────────────────────────────────────────────────
export default function VaultPage() {
  const { lang, setLang } = useLang();
  const [activeCat, setActiveCat] = useState('all');
  const [view, setView] = useState<'dossier' | 'specimen'>('dossier');
  const [selected, setSelected] = useState<number[]>([]);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [calibrating, setCalibrating] = useState(false);
  const [filtered, setFiltered] = useState<VaultSpecimen[]>([]);
  const [modalId, setModalId] = useState<number | null>(null);
  const [modalGalleryIdx, setModalGalleryIdx] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    tanLo: 48, tanHi: 240,
    grain: null,
    origins: new Set(ORIGINS),
    wLo: 0, wHi: 3000,
    dLo: '2099.03.14', dHi: '2099.11.02',
    sort: 'idx',
  });

  // Count-up animation
  const [specsCount, setSpecsCount] = useState(0);
  const [vaultCount, setVaultCount] = useState(0);
  useEffect(() => {
    const dur = 1200;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setSpecsCount(Math.round(TOTAL_SPECIMENS * e));
      setVaultCount(Math.round(IN_VAULT * e));
      if (p < 1) requestAnimationFrame(tick);
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(tick);
    } else {
      setSpecsCount(TOTAL_SPECIMENS);
      setVaultCount(IN_VAULT);
    }
  }, []);

  // Filter with debounce
  const calibTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setFiltered(applyFilters(activeCat, filters)); return; }
    setCalibrating(true);
    if (calibTimer.current) clearTimeout(calibTimer.current);
    calibTimer.current = setTimeout(() => {
      setCalibrating(false);
      setFiltered(applyFilters(activeCat, filters));
    }, 200);
  }, [activeCat, filters]);

  function toggleSelect(id: number) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  function navModal(dir: number) {
    if (modalId == null) return;
    const idx = filtered.findIndex(s => s.i === modalId);
    if (idx === -1) return;
    let next = idx + dir;
    if (next < 0) next = filtered.length - 1;
    if (next >= filtered.length) next = 0;
    setModalId(filtered[next].i);
    setModalGalleryIdx(0);
  }

  function openModal(id: number) {
    setModalId(id);
    setModalGalleryIdx(0);
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
      <Nav lang={lang} activeId="vault" />

      {/* Mobile category strip */}
      <CategoryMobileStrip lang={lang} activeCat={activeCat} onCatChange={setActiveCat} />

      <PageWrap>
        {/* Left rail — categories */}
        <CategoryLeftRail lang={lang} activeCat={activeCat} onCatChange={setActiveCat} />

        {/* Main content */}
        <Main>
          <VaultHeader
            lang={lang}
            specsCount={specsCount}
            vaultCount={vaultCount}
            selectedCount={selected.length}
          />

          <Toolbar>
            <CalibText $calibrating={calibrating}>
              {calibrating
                ? <b>{t(lang, 'calibrating')}</b>
                : <><b>{pad3(filtered.length)}</b> {t(lang, 'results.showing')} / <b>{pad3(VAULT_SPECIMENS.length)}</b> {t(lang, 'results.specs')}</>
              }
            </CalibText>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <ViewToggle>
                <button className={view === 'dossier' ? 'active' : ''} onClick={() => setView('dossier')}>
                  {t(lang, 'view.dossier')}
                </button>
                <button className={view === 'specimen' ? 'active' : ''} onClick={() => setView('specimen')}>
                  {t(lang, 'view.specimen')}
                </button>
              </ViewToggle>
              <FilterFab onClick={() => setMobileFilter(true)}>
                {t(lang, 'filters.title')}
              </FilterFab>
            </div>
          </Toolbar>

          {view === 'dossier' && (
            <DossierView
              lang={lang}
              filtered={filtered}
              selected={selected}
              onToggleSelect={toggleSelect}
              onOpenModal={openModal}
            />
          )}

          {view === 'specimen' && (
            <VaultSpecimenGrid
              lang={lang}
              filtered={filtered}
              selected={selected}
              onToggleSelect={toggleSelect}
              onOpenModal={openModal}
            />
          )}
        </Main>

        {/* Right rail — filters */}
        <FilterPanel
          lang={lang}
          filters={filters}
          onFiltersChange={setFilters}
          mobileOpen={mobileFilter}
          onClose={() => setMobileFilter(false)}
        />
      </PageWrap>

      {/* Compare drawer */}
      <CompareDrawer
        lang={lang}
        selected={selected}
        onToggleSelect={toggleSelect}
        onClear={() => setSelected([])}
      />

      {/* Specimen modal */}
      <SpecimenModal
        lang={lang}
        modalId={modalId}
        modalGalleryIdx={modalGalleryIdx}
        filtered={filtered}
        selected={selected}
        onClose={() => setModalId(null)}
        onToggleSelect={toggleSelect}
        onGalleryChange={setModalGalleryIdx}
        onNav={navModal}
      />
    </>
  );
}
