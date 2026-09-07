'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Screen } from './ui';

const NAV: { href: string; label: string; num: string }[] = [
  { href: '/admin', label: 'Console', num: '00' },
  { href: '/admin/specimens', label: 'Specimens', num: '01' },
  { href: '/admin/categories', label: 'Categories', num: '02' },
  { href: '/admin/nav', label: 'Navigation', num: '03' },
  { href: '/admin/translations', label: 'Dictionary', num: '04' },
  { href: '/admin/telemetry', label: 'Telemetry', num: '05' },
  { href: '/admin/media', label: 'Media', num: '06' },
];

const Layout = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;

  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const Side = styled.aside`
  border-right: 0.5px solid rgba(240, 228, 210, 0.25);
  padding: 22px 0;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 820px) { position: static; height: auto; border-right: 0; border-bottom: 0.5px solid rgba(240,228,210,0.25); }

  .brand {
    font-family: var(--display);
    font-size: 15px;
    letter-spacing: -0.01em;
    color: var(--bone);
    text-transform: uppercase;
    padding: 0 18px 18px;
    border-bottom: 0.5px solid rgba(240, 228, 210, 0.2);
  }
  .brand .sub { display: block; font-family: var(--mono); font-size: 9px; letter-spacing: 0.16em; color: var(--tan); margin-top: 4px; }

  nav { display: flex; flex-direction: column; margin-top: 12px; flex: 1; }

  nav a {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 11px 18px;
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(240, 228, 210, 0.7);
    text-decoration: none;
    border-left: 2px solid transparent;
  }
  nav a:hover { color: var(--bone); background: rgba(240,228,210,0.05); }
  nav a.active { color: var(--bone); border-left-color: var(--tan); background: rgba(240,228,210,0.06); }
  nav a .num { color: var(--tan); font-size: 10px; }

  .foot { padding: 14px 18px 0; border-top: 0.5px solid rgba(240,228,210,0.2); }
  .foot button {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(240,228,210,0.7);
    background: none;
    border: 0.5px solid rgba(240,228,210,0.3);
    padding: 9px 14px;
    width: 100%;
    cursor: pointer;
  }
  .foot button:hover { color: var(--choc); background: var(--tan); border-color: var(--tan); }
  .foot a { display: block; font-family: var(--mono); font-size: 10px; color: var(--tan); margin-top: 12px; text-decoration: none; letter-spacing: 0.1em; }
`;

const Content = styled.main`
  padding: 32px;
  min-width: 0;

  @media (max-width: 480px) { padding: 20px 16px; }
`;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <Screen>
      <Layout>
        <Side>
          <div className="brand">
            LEATHER//ART
            <span className="sub">VAULT OPERATOR</span>
          </div>
          <nav>
            {NAV.map((n) => {
              const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} className={active ? 'active' : ''}>
                  <span className="num">{n.num}</span>
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="foot">
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })}>Sign out</button>
            <a href="/" target="_blank" rel="noreferrer">View site ↗</a>
          </div>
        </Side>
        <Content>{children}</Content>
      </Layout>
    </Screen>
  );
}
