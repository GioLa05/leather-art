'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Lang, t } from '@/i18n/translations';
import { NAV } from '@/data/nav';

const PNav = styled.nav`
  border-top: 0.5px solid var(--hair-strong);
  border-bottom: 0.5px solid var(--hair-strong);
  background: var(--tan);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    min-height: 44px;
    color: var(--mid);
    transition: color 120ms ease;
    white-space: nowrap;
    border-right: 0.5px solid var(--hair-strong);
    text-decoration: none;
  }
  a:first-child { border-left: 0.5px solid var(--hair-strong); }
  a:hover { color: var(--choc); }
  a.active { color: var(--choc); }

  .dot {
    display: none;
    width: 6px;
    height: 6px;
    background: var(--choc);
    flex-shrink: 0;
  }
  a.active .dot { display: block; }
  .idx { color: var(--mid); margin-right: 4px; }
  a.active .idx { color: var(--choc); }

  @media (max-width: 880px) {
    display: none;
  }
`;

const NavUtil = styled.div`
  display: flex;
  align-items: center;

  > * {
    padding: 10px 14px;
    border-left: 0.5px solid var(--hair-strong);
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--mid);
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    white-space: nowrap;
    background: none;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    cursor: none;
  }
  > *:hover { color: var(--choc); }

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.5;
  }

  @media (pointer: coarse) {
    > * { cursor: pointer; }
  }
`;

const Ham = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: 0;
  cursor: none;

  span,
  span::before,
  span::after {
    display: block;
    width: 18px;
    height: 0.5px;
    background: var(--choc);
    position: relative;
    transition: all 180ms ease;
  }
  span::before,
  span::after {
    content: '';
    position: absolute;
    left: 0;
    width: 18px;
  }
  span::before { top: -6px; }
  span::after  { top: 6px; }

  @media (max-width: 880px) {
    display: flex;
  }
  @media (pointer: coarse) { cursor: pointer; }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 88;
  background: var(--choc);
  color: var(--bone);
  padding: 80px 32px 32px;
  flex-direction: column;
  gap: 0;
  font-family: var(--display);
  display: ${({ $open }) => ($open ? 'flex' : 'none')};

  a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 0;
    border-bottom: 0.5px solid rgba(240, 228, 210, 0.4);
    color: rgba(240, 228, 210, 0.7);
    font-size: clamp(28px, 5vw, 48px);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    transition: color 120ms ease;
    text-decoration: none;
  }
  a:hover { color: var(--bone); }
  a.active { color: var(--bone); }

  .idx {
    font-family: var(--mono);
    font-size: 14px;
    letter-spacing: 0.1em;
    color: rgba(240, 228, 210, 0.5);
    min-width: 3ch;
  }
`;

const MobClose = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  font-family: var(--mono);
  font-size: 14px;
  letter-spacing: 0.14em;
  color: var(--bone);
  border: 0.5px solid rgba(240, 228, 210, 0.7);
  padding: 8px 14px;
  background: none;
  cursor: none;

  &:hover {
    background: var(--bone);
    color: var(--choc);
  }
  @media (pointer: coarse) { cursor: pointer; }
`;

interface NavProps {
  lang: Lang;
  activeId?: string;
}

export default function Nav({ lang, activeId }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <PNav aria-label="Primary navigation">
        <NavLinks>
          {NAV.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              className={n.id === activeId ? 'active' : ''}
            >
              <span className="dot" aria-hidden="true" />
              <span className="idx">{n.idx}</span>
              <span>{t(lang, n.k)}</span>
            </Link>
          ))}
        </NavLinks>

        <Ham aria-label="Menu" onClick={() => setMobileOpen(true)}>
          <span />
        </Ham>

        <NavUtil>
          <button aria-label="Search">
            <svg viewBox="0 0 24 24">
              <circle cx="10" cy="10" r="7" />
              <line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </button>
          <button>{t(lang, 'nav.cart')} [00]</button>
        </NavUtil>
      </PNav>

      <MobileMenu $open={mobileOpen} aria-hidden={!mobileOpen}>
        <MobClose onClick={() => setMobileOpen(false)}>[ ESC ]</MobClose>
        {NAV.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            className={n.id === activeId ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            <span className="idx">{n.idx}</span>
            <span>{t(lang, n.k)}</span>
          </Link>
        ))}
      </MobileMenu>
    </>
  );
}
