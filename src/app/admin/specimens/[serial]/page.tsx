'use client';

import React, { Suspense, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Field, Input, Textarea, Select, Button, Row, Meta, Tabs } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import { useUnsavedGuard, useCmdS } from '@/lib/admin/hooks';
import Silhouette from '@/components/Silhouette';
import ImagePicker from '@/components/admin/ImagePicker';
import {
  GRAINS, ORIGINS, VaultSpecimen, LandingSpecimen, SilhouetteKind,
} from '@/data/specimens';
import { CATS } from '@/data/categories';
import type { Lang } from '@/i18n/translations';

type SpecPayload = { vault: VaultSpecimen[]; landing: LandingSpecimen[] };
const SILS: SilhouetteKind[] = ['tote', 'wallet', 'satchel', 'belt', 'brief', 'book', 'jacket'];
const SPANS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'];
const LANGS: Lang[] = ['EN', 'KA', 'RU'];

const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Preview = styled.div`
  position: sticky;
  top: 20px;
  align-self: start;

  .card {
    border: 0.5px solid rgba(240, 228, 210, 0.3);
    background: rgba(240, 228, 210, 0.04);
    padding: 18px;
  }
  .frame {
    aspect-ratio: 4 / 5;
    background: var(--bone);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    svg { width: 66%; height: 66%; }
  }
  .nm { font-family: var(--display); font-size: 20px; text-transform: uppercase; color: var(--bone); line-height: 1.05; }
  .sn { font-family: var(--mono); font-size: 10px; color: var(--tan); letter-spacing: 0.1em; margin-top: 6px; }
  .rows { margin-top: 12px; font-family: var(--mono); font-size: 11px; }
  .rows div { display: flex; justify-content: space-between; padding: 5px 0; border-top: 0.5px solid rgba(240,228,210,0.15); }
  .rows .k { color: var(--tan); text-transform: uppercase; letter-spacing: 0.08em; }
`;

const Two = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0 14px;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

