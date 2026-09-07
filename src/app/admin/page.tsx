'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Meta } from '@/components/admin/ui';
import { getJSON } from '@/lib/admin/client';

interface Stats {
  totalVault: number;
  totalLanding: number;
  byCategory: { id: string; count: number }[];
  cycle: string;
  lastEdited: string;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 0.5px solid rgba(240, 228, 210, 0.25);
  border-left: 0.5px solid rgba(240, 228, 210, 0.25);

  @media (max-width: 820px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }

  .cell {
    border-right: 0.5px solid rgba(240, 228, 210, 0.25);
    border-bottom: 0.5px solid rgba(240, 228, 210, 0.25);
    padding: 18px;
  }
  .big {
    font-family: var(--display);
    font-size: 40px;
    line-height: 1;
    color: var(--bone);
  }
  .lbl {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--tan);
    margin-top: 8px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  a {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bone);
    border: 0.5px solid rgba(240, 228, 210, 0.3);
    padding: 12px 16px;
    text-decoration: none;
  }
  a:hover { background: var(--tan); color: var(--choc); border-color: var(--tan); }
`;

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getJSON<Stats>('/api/admin/stats').then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <AdminShell>
      <Eyebrow>§00 · OPERATOR CONSOLE</Eyebrow>
      <H1>Vault overview.</H1>
      <div style={{ height: 28 }} />

      <Grid data-testid="stats-grid">
        <div className="cell">
          <div className="big">{stats ? String(stats.totalVault).padStart(3, '0') : '—'}</div>
          <div className="lbl">Vault specimens</div>
        </div>
        <div className="cell">
          <div className="big">{stats ? String(stats.totalLanding).padStart(2, '0') : '—'}</div>
          <div className="lbl">Landing specimens</div>
        </div>
        <div className="cell">
          <div className="big">{stats ? stats.byCategory.length : '—'}</div>
          <div className="lbl">Categories</div>
        </div>
        <div className="cell">
          <div className="big" style={{ fontSize: 20, paddingTop: 12 }}>{stats?.cycle ?? '—'}</div>
          <div className="lbl">Current cycle</div>
        </div>
      </Grid>

      <div style={{ height: 28 }} />

      <Panel>
        <h2>Per category</h2>
        <Grid>
          {(stats?.byCategory ?? []).map((c) => (
            <div className="cell" key={c.id}>
              <div className="big">{String(c.count).padStart(2, '0')}</div>
              <div className="lbl">{c.id}</div>
            </div>
          ))}
        </Grid>
      </Panel>

      <Panel>
        <h2>Editors</h2>
        <Links>
          <Link href="/admin/specimens">Specimens</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/nav">Navigation</Link>
          <Link href="/admin/translations">Dictionary</Link>
          <Link href="/admin/telemetry">Telemetry</Link>
          <Link href="/admin/media">Media</Link>
        </Links>
        <div style={{ height: 14 }} />
        <Meta>
          Last edit to specimens ·{' '}
          {stats ? new Date(stats.lastEdited).toISOString().replace('T', ' ').slice(0, 19) + ' UTC' : '—'}
        </Meta>
      </Panel>
    </AdminShell>
  );
}
