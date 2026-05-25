'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import Silhouette from '@/components/Silhouette';
import { Section } from '@/components/interior/InteriorHeader';
import { Lang, t } from '@/i18n/translations';
import { TOTAL_SPECIMENS, grainDensity, VaultSpecimen } from '@/data/specimens';
import { findSpecimenBySlug, orderedSpecimens, specimenSlug } from '@/lib/specimen-url';

function pad2(n: number) { return String(n).padStart(2, '0'); }
function pad3(n: number) { return String(n).padStart(3, '0'); }

const Back = styled.div`
  padding: 14px 32px;
  border-bottom: 0.5px solid var(--hair-strong);

  a {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
  }
  a:hover { color: var(--choc); }

  @media (max-width: 480px) { padding: 12px 16px; }
`;

const Dossier = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.5px 1fr;
  gap: 32px;
  padding: 32px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px 18px;
    .vrule { display: none; }
  }
  @media (max-width: 480px) { padding: 20px 16px; }
`;

const VRule = styled.div`
  background: var(--hair-strong);
  width: 0.5px;
  align-self: stretch;
`;

const Frame = styled.div`
  position: relative;
  min-width: 0;
  aspect-ratio: 4 / 5;
  background: var(--bone);
  border: 0.5px solid var(--hair-strong);
  display: flex;
  align-items: center;
  justify-content: center;

  svg { width: 72%; height: 72%; }

  .index, .stamp {
    position: absolute;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--choc);
  }
  .index { top: 10px; left: 12px; }
  .stamp { bottom: 10px; right: 12px; }
`;

const Detail = styled.div`
  font-family: var(--mono);
  min-width: 0;

  .eyebrow {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 10px;
  }
  h1 {
    font-family: var(--display);
    font-size: clamp(30px, 6vw, 56px);
    line-height: 0.92;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 14px;
    .slash { font-family: var(--mono); font-weight: 400; font-size: 0.42em; color: var(--mid); padding: 0 0.2em; vertical-align: 0.3em; }
  }
  .tagline {
    font-family: var(--script);
    font-size: clamp(20px, 3vw, 30px);
    color: var(--choc);
    line-height: 1.2;
    margin: 0 0 18px;
  }

  h3 {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 24px 0 0;
  }
`;

const SpecTable = styled.div`
  margin-top: 12px;
  .row {
    display: grid;
    grid-template-columns: 11ch 1fr;
    gap: 12px;
    padding: 9px 0;
    border-top: 0.5px solid var(--hair-strong);
    font-size: 12px;
    color: var(--choc);
  }
  .row:last-child { border-bottom: 0.5px solid var(--hair-strong); }
  .k { color: var(--mid); text-transform: uppercase; letter-spacing: 0.08em; font-size: 10.5px; }

  @media (max-width: 480px) { .row { grid-template-columns: 9ch 1fr; gap: 8px; } }
`;

const Editorial = styled.p`
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--choc);
  margin: 12px 0 0;
  max-width: 56ch;
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 0.5px solid var(--hair-strong);

  .price { font-family: var(--display); font-size: 30px; letter-spacing: -0.02em; color: var(--choc); }
  .request {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--bone);
    background: var(--choc);
    border: 0.5px solid var(--choc);
    padding: 12px 18px;
    min-height: 44px;
    cursor: none;
  }
  @media (pointer: coarse) { .request { cursor: pointer; } }
`;

const PrevNext = styled.nav`
  display: flex;
  border-top: 0.5px solid var(--hair-strong);

  a {
    flex: 1;
    padding: 18px 32px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
    transition: background 120ms ease, color 120ms ease;
  }
  a:hover { background: var(--bone); color: var(--choc); }
  a + a { border-left: 0.5px solid var(--hair-strong); text-align: right; }

  @media (max-width: 480px) { a { padding: 16px; } }
