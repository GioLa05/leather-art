'use client';

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Button, Row, Meta } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import type { VaultSpecimen, LandingSpecimen } from '@/data/specimens';
import { specimenSlug } from '@/lib/specimen-url';

type SpecPayload = { vault: VaultSpecimen[]; landing: LandingSpecimen[] };

const List = styled.div`
  border-top: 0.5px solid rgba(240, 228, 210, 0.25);

  .row {
    display: grid;
    grid-template-columns: 4ch 1fr 9ch 7ch auto;
    gap: 14px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 0.5px solid rgba(240, 228, 210, 0.18);
    font-family: var(--mono);
    font-size: 12px;
  }
  .row .nm { color: var(--bone); text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; }
  .row .nm:hover { color: var(--tan); }
  .row .sn { color: rgba(240,228,210,0.55); font-size: 10px; }
  .row .idx { color: var(--tan); }
  .actions { display: flex; gap: 6px; justify-content: flex-end; flex-wrap: wrap; }
  .actions button {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase;
    background: none; border: 0.5px solid rgba(240,228,210,0.3); color: rgba(240,228,210,0.8);
    padding: 5px 8px; cursor: pointer;
  }
  .actions button:hover { background: var(--tan); color: var(--choc); border-color: var(--tan); }

  @media (max-width: 700px) {
    .row { grid-template-columns: 1fr; gap: 4px; }
    .actions { justify-content: flex-start; }
  }
`;

