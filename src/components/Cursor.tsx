'use client';

import { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const CursorGlobal = createGlobalStyle`
  body { cursor: none; }
  @media (max-width: 880px), (pointer: coarse) {
    body { cursor: auto; }
  }
  button { cursor: none; }
  @media (pointer: coarse) { button { cursor: pointer; } }
`;

const CursorEl = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
  width: 14px;
  height: 14px;
  transform: translate3d(-50%, -50%, 0);

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: var(--choc);
  }
  &::before {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 0.5px;
    transform: translateX(-50%);
  }
  &::after {
    top: 50%;
    left: 0;
    right: 0;
    height: 0.5px;
    transform: translateY(-50%);
  }

  @media (max-width: 880px), (pointer: coarse) {
    display: none !important;
  }
`;

const CursorTrail = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
  width: 22px;
  height: 22px;
  border: 0.5px solid var(--choc);
  transform: translate3d(-50%, -50%, 0);
  transition: transform 90ms linear;

  @media (max-width: 880px), (pointer: coarse) {
    display: none !important;
  }
`;

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let x = -50, y = -50, tx = -50, ty = -50;
    let rafId: number;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      // Reassert visibility on every move. The cursor tracks the pointer, so if
      // the pointer is moving inside the page the cursor must be shown. Relying
      // only on `mouseenter` to restore opacity let a stray `mouseleave` (window
      // exit, native <select>, devtools) leave the cursor stuck hidden.
      cursor.style.opacity = '1';
      trail.style.opacity = '1';
      if (reducedMotion) {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        trail.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      trail.style.opacity = '0';
    };
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      trail.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    if (!reducedMotion) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <CursorGlobal />
      <CursorTrail ref={trailRef} aria-hidden="true" data-testid="cursor-trail" />
      <CursorEl ref={cursorRef} aria-hidden="true" data-testid="cursor" />
    </>
  );
}
