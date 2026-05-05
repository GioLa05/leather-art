'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Cursor from '@/components/Cursor';
import StatusBar from '@/components/StatusBar';
import Nav from '@/components/Nav';
import Silhouette, { SchematicSvg } from '@/components/Silhouette';
import { Lang, t, I18N } from '@/i18n/translations';
import { CATS } from '@/data/categories';
import {
  VAULT_SPECIMENS, ORIGINS, GRAINS, TOTAL_SPECIMENS, IN_VAULT,
  VaultSpecimen, GrainKind, OriginKind,
} from '@/data/specimens';

// ─── Helpers ──────────────────────────────────────────────────
function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }
function grainDensity(g: GrainKind) {
  return ({ FINE: 7.4, MEDIUM: 6.9, COARSE: 6.2, RAW: 5.8, MIXED: 6.5 }[g] ?? 6.8).toFixed(1);
}

// ─── Animations ───────────────────────────────────────────────
const flickerAnim = keyframes`
  0%, 100% { opacity: 1; }
  25%       { opacity: 0.4; }
  50%       { opacity: 0.9; }
  75%       { opacity: 0.3; }
`;
const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ─── Layout shells ─────────────────────────────────────────────
const PageWrap = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr 260px;
  min-height: calc(100vh - 90px);
  border-top: 0.5px solid var(--hair-strong);

  @media (max-width: 1100px) { grid-template-columns: 180px 1fr 220px; }
  @media (max-width: 820px)  { grid-template-columns: 1fr; }
`;

const LeftRail = styled.aside`
  border-right: 0.5px solid var(--hair-strong);
  position: sticky;
  top: 90px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  @media (max-width: 820px) { display: none; }
`;

const RightRail = styled.aside<{ $mobileOpen: boolean }>`
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

const Main = styled.main`
  min-width: 0;
`;

// ─── Header ───────────────────────────────────────────────────
const VaultHeader = styled.div`
  padding: 22px 28px 16px;
  border-bottom: 0.5px solid var(--hair-strong);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Breadcrumb = styled.div`
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--mid);
  text-transform: uppercase;
  display: flex;
  gap: 6px;
  align-items: center;

  .sep { opacity: 0.5; }
  .cur { color: var(--choc); }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 18px;
  flex-wrap: wrap;

  h1 {
    font-family: var(--display);
    font-size: clamp(28px, 4vw, 48px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0;
    line-height: 0.95;
  }
  .sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--mid);
    letter-spacing: 0.1em;
  }
`;

const CounterRow = styled.div`
  display: flex;
  gap: 0;
  border-top: 0.5px solid var(--hair-strong);
  padding-top: 10px;
