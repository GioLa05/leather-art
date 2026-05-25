'use client';

import styled, { createGlobalStyle } from 'styled-components';

/**
 * Admin UI kit — an extension of the LEATHER//ART aesthetic rendered as a
 * "vault operator's console": chocolate ground, bone ink, tan accents,
 * hairline rules, monospace meta labels. English-only (see DECISIONS.md).
 */

export const AdminGlobal = createGlobalStyle`
  body { background: var(--choc); cursor: auto; }
`;

export const Screen = styled.div`
  min-height: 100vh;
  background: var(--choc);
  color: var(--bone);
  font-family: var(--mono);
`;

export const Eyebrow = styled.div`
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tan);
`;

export const H1 = styled.h1`
  font-family: var(--display);
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--bone);
  margin: 8px 0 0;
`;

export const Panel = styled.section`
  border: 0.5px solid rgba(240, 228, 210, 0.3);
  background: rgba(240, 228, 210, 0.03);
  padding: 22px;
  margin-bottom: 20px;

  > h2 {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--tan);
    margin: 0 0 16px;
    padding-bottom: 12px;
    border-bottom: 0.5px solid rgba(240, 228, 210, 0.2);
  }
`;

export const Field = styled.label`
  display: block;
  margin-bottom: 16px;

  .k {
    display: block;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--tan);
    margin-bottom: 6px;
  }
`;

const fieldStyles = `
  width: 100%;
  background: rgba(0,0,0,0.25);
  border: 0.5px solid rgba(240, 228, 210, 0.35);
  color: var(--bone);
  font-family: var(--mono);
  font-size: 13px;
  padding: 10px 12px;
  outline: none;
  &:focus { border-color: var(--tan); }
`;

export const Input = styled.input`
  ${fieldStyles}
`;

export const Textarea = styled.textarea`
  ${fieldStyles}
  resize: vertical;
  min-height: 90px;
`;

export const Select = styled.select`
  ${fieldStyles}
`;

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 16px;
  min-height: 40px;
  cursor: pointer;
  border: 0.5px solid rgba(240, 228, 210, 0.4);
  background: ${({ $variant }) =>
    $variant === 'primary' ? 'var(--tan)' : 'transparent'};
  color: ${({ $variant }) => ($variant === 'primary' ? 'var(--choc)' : 'var(--bone)')};
  transition: all 120ms ease;

  ${({ $variant }) =>
    $variant === 'danger' &&
    'border-color: #c46; color: #e8a;'}

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'danger' ? '#c46' : 'var(--tan)'};
    color: var(--choc);
    border-color: ${({ $variant }) => ($variant === 'danger' ? '#c46' : 'var(--tan)')};
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

export const Tabs = styled.div`
  display: flex;
  border: 0.5px solid rgba(240, 228, 210, 0.3);
  margin-bottom: 16px;
  width: fit-content;

  button {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    padding: 8px 16px;
    color: rgba(240, 228, 210, 0.6);
    background: none;
    border: 0;
    border-left: 0.5px solid rgba(240, 228, 210, 0.3);
    cursor: pointer;
    &:first-child { border-left: 0; }
    &.active { background: var(--tan); color: var(--choc); font-weight: 700; }
  }
`;

export const Meta = styled.div`
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(240, 228, 210, 0.6);
`;
