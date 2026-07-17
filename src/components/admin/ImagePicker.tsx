'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Meta, Row } from '@/components/admin/ui';
import { useToast } from '@/components/admin/Toast';
import { getJSON } from '@/lib/admin/client';

interface MediaFile {
  name: string;
  src: string;
}

const Wrap = styled.div`
  .current {
    display: flex;
    gap: 14px;
    align-items: center;
    margin-bottom: 12px;

    img {
      width: 96px;
      height: 96px;
      object-fit: cover;
      background: var(--bone);
      border: 0.5px solid rgba(240, 228, 210, 0.3);
      display: block;
    }
    .ph {
      width: 96px;
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.5px dashed rgba(240, 228, 210, 0.3);
      font-family: var(--mono);
      font-size: 9px;
      letter-spacing: 0.1em;
      color: rgba(240, 228, 210, 0.45);
      text-align: center;
      padding: 8px;
    }
  }

  .library {
    margin-top: 12px;
    border: 0.5px solid rgba(240, 228, 210, 0.25);
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 8px;
    max-height: 260px;
    overflow-y: auto;

    button {
      border: 0.5px solid rgba(240, 228, 210, 0.25);
      background: none;
      padding: 4px;
      cursor: pointer;

      img { width: 100%; height: 64px; object-fit: cover; display: block; background: var(--bone); }
      .nm {
        font-family: var(--mono);
        font-size: 8px;
        color: rgba(240, 228, 210, 0.6);
        margin-top: 4px;
        word-break: break-all;
        display: block;
      }
      &:hover, &.active { border-color: var(--tan); }
      &.active { background: rgba(181, 137, 94, 0.18); }
    }
  }
`;

interface ImagePickerProps {
  /** Current image src (e.g. "/assets/foo.jpg") or undefined for none. */
  value?: string;
  onChange: (src: string | undefined) => void;
}

/**
 * Photo attachment control for specimen editors. Uploads go through the
 * existing /api/admin/media endpoint (files land in public/assets); the
 * library grid lets an operator reuse anything already uploaded. Clearing
 * the image falls the public site back to the line silhouette.
 */
export default function ImagePicker({ value, onChange }: ImagePickerProps) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(false);

  const reload = useCallback(() => {
    getJSON<{ files: MediaFile[] }>('/api/admin/media')
      .then((d) => setFiles(d.files))
      .catch(() => toast.failed());
  }, [toast]);

  useEffect(() => {
    if (libraryOpen) reload();
  }, [libraryOpen, reload]);

  async function upload(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
    if (res.ok) {
      const data = (await res.json()) as MediaFile;
      onChange(data.src);
      toast.archived('PHOTO UPLOADED');
      if (libraryOpen) reload();
    } else {
      toast.failed('UPLOAD FAILED · PNG/JPG/WEBP ONLY');
    }
  }

  return (
    <Wrap>
      <div className="current">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="specimen" />
        ) : (
          <div className="ph">NO PHOTO — SILHOUETTE SHOWN</div>
        )}
        <div>
          <Row>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
                e.target.value = '';
              }}
            />
            <Button onClick={() => inputRef.current?.click()} data-testid="img-upload">
              ↑ Upload
            </Button>
            <Button onClick={() => setLibraryOpen((o) => !o)} data-testid="img-library">
              {libraryOpen ? 'Close library' : 'Library'}
            </Button>
            {value && (
              <Button $variant="danger" onClick={() => onChange(undefined)} data-testid="img-remove">
                Remove
              </Button>
            )}
          </Row>
          {value && <Meta style={{ marginTop: 8 }}>{value}</Meta>}
        </div>
      </div>

      {libraryOpen && (
        <div className="library" data-testid="img-library-grid">
          {files.length === 0 && <Meta>No images uploaded yet.</Meta>}
          {files.map((f) => (
            <button
              key={f.name}
              type="button"
              className={f.src === value ? 'active' : ''}
              onClick={() => {
                onChange(f.src);
                setLibraryOpen(false);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.name} />
              <span className="nm">{f.name}</span>
            </button>
          ))}
        </div>
      )}
    </Wrap>
  );
}