`;

const Counter = styled.div`
  flex: 1;
  padding-right: 18px;

  .val {
    font-family: var(--display);
    font-size: 28px;
    letter-spacing: -0.02em;
    color: var(--choc);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .lbl {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--mid);
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

// ─── Category rail ─────────────────────────────────────────────
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

// ─── Category strip (mobile) ───────────────────────────────────
const CatStrip = styled.div`
  display: none;
  overflow-x: auto;
  border-bottom: 0.5px solid var(--hair-strong);
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media (max-width: 820px) { display: flex; }
`;

const CatStripBtn = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 10px 14px;
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

// ─── Toolbar ──────────────────────────────────────────────────
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 28px;
  border-bottom: 0.5px solid var(--hair-strong);
  gap: 12px;
  flex-wrap: wrap;
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
    padding: 6px 14px;
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
    @media (pointer: coarse) { cursor: pointer; }
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
  padding: 6px 14px;
  background: none;
  cursor: pointer;

  @media (max-width: 820px) { display: block; }
`;

// ─── Dossier (table view) ─────────────────────────────────────
const DossierWrap = styled.div`
  overflow-x: auto;
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

  &:hover { background: var(--bone); }
  @media (pointer: coarse) { cursor: pointer; }

  @media (max-width: 1100px) {
    grid-template-columns: 52px 72px 1fr 72px 72px 80px 60px 72px 36px;
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

    svg { width: 32px; height: 32px; }
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
  width: 28px;
  height: 28px;
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
  @media (pointer: coarse) { cursor: pointer; }
`;

// ─── Specimen grid ─────────────────────────────────────────────
const SpecGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border-top: 0.5px solid var(--hair-strong);
  border-left: 0.5px solid var(--hair-strong);

  @media (max-width: 980px) { grid-template-columns: repeat(6, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const SPAN_MAP: Record<string, number> = { s1: 5, s2: 4, s3: 3, s4: 4, s5: 5, s6: 3, s7: 6, s8: 5, s9: 4 };
const SPAN_MAP_MD: Record<string, number> = { s1: 6, s2: 3, s3: 3, s4: 6, s5: 6, s6: 3, s7: 6, s8: 6, s9: 3 };

const SCard = styled.article<{ $span: string; $selected: boolean }>`
  border-right: 0.5px solid var(--hair-strong);
  border-bottom: 0.5px solid var(--hair-strong);
  padding: 16px 16px 14px;
  display: flex;
  flex-direction: column;
  background: ${({ $selected }) => ($selected ? 'var(--bone)' : 'var(--tan)')};
  transition: background 200ms ease;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  cursor: none;
  grid-column: span ${({ $span }) => SPAN_MAP[$span] ?? 4};

  @media (max-width: 980px) {
    grid-column: span ${({ $span }) => SPAN_MAP_MD[$span] ?? 3};
  }
  @media (max-width: 600px) { grid-column: span 1; }
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
  svg { width: 80%; height: 100%; max-height: 160px; }
`;

const SCardName = styled.h3`
  font-family: var(--display);
  font-size: clamp(14px, 1.6vw, 18px);
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

// ─── Empty state ───────────────────────────────────────────────
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

// ─── Filter rail ───────────────────────────────────────────────
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
      width: 12px;
      height: 12px;
      background: var(--choc);
      border-radius: 50%;
      cursor: none;
      pointer-events: all;
      border: 0;
    }
    &::-moz-range-thumb {
      width: 12px;
      height: 12px;
      background: var(--choc);
      border-radius: 50%;
      pointer-events: all;
      border: 0;
    }
    @media (pointer: coarse) {
      &::-webkit-slider-thumb { cursor: pointer; }
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
    padding: 4px 8px;
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
    @media (pointer: coarse) { cursor: pointer; }
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
    padding: 5px 0;
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
    font-size: 11px;
    padding: 6px 8px;
    letter-spacing: 0.06em;
    outline: none;

    &:focus { border-color: var(--choc); }
  }
`;

const SortList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  button {
    text-align: left;
    padding: 5px 0;
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
  }
`;

const RailClose = styled.button`
  display: none;
  width: 100%;
  padding: 12px 18px;
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

// ─── Compare drawer ────────────────────────────────────────────
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

  .title { color: var(--bone); font-weight: 700; }

  button {
    color: rgba(240,228,210,0.7);
    background: none;
    border: 0.5px solid rgba(240,228,210,0.3);
    padding: 5px 10px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: none;
    &:hover { color: var(--bone); border-color: var(--bone); }
    @media (pointer: coarse) { cursor: pointer; }
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
    &:hover { color: var(--bone); }
    @media (pointer: coarse) { cursor: pointer; }
  }
`;

// ─── Modal ─────────────────────────────────────────────────────
const ModalBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(61,31,15,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease;

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

const Modal = styled.div`
  background: var(--tan);
  border: 0.5px solid var(--hair-strong);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${fadeIn} 180ms ease;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const ModalLeft = styled.div`
  border-right: 0.5px solid var(--hair-strong);
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) { border-right: 0; border-bottom: 0.5px solid var(--hair-strong); }
`;

const ModalTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mid);

  button {
    color: var(--choc);
    background: none;
    border: 0;
    font-family: var(--mono);
    font-size: 18px;
    cursor: none;
    line-height: 1;
    &:hover { opacity: 0.6; }
    @media (pointer: coarse) { cursor: pointer; }
  }
`;

const ModalGallery = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;

  .primary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px;
    svg { width: 70%; height: 100%; max-height: 240px; }
  }
`;

const ModalThumbs = styled.div`
  display: flex;
  gap: 0;
  border-top: 0.5px solid var(--hair-strong);
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  button {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-right: 0.5px solid var(--hair-strong);
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
    background: var(--bone);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: none;
    transition: background 120ms;

    &.active { background: var(--choc); svg path, svg rect, svg circle, svg line { stroke: var(--bone); } }
    &:hover { background: var(--bone); opacity: 0.8; }
    svg { width: 44px; height: 44px; }
    @media (pointer: coarse) { cursor: pointer; }
  }
