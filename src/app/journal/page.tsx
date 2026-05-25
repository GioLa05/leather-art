'use client';

import React from 'react';
import styled from 'styled-components';
import PageShell from '@/components/PageShell';
import InteriorHeader, { Section } from '@/components/interior/InteriorHeader';
import { Lang, t } from '@/i18n/translations';
import { JOURNAL_ENTRIES } from '@/data/journal';

const List = styled.div`
  border-top: 0.5px solid var(--hair-strong);
`;

const Entry = styled.article`
  display: grid;
  grid-template-columns: 5ch 1fr 16ch;
  gap: 24px;
  padding: 28px 32px;
  border-bottom: 0.5px solid var(--hair-strong);
  align-items: start;
  transition: background 120ms ease;

  &:hover { background: var(--bone); }

  .idx {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--mid);
    padding-top: 6px;
  }

  h2 {
    font-family: var(--display);
    font-size: clamp(20px, 3vw, 34px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 12px;
  }

  p {
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.6;
    color: var(--choc);
    max-width: 60ch;
    margin: 0 0 14px;
  }

  .read {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
  }

  .meta {
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
    text-align: right;
    line-height: 1.8;
  }
  .meta .field { color: var(--choc); }

  @media (max-width: 820px) {
    grid-template-columns: 4ch 1fr;
    gap: 14px;
    padding: 24px 18px;
    .meta { grid-column: 2; text-align: left; margin-top: 4px; }
  }
  @media (max-width: 480px) { padding: 20px 16px; }
`;

function JournalBody(lang: Lang) {
  return (
    <main id="top">
      <Section>
        <InteriorHeader
          num="§06"
          tag={t(lang, 'journal.tag')}
          title={t(lang, 'journal.title')}
          lede={t(lang, 'journal.sub')}
        />
      </Section>
      <List>
        {JOURNAL_ENTRIES.map((e) => (
          <Entry key={e.id}>
            <span className="idx mono">{e.num}</span>
            <div>
              <h2>{e.title[lang]}</h2>
              <p>{e.excerpt[lang]}</p>
              <span className="read">{t(lang, 'journal.read')}</span>
            </div>
            <div className="meta">
              <div className="field">{t(lang, 'journal.field')}</div>
              <div>{e.date}</div>
              <div>{e.read}</div>
            </div>
          </Entry>
        ))}
      </List>
    </main>
  );
}

export default function JournalPage() {
  return <PageShell activeId="journal">{(lang) => JournalBody(lang)}</PageShell>;
}
