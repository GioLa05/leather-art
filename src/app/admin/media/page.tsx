'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import AdminShell from '@/components/admin/AdminShell';
import { Eyebrow, H1, Panel, Button, Row, Meta } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON, sendJSON } from '@/lib/admin/client';

interface MediaFile { name: string; src: string; }

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;

  .item { border: 0.5px solid rgba(240, 228, 210, 0.3); padding: 10px; }
  .item img { width: 100%; height: 120px; object-fit: contain; background: var(--bone); display: block; }
  .item .nm { font-family: var(--mono); font-size: 10px; color: rgba(240,228,210,0.7); margin: 8px 0; word-break: break-all; }
`;

export default function MediaPage() {
  const toast = useToast();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const reload = useCallback(() => {
    getJSON<{ files: MediaFile[] }>('/api/admin/media').then((d) => setFiles(d.files)).catch(() => toast.failed());
  }, [toast]);
  useEffect(() => { reload(); }, [reload]);

  async function upload(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
    if (res.ok) { toast.archived('UPLOADED'); reload(); } else toast.failed();
  }

  async function del(name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    const res = await sendJSON('/api/admin/media', 'DELETE', { name });
    if (res.ok) { toast.archived('DELETED'); reload(); } else toast.failed();
  }

  return (
    <AdminShell>
      <Eyebrow>§06 · MEDIA</Eyebrow>
      <H1>Media.</H1>
      <Row style={{ margin: '18px 0' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
        />
        <Button $variant="primary" onClick={() => inputRef.current?.click()}>+ Upload image</Button>
        <Meta>public/assets · {files.length} files</Meta>
      </Row>
      <Panel>
        <h2>Assets</h2>
        <Grid>
          {files.map((f) => (
            <div className="item" key={f.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.name} />
              <div className="nm">{f.name}</div>
              <Button $variant="danger" onClick={() => del(f.name)}>Delete</Button>
            </div>
          ))}
        </Grid>
      </Panel>
    </AdminShell>
  );
}
