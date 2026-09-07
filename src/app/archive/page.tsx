'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import InteriorHeader, { Section } from '@/components/interior/InteriorHeader';
import Silhouette from '@/components/Silhouette';
import { Lang, t } from '@/i18n/translations';
import { VAULT_SPECIMENS } from '@/data/specimens';
import { specimenSlug } from '@/lib/specimen-url';

const ARCHIVED = VAULT_SPECIMENS.filter(
  (s) => s.cat === 'archive' || s.origin === 'ARCHIVE_UNKNOWN'
);

const Count = styled.div`
  padding: 14px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--choc);

  b { font-weight: 700; }

  @media (max-width: 480px) { padding: 12px 16px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;

const Card = styled(Link)`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 18px;
  padding: 24px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  border-right: 0.5px solid var(--hair-strong);
  text-decoration: none;
  transition: background 120ms ease;

  &:hover { background: var(--bone); }
  &:nth-child(2n) { border-right: 0; }

  .frame {
    aspect-ratio: 1 / 1;
    background: var(--bone);
    border: 0.5px solid var(--hair-strong);
    display: flex;
    align-items: center;
    justify-content: center;
    svg { width: 70%; height: 70%; }
  }

  .sn { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; color: var(--mid); }
  .redacted {
    display: inline-block;
    margin-top: 6px;
    font-family: var(--mono);
    font-size: 9.5px;
    letter-spacing: 0.1em;
    color: var(--bone);
    background: var(--choc);
    padding: 2px 6px;
  }
  h2 {
    font-family: var(--display);
    font-size: 18px;
    line-height: 1.05;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 10px 0 8px;
  }
  .coord { font-family: var(--mono); font-size: 11px; color: var(--choc); letter-spacing: 0.06em; }

  @media (max-width: 820px) { &:nth-child(2n) { border-right: 0.5px solid var(--hair-strong); } }
  @media (max-width: 480px) { padding: 18px 16px; grid-template-columns: 72px 1fr; gap: 14px; }
`;

const Empty = styled.div`
  padding: 80px 32px;
  text-align: center;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--mid);
`;

function pad3(n: number) { return String(n).padStart(3, '0'); }

function ArchiveBody(lang: Lang) {
  return (
    <main id="top">
      <Section>
        <InteriorHeader
          num="§07"
          tag={t(lang, 'archive.tag')}
          title={t(lang, 'archive.title')}
          lede={t(lang, 'archive.sub')}
        />
      </Section>
      {ARCHIVED.length === 0 ? (
        <Empty>{t(lang, 'archive.empty')}</Empty>
      ) : (
        <>
          <Count>
            <b>{pad3(ARCHIVED.length)}</b> {t(lang, 'archive.count')}
          </Count>
          <Grid>
            {ARCHIVED.map((s) => (
              <Card key={s.i} href={`/vault/${specimenSlug(s)}`}>
                <div className="frame">
                  {s.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <Silhouette kind={s.sil} />}
                </div>
                <div>
                  <span className="sn mono">{s.sn}</span>
                  <h2>{s.name[lang]}</h2>
                  <span className="redacted">{t(lang, 'archive.redacted')}</span>
                  <div className="coord" style={{ marginTop: 8 }}>⌖ {s.coord}</div>
                </div>
              </Card>
            ))}
          </Grid>
        </>
      )}
    </main>
  );
}

export default function ArchivePage() {
  return <PageShell activeId="archive">{(lang) => ArchiveBody(lang)}</PageShell>;
}
