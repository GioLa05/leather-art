'use client';

import React from 'react';
import styled from 'styled-components';
import PageShell from '@/components/PageShell';
import InteriorHeader, { Section } from '@/components/interior/InteriorHeader';
import { Lang, t } from '@/i18n/translations';

const Body = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.5px 320px;
  gap: 32px;
  padding: 48px 32px 64px;

  @media (max-width: 1100px) { grid-template-columns: 1fr 0.5px 260px; gap: 24px; }
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 36px 18px 48px;
    .vrule { display: none; }
  }
  @media (max-width: 480px) { padding: 28px 16px 40px; }
`;

const VRule = styled.div`
  background: var(--hair-strong);
  width: 0.5px;
  align-self: stretch;
`;

const Prose = styled.div`
  p {
    font-family: var(--mono);
    font-size: 14px;
    line-height: 1.7;
    color: var(--choc);
    max-width: 58ch;
    margin: 0 0 20px;
  }

  @media (max-width: 480px) { p { font-size: 12.5px; } }
`;

const Principles = styled.dl`
  margin: 28px 0 0;
  border-top: 0.5px solid var(--hair-strong);

  .row {
    display: grid;
    grid-template-columns: 12ch 1fr;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 0.5px solid var(--hair-strong);
  }
  dt {
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
  }
  dd {
    margin: 0;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.5;
    color: var(--choc);
  }

  @media (max-width: 480px) {
    .row { grid-template-columns: 9ch 1fr; gap: 10px; }
  }
`;

const Stats = styled.aside`
  font-family: var(--mono);

  h2 {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 0 0 14px;
  }

  .stat {
    border-top: 0.5px solid var(--hair-strong);
    padding: 14px 0;
  }
  .stat:last-child { border-bottom: 0.5px solid var(--hair-strong); }

  .big {
    font-family: var(--display);
    font-size: 38px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--choc);
  }
  .sub {
    margin-top: 6px;
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
  }
`;

const STATS: { k: Parameters<typeof t>[1]; sub: Parameters<typeof t>[1] }[] = [
  { k: 'about.stat.founded', sub: 'about.stat.founded.sub' },
  { k: 'about.stat.hides', sub: 'about.stat.hides.sub' },
  { k: 'about.stat.editions', sub: 'about.stat.editions.sub' },
  { k: 'about.stat.artisans', sub: 'about.stat.artisans.sub' },
];

const PRINCIPLES: { k: Parameters<typeof t>[1]; v: Parameters<typeof t>[1] }[] = [
  { k: 'about.p1.k', v: 'about.p1.v' },
  { k: 'about.p2.k', v: 'about.p2.v' },
  { k: 'about.p3.k', v: 'about.p3.v' },
];

function AboutBody(lang: Lang) {
  return (
    <main id="top">
      <Section>
        <InteriorHeader
          num="§05"
          tag={t(lang, 'about.tag')}
          title={t(lang, 'about.title')}
          lede={t(lang, 'about.lede')}
        />
      </Section>
      <Body>
        <Prose>
          <p>{t(lang, 'about.body1')}</p>
          <p>{t(lang, 'about.body2')}</p>
          <Principles>
            {PRINCIPLES.map((p) => (
              <div className="row" key={p.k}>
                <dt>{t(lang, p.k)}</dt>
                <dd>{t(lang, p.v)}</dd>
              </div>
            ))}
          </Principles>
        </Prose>
        <VRule className="vrule" />
        <Stats aria-label={t(lang, 'about.stats')}>
          <h2>{t(lang, 'about.stats')}</h2>
          {STATS.map((s) => (
            <div className="stat" key={s.k}>
              <div className="big">{t(lang, s.k)}</div>
              <div className="sub">{t(lang, s.sub)}</div>
            </div>
          ))}
        </Stats>
      </Body>
    </main>
  );
}

export default function AboutPage() {
  return <PageShell activeId="about">{(lang) => AboutBody(lang)}</PageShell>;
}
