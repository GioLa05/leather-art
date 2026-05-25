'use client';

import React from 'react';
import styled from 'styled-components';

export const Section = styled.section`
  padding: 70px 32px 56px;
  border-bottom: 0.5px solid var(--hair-strong);
  position: relative;

  @media (max-width: 820px) { padding: 60px 18px 44px; }
  @media (max-width: 480px) { padding: 52px 16px 36px; }
`;

const Tag = styled.span`
  position: absolute;
  top: 12px;
  left: 32px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mid);

  .num { color: var(--choc); margin-right: 8px; }

  @media (max-width: 820px) { left: 18px; }
  @media (max-width: 480px) { left: 16px; }
`;

const Title = styled.h1`
  font-family: var(--display);
  font-size: clamp(44px, 10vw, 148px);
  line-height: 0.86;
  color: var(--choc);
  letter-spacing: -0.035em;
  margin: 0;
  text-transform: uppercase;
  text-wrap: balance;

  @media (max-width: 320px) { font-size: 40px; }
`;

const Lede = styled.p`
  margin-top: 22px;
  font-family: var(--mono);
  font-size: 14px;
  line-height: 1.55;
  color: var(--choc);
  max-width: 46ch;

  @media (max-width: 480px) { font-size: 12px; margin-top: 16px; }
`;

interface InteriorHeaderProps {
  num: string;
  tag: string;
  /** Title may contain a literal `<br/>` to control wrapping. */
  title: string;
  lede?: string;
}

/** Hairline-ruled header with a monospace eyebrow + big display title. */
export default function InteriorHeader({ num, tag, title, lede }: InteriorHeaderProps) {
  return (
    <>
      <Tag>
        <span className="num">{num}</span>
        <span>{tag}</span>
      </Tag>
      <Title dangerouslySetInnerHTML={{ __html: title }} />
      {lede && <Lede>{lede}</Lede>}
    </>
  );
}
