'use client';

import React, { useEffect, useState, useCallback } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Field, Input, Button, Row, Meta } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';
import { useUnsavedGuard } from '@/lib/admin/hooks';
import type { TelItem } from '@/data/telemetry';

export default function TelemetryPage() {
  const toast = useToast();
  const [items, setItems] = useState<TelItem[] | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    getJSON<{ telemetry: TelItem[] }>('/api/admin/telemetry')
      .then((d) => setItems(d.telemetry))
      .catch(() => toast.failed());
  }, [toast]);
  useUnsavedGuard(dirty);

  const patch = (i: number, p: Partial<TelItem>) => {
    setItems((arr) => (arr ? arr.map((x, j) => (j === i ? { ...x, ...p } : x)) : arr));
    setDirty(true);
  };

  const save = useCallback(async () => {
    if (!items) return;
    const res = await sendJSON('/api/admin/telemetry', 'PUT', { telemetry: items });
    if (res.ok) { setDirty(false); toast.archived(); } else toast.failed();
  }, [items, toast]);

  if (!items) return <AdminShell><Meta>Loading…</Meta></AdminShell>;

  return (
    <AdminShell>
      <Eyebrow>§05 · TELEMETRY</Eyebrow>
      <H1>Live readout.</H1>
      <Row style={{ margin: '18px 0' }}>
        <Button $variant="primary" onClick={save} data-testid="save-tel" disabled={!dirty}>
          {dirty ? 'Save' : 'Saved'}
        </Button>
        <Meta>Landing-page readout values. Labels live in the dictionary (telemetry.* keys).</Meta>
      </Row>

      {items.map((item, i) => (
        <Panel key={item.labelKey}>
          <h2>{item.labelKey}</h2>
          <Row>
            <Field style={{ flex: 1 }}><span className="k">Value</span>
              <Input type="number" value={item.val} onChange={(e) => patch(i, { val: +e.target.value })} /></Field>
            <Field style={{ flex: 1 }}><span className="k">Unit</span>
              <Input value={item.unit} onChange={(e) => patch(i, { unit: e.target.value })} /></Field>
            <Field style={{ flex: 1 }}><span className="k">Drift lo</span>
              <Input type="number" value={item.drift[0]} onChange={(e) => patch(i, { drift: [+e.target.value, item.drift[1]] })} /></Field>
            <Field style={{ flex: 1 }}><span className="k">Drift hi</span>
              <Input type="number" value={item.drift[1]} onChange={(e) => patch(i, { drift: [item.drift[0], +e.target.value] })} /></Field>
            <Field style={{ flex: 1 }}><span className="k">Bar from</span>
              <Input type="number" value={item.barFrom} onChange={(e) => patch(i, { barFrom: +e.target.value })} /></Field>
            <Field style={{ flex: 1 }}><span className="k">Bar to</span>
              <Input type="number" value={item.barTo} onChange={(e) => patch(i, { barTo: +e.target.value })} /></Field>
          </Row>
        </Panel>
      ))}
    </AdminShell>
  );
}