`;

const NotFound = styled.div`
  padding: 90px 32px;
  text-align: center;
  font-family: var(--mono);

  .big {
    font-family: var(--display);
    font-size: clamp(24px, 5vw, 44px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 14px;
  }
  .sub { font-size: 13px; color: var(--mid); margin-bottom: 24px; }
  a {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--choc);
    border: 0.5px solid var(--hair-strong);
    padding: 12px 18px;
    text-decoration: none;
  }
  a:hover { background: var(--bone); }
`;

function nameEl(name: string) {
  if (name.includes(' // ')) {
    const [a, b] = name.split(' // ');
    return (
      <>
        {a}
        <br />
        <span className="slash">//</span>
        {b}
      </>
    );
  }
  return name;
}

function DossierBody(lang: Lang, spec: VaultSpecimen) {
  const order = orderedSpecimens();
  const idx = order.findIndex((s) => s.i === spec.i);
  const prev = order[(idx - 1 + order.length) % order.length];
  const next = order[(idx + 1) % order.length];

  const rows: [string, string][] = [
    [t(lang, 'ms.tannage'), 'Vegetable · mimosa'],
    [t(lang, 'ms.hours'), `${pad3(spec.tan)} hrs`],
    [t(lang, 'ms.grain'), `${grainDensity(spec.grain)} fibers/mm² · ${t(lang, `grain.${spec.grain.toLowerCase()}` as Parameters<typeof t>[1])}`],
    [t(lang, 'ms.origin'), t(lang, `origin.${spec.origin.toLowerCase()}` as Parameters<typeof t>[1])],
    [t(lang, 'ms.weight'), `${spec.weight} g ± 6`],
    [t(lang, 'ms.coord'), spec.coord],
    [t(lang, 'ms.batch'), spec.sn],
    [t(lang, 'ms.finish'), spec.finish],
    [t(lang, 'ms.entry'), spec.entry],
  ];

  return (
    <main id="top">
      <Back>
        <Link href="/vault">{t(lang, 'detail.back')}</Link>
      </Back>
      <Dossier>
        <Frame aria-hidden="true">
          <span className="index mono">IDX. {pad2(spec.i)} / {pad3(TOTAL_SPECIMENS)}</span>
          <span className="stamp mono">⌖ {spec.coord}</span>
          <Silhouette kind={spec.sil} />
        </Frame>

        <VRule className="vrule" />

        <Detail>
          <div className="eyebrow">SPECIMEN {pad2(spec.i)} / {pad3(TOTAL_SPECIMENS)} · {spec.sn}</div>
          <h1>{nameEl(spec.name)}</h1>
          {spec.quote && <p className="tagline">{spec.quote}</p>}

          <h3>{t(lang, 'detail.spec')}</h3>
          <SpecTable>
            {rows.map(([k, v]) => (
              <div key={k} className="row">
                <span className="k">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </SpecTable>

          <h3>{t(lang, 'detail.editorial')}</h3>
          <Editorial>{spec.editorial}</Editorial>

          <Foot>
            <span className="price">€{spec.price}</span>
            <button type="button" className="request">{t(lang, 'modal.request')}</button>
          </Foot>
        </Detail>
      </Dossier>

      <PrevNext aria-label="Specimen navigation">
        <Link href={`/vault/${specimenSlug(prev)}`}>{t(lang, 'detail.prev')}</Link>
        <Link href={`/vault/${specimenSlug(next)}`}>{t(lang, 'detail.next')}</Link>
      </PrevNext>
    </main>
  );
}

export default function SpecimenDetailPage({ params }: { params: { serial: string } }) {
  const spec = findSpecimenBySlug(params.serial);

  return (
    <PageShell activeId="vault">
      {(lang) =>
        spec ? (
          DossierBody(lang, spec)
        ) : (
          <Section as="main">
            <NotFound>
              <p className="big">{t(lang, 'detail.notfound')}</p>
              <p className="sub">{t(lang, 'detail.notfound.sub')}</p>
              <Link href="/vault">{t(lang, 'detail.back')}</Link>
            </NotFound>
          </Section>
        )
      }
    </PageShell>
  );
}