function nextSerial(all: { sn: string }[]): string {
  const nums = all.map((s) => parseInt(s.sn.split('·')[1] ?? '0', 10)).filter((n) => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `LA·${String(next).padStart(3, '0')}·2099`;
}

function blankVault(data: SpecPayload): VaultSpecimen {
  const sn = nextSerial([...data.vault, ...data.landing]);
  const i = (data.vault.reduce((m, s) => Math.max(m, s.i), 0) || 0) + 1;
  const nn = String(i).padStart(2, '0');
  return {
    i, cat: 'bags', sn,
    name: { EN: `BAG // NEW_${nn}`, KA: `ჩანთა // ახალი_${nn}`, RU: `СУМКА // НОВАЯ_${nn}` },
    sil: 'tote',
    tan: 120, grain: 'MEDIUM', origin: 'TUSCANY', weight: 500, coord: '41.71/44.83',
    // Within the vault's default date filter band (2099.03.14–2099.11.02) so a
    // freshly created specimen is visible on /vault without re-filtering.
    entry: '2099.10.15', price: 0, priceGel: 0, span: 's1',
    quote: { EN: '', KA: '', RU: '' },
    finish: { EN: 'Hand-burnished', KA: 'ხელით გაპრიალებული', RU: 'Ручная полировка' },
    editorial: {
      EN: 'New specimen awaiting catalogue notes.',
      KA: 'ახალი ნიმუში კატალოგის ჩანაწერების მოლოდინში.',
      RU: 'Новый образец в ожидании заметок каталога.',
    },
  };
}

export default function SpecimensListPage() {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<SpecPayload | null>(null);

  const reload = useCallback(() => {
    getJSON<SpecPayload>('/api/admin/specimens').then(setData).catch(() => toast.failed());
  }, [toast]);

  useEffect(() => { reload(); }, [reload]);

  async function save(next: SpecPayload, msg = 'ARCHIVED') {
    const res = await sendJSON('/api/admin/specimens', 'PUT', next);
    if (res.ok) { setData(next); toast.archived(msg); }
    else { toast.failed(); }
    return res.ok;
  }

  if (!data) {
    return (
      <AdminShell>
        <Eyebrow>§01 · SPECIMENS</Eyebrow>
        <H1>Specimens.</H1>
        <Meta style={{ marginTop: 20 }}>Loading…</Meta>
      </AdminShell>
    );
  }

  const createVault = async () => {
    const spec = blankVault(data);
    const ok = await save({ ...data, vault: [...data.vault, spec] }, 'SPECIMEN CREATED');
    if (ok) router.push(`/admin/specimens/${specimenSlug(spec)}?type=vault`);
  };

  const duplicate = async (s: VaultSpecimen) => {
    const sn = nextSerial([...data.vault, ...data.landing]);
    const i = data.vault.reduce((m, x) => Math.max(m, x.i), 0) + 1;
    const copy: VaultSpecimen = {
      ...s, sn, i,
      name: { EN: `${s.name.EN} (COPY)`, KA: `${s.name.KA} (ასლი)`, RU: `${s.name.RU} (КОПИЯ)` },
    };
    await save({ ...data, vault: [...data.vault, copy] }, 'DUPLICATED');
  };

  const remove = async (s: VaultSpecimen) => {
    if (!confirm(`Delete ${s.sn} — ${s.name.EN}? This cannot be undone.`)) return;
    await save({ ...data, vault: data.vault.filter((x) => x.i !== s.i) }, 'DELETED');
  };

  const reorder = async (idx: number, dir: -1 | 1) => {
    const arr = [...data.vault];
    const j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    arr.forEach((s, k) => (s.i = k + 1)); // keep display index sequential
    await save({ ...data, vault: arr }, 'REORDERED');
  };

  const moveToLanding = async (s: VaultSpecimen) => {
    const derived: LandingSpecimen = {
      id: String((data.landing.reduce((m, x) => Math.max(m, +x.id), 0) || 0) + 1).padStart(2, '0'),
      sn: s.sn, idx: String(data.landing.length + 1).padStart(2, '0'), span: s.span,
      name: { ...s.name },
      sub: { ...s.editorial },
      quote: { ...s.quote },
      spec: {
        tan: `${s.tan}h`, grain: `${s.grain.toLowerCase()}`, origin: s.origin,
        finish: s.finish.EN, weight: `${s.weight} g`, edge: s.finish.EN, cert: s.sn,
      },
      meta: [['TAN', s.grain], ['GRM', String(s.weight)], ['ORG', s.coord]],
      silhouette: s.sil,
      image: s.image,
    };
    await save(
      { vault: data.vault.filter((x) => x.i !== s.i), landing: [...data.landing, derived] },
      'MOVED TO LANDING',
    );
  };

  return (
    <AdminShell>
      <Eyebrow>§01 · SPECIMENS</Eyebrow>
      <H1>Specimens.</H1>
      <Row style={{ margin: '20px 0' }}>
        <Button $variant="primary" onClick={createVault} data-testid="new-specimen">
          + New specimen
        </Button>
      </Row>

      <Panel>
        <h2>Vault · {data.vault.length}</h2>
        <List>
          {data.vault.map((s, idx) => (
            <div className="row" key={s.sn} data-testid="vault-row">
              <span className="idx">{String(s.i).padStart(2, '0')}</span>
              <span>
                <span
                  className="nm"
                  onClick={() => router.push(`/admin/specimens/${specimenSlug(s)}?type=vault`)}
                >
                  {s.name.EN}
                </span>
                <br />
                <span className="sn">{s.sn} · {s.cat}</span>
              </span>
              <span>${s.price} · ₾{s.priceGel}</span>
              <span>{s.tan}H</span>
              <span className="actions">
                <button onClick={() => reorder(idx, -1)} aria-label="move up">↑</button>
                <button onClick={() => reorder(idx, 1)} aria-label="move down">↓</button>
                <button onClick={() => duplicate(s)}>Dup</button>
                <button onClick={() => moveToLanding(s)}>→Landing</button>
                <button onClick={() => remove(s)}>Del</button>
              </span>
            </div>
          ))}
        </List>
      </Panel>

      <Panel>
        <h2>Landing · {data.landing.length}</h2>
        <List>
          {data.landing.map((s) => (
            <div className="row" key={`l-${s.id}`}>
              <span className="idx">{s.idx}</span>
              <span>
                <span
                  className="nm"
                  onClick={() => router.push(`/admin/specimens/${s.sn.replace(/·/g, '-')}?type=landing`)}
                >
                  {s.name.EN}
                </span>
                <br />
                <span className="sn">{s.sn}</span>
              </span>
              <span />
              <span />
              <span className="actions">
                <button
                  onClick={() => router.push(`/admin/specimens/${s.sn.replace(/·/g, '-')}?type=landing`)}
                >
                  Edit
                </button>
              </span>
            </div>
          ))}
        </List>
      </Panel>
    </AdminShell>
  );
}
