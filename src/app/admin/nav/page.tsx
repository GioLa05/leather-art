'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Input, Button, Row, Meta } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import type { NavItem } from '@/data/nav';

const Item = styled.div`
  display: grid;
  grid-template-columns: 5ch 1fr 1fr 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-top: 0.5px solid rgba(240, 228, 210, 0.18);
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

export default function NavPage() {
  const toast = useToast();
  const [nav, setNav] = useState<NavItem[]>([]);

  const reload = useCallback(() => {
    getJSON<{ nav: NavItem[] }>('/api/admin/nav').then((d) => setNav(d.nav)).catch(() => toast.failed());
  }, [toast]);
  useEffect(() => { reload(); }, [reload]);

  const patch = (idx: number, p: Partial<NavItem>) =>
    setNav((n) => n.map((x, i) => (i === idx ? { ...x, ...p } : x)));

  async function persist(next: NavItem[], msg = 'ARCHIVED') {
    const res = await sendJSON('/api/admin/nav', 'PUT', { nav: next });
    if (res.ok) { setNav(next); toast.archived(msg); } else toast.failed();
  }

  const reorder = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= nav.length) return;
    const arr = [...nav];
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    persist(arr, 'REORDERED');
  };

  const del = (i: number) => {
    if (!confirm('Delete nav item?')) return;
    persist(nav.filter((_, k) => k !== i), 'DELETED');
  };

  const add = () =>
    setNav([...nav, { idx: String(nav.length + 1).padStart(2, '0'), k: 'nav.index', href: '/', id: `item${nav.length}` }]);

  return (
    <AdminShell>
      <Eyebrow>§03 · NAVIGATION</Eyebrow>
      <H1>Navigation.</H1>
      <Row style={{ margin: '18px 0' }}>
        <Button $variant="primary" onClick={() => persist(nav)} data-testid="save-nav">Save</Button>
        <Button onClick={add}>+ Add item</Button>
      </Row>
      <Panel>
        <h2>Nav items</h2>
        <Meta style={{ marginBottom: 10 }}>idx · translation key · href · id</Meta>
        {nav.map((n, idx) => (
          <Item key={`${n.id}-${idx}`}>
            <Input value={n.idx} onChange={(e) => patch(idx, { idx: e.target.value })} />
            <Input value={n.k} onChange={(e) => patch(idx, { k: e.target.value as NavItem['k'] })} />
            <Input value={n.href} onChange={(e) => patch(idx, { href: e.target.value })} />
            <Input value={n.id} onChange={(e) => patch(idx, { id: e.target.value })} />
            <Row>
              <Button onClick={() => reorder(idx, -1)}>↑</Button>
              <Button onClick={() => reorder(idx, 1)}>↓</Button>
              <Button $variant="danger" onClick={() => del(idx)}>Del</Button>
            </Row>
          </Item>
        ))}
      </Panel>
    </AdminShell>
  );
}
