import React from 'react';
import { SilhouetteKind } from '@/data/specimens';

interface SilhouetteProps {
  kind: SilhouetteKind;
  color?: string;
  className?: string;
}

export default function Silhouette({ kind, color = '#3D1F0F', className }: SilhouetteProps) {
  const s = `stroke="${color}" strokeWidth="0.8" fill="none" strokeLinejoin="round"`;
  void s; // We'll use props directly in JSX

  switch (kind) {
    case 'tote':
      return (
        <svg viewBox="0 0 200 200" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <path d="M40 70 L40 180 Q40 188 48 188 L152 188 Q160 188 160 180 L160 70 Z" />
          <path d="M70 70 Q70 35 100 35 Q130 35 130 70" />
          <path d="M40 90 L160 90" />
          <path d="M86 130 L114 130" />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 200 200" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <rect x="36" y="76" width="128" height="78" />
          <path d="M100 76 L100 154" />
          <rect x="48" y="92" width="40" height="8" />
          <rect x="112" y="92" width="40" height="8" />
          <circle cx="142" cy="115" r="4" />
        </svg>
      );
    case 'satchel':
      return (
        <svg viewBox="0 0 200 240" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <path d="M30 70 L30 200 Q30 220 50 220 L150 220 Q170 220 170 200 L170 70 Z" />
          <path d="M30 70 L40 50 L160 50 L170 70" />
          <path d="M70 50 Q70 22 100 22 Q130 22 130 50" />
          <path d="M30 100 L170 100" />
          <circle cx="100" cy="135" r="5" />
        </svg>
      );
    case 'belt':
      return (
        <svg viewBox="0 0 240 120" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <rect x="20" y="50" width="180" height="20" />
          <rect x="200" y="44" width="22" height="32" />
          <path d="M210 50 L210 70" />
          <circle cx="40" cy="60" r="2.4" />
          <circle cx="56" cy="60" r="2.4" />
          <circle cx="72" cy="60" r="2.4" />
          <circle cx="88" cy="60" r="2.4" />
        </svg>
      );
    case 'brief':
      return (
        <svg viewBox="0 0 240 180" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <rect x="30" y="50" width="180" height="110" />
          <path d="M90 50 Q90 28 120 28 Q150 28 150 50" />
          <path d="M30 90 L210 90" />
          <rect x="108" y="98" width="24" height="14" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 200 220" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <rect x="50" y="30" width="100" height="160" />
          <path d="M150 30 L156 36 L156 196 L150 190" />
          <path d="M64 60 L136 60 M64 70 L120 70" />
          <path d="M75 130 L125 130" />
        </svg>
      );
    case 'jacket':
      return (
        <svg viewBox="0 0 220 240" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round" className={className}>
          <path d="M60 60 L40 80 L40 200 L80 200 L80 100 L100 60 Z" />
          <path d="M160 60 L180 80 L180 200 L140 200 L140 100 L120 60 Z" />
          <path d="M100 60 L110 90 L120 60" />
          <path d="M110 90 L110 200" />
          <circle cx="120" cy="130" r="2" />
          <circle cx="120" cy="150" r="2" />
          <circle cx="120" cy="170" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

export function SchematicSvg() {
  return (
    <svg viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet">
      <g stroke="#F0E4D2" strokeWidth="0.5" strokeDasharray="2 3" fill="none">
        <line x1="20" y1="20" x2="220" y2="20" />
        <line x1="20" y1="220" x2="220" y2="220" />
        <line x1="20" y1="20" x2="20" y2="220" />
        <line x1="220" y1="20" x2="220" y2="220" />
      </g>
      <g stroke="#F0E4D2" strokeWidth="0.6" fill="none">
        <line x1="20" y1="60" x2="220" y2="60" />
        <line x1="20" y1="180" x2="220" y2="180" />
        <line x1="80" y1="20" x2="80" y2="220" />
        <line x1="160" y1="20" x2="160" y2="220" />
        <circle cx="120" cy="120" r="56" />
        <circle cx="120" cy="120" r="2.4" fill="#F0E4D2" />
        <line x1="120" y1="64" x2="120" y2="176" />
        <line x1="64" y1="120" x2="176" y2="120" />
      </g>
      <g fill="#F0E4D2" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="0.5">
        <text x="22" y="14">A.01</text>
        <text x="200" y="14">A.02</text>
        <text x="22" y="234">B.01</text>
        <text x="200" y="234">B.02</text>
        <text x="124" y="118">⌖</text>
      </g>
    </svg>
  );
}

export function RowMeasureSvg() {
  return (
    <svg viewBox="0 0 70 30" preserveAspectRatio="none">
      <g stroke="#3D1F0F" strokeWidth="0.5" fill="none">
        <line x1="2" y1="6" x2="68" y2="6" />
        <line x1="2" y1="6" x2="2" y2="14" />
        <line x1="68" y1="6" x2="68" y2="14" />
        <line x1="35" y1="14" x2="35" y2="22" strokeDasharray="2 2" />
        <line x1="2" y1="22" x2="68" y2="22" />
      </g>
      <text x="2" y="29" fontFamily="JetBrains Mono" fontSize="5" fill="#3D1F0F">A.01—A.02</text>
    </svg>
  );
}

// Gallery views: 4 slightly different viewpoints per kind
export function galleryViews(kind: SilhouetteKind, color = '#3D1F0F'): React.ReactNode[] {
  const base = <Silhouette key="0" kind={kind} color={color} />;

  let detail: React.ReactNode;
  switch (kind) {
    case 'tote':
      detail = <svg key="1" viewBox="30 60 100 80" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><path d="M40 70 L40 130 Q40 135 48 135 L92 135 Q100 135 100 130 L100 70 Z"/><path d="M40 90 L100 90"/><path d="M60 105 L80 105"/></svg>;
      break;
    case 'wallet':
      detail = <svg key="1" viewBox="30 70 140 90" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><rect x="36" y="76" width="128" height="78"/><path d="M100 76 L100 154"/><rect x="48" y="92" width="40" height="8"/></svg>;
      break;
    case 'satchel':
      detail = <svg key="1" viewBox="20 40 160 140" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><path d="M30 70 L30 160 Q30 170 50 170 L150 170 Q170 170 170 160 L170 70 Z"/><path d="M30 100 L170 100"/><circle cx="100" cy="130" r="8"/></svg>;
      break;
    case 'belt':
      detail = <svg key="1" viewBox="10 40 120 40" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><rect x="20" y="50" width="100" height="20"/><circle cx="40" cy="60" r="3"/><circle cx="56" cy="60" r="3"/><circle cx="72" cy="60" r="3"/></svg>;
      break;
    case 'brief':
      detail = <svg key="1" viewBox="20 20 200 140" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><rect x="30" y="50" width="180" height="100"/><path d="M30 90 L210 90"/><rect x="108" y="96" width="24" height="14"/></svg>;
      break;
    case 'book':
      detail = <svg key="1" viewBox="40 20 120 180" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><rect x="50" y="30" width="100" height="160"/><path d="M150 30 L156 36 L156 196 L150 190"/></svg>;
      break;
    case 'jacket':
      detail = <svg key="1" viewBox="30 50 160 160" stroke={color} strokeWidth="0.8" fill="none" strokeLinejoin="round"><path d="M60 60 L40 80 L40 200 L80 200 L80 100 L100 60 Z"/><path d="M160 60 L180 80 L180 200 L140 200 L140 100 L120 60 Z"/></svg>;
      break;
    default:
      detail = base;
  }

  const construction = (
    <svg key="2" viewBox="0 0 240 240" stroke={color} strokeWidth="0.5" fill="none">
      <line x1="20" y1="40" x2="220" y2="40" strokeDasharray="3 4" />
      <line x1="20" y1="120" x2="220" y2="120" strokeDasharray="3 4" />
      <line x1="20" y1="200" x2="220" y2="200" strokeDasharray="3 4" />
      <line x1="60" y1="20" x2="60" y2="220" strokeDasharray="3 4" />
      <line x1="120" y1="20" x2="120" y2="220" strokeDasharray="3 4" />
      <line x1="180" y1="20" x2="180" y2="220" strokeDasharray="3 4" />
      <circle cx="120" cy="120" r="44" />
      <text x="126" y="118" fontFamily="JetBrains Mono" fontSize="8" fill={color}>⌖</text>
    </svg>
  );

  const spec = (
    <svg key="3" viewBox="0 0 200 200" stroke={color} strokeWidth="0.6" fill="none">
      <rect x="30" y="30" width="140" height="140" />
      <line x1="30" y1="30" x2="170" y2="170" />
      <line x1="170" y1="30" x2="30" y2="170" />
      <circle cx="100" cy="100" r="50" />
      <text x="86" y="22" fontFamily="JetBrains Mono" fontSize="7" fill={color}>SPEC</text>
    </svg>
  );

  return [base, detail, construction, spec];
}