`;

const ModalCaption = styled.div`
  padding: 8px 18px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--mid);
  letter-spacing: 0.1em;
  border-top: 0.5px solid var(--hair-strong);
  display: flex;
  justify-content: space-between;
`;

const ModalNav = styled.div`
  display: flex;
  gap: 0;
  padding: 8px 18px;
  border-top: 0.5px solid var(--hair-strong);

  button {
    flex: 1;
    padding: 8px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--mid);
    background: none;
    border: 0.5px solid var(--hair-strong);
    cursor: none;
    text-transform: uppercase;

    &:hover { color: var(--choc); background: var(--bone); }
    &:last-child { border-left: 0; }
    @media (pointer: coarse) { cursor: pointer; }
  }
`;

const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  padding: 22px 22px 0;
  flex: 1;

  .bc {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--mid);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 14px;
    .sep { opacity: 0.5; margin: 0 6px; }
    .cur { color: var(--choc); }
  }

  .idx {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--mid);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  h2 {
    font-family: var(--display);
    font-size: clamp(22px, 2.5vw, 32px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 10px;
    line-height: 1;

    .slash { font-family: var(--mono); font-weight: 400; font-size: 0.55em; color: var(--mid); padding: 0 0.2em; vertical-align: 0.2em; }
  }

  .tagline {
    font-family: var(--script);
    font-size: 18px;
    color: var(--choc);
    margin-bottom: 14px;
    line-height: 1.3;
  }
`;

const SpecTable = styled.div`
  border-top: 0.5px solid var(--hair-strong);
  margin: 0 -22px;
  padding: 0 22px;

  .row {
    display: grid;
    grid-template-columns: 9ch 1fr;
    gap: 10px;
    padding: 7px 0;
    border-bottom: 0.5px solid var(--hair-strong);
    font-family: var(--mono);
    font-size: 11px;
    color: var(--choc);

    .k { color: var(--mid); text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; }
  }
`;

const ModalEditorial = styled.p`
  font-family: var(--mono);
  font-size: 12px;
  line-height: 1.65;
  color: var(--choc);
  margin: 14px 0 0;
`;

const ModalFoot = styled.div`
  padding: 14px 22px;
  border-top: 0.5px solid var(--hair-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;

  .price {
    font-family: var(--display);
    font-size: 28px;
    letter-spacing: -0.02em;
    color: var(--choc);
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    button {
      padding: 8px 14px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: none;
      border: 0.5px solid var(--hair-strong);
      background: none;
      color: var(--choc);
      transition: all 120ms;

      &.primary { background: var(--choc); color: var(--bone); border-color: var(--choc); }
      &:hover { background: var(--choc); color: var(--bone); border-color: var(--choc); }
      @media (pointer: coarse) { cursor: pointer; }
    }
  }
`;

// ─── Filters state ─────────────────────────────────────────────
interface Filters {
  tanLo: number; tanHi: number;
  grain: GrainKind | null;
  origins: Set<OriginKind>;
  wLo: number; wHi: number;
  dLo: string; dHi: string;
  sort: string;
}

const SORTS = ['idx', 'tan', 'grain', 'entry', 'weight'];

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

function galleryCount() { return 4; }