function SpecimenEditor() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const type = params.get('type') === 'landing' ? 'landing' : 'vault';

  const [serial, setSerial] = useState('');
  const [payload, setPayload] = useState<SpecPayload | null>(null);
  const [vault, setVault] = useState<VaultSpecimen | null>(null);
  const [landing, setLanding] = useState<LandingSpecimen | null>(null);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<Lang>('EN');

  useEffect(() => {
    // serial comes from the [serial] segment of the path.
    const seg = decodeURIComponent(window.location.pathname.split('/').pop() || '');
    const sn = seg.replace(/-/g, '·');
    setSerial(sn);
    getJSON<SpecPayload>('/api/admin/specimens')
      .then((data) => {
        setPayload(data);
        if (type === 'vault') setVault(data.vault.find((s) => s.sn === sn) ?? null);
        else setLanding(data.landing.find((s) => s.sn === sn) ?? null);
      })
      .catch(() => toast.failed());
  }, [type, toast]);

  const patchV = (p: Partial<VaultSpecimen>) => { setVault((v) => (v ? { ...v, ...p } : v)); setDirty(true); };
  const patchL = (p: Partial<LandingSpecimen>) => { setLanding((l) => (l ? { ...l, ...p } : l)); setDirty(true); };

  const save = useCallback(async () => {
    if (!payload) return;
    let next: SpecPayload;
    if (type === 'vault' && vault) {
      next = { ...payload, vault: payload.vault.map((s) => (s.sn === serial ? vault : s)) };
    } else if (type === 'landing' && landing) {
      next = { ...payload, landing: payload.landing.map((s) => (s.sn === serial ? landing : s)) };
    } else return;
    const res = await sendJSON('/api/admin/specimens', 'PUT', next);
    if (res.ok) { setPayload(next); setDirty(false); toast.archived(); }
    else { toast.failed(res.status === 400 ? 'INVALID · CHECK SERIAL' : undefined); }
  }, [payload, type, vault, landing, serial, toast]);

  useUnsavedGuard(dirty);
  useCmdS(save);

  useUnsavedGuardOnBack(dirty);

  if (!payload) return <AdminShell><Meta>Loading…</Meta></AdminShell>;

  if (type === 'vault' && !vault) return <AdminShell><H1>Not found.</H1><Meta>{serial}</Meta></AdminShell>;
  if (type === 'landing' && !landing) return <AdminShell><H1>Not found.</H1><Meta>{serial}</Meta></AdminShell>;

  return (
    <AdminShell>
      <Eyebrow>§01 · SPECIMEN EDITOR · {type.toUpperCase()}</Eyebrow>
      <H1>{type === 'vault' ? vault!.name.EN : landing!.name.EN}</H1>
      <Row style={{ margin: '18px 0' }}>
        <Button $variant="primary" onClick={save} data-testid="save" disabled={!dirty}>
          {dirty ? 'Save (⌘S)' : 'Saved'}
        </Button>
        <Button onClick={() => router.push('/admin/specimens')}>← Back</Button>
        {dirty && <Meta>Unsaved changes</Meta>}
      </Row>

      <Split>
        <div>
          {type === 'vault' && vault && (
            <>
              <Panel>
                <h2>Identity</h2>
                <Two>
                  <Field><span className="k">Serial</span>
                    <Input value={vault.sn} onChange={(e) => patchV({ sn: e.target.value })} /></Field>
                  <Field><span className="k">Index</span>
                    <Input type="number" value={vault.i} onChange={(e) => patchV({ i: +e.target.value })} /></Field>
                  <Field><span className="k">Category</span>
                    <Select value={vault.cat} onChange={(e) => patchV({ cat: e.target.value })}>
                      {CATS.filter((c) => !c.isAll).map((c) => <option key={c.id} value={c.id}>{c.id}</option>)}
                    </Select></Field>
                  <Field><span className="k">Silhouette</span>
                    <Select value={vault.sil} onChange={(e) => patchV({ sil: e.target.value as SilhouetteKind })}>
                      {SILS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select></Field>
                  <Field><span className="k">Span</span>
                    <Select value={vault.span} onChange={(e) => patchV({ span: e.target.value as VaultSpecimen['span'] })}>
                      {SPANS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select></Field>
                </Two>
              </Panel>
              <Panel>
                <h2>Material telemetry</h2>
                <Two>
                  <Field><span className="k">Tannage hours</span>
                    <Input type="number" value={vault.tan} onChange={(e) => patchV({ tan: +e.target.value })} /></Field>
                  <Field><span className="k">Weight (g)</span>
                    <Input type="number" value={vault.weight} onChange={(e) => patchV({ weight: +e.target.value })} /></Field>
                  <Field><span className="k">Grain</span>
                    <Select value={vault.grain} onChange={(e) => patchV({ grain: e.target.value as VaultSpecimen['grain'] })}>
                      {GRAINS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </Select></Field>
                  <Field><span className="k">Origin</span>
                    <Select value={vault.origin} onChange={(e) => patchV({ origin: e.target.value as VaultSpecimen['origin'] })}>
                      {ORIGINS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </Select></Field>
                  <Field><span className="k">Coordinates</span>
                    <Input value={vault.coord} onChange={(e) => patchV({ coord: e.target.value })} /></Field>
                  <Field><span className="k">Entry date</span>
                    <Input value={vault.entry} onChange={(e) => patchV({ entry: e.target.value })} /></Field>
                  <Field><span className="k">Price USD ($) · EN/RU</span>
                    <Input type="number" value={vault.price} onChange={(e) => patchV({ price: +e.target.value })} data-testid="f-price-usd" /></Field>
                  <Field><span className="k">Price GEL (₾) · KA</span>
                    <Input type="number" value={vault.priceGel} onChange={(e) => patchV({ priceGel: +e.target.value })} data-testid="f-price-gel" /></Field>
                </Two>
              </Panel>
              <Panel>
                <h2>Trilingual copy</h2>
                <Tabs>
                  {LANGS.map((l) => (
                    <button key={l} className={tab === l ? 'active' : ''} onClick={() => setTab(l)} data-testid={`lang-tab-${l}`}>{l}</button>
                  ))}
                </Tabs>
                <Field><span className="k">Name ({tab})</span>
                  <Input value={vault.name[tab]} onChange={(e) => patchV({ name: { ...vault.name, [tab]: e.target.value } })} data-testid="f-name" /></Field>
                <Field><span className="k">Quote ({tab})</span>
                  <Input value={vault.quote[tab]} onChange={(e) => patchV({ quote: { ...vault.quote, [tab]: e.target.value } })} /></Field>
                <Field><span className="k">Finish ({tab})</span>
                  <Input value={vault.finish[tab]} onChange={(e) => patchV({ finish: { ...vault.finish, [tab]: e.target.value } })} /></Field>
                <Field><span className="k">Editorial ({tab})</span>
                  <Textarea value={vault.editorial[tab]} onChange={(e) => patchV({ editorial: { ...vault.editorial, [tab]: e.target.value } })} /></Field>
              </Panel>
              <Panel>
                <h2>Photo</h2>
                <ImagePicker value={vault.image} onChange={(image) => patchV({ image })} />
              </Panel>
            </>
          )}

          {type === 'landing' && landing && (
            <>
              <Panel>
                <h2>Identity</h2>
                <Two>
                  <Field><span className="k">Serial</span>
                    <Input value={landing.sn} onChange={(e) => patchL({ sn: e.target.value })} /></Field>
                  <Field><span className="k">Index</span>
                    <Input value={landing.idx} onChange={(e) => patchL({ idx: e.target.value })} /></Field>
                  <Field><span className="k">Silhouette</span>
                    <Select value={landing.silhouette} onChange={(e) => patchL({ silhouette: e.target.value as SilhouetteKind })}>
                      {SILS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select></Field>
                  <Field><span className="k">Span</span>
                    <Select value={landing.span} onChange={(e) => patchL({ span: e.target.value as LandingSpecimen['span'] })}>
                      {SPANS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </Select></Field>
                </Two>
              </Panel>
              <Panel>
                <h2>Trilingual copy</h2>
                <Tabs>
                  {LANGS.map((l) => (
                    <button key={l} className={tab === l ? 'active' : ''} onClick={() => setTab(l)}>{l}</button>
                  ))}
                </Tabs>
                <Field><span className="k">Name ({tab})</span>
                  <Input value={landing.name[tab]} onChange={(e) => patchL({ name: { ...landing.name, [tab]: e.target.value } })} /></Field>
                <Field><span className="k">Sub ({tab})</span>
                  <Textarea value={landing.sub[tab]} onChange={(e) => patchL({ sub: { ...landing.sub, [tab]: e.target.value } })} /></Field>
                <Field><span className="k">Quote ({tab})</span>
                  <Input value={landing.quote[tab]} onChange={(e) => patchL({ quote: { ...landing.quote, [tab]: e.target.value } })} /></Field>
              </Panel>
              <Panel>
                <h2>Spec block</h2>
                <Two>
                  {(Object.keys(landing.spec) as (keyof LandingSpecimen['spec'])[]).map((k) => (
                    <Field key={k}><span className="k">{k}</span>
                      <Input value={landing.spec[k]} onChange={(e) => patchL({ spec: { ...landing.spec, [k]: e.target.value } })} /></Field>
                  ))}
                </Two>
              </Panel>
              <Panel>
                <h2>Meta pairs</h2>
                {landing.meta.map((pair, i) => (
                  <Row key={i} style={{ marginBottom: 8 }}>
                    <Input style={{ flex: 1 }} value={pair[0]}
                      onChange={(e) => { const m = landing.meta.map((p, j) => j === i ? [e.target.value, p[1]] as [string, string] : p); patchL({ meta: m }); }} />
                    <Input style={{ flex: 2 }} value={pair[1]}
                      onChange={(e) => { const m = landing.meta.map((p, j) => j === i ? [p[0], e.target.value] as [string, string] : p); patchL({ meta: m }); }} />
                    <Button onClick={() => patchL({ meta: landing.meta.filter((_, j) => j !== i) })}>×</Button>
                  </Row>
                ))}
                <Button onClick={() => patchL({ meta: [...landing.meta, ['KEY', 'value']] })}>+ Add pair</Button>
              </Panel>
              <Panel>
                <h2>Photo</h2>
                <ImagePicker value={landing.image} onChange={(image) => patchL({ image })} />
              </Panel>
            </>
          )}
        </div>

        <Preview>
          <Meta style={{ marginBottom: 10 }}>LIVE PREVIEW</Meta>
          <div className="card">
            <div className="frame">
              {(type === 'vault' ? vault!.image : landing!.image)
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={type === 'vault' ? vault!.image : landing!.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Silhouette kind={type === 'vault' ? vault!.sil : landing!.silhouette} />}
            </div>
            <div className="nm">{type === 'vault' ? vault!.name[tab] : landing!.name[tab]}</div>
            <div className="sn">{type === 'vault' ? vault!.sn : landing!.sn}</div>
            <div className="rows">
              {type === 'vault' && vault && (
                <>
                  <div><span className="k">Tannage</span><span>{vault.tan}H</span></div>
                  <div><span className="k">Grain</span><span>{vault.grain}</span></div>
                  <div><span className="k">Origin</span><span>{vault.origin}</span></div>
                  <div><span className="k">Weight</span><span>{vault.weight} g</span></div>
                  <div><span className="k">Price</span><span>${vault.price} · ₾{vault.priceGel}</span></div>
                </>
              )}
              {type === 'landing' && landing && (
                <>
                  {(Object.entries(landing.spec) as [string, string][]).map(([k, v]) => (
                    <div key={k}><span className="k">{k}</span><span>{v}</span></div>
                  ))}
                </>
              )}
            </div>
          </div>
        </Preview>
      </Split>
    </AdminShell>
  );
}

export default function SpecimenEditorPage() {
  return (
    <Suspense fallback={<AdminShell><Meta>Loading…</Meta></AdminShell>}>
      <SpecimenEditor />
    </Suspense>
  );
}

/** Intercept in-app back/navigation when there are unsaved changes. */
function useUnsavedGuardOnBack(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: PopStateEvent) => {
      if (!confirm('Discard unsaved changes?')) {
        history.pushState(null, '', window.location.href);
        e.preventDefault();
      }
    };
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [dirty]);
}
