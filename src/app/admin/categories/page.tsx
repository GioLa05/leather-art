'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Field, Input, Button, Row, Meta } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import type { Category } from '@/data/categories';

const Warn = styled.div`
  border: 0.5px solid #c46;
  color: #e8a;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: 12px 14px;
  margin-bottom: 16px;
  line-height: 1.6;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 6ch 1fr 1fr 7ch auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-top: 0.5px solid rgba(240, 228, 210, 0.18);
  .ct { font-family: var(--mono); font-size: 11px; color: var(--tan); }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

export default function CategoriesPage() {
  const toast = useToast();
  const [cats, setCats] = useState<Category[]>([]);
  const [warn, setWarn] = useState<string | null>(null);

  const reload = useCallback(() => {
    getJSON<{ categories: Category[] }>('/api/admin/categories')
      .then((d) => setCats(d.categories))
      .catch(() => toast.failed());
  }, [toast]);
  useEffect(() => { reload(); }, [reload]);

  async function persist(next: Category[], msg = 'ARCHIVED') {
    setWarn(null);
    const res = await sendJSON('/api/admin/categories', 'PUT', { categories: next });
    if (res.ok) { setCats(next); toast.archived(msg); return true; }
    if (res.status === 409) {
      const d = res.data as { categories: string[]; affected: string[] };
      setWarn(`Cannot delete ${d.categories.join(', ')} — still holds: ${d.affected.join(', ')}`);
      toast.failed('CATEGORY NOT EMPTY');
      return false;
    }
    toast.failed();
    return false;
  }

  const patch = (idx: number, p: Partial<Category>) =>
    setCats((c) => c.map((x, i) => (i === idx ? { ...x, ...p } : x)));

  const reorder = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= cats.length) return;
    const arr = [...cats];
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    persist(arr, 'REORDERED');
  };

  const del = (c: Category) => {
    if (c.isAll) return;
    if (!confirm(`Delete category "${c.id}"?`)) return;
    persist(cats.filter((x) => x.id !== c.id), 'DELETED');
  };

  const add = () => {
    const num = String(cats.length).padStart(2, '0');
    setCats([...cats, { id: `new${cats.length}`, num, k: null }]);
  };

  return (
    <AdminShell>
      <Eyebrow>§02 · CATEGORIES</Eyebrow>
      <H1>Categories.</H1>
      <Row style={{ margin: '18px 0' }}>
        <Button $variant="primary" onClick={() => persist(cats)} data-testid="save-cats">Save</Button>
        <Button onClick={add}>+ Add category</Button>
      </Row>

      {warn && <Warn data-testid="cat-warning">{warn}</Warn>}

      <Panel>
        <h2>Rail order</h2>
        {cats.map((c, idx) => (
          <Item key={`${c.id}-${idx}`}>
            <Input value={c.num} onChange={(e) => patch(idx, { num: e.target.value })} />
            <Input value={c.id} disabled={c.isAll} onChange={(e) => patch(idx, { id: e.target.value })} />
            <Input
              value={(c.k as string) ?? ''}
              placeholder={c.isAll ? '(ALL)' : 'translation key'}
              onChange={(e) => patch(idx, { k: (e.target.value || null) as Category['k'] })}
            />
            <span className="ct">{c.isAll ? 'all' : ''}</span>
            <Row>
              <Button onClick={() => reorder(idx, -1)}>↑</Button>
              <Button onClick={() => reorder(idx, 1)}>↓</Button>
              {!c.isAll && <Button $variant="danger" onClick={() => del(c)} data-testid={`del-${c.id}`}>Del</Button>}
            </Row>
          </Item>
        ))}
        <Meta style={{ marginTop: 14 }}>
          Categories that still hold specimens cannot be deleted (enforced server-side).
        </Meta>
      </Panel>
    </AdminShell>
  );
}