// ─── Component ─────────────────────────────────────────────────
export default function VaultPage() {
  const [lang, setLang] = useState<Lang>('EN');
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

  // count-up
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

  // filter
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

  // keyboard modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (modalId == null) return;
      if (e.key === 'Escape') setModalId(null);
      if (e.key === 'ArrowLeft') navModal(-1);
      if (e.key === 'ArrowRight') navModal(1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.body.style.overflow = modalId != null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalId]);

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

  function catLabel(c: typeof CATS[0]) {
    if (c.isAll) return lang === 'KA' ? 'ყველა' : lang === 'RU' ? 'ВСЕ' : 'ALL';
    return c.k ? t(lang, c.k as Parameters<typeof t>[1]) : '';
  }

  function catCount(id: string) {
    return id === 'all' ? VAULT_SPECIMENS.length : VAULT_SPECIMENS.filter(s => s.cat === id).length;
  }

  const modalSpec = modalId != null ? VAULT_SPECIMENS.find(s => s.i === modalId) : null;

  // Tannage range derived values
  const tanMin = 48, tanMax = 240;
  const tanLeftPct = ((filters.tanLo - tanMin) / (tanMax - tanMin)) * 100;
  const tanRightPct = 100 - ((filters.tanHi - tanMin) / (tanMax - tanMin)) * 100;

  function updateTanLo(v: number) {
    setFilters(f => ({ ...f, tanLo: Math.min(v, f.tanHi - 1) }));
  }
  function updateTanHi(v: number) {
    setFilters(f => ({ ...f, tanHi: Math.max(v, f.tanLo + 1) }));
  }

  // Gallery views (4 variations using same SVG component)
  const GALLERY_VIEWS = [0, 1, 2, 3]; // indices

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

      {/* Category strip mobile */}
      <CatStrip>
        {CATS.map(c => (
          <CatStripBtn key={c.id} $active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
            <span className="num">{c.num}</span>
            <span>{catLabel(c)}</span>
          </CatStripBtn>
        ))}
      </CatStrip>

      <PageWrap>
        {/* Left rail — categories */}
        <LeftRail>
          <VaultHeader style={{ padding: '18px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)' }}>
              {t(lang, 'bc.vault')} // {t(lang, 'bc.sector')} // {t(lang, 'bc.index')}
            </div>
          </VaultHeader>
          <CatRail>
            {CATS.map(c => (
              <CatBlock key={c.id} $active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
                <span className="num">{c.num}</span>
                <span className="nm">{catLabel(c)}</span>
                <span className="ct">{pad3(catCount(c.id))}</span>
              </CatBlock>
            ))}
          </CatRail>
        </LeftRail>

        {/* Main content */}
        <Main>
          <VaultHeader>
            <Breadcrumb>
              <span>{t(lang, 'bc.vault')}</span>
              <span className="sep">//</span>
              <span>{t(lang, 'bc.sector')}</span>
              <span className="sep">//</span>
              <span className="cur">{t(lang, 'bc.index')}</span>
            </Breadcrumb>
            <TitleRow>
              <h1>VAULT INDEX</h1>
              <span className="sub">{t(lang, 'title.sub')}</span>
            </TitleRow>
            <CounterRow>
              <Counter>
                <div className="val">{pad3(specsCount)}</div>
                <div className="lbl">{t(lang, 'counter.specs')}</div>
              </Counter>
              <Counter>
                <div className="val">{pad3(vaultCount)}</div>
                <div className="lbl">{t(lang, 'counter.vault')}</div>
              </Counter>
              <Counter>
                <div className="val">{pad3(selected.length)}</div>
                <div className="lbl">{t(lang, 'counter.sel')}</div>
              </Counter>
            </CounterRow>
          </VaultHeader>

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

          {/* Dossier view */}
          {view === 'dossier' && (
            <DossierWrap>
              <DossierHead>
                <div>{t(lang, 'th.img')}</div>
                <div>{t(lang, 'th.idx')}</div>
                <div>{t(lang, 'th.name')}</div>
                <div>{t(lang, 'th.tan')}</div>
                <div>{t(lang, 'th.grain')}</div>
                <div>{t(lang, 'th.origin')}</div>
                <div>{t(lang, 'th.weight')}</div>
                <div>{t(lang, 'th.price')}</div>
                <div />
              </DossierHead>
              {filtered.length === 0 ? (
                <EmptyState>
                  <div className="big">{t(lang, 'empty.big')}</div>
                  <div className="sub">{t(lang, 'empty.sub')}</div>
                </EmptyState>
              ) : filtered.map(s => (
                <DRow key={s.i} $selected={selected.includes(s.i)} onClick={() => { setModalId(s.i); setModalGalleryIdx(0); }}>
                  <div className="thumb"><Silhouette kind={s.sil} /></div>
                  <div className="v" style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{pad2(s.i)}/{pad3(VAULT_SPECIMENS.length)}</div>
                  <div className="nm">{s.name}</div>
                  <div className="v">{pad3(s.tan)}H</div>
                  <div className="v">{t(lang, `grain.${s.grain.toLowerCase()}` as Parameters<typeof t>[1])}</div>
                  <div className="v">{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</div>
                  <div className="v">{s.weight} G</div>
                  <div className="price">€{s.price}</div>
                  <AddBtn onClick={e => { e.stopPropagation(); toggleSelect(s.i); }} aria-label="add to compare">
                    {selected.includes(s.i) ? '×' : '+'}
                  </AddBtn>
                </DRow>
              ))}
            </DossierWrap>
          )}

          {/* Specimen grid view */}
          {view === 'specimen' && (
            filtered.length === 0 ? (
              <EmptyState style={{ gridColumn: '1/-1' }}>
                <div className="big">{t(lang, 'empty.big')}</div>
                <div className="sub">{t(lang, 'empty.sub')}</div>
              </EmptyState>
            ) : (
              <SpecGrid>
                {filtered.map(s => (
                  <SCard key={s.i} $span={s.span} $selected={selected.includes(s.i)}
                    onClick={() => { setModalId(s.i); setModalGalleryIdx(0); }}>
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
                      <AddBtn onClick={e => { e.stopPropagation(); toggleSelect(s.i); }}>
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
            )
          )}
        </Main>

        {/* Right rail — filters */}
        <RightRail $mobileOpen={mobileFilter}>
          <RailClose onClick={() => setMobileFilter(false)}>✕ {t(lang, 'filters.title')}</RailClose>
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
                    onClick={() => setFilters(f => ({ ...f, grain: f.grain === g ? null : g }))}>
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
                    <button key={o} onClick={() => setFilters(f => {
                      const next = new Set(f.origins);
                      if (next.has(o)) next.delete(o); else next.add(o);
                      return { ...f, origins: next };
                    })}>
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
                  onChange={e => setFilters(f => ({ ...f, wLo: +e.target.value || 0 }))} />
                <input type="number" placeholder="3000" value={filters.wHi || ''}
                  onChange={e => setFilters(f => ({ ...f, wHi: +e.target.value || 3000 }))} />
              </NumberInputRow>
            </FilterSection>

            {/* Entry date */}
            <FilterSection>
              <h4>{t(lang, 'filter.entry')}</h4>
              <NumberInputRow>
                <input type="text" placeholder="2099.03.14" value={filters.dLo}
                  onChange={e => setFilters(f => ({ ...f, dLo: e.target.value }))} />
                <input type="text" placeholder="2099.11.02" value={filters.dHi}
                  onChange={e => setFilters(f => ({ ...f, dHi: e.target.value }))} />
              </NumberInputRow>
            </FilterSection>

            {/* Sort */}
            <FilterSection>
              <h4>{t(lang, 'filter.sort')}</h4>
              <SortList>
                {SORTS.map(s => (
                  <button key={s} className={filters.sort === s ? 'active' : ''}
                    onClick={() => setFilters(f => ({ ...f, sort: s }))}>
                    {t(lang, `sort.${s}` as Parameters<typeof t>[1])}
                  </button>
                ))}
              </SortList>
            </FilterSection>
          </FilterRail>
        </RightRail>
      </PageWrap>

      {/* Compare drawer */}
      <Drawer $open={selected.length > 0}>
        <DrawerHeader>
          <span className="title">{t(lang, 'drawer.title')}</span>
          <span>{t(lang, 'drawer.slot')} {selected.length} / 3</span>
          <button onClick={() => setSelected([])}>{t(lang, 'drawer.clear')}</button>
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
                  <span className="nm">{s.name}</span>
                  <button className="rm" onClick={() => toggleSelect(s.i)}>[ × ]</button>
                </div>
                <div className="sn">{s.sn}</div>
                <div className="rows">
                  <div><span className="k">{t(lang, 'th.tan')}</span><span>{pad3(s.tan)}H</span></div>
                  <div><span className="k">{t(lang, 'th.grain')}</span><span>{t(lang, `grain.${s.grain.toLowerCase()}` as Parameters<typeof t>[1])}</span></div>
                  <div><span className="k">{t(lang, 'th.origin')}</span><span>{t(lang, `origin.${s.origin.toLowerCase()}` as Parameters<typeof t>[1])}</span></div>
                  <div><span className="k">{t(lang, 'th.weight')}</span><span>{s.weight} G</span></div>
                  <div><span className="k">{t(lang, 'th.price')}</span><span>€{s.price}</span></div>
                </div>
              </DrawerSlot>
            );
          })}
        </DrawerSlots>
      </Drawer>

      {/* Modal */}
      <ModalBackdrop $open={modalId != null} onClick={e => { if (e.target === e.currentTarget) setModalId(null); }}>
        {modalSpec && (
          <Modal onClick={e => e.stopPropagation()}>
            <ModalLeft>
              <ModalTopBar>
                <span>SPECIMEN {pad2(modalSpec.i)} / {pad3(TOTAL_SPECIMENS)}</span>
                <button onClick={() => setModalId(null)} aria-label="close">×</button>
              </ModalTopBar>
              <ModalGallery>
                <div className="primary">
                  <Silhouette kind={modalSpec.sil} />
                </div>
                <ModalThumbs>
                  {GALLERY_VIEWS.map(gi => (
                    <button key={gi} className={gi === modalGalleryIdx ? 'active' : ''}
                      onClick={() => setModalGalleryIdx(gi)}>
                      <Silhouette kind={modalSpec.sil} />
                    </button>
                  ))}
                </ModalThumbs>
                <ModalCaption>
                  <span>{modalSpec.sn}</span>
                  <span>IMG {pad2(modalGalleryIdx + 1)} / 04</span>
                </ModalCaption>
              </ModalGallery>
              <ModalNav>
                <button onClick={() => navModal(-1)}>{t(lang, 'modal.prev')}</button>
                <button onClick={() => navModal(1)}>{t(lang, 'modal.next')}</button>
              </ModalNav>
            </ModalLeft>
            <ModalRight>
              <ModalBody>
                <div className="bc">
                  <span>{t(lang, 'modal.bc.vault')}</span>
                  <span className="sep">//</span>
                  <span>{t(lang, 'modal.bc.all')}</span>
                  <span className="sep">//</span>
                  <span className="cur">{modalSpec.name.replace(' // ', '_')}</span>
                </div>
                <div className="idx">SPECIMEN {pad2(modalSpec.i)} / {pad3(TOTAL_SPECIMENS)}</div>
                <h2>
                  {modalSpec.name.includes(' // ')
                    ? <>{modalSpec.name.split(' // ')[0]}<br /><span className="slash">//</span>{modalSpec.name.split(' // ')[1]}</>
                    : modalSpec.name
                  }
                </h2>
                {modalSpec.quote && <div className="tagline">{modalSpec.quote}</div>}
                <SpecTable>
                  {[
                    [t(lang, 'ms.tannage'), 'Vegetable · mimosa'],
                    [t(lang, 'ms.hours'), `${pad3(modalSpec.tan)} hrs`],
                    [t(lang, 'ms.grain'), `${grainDensity(modalSpec.grain)} fibers/mm² · ${t(lang, `grain.${modalSpec.grain.toLowerCase()}` as Parameters<typeof t>[1])}`],
                    [t(lang, 'ms.origin'), t(lang, `origin.${modalSpec.origin.toLowerCase()}` as Parameters<typeof t>[1])],
                    [t(lang, 'ms.weight'), `${modalSpec.weight} g ± 6`],
                    [t(lang, 'ms.coord'), modalSpec.coord],
                    [t(lang, 'ms.batch'), modalSpec.sn],
                    [t(lang, 'ms.finish'), modalSpec.finish],
                    [t(lang, 'ms.entry'), modalSpec.entry],
                  ].map(([k, v]) => (
                    <div key={k} className="row">
                      <span className="k">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </SpecTable>
                <ModalEditorial>{modalSpec.editorial}</ModalEditorial>
              </ModalBody>
              <ModalFoot>
                <span className="price">€{modalSpec.price}</span>
                <div className="actions">
                  <button onClick={() => toggleSelect(modalSpec.i)}>
                    {selected.includes(modalSpec.i)
                      ? t(lang, 'modal.compare').replace('[+]', '[×]')
                      : t(lang, 'modal.compare')}
                  </button>
                  <button className="primary">{t(lang, 'modal.request')}</button>
                </div>
              </ModalFoot>
            </ModalRight>
          </Modal>
        )}
      </ModalBackdrop>
    </>
  );
}
