'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import PageShell from '@/components/PageShell';
import InteriorHeader, { Section } from '@/components/interior/InteriorHeader';
import { Lang, t } from '@/i18n/translations';

const CONTACT_EMAIL = 'vault@leather-art.example';

const Body = styled.section`
  display: grid;
  grid-template-columns: 300px 0.5px 1fr;
  gap: 32px;
  padding: 48px 32px 64px;

  @media (max-width: 1100px) { grid-template-columns: 260px 0.5px 1fr; gap: 24px; }
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

const Readout = styled.aside`
  font-family: var(--mono);

  .row {
    border-top: 0.5px solid var(--hair-strong);
    padding: 14px 0;
  }
  .row:last-child { border-bottom: 0.5px solid var(--hair-strong); }
  .k {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 6px;
  }
  .v { font-size: 13px; color: var(--choc); letter-spacing: 0.04em; }
  a.v { text-decoration: none; }
  a.v:hover { color: var(--mid); }
`;

const Form = styled.form`
  font-family: var(--mono);

  h2 {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 0 0 18px;
  }

  label {
    display: block;
    font-size: 10.5px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
    margin: 0 0 6px;
  }

  input, textarea {
    width: 100%;
    background: var(--bone);
    border: 0.5px solid var(--hair-strong);
    color: var(--choc);
    font-family: var(--mono);
    font-size: 13px;
    padding: 11px 12px;
    margin-bottom: 18px;
    outline: none;
  }
  input:focus, textarea:focus { border-color: var(--choc); }
  textarea { resize: vertical; min-height: 120px; }

  button {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--bone);
    background: var(--choc);
    border: 0.5px solid var(--choc);
    padding: 13px 20px;
    min-height: 44px;
    cursor: none;
    transition: opacity 120ms ease;
  }
  button:hover { opacity: 0.85; }
  @media (pointer: coarse) { button { cursor: pointer; } }

  .direct {
    display: inline-block;
    margin-left: 16px;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
  }
  .direct:hover { color: var(--choc); }

  @media (max-width: 480px) {
    button { width: 100%; }
    .direct { display: block; margin: 14px 0 0; }
  }
`;

const Queued = styled.div`
  border: 0.5px solid var(--hair-strong);
  padding: 32px;
  font-family: var(--mono);

  .big {
    font-family: var(--display);
    font-size: clamp(22px, 4vw, 38px);
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: var(--choc);
    margin: 0 0 12px;
  }
  .sub { font-size: 13px; line-height: 1.6; color: var(--choc); max-width: 44ch; }

  .reset {
    margin-top: 22px;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: var(--mid);
    background: none;
    border: 0;
    cursor: none;
  }
  .reset:hover { color: var(--choc); }
  @media (pointer: coarse) { .reset { cursor: pointer; } }
`;

function ContactBody(lang: Lang) {
  const [queued, setQueued] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend (ground rule 7). Show an on-brand success readout only.
    setQueued(true);
  }

  const mailto =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent('Transmission · LEATHER//ART')}` +
    `&body=${encodeURIComponent(message)}`;

  return (
    <main id="top">
      <Section>
        <InteriorHeader
          num="§08"
          tag={t(lang, 'contact.tag')}
          title={t(lang, 'contact.title')}
          lede={t(lang, 'contact.sub')}
        />
      </Section>
      <Body>
        <Readout>
          <div className="row">
            <div className="k">{t(lang, 'contact.k.coords')}</div>
            <div className="v">41.7151°N / 44.8271°E</div>
          </div>
          <div className="row">
            <div className="k">{t(lang, 'contact.k.hours')}</div>
            <div className="v">{t(lang, 'contact.v.hours')}</div>
          </div>
          <div className="row">
            <div className="k">{t(lang, 'contact.k.response')}</div>
            <div className="v">{t(lang, 'contact.v.response')}</div>
          </div>
          <div className="row">
            <div className="k">{t(lang, 'contact.k.channel')}</div>
            <a className="v" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </Readout>

        <VRule className="vrule" />

        {queued ? (
          <Queued role="status">
            <p className="big">{t(lang, 'contact.form.queued')}</p>
            <p className="sub">{t(lang, 'contact.form.queued.sub')}</p>
            <button type="button" className="reset" onClick={() => setQueued(false)}>
              {t(lang, 'contact.form.reset')}
            </button>
          </Queued>
        ) : (
          <Form onSubmit={onSubmit}>
            <h2>{t(lang, 'contact.form.title')}</h2>
            <label htmlFor="c-name">{t(lang, 'contact.form.name')}</label>
            <input
              id="c-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="c-email">{t(lang, 'contact.form.email')}</label>
            <input
              id="c-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="c-message">{t(lang, 'contact.form.message')}</label>
            <textarea
              id="c-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">{t(lang, 'contact.form.send')}</button>
            <a className="direct" href={mailto}>{t(lang, 'contact.form.direct')}</a>
          </Form>
        )}
      </Body>
    </main>
  );
}

export default function ContactPage() {
  return <PageShell activeId="contact">{(lang) => ContactBody(lang)}</PageShell>;
}
