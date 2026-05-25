'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Input, Button, Row, Meta, Tabs } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import { useUnsavedGuard } from '@/lib/admin/hooks';
import type { Lang } from '@/i18n/translations';

type Dict = Record<Lang, Record<string, string>>;
type Marquee = Record<Lang, string[]>;
const LANGS: Lang[] = ['EN', 'KA', 'RU'];

const KeyRow = styled.div`
  border-top: 0.5px solid rgba(240, 228, 210, 0.15);
  padding: 12px 0;
  .key { font-family: var(--mono); font-size: 11px; color: var(--tan); letter-spacing: 0.06em; margin-bottom: 8px; display: flex; justify-content: space-between; }
  .langs { display: grid; grid-template-columns: 3ch 1fr; gap: 8px 10px; align-items: center; }
  .lc { font-family: var(--mono); font-size: 10px; color: rgba(240,228,210,0.6); }
`;

const Search = styled(Input)`
  margin-bottom: 16px;
`;

export default function TranslationsPage() {
  const toast = useToast();
  const [dict, setDict] = useState<Dict | null>(null);
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  const [query, setQuery] = useState('');
  const [newKey, setNewKey] = useState('');
  const [dirty, setDirty] = useState(false);
  const [mtab, setMtab] = useState<Lang>('EN');

  useEffect(() => {
    getJSON<{ i18n: Dict; marquee: Marquee }>('/api/admin/translations')
      .then((d) => { setDict(d.i18n); setMarquee(d.marquee); })
      .catch(() => toast.failed());
  }, [toast]);

  useUnsavedGuard(dirty);

  const keys = useMemo(() => (dict ? Object.keys(dict.EN) : []), [dict]);
  const filtered = useMemo(
    () => keys.filter((k) => k.toLowerCase().includes(query.toLowerCase())),
    [keys, query],
  );

  const setVal = (key: string, lang: Lang, v: string) => {
    setDict((d) => (d ? { ...d, [lang]: { ...d[lang], [key]: v } } : d));
    setDirty(true);
  };

  const addKey = () => {
    const k = newKey.trim();
    if (!dict || !k || keys.includes(k)) return;
    setDict({
      EN: { ...dict.EN, [k]: k },
      KA: { ...dict.KA, [k]: k },
      RU: { ...dict.RU, [k]: k },
    });
    setNewKey('');
    setQuery(k);
    setDirty(true);
  };

  const delKey = (key: string) => {
    if (!dict || !confirm(`Delete key "${key}" from all languages?`)) return;
    const strip = (o: Record<string, string>) => {
      const { [key]: _, ...rest } = o;
      return rest;
    };
    setDict({ EN: strip(dict.EN), KA: strip(dict.KA), RU: strip(dict.RU) });
    setDirty(true);
  };

  const saveDict = useCallback(async () => {
    if (!dict) return;
    const res = await sendJSON('/api/admin/translations', 'PUT', { i18n: dict });
    if (res.ok) { setDirty(false); toast.archived(); } else toast.failed();
  }, [dict, toast]);

  // ─── Marquee ───
  const setMq = (lang: Lang, i: number, v: string) =>
    setMarquee((m) => (m ? { ...m, [lang]: m[lang].map((s, j) => (j === i ? v : s)) } : m));
  const addMq = (lang: Lang) => setMarquee((m) => (m ? { ...m, [lang]: [...m[lang], 'NEW STRING'] } : m));
  const delMq = (lang: Lang, i: number) =>
    setMarquee((m) => (m ? { ...m, [lang]: m[lang].filter((_, j) => j !== i) } : m));
  const moveMq = (lang: Lang, i: number, dir: -1 | 1) =>
    setMarquee((m) => {
      if (!m) return m;
      const arr = [...m[lang]];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return m;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...m, [lang]: arr };
    });
  const saveMarquee = async () => {
    if (!marquee) return;
    const res = await sendJSON('/api/admin/translations', 'PUT', { marquee });
    if (res.ok) toast.archived('MARQUEE ARCHIVED'); else toast.failed();
  };

  if (!dict || !marquee) return <AdminShell><Meta>Loading…</Meta></AdminShell>;

  return (
    <AdminShell>
      <Eyebrow>§04 · DICTIONARY</Eyebrow>
      <H1>Translations.</H1>
      <Row style={{ margin: '18px 0' }}>
        <Button $variant="primary" onClick={saveDict} data-testid="save-dict" disabled={!dirty}>
          {dirty ? 'Save dictionary' : 'Saved'}
        </Button>
        <Meta>{keys.length} keys · EN/KA/RU</Meta>
      </Row>

      <Panel>
        <h2>Add key</h2>
        <Row>
          <Input
            placeholder="namespace.key"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            data-testid="new-key"
            style={{ maxWidth: 320 }}
          />
          <Button onClick={addKey} data-testid="add-key">+ Add</Button>
        </Row>
      </Panel>

      <Panel>
        <h2>Dictionary</h2>
        <Search placeholder="Search keys…" value={query} onChange={(e) => setQuery(e.target.value)} />
        {filtered.map((key) => (
          <KeyRow key={key} data-testid={`tkey-${key}`}>
            <div className="key">
              <span>{key}</span>
              <button
                onClick={() => delKey(key)}
                style={{ background: 'none', border: 0, color: '#e8a', cursor: 'pointer', fontSize: 10 }}
              >
                DELETE
              </button>
            </div>
            <div className="langs">
              {LANGS.map((l) => (
                <React.Fragment key={l}>
                  <span className="lc">{l}</span>
                  <Input value={dict[l][key]} onChange={(e) => setVal(key, l, e.target.value)} />
                </React.Fragment>
              ))}
            </div>
          </KeyRow>
        ))}
        {filtered.length === 0 && <Meta>No keys match.</Meta>}
      </Panel>

      <Panel>
        <h2>Marquee</h2>
        <Row style={{ marginBottom: 12 }}>
          <Button $variant="primary" onClick={saveMarquee}>Save marquee</Button>
        </Row>
        <Tabs>
          {LANGS.map((l) => (
            <button key={l} className={mtab === l ? 'active' : ''} onClick={() => setMtab(l)}>{l}</button>
          ))}
        </Tabs>
        {marquee[mtab].map((s, i) => (
          <Row key={i} style={{ marginBottom: 8 }}>
            <Input style={{ flex: 1 }} value={s} onChange={(e) => setMq(mtab, i, e.target.value)} />
            <Button onClick={() => moveMq(mtab, i, -1)}>↑</Button>
            <Button onClick={() => moveMq(mtab, i, 1)}>↓</Button>
            <Button $variant="danger" onClick={() => delMq(mtab, i)}>×</Button>
          </Row>
        ))}
        <Button onClick={() => addMq(mtab)}>+ Add string</Button>
      </Panel>
    </AdminShell>
  );
}
